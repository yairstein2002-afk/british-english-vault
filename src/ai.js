/**
 * British English Vault - Gemini AI Assistant Service
 */

const GEMINI_API_KEY_STORAGE = 'bev_gemini_api_key';

/**
 * Get Gemini API Key from Local Storage
 */
export function getGeminiApiKey() {
  if (typeof localStorage === 'undefined') return '';
  return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
}

/**
 * Save Gemini API Key to Local Storage
 */
export function saveGeminiApiKey(key) {
  if (typeof localStorage === 'undefined') return;
  localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
}

export function extractJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
  }
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    cleaned = cleaned.substring(start, end + 1);
  }
  
  // Sanitize raw newlines inside double-quoted JSON string values to prevent JSON.parse syntax errors
  cleaned = cleaned.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match, p1) => {
    return '"' + p1.replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '"';
  });

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`JSON Parse failed. Raw response: "${text.substring(0, 120)}...". Error: ${err.message}`);
  }
}

function getOfflineSpokenResponse(mode, rawText) {
  if (!rawText) return null;
  const t = rawText.toLowerCase().replace(/[.,!?'"]/g, '').trim();

  if (mode === 'english-spoken') {
    if (t.includes('very hungry') || t === 'hungry' || t.includes('so hungry') || t.includes('im hungry')) {
      return {
        status: "Formal / Textbook English",
        spokenVersion: "Starving (or Famished)",
        explanation: "In natural everyday spoken English, native speakers almost never say 'very hungry'. Instead, they use extreme, expressive adjectives like 'starving' or 'famished' to convey hunger with conversational impact.",
        alternatives: ["Famished", "I could eat a horse", "Peckish (mildly hungry)", "Dying of hunger"],
        spokenExample: "I skipped breakfast this morning and now I'm absolutely starving! Shall we grab a bite to eat?",
        context: "Everyday Casual & Dining"
      };
    }
    if (t.includes('very tired') || t === 'tired' || t.includes('so tired') || t.includes('exhausted')) {
      return {
        status: "Textbook / Stiff English",
        spokenVersion: "Exhausted / Beat / Worn out",
        explanation: "Native speakers replace repetitive 'very tired' with vivid spoken adjectives like 'exhausted' or lively casual idioms like 'dead on my feet' or 'beat'.",
        alternatives: ["Exhausted", "Beat", "Dead on my feet", "Worn out"],
        spokenExample: "After working a 10-hour shift at the hospital, I was completely exhausted and crashed immediately.",
        context: "Everyday Casual Conversation"
      };
    }
    if (t.includes('very happy') || t === 'happy' || t.includes('so happy')) {
      return {
        status: "Literal Textbook English",
        spokenVersion: "Thrilled / Over the moon",
        explanation: "In spoken English, expressing happiness is done with emotive idioms like 'thrilled' or 'over the moon' rather than flat qualifiers like 'very happy'.",
        alternatives: ["Thrilled", "Over the moon", "On cloud nine", "Stoked"],
        spokenExample: "She was absolutely thrilled when she received the job offer she had been hoping for!",
        context: "Celebration & Friendly Chat"
      };
    }
    if (t.includes('very cold') || t === 'cold' || t.includes('so cold')) {
      return {
        status: "Literal Textbook English",
        spokenVersion: "Freezing / Freezing cold",
        explanation: "Native speakers almost universally say 'it's freezing' rather than 'it is very cold' when chatting about weather.",
        alternatives: ["Freezing", "Bitterly cold", "Chilly", "Baltic"],
        spokenExample: "Grab your thick coat and scarf, it's absolutely freezing out there today!",
        context: "Everyday Weather Talk"
      };
    }
    if (t.includes('very hot') || t === 'hot' || t.includes('so hot')) {
      return {
        status: "Literal Textbook English",
        spokenVersion: "Boiling / Scorching",
        explanation: "Conversational English naturally prefers 'boiling' or 'scorching' over generic textbook 'very hot'.",
        alternatives: ["Boiling", "Scorching hot", "Roasting", "Sweltering"],
        spokenExample: "Could you please turn on the air conditioning? It's boiling hot in here.",
        context: "Daily Conversation"
      };
    }
    if (t.includes('wait') || t.includes('wait for me') || t.includes('wait a minute')) {
      return {
        status: "Formal / Stiff English",
        spokenVersion: "Hang on a sec / Hold on a second",
        explanation: "In conversational speech, 'please wait a minute' sounds overly stiff. Native speakers instinctively use phrasal verbs like 'hang on a sec' or 'hold on'.",
        alternatives: ["Hang on a sec", "Hold on", "Give me a sec", "Just a second"],
        spokenExample: "Hang on a sec! I forgot my wallet on the kitchen counter.",
        context: "Casual Interaction"
      };
    }
    if (t.includes('agree') || t.includes('i agree with you') || t.includes('i agree')) {
      return {
        status: "Formal / Textbook English",
        spokenVersion: "Totally! / 100% / You bet!",
        explanation: "'I agree with you' sounds like a formal debate. In everyday speech, natives show enthusiasm with 'Totally!', 'Spot on!', or '100%'.",
        alternatives: ["Totally!", "Spot on!", "Couldn't agree more", "You bet!"],
        spokenExample: "Person A: 'That restaurant has the best chips in town.' Person B: 'Totally! I go there every Friday.'",
        context: "Casual Social Chat"
      };
    }
    if (t.includes('understand') || t.includes('i understand') || t.includes('do you understand')) {
      return {
        status: "Formal Textbook English",
        spokenVersion: "Got it! / Makes sense / Roger that",
        explanation: "In spoken English, 'Got it!' or 'Makes sense' sounds friendly, quick, and natural compared to the formal 'I understand'.",
        alternatives: ["Got it!", "Makes total sense", "I hear you", "Crystal clear"],
        spokenExample: "Person A: 'We need to submit the draft by 4 PM.' Person B: 'Got it! I am wrapping it up right now.'",
        context: "Workplace & Daily Talk"
      };
    }
  }

  if (mode === 'british-spoken') {
    if (t.includes('apartment') || t.includes('apartments')) {
      return {
        britishVersion: "Flat",
        usOrNeutral: "Apartment",
        explanation: "In the UK, residential living spaces in a building are universally called 'flats'. The word 'apartment' is viewed in Britain as American or luxury marketing jargon.",
        britishSlangLevel: "Everyday British",
        britishExample: "I've just viewed a lovely two-bedroom flat right near Regent's Park in London.",
        relatedBritishTerms: ["Bedsit (studio flat)", "Block of flats", "Terraced house", "Council flat"]
      };
    }
    if (t.includes('fries') || t.includes('french fries')) {
      return {
        britishVersion: "Chips",
        usOrNeutral: "French Fries",
        explanation: "In Britain, thick-cut, deep-fried potatoes are called 'chips' (as in Fish & Chips). Potato chips in a bag are called 'crisps'!",
        britishSlangLevel: "Everyday British",
        britishExample: "Let's pop into the local chippy and get a hot bag of chips with vinegar and salt.",
        relatedBritishTerms: ["Chippy (fish & chip shop)", "Crisps (potato chips)", "Mushy peas", "Scraps"]
      };
    }
    if (t.includes('cookie') || t.includes('cookies')) {
      return {
        britishVersion: "Biscuit / Biscuits",
        usOrNeutral: "Cookie / Cookies",
        explanation: "In Britain, crisp baked snacks meant for dunking into a cup of tea are 'biscuits'. 'Cookie' is only used for soft, American-style chocolate chip cookies.",
        britishSlangLevel: "Everyday British",
        britishExample: "Fancy a cuppa and a couple of chocolate digestive biscuits?",
        relatedBritishTerms: ["Digestives", "Hobnobs", "Custard creams", "Dunking"]
      };
    }
    if (t.includes('elevator')) {
      return {
        britishVersion: "Lift",
        usOrNeutral: "Elevator",
        explanation: "British people always say 'the lift'. 'Elevator' is exclusively American English.",
        britishSlangLevel: "Everyday British",
        britishExample: "Take the lift up to the fourth floor; mind the closing doors!",
        relatedBritishTerms: ["Ground floor (not 1st floor)", "Stairwell", "Lobby"]
      };
    }
    if (t.includes('truck')) {
      return {
        britishVersion: "Lorry",
        usOrNeutral: "Truck",
        explanation: "In British English, large heavy freight vehicles on highways are called 'lorries'.",
        britishSlangLevel: "Everyday British",
        britishExample: "There's a massive lorry stuck on the roundabout near the motorway exit.",
        relatedBritishTerms: ["Articulated lorry", "Motorway", "Dual carriageway", "Van"]
      };
    }
    if (t.includes('umbrella')) {
      return {
        britishVersion: "Brolly",
        usOrNeutral: "Umbrella",
        explanation: "'Brolly' is the famous, beloved British slang term for an umbrella — an indispensable companion in British weather!",
        britishSlangLevel: "British Slang",
        britishExample: "Don't forget your brolly, mate; the sky looks like it's about to open up!",
        relatedBritishTerms: ["Mac (raincoat)", "Wellies (boots)", "Chucking it down", "Drizzle"]
      };
    }
    if (t.includes('bathroom') || t.includes('restroom') || t.includes('toilet')) {
      return {
        britishVersion: "The Loo (or Toilet)",
        usOrNeutral: "Restroom / Bathroom",
        explanation: "Brits rarely say 'restroom' (as no one goes there to rest). 'The loo' is casual, polite, and universally used in British homes and pubs.",
        britishSlangLevel: "Everyday British Slang",
        britishExample: "Excuse me, where's the loo, please? Down the hall on the right.",
        relatedBritishTerms: ["Lavatory", "Ladies and Gents", "W.C.", "Bog (very informal)"]
      };
    }
    if (t.includes('very tired') || t.includes('tired') || t.includes('exhausted')) {
      return {
        britishVersion: "Knackered / Shattered",
        usOrNeutral: "Exhausted / Beat",
        explanation: "'Knackered' is quintessential British slang describing total physical exhaustion after a hard day's graft.",
        britishSlangLevel: "British Slang",
        britishExample: "After walking ten miles through the Cotswolds, I am completely knackered!",
        relatedBritishTerms: ["Shattered", "Ready for a kip", "Dog-tired", "Whacked"]
      };
    }
    if (t.includes('very happy') || t.includes('happy') || t.includes('excited')) {
      return {
        britishVersion: "Chuffed / Chuffed to bits",
        usOrNeutral: "Thrilled / Very pleased",
        explanation: "'Chuffed' is iconic British slang meaning very pleased, proud, and genuinely delighted with something.",
        britishSlangLevel: "British Slang",
        britishExample: "I was absolutely chuffed to bits when my boss praised my presentation!",
        relatedBritishTerms: ["Over the moon", "Buzzing", "Proper happy", "Made up"]
      };
    }
    if (t.includes('tea') || t.includes('want some tea') || t.includes('want tea') || t.includes('cup of tea')) {
      return {
        britishVersion: "Fancy a cuppa?",
        usOrNeutral: "Would you like a cup of tea?",
        explanation: "'Fancy a cuppa?' is the ultimate British hospitality expression, asking if you'd like a hot cup of tea with milk.",
        britishSlangLevel: "Classic British Vernacular",
        britishExample: "Come in out of the rain, dry off, and fancy a proper cuppa?",
        relatedBritishTerms: ["Builder's tea", "Earl Grey", "Splash of milk", "Kettle on"]
      };
    }
    if (t.includes('rain') || t.includes('raining hard') || t.includes('heavy rain')) {
      return {
        britishVersion: "Chucking it down / Bucketing down",
        usOrNeutral: "Pouring rain / Raining hard",
        explanation: "British people have endless idioms for rain. 'Chucking it down' or 'bucketing down' are the most common spoken expressions.",
        britishSlangLevel: "British Idiom",
        britishExample: "Look outside the window, it's proper chucking it down out there!",
        relatedBritishTerms: ["Spitting (light drizzle)", "Soaking wet", "Miserable weather", "Brolly"]
      };
    }
    if (t.includes('no money') || t.includes('broke') || t.includes('poor')) {
      return {
        britishVersion: "Skint",
        usOrNeutral: "Broke / Having no money",
        explanation: "'Skint' is everyday British slang meaning completely broke, with zero pounds left in your pocket.",
        britishSlangLevel: "British Slang",
        britishExample: "I'd love to join you at the pub tonight, but I'm completely skint until payday.",
        relatedBritishTerms: ["Quid (pounds)", "Fiver (£5)", "Tenner (£10)", "Penniless"]
      };
    }
    if (t.includes('disappointed') || t.includes('sad')) {
      return {
        britishVersion: "Gutted",
        usOrNeutral: "Devastated / Deeply disappointed",
        explanation: "'Gutted' describes the sinking, painful feeling of bitter disappointment, like getting punched in the gut.",
        britishSlangLevel: "British Slang",
        britishExample: "We were absolutely gutted when England lost the penalty shootout in the finals.",
        relatedBritishTerms: ["Downcast", "Miffed", "Heartbroken", "Proper bummed"]
      };
    }
    if (t.includes('shocked') || t.includes('surprised') || t.includes('astonished')) {
      return {
        britishVersion: "Gobsmacked",
        usOrNeutral: "Astonished / Shocked",
        explanation: "'Gobsmacked' comes from 'gob' (slang for mouth) — so shocked you slap your hand over your open mouth!",
        britishSlangLevel: "British Slang",
        britishExample: "I was proper gobsmacked when they announced I had won first prize!",
        relatedBritishTerms: ["Flabbergasted", "Stunned", "Blown away", "Lost for words"]
      };
    }
  }

  return null;
}

/**
 * Call Gemini 1.5 Flash to process the AI Assistant prompts
 */
export async function askGeminiTutor(mode, text) {
  const offlineData = getOfflineSpokenResponse(mode, text);

  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    if (offlineData) {
      console.log(`[Offline AI] Serving built-in offline spoken response for: ${text}`);
      return offlineData;
    }
    throw new Error("Gemini API Key is not configured. Please add it in Settings to analyze any custom sentence, or try common phrases like 'very hungry', 'apartment', 'very tired', etc.");
  }

  // Next-Level Optimization: Local AI Response Caching (0ms response time for repeat queries)
  const cacheKey = `${mode}:${text.toLowerCase().trim()}`;
  try {
    const cachedData = localStorage.getItem('bev_ai_cache');
    if (cachedData) {
      const cacheObj = JSON.parse(cachedData);
      if (cacheObj[cacheKey]) {
        console.log(`[AI Cache] Serving cached response for: ${cacheKey}`);
        return cacheObj[cacheKey];
      }
    }
  } catch (e) {
    console.error("Cache read failed", e);
  }

  let prompt = '';
  let maxTokens = 1000;
  let responseSchema = null;
  
  if (mode === 'explore') {
    prompt = `Return JSON for British English "${text}": {"meaning":"simple definition","example":"natural British English sentence"}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        meaning: { type: "STRING" },
        example: { type: "STRING" }
      },
      required: ["meaning", "example"]
    };
  } else if (mode === 'grammar') {
    prompt = `Grammar check "${text}". Ignore minor capitalization/punctuation differences. Return JSON: {"status":"Correct" or "Incorrect","correction":"corrected sentence","explanation":"simple grammar rule explanation","meaning":"sentence meaning","example":"similar correct sentence"}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        status: { type: "STRING" },
        correction: { type: "STRING" },
        explanation: { type: "STRING" },
        meaning: { type: "STRING" },
        example: { type: "STRING" }
      },
      required: ["status", "correction", "explanation", "meaning", "example"]
    };
  } else if (mode === 'tutor') {
    maxTokens = 1500;
    prompt = `Friendly British English tutor. Answer: "${text}". Return JSON: {"response":"markdown text response","examples":[{"text":"example","context":"brief context"}]}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        response: { type: "STRING" },
        examples: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              text: { type: "STRING" },
              context: { type: "STRING" }
            },
            required: ["text", "context"]
          }
        }
      },
      required: ["response", "examples"]
    };
  } else if (mode === 'translate') {
    prompt = `Translate Hebrew "${text}" to natural British English. Return JSON: {"translation":"British English translation","meaning":"translation context","example":"example sentence using translation"}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        translation: { type: "STRING" },
        meaning: { type: "STRING" },
        example: { type: "STRING" }
      },
      required: ["translation", "meaning", "example"]
    };
  } else if (mode === 'english-spoken') {
    maxTokens = 1200;
    prompt = `Analyze the following English word or sentence for everyday SPOKEN English: "${text}".
Identify whether this input is natural, literal, or stiff/formal textbook English, and provide the phrasing that native speakers actually say in spoken everyday conversation (e.g. "very hungry" -> "starving", "very tired" -> "exhausted / beat", "I agree" -> "Totally! / 100%", "wait for me" -> "hang on a sec", "Do you understand?" -> "Makes sense?").
Return JSON:
{
  "status": "Natural Spoken English" or "Formal / Textbook English" or "Literal / Unnatural",
  "spokenVersion": "the natural spoken expression or sentence that native speakers actually say",
  "explanation": "clear explanation of why spoken English prefers this over textbook English, with usage tips",
  "alternatives": ["spoken alternative 1", "spoken alternative 2", "spoken alternative 3"],
  "spokenExample": "realistic spoken dialogue or conversational sentence demonstrating the expression",
  "context": "Everyday Casual / Friendly / Workplace"
}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        status: { type: "STRING" },
        spokenVersion: { type: "STRING" },
        explanation: { type: "STRING" },
        alternatives: { type: "ARRAY", items: { type: "STRING" } },
        spokenExample: { type: "STRING" },
        context: { type: "STRING" }
      },
      required: ["status", "spokenVersion", "explanation", "alternatives", "spokenExample", "context"]
    };
  } else if (mode === 'british-spoken') {
    maxTokens = 1200;
    prompt = `Transform the following word, phrase, or sentence into authentic BRITISH SPOKEN English (British vocabulary, UK slang, British idioms, and conversational phrasing): "${text}".
For example:
- "apartment" -> "flat"
- "fries" -> "chips"
- "cookies" -> "biscuits"
- "elevator" -> "lift"
- "truck" -> "lorry"
- "very hungry" -> "starving / peckish"
- "very tired" -> "knackered / shattered"
- "very happy" -> "chuffed / over the moon"
- "Do you want some tea?" -> "Fancy a cuppa?"
- "It is raining heavily" -> "It's chucking it down / bucketing down"
- "I don't have money" -> "I'm skint"
- "bathroom / restroom" -> "the loo"
Return JSON:
{
  "britishVersion": "the authentic British English spoken word or sentence",
  "usOrNeutral": "the American, neutral or textbook equivalent",
  "explanation": "cultural and linguistic explanation of this British term and how Brits use it in daily life",
  "britishSlangLevel": "Everyday British" or "British Slang" or "Classic British" or "Colloquial UK",
  "britishExample": "a lively authentic British spoken sentence or dialogue (using terms like cheers, mate, proper, cuppa, etc.)",
  "relatedBritishTerms": ["related British term 1", "related British term 2", "related British term 3"]
}`;
    responseSchema = {
      type: "OBJECT",
      properties: {
        britishVersion: { type: "STRING" },
        usOrNeutral: { type: "STRING" },
        explanation: { type: "STRING" },
        britishSlangLevel: { type: "STRING" },
        britishExample: { type: "STRING" },
        relatedBritishTerms: { type: "ARRAY", items: { type: "STRING" } }
      },
      required: ["britishVersion", "usOrNeutral", "explanation", "britishSlangLevel", "britishExample", "relatedBritishTerms"]
    };
  }

  // List of models to try. Prioritize gemini-3-flash-preview to prevent exceeding quota on unsupported models.
  const modelsToTry = [
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-3-flash-preview'
  ];

  // If we already successfully found a working model in this session, try it first
  const cachedModel = localStorage.getItem('bev_working_gemini_model');
  if (cachedModel) {
    const index = modelsToTry.indexOf(cachedModel);
    if (index > -1) {
      modelsToTry.splice(index, 1);
    }
    modelsToTry.unshift(cachedModel);
  }

  const errors = [];

  for (const model of modelsToTry) {
    try {
      console.log(`Attempting Gemini API request with model: ${model}`);
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: prompt }]
            }],
            systemInstruction: {
              parts: [{ text: "You are a British English language expert. You must ALWAYS respond with a raw JSON object matching the requested schema. Do NOT include any conversational text, introductions, or markdown code block formatting (like ```json). Respond with the raw JSON string only." }]
            },
            generationConfig: {
              responseMimeType: "application/json",
              responseSchema: responseSchema,
              temperature: 0.1,
              maxOutputTokens: maxTokens
            }
          })
        }
      );

      if (response.ok) {
        const result = await response.json();
        const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawText) {
          // Success! Save the working model name to localStorage for speed on next requests
          localStorage.setItem('bev_working_gemini_model', model);
          const parsedResult = extractJSON(rawText);
          
          // Save to Local AI cache
          try {
            const cachedData = localStorage.getItem('bev_ai_cache') || '{}';
            const cacheObj = JSON.parse(cachedData);
            cacheObj[cacheKey] = parsedResult;
            localStorage.setItem('bev_ai_cache', JSON.stringify(cacheObj));
          } catch (e) {
            console.error("Cache write failed", e);
          }
          
          return parsedResult;
        }
      } else {
        const errData = await response.json().catch(() => ({}));
        const errMsg = errData.error?.message || response.statusText;
        errors.push(`- ${model}: ${errMsg}`);
      }
    } catch (err) {
      errors.push(`- ${model}: ${err.message}`);
    }
  }

  if (offlineData) {
    console.warn("Falling back to built-in spoken response due to API connection issue");
    return offlineData;
  }

  throw new Error(`Failed to connect to Gemini. Details:\n${errors.join('\n')}`);
}
