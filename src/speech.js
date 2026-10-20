/**
 * British English Vault - Text-to-Speech (TTS) Engine
 */

// Cached list of available voices and active utterance reference (prevents Chrome Garbage Collection bug)
let voices = [];
let selectedVoice = null;
let currentUtterance = null;
let audioFallbackInstance = null;

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
      const brVoices = voices.filter(v => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));

      // Try to load saved voice preference
      const savedVoiceURI = localStorage.getItem('bev_selected_voice');
      if (savedVoiceURI) {
        selectedVoice = brVoices.find(v => v.voiceURI === savedVoiceURI) || null;
      }

      // Fallback: choose the first British voice (en-GB) if possible
      if (!selectedVoice && brVoices.length > 0) {
        selectedVoice = brVoices[0];
      } else if (!selectedVoice && voices.length > 0) {
        // Fallback to any English voice (en-US, en-AU, etc.) so speech is never muted
        selectedVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
      }

      resolve(brVoices.length > 0 ? brVoices : (selectedVoice ? [selectedVoice] : []));
    };

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
  return window.speechSynthesis.getVoices().filter(v => v.lang === 'en-GB' || v.lang.startsWith('en-GB'));
}

/**
 * Sets the active voice by URI
 */
export function setSelectedVoice(voiceURI) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return false;
  const allVoices = window.speechSynthesis.getVoices();
  const voice = allVoices.find(v => v.voiceURI === voiceURI);
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
 * Clean text to avoid speech engine pronouncing 'blank', 'space blank', 'underscore', '____', etc.
 * Replaces gaps/placeholders with a short pause (comma space) so speech flows naturally.
 */
export function sanitizeTextForTTS(text) {
  if (!text) return '';
  return text
    // Remove outer and inner typographic quotes so TTS speaks the pure word
    .replace(/[“”"']/g, '')
    // Replace sequences of 2 or more underscores, hyphens or dots used as fill-in-the-blank gaps with a pause
    .replace(/[_.\-]{2,}/g, ', ')
    // Replace explicit placeholder terms like [blank], (blank), "space blank", "blank", "underscore", "underscores"
    .replace(/\[\s*blank\s*\]|\(\s*blank\s*\)/gi, ', ')
    .replace(/\b(space\s+blank|blank|underscore|underscores)\b/gi, ', ')
    // Consolidate multiple consecutive commas/spaces
    .replace(/,\s*,+/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Standard Speech Playback (Dual-Engine: Native SpeechSynthesis with Chrome-Windows bugfixes + British Audio Fallback)
 */
export function speakText(text, options = {}) {
  return new Promise((resolve) => {
    const cleanText = sanitizeTextForTTS(text);
    if (!cleanText) {
      resolve();
      return;
    }

    // Fallback British audio via HTML5 Audio
    const playFallbackAudio = () => {
      try {
        if (audioFallbackInstance) {
          audioFallbackInstance.pause();
          audioFallbackInstance = null;
        }
        const encoded = encodeURIComponent(cleanText);
        // High quality British English pronunciation CDN
        const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=en-GB&client=tw-ob`;
        const audio = new Audio(audioUrl);
        audioFallbackInstance = audio;
        audio.playbackRate = options.rate || 1.0;
        
        let done = false;
        const finishAudio = () => {
          if (!done) {
            done = true;
            audioFallbackInstance = null;
            resolve();
          }
        };

        audio.onended = finishAudio;
        audio.onerror = finishAudio;
        setTimeout(finishAudio, 4000);

        const p = audio.play();
        if (p) {
          p.catch(() => finishAudio());
        }
      } catch (err) {
        resolve();
      }
    };

    if (typeof window === 'undefined' || !window.speechSynthesis) {
      playFallbackAudio();
      return;
    }

    try {
      // 1. Resume speech synthesis if browser paused it
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      // 2. Clear stuck queue (Chrome Windows cancel bugfix)
      window.speechSynthesis.cancel();

      // 3. Create utterance and keep global reference (prevents Chrome GC bug)
      const utterance = new SpeechSynthesisUtterance(cleanText);
      currentUtterance = utterance;

      // 4. Determine best voice
      const allVoices = window.speechSynthesis.getVoices() || [];
      let voiceToUse = selectedVoice;
      if (!voiceToUse && allVoices.length > 0) {
        voiceToUse = allVoices.find(v => (v.lang === 'en-GB' || v.lang.startsWith('en-GB')) && v.localService) ||
                     allVoices.find(v => v.lang === 'en-GB' || v.lang.startsWith('en-GB')) ||
                     allVoices.find(v => v.lang.startsWith('en') && v.localService) ||
                     allVoices.find(v => v.lang.startsWith('en')) ||
                     allVoices[0];
      }

      utterance.lang = 'en-GB';
      if (voiceToUse) {
        utterance.voice = voiceToUse;
        utterance.lang = voiceToUse.lang || 'en-GB';
      }

      utterance.rate = options.rate || 1.0;
      utterance.pitch = options.pitch || 1.0;
      utterance.volume = options.volume || 1.0;

      let hasFinished = false;
      let safetyTimer = null;

      const finishSpeech = (usedFallback = false) => {
        if (!hasFinished) {
          hasFinished = true;
          if (safetyTimer) clearTimeout(safetyTimer);
          currentUtterance = null;
          if (!usedFallback) {
            resolve();
          }
        }
      };

      utterance.onend = () => finishSpeech(false);
      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis error, falling back to audio:", e?.error || e);
        finishSpeech(true);
        playFallbackAudio();
      };

      // Safety timeout: if neither onend nor onerror fires within 3.5s, trigger fallback
      safetyTimer = setTimeout(() => {
        if (!hasFinished) {
          finishSpeech(true);
          playFallbackAudio();
        }
      }, 3500);

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn("Speech error, using fallback audio:", err);
      playFallbackAudio();
    }
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
 * Phonetic adaptation to prevent "Phonetic Context Loss" when speaking
 * individual syllables standalone in a British accent (en-GB).
 */
export function getSpeechFriendlySyllable(syl, idx, totalSyllables, fullWord) {
  let phonetic = syl.toLowerCase().trim();
  const isLast = idx === totalSyllables - 1;
  const isFirst = idx === 0;

  // Rule 1: Trailing "er" in British English sounds like "uh" (Schwa)
  if (phonetic.endsWith('er')) {
    phonetic = phonetic.slice(0, -2) + 'uh';
  }
  
  // Rule 2: Trailing "ered" (like knackered) or "erd" sounds like "uhd"
  if (phonetic.endsWith('ered')) {
    phonetic = phonetic.slice(0, -4) + 'uhd';
  } else if (phonetic.endsWith('erd')) {
    phonetic = phonetic.slice(0, -3) + 'uhd';
  }

  // Rule 3: Single letter "a" at start (e.g. about) is a Schwa sound "uh"
  if (phonetic === 'a' && isFirst && totalSyllables > 1) {
    phonetic = 'uh';
  }

  // Rule 4: Trailing "y" in the last syllable of a multi-syllable word sounds like "ee" (e.g. baby -> ba-bee, fancy -> fan-cee)
  if (isLast && totalSyllables > 1 && phonetic.endsWith('y') && phonetic.length > 1) {
    const charBeforeY = phonetic[phonetic.length - 2];
    if (!"aeiou".includes(charBeforeY)) {
      phonetic = phonetic.slice(0, -1) + 'ee';
    }
  }

  // Rule 5: Trailing "le" after a consonant (like table -> ta-ble, uncle -> un-cle) sounds like "uhl"
  if (isLast && phonetic.endsWith('le') && phonetic.length > 2) {
    const charBeforeL = phonetic[phonetic.length - 3];
    if (!"aeiou".includes(charBeforeL)) {
      phonetic = phonetic.slice(0, -2) + 'uhl';
    }
  }

  return phonetic;
}

/**
 * Long-Press Pronunciation:
 * Speaks the entire word very slowly (rate = 0.5) so the user can hear all phonemes
 * and transitions naturally with correct phonetic context, followed by the normal speed reading.
 */
export async function speakSlowSyllables(word, onStateChange = () => {}) {
  try {
    // Notify UI that we are playing slowly
    onStateChange({ status: 'speaking-slow', activeSyllable: 'Slowly...' });

    // 1. Speak the full word very slowly (rate = 0.35) to preserve natural stress and phonetics
    await speakText(word, { rate: 0.35 });

    // 2. Pause briefly
    onStateChange({ status: 'pause-before-full', activeSyllable: '' });
    await new Promise(r => setTimeout(r, 800));

    // 3. Speak the full word at normal rate
    onStateChange({ status: 'speaking-full', activeSyllable: '' });
    await speakText(word, { rate: 1.0 });

    onStateChange({ status: 'done', activeSyllable: '' });
  } catch (error) {
    console.error("Slow speech playback failed", error);
    onStateChange({ status: 'error', error });
  }
}
