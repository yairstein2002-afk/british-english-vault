/**
 * British English Vault - Text-to-Speech (TTS) Engine
 */

// Cached list of available voices
let voices = [];
let selectedVoice = null;

// Initialize voices
export function initSpeech() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }

    const loadVoices = () => {
      voices = window.speechSynthesis.getVoices();
      
      // Filter for British English (en-GB) voices
      const brVoices = voices.filter(v => 
        v.lang === 'en-GB' || v.lang.startsWith('en-GB')
      );

      // Try to load saved voice preference
      const savedVoiceURI = localStorage.getItem('bev_selected_voice');
      if (savedVoiceURI) {
        selectedVoice = brVoices.find(v => v.voiceURI === savedVoiceURI) || null;
      }

      // Fallback: choose the first en-GB voice, or default
      if (!selectedVoice && brVoices.length > 0) {
        selectedVoice = brVoices[0];
      }

      resolve(brVoices);
    };

    // Chrome loads voices asynchronously
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    
    loadVoices();
  });
}

/**
 * Returns all available British voices
 */
export function getBritishVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  return window.speechSynthesis.getVoices().filter(v => 
    v.lang === 'en-GB' || v.lang.startsWith('en-GB')
  );
}

/**
 * Sets the active voice by URI
 */
export function setSelectedVoice(voiceURI) {
  const brVoices = getBritishVoices();
  const voice = brVoices.find(v => v.voiceURI === voiceURI);
  if (voice) {
    selectedVoice = voice;
    localStorage.setItem('bev_selected_voice', voiceURI);
    return true;
  }
  return false;
}

/**
 * Returns the currently active voice
 */
export function getSelectedVoice() {
  return selectedVoice;
}

/**
 * Simple English Syllabifier Heuristic
 */
export function splitIntoSyllables(word) {
  // Clean word from trailing/leading punctuation, keep hyphens inside
  const cleaned = word.trim().replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
  if (cleaned.length <= 3) return [cleaned];

  const syllables = [];
  const vowels = "aeiouyAEIOUY";
  
  const isVowel = (char) => vowels.includes(char);

  // Parse word to find vowel clusters
  const vowelClusters = [];
  let i = 0;
  while (i < cleaned.length) {
    if (isVowel(cleaned[i])) {
      let start = i;
      while (i < cleaned.length && isVowel(cleaned[i])) {
        i++;
      }
      vowelClusters.push({ start, end: i - 1 });
    } else {
      i++;
    }
  }

  // If 0 or 1 syllable sound, return word
  if (vowelClusters.length <= 1) {
    return [cleaned];
  }

  // Handle silent 'e' at end
  const lastCluster = vowelClusters[vowelClusters.length - 1];
  if (
    lastCluster.start === cleaned.length - 1 && 
    cleaned[lastCluster.start].toLowerCase() === 'e'
  ) {
    // If preceded by 'l' (like table, gentle) it is NOT silent (counts as a syllable)
    const prevChar = cleaned[lastCluster.start - 1]?.toLowerCase();
    if (prevChar !== 'l') {
      vowelClusters.pop(); // Remove silent e
    }
  }

  if (vowelClusters.length <= 1) {
    return [cleaned];
  }

  let lastSplitIndex = 0;
  for (let c = 0; c < vowelClusters.length - 1; c++) {
    const currentVowel = vowelClusters[c];
    const nextVowel = vowelClusters[c + 1];
    const consonantsBetween = nextVowel.start - currentVowel.end - 1;
    let splitIndex;

    if (consonantsBetween === 0) {
      // Split between adjacent vowel clusters (e.g., di-et)
      splitIndex = currentVowel.end + 1;
    } else if (consonantsBetween === 1) {
      // Split before the consonant (e.g., ti-ger)
      splitIndex = currentVowel.end + 1;
    } else {
      // Multiple consonants
      const consStart = currentVowel.end + 1;
      const consStr = cleaned.substring(consStart, consStart + consonantsBetween).toLowerCase();

      // Digraph rules: do not split th, sh, ch, ph, wh, ng, gh, qu
      const digraphs = ["th", "sh", "ch", "ph", "wh", "ng", "gh", "qu"];
      if (consonantsBetween === 2 && digraphs.includes(consStr)) {
        // Keep digraph together, split after the digraph if it forms a natural unit, or split before
        // Commonly we split after ck or ng (e.g., sing-er, pack-et)
        if (consStr === "ck" || consStr === "ng") {
          splitIndex = consStart + 2;
        } else {
          splitIndex = consStart;
        }
      } else {
        // Standard rule: split down the middle (e.g., doc-tor)
        splitIndex = consStart + Math.floor(consonantsBetween / 2);
      }
    }

    syllables.push(cleaned.substring(lastSplitIndex, splitIndex));
    lastSplitIndex = splitIndex;
  }

  syllables.push(cleaned.substring(lastSplitIndex));
  return syllables.filter(s => s.length > 0);
}

/**
 * Standard Speech Playback
 */
export function speakText(text, options = {}) {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      reject("Speech synthesis not supported");
      return;
    }

    // Cancel ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }
    
    utterance.rate = options.rate || 1.0;
    utterance.pitch = options.pitch || 1.0;
    utterance.volume = options.volume || 1.0;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        reject(e.error);
      } else {
        resolve(); // Interrupted is normal when user clicks again
      }
    };

    window.speechSynthesis.speak(utterance);
  });
}

/**
 * Speak with repeats and optional rate adjustments
 */
export async function speakMultipleTimes(text, rate = 1.0, count = 1) {
  for (let i = 0; i < count; i++) {
    await speakText(text, { rate });
    if (i < count - 1) {
      // Pause slightly between repeats
      await new Promise(r => setTimeout(r, 400));
    }
  }
}

/**
 * Long-Press Syllable Pronunciation:
 * 1. Reads word slowly (rate = 0.5)
 * 2. Hyphenates into syllables and reads each syllable with a 400ms pause
 * 3. Plays word at normal speed (rate = 1.0)
 */
export async function speakSlowSyllables(word, onStateChange = () => {}) {
  const syllables = splitIntoSyllables(word);
  
  try {
    onStateChange({ status: 'speaking-syllables', activeSyllable: '' });

    // 1. Speak each syllable slowly with a short pause
    for (let idx = 0; idx < syllables.length; idx++) {
      const syl = syllables[idx];
      onStateChange({ status: 'speaking-syllables', activeSyllable: syl, index: idx });
      
      // Speak the individual syllable slowly
      await speakText(syl, { rate: 0.5 });
      
      // Delay before next syllable
      await new Promise(r => setTimeout(r, 450));
    }

    // 2. Final pause before full reading
    onStateChange({ status: 'pause-before-full', activeSyllable: '' });
    await new Promise(r => setTimeout(r, 800));

    // 3. Speak the full word at normal rate
    onStateChange({ status: 'speaking-full', activeSyllable: '' });
    await speakText(word, { rate: 1.0 });

    onStateChange({ status: 'done', activeSyllable: '' });
  } catch (error) {
    console.error("Slow syllable speech failed", error);
    onStateChange({ status: 'error', error });
  }
}
