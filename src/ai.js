/**
 * British English Vault - Gemini AI Assistant Service
 */

const GEMINI_API_KEY_STORAGE = 'bev_gemini_api_key';

/**
 * Get Gemini API Key from Local Storage
 */
export function getGeminiApiKey() {
  return localStorage.getItem(GEMINI_API_KEY_STORAGE) || '';
}

/**
 * Save Gemini API Key to Local Storage
 */
export function saveGeminiApiKey(key) {
  localStorage.setItem(GEMINI_API_KEY_STORAGE, key.trim());
}

/**
 * Call Gemini 1.5 Flash to process the AI Assistant prompts
 */
export async function askGeminiTutor(mode, text) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please add it in Settings first.");
  }

  let prompt = '';
  let maxTokens = 250;
  
  if (mode === 'explore') {
    prompt = `Return JSON for British English "${text}": {"meaning":"simple definition","example":"natural British English sentence"}`;
  } else if (mode === 'grammar') {
    prompt = `Grammar check "${text}". Ignore minor capitalization/punctuation differences. Return JSON: {"status":"Correct" or "Incorrect","correction":"corrected sentence","explanation":"simple grammar rule explanation","meaning":"sentence meaning","example":"similar correct sentence"}`;
  } else if (mode === 'tutor') {
    maxTokens = 600;
    prompt = `Friendly British English tutor. Answer: "${text}". Return JSON: {"response":"markdown text response","examples":[{"text":"example","context":"brief context"}]}`;
  } else if (mode === 'translate') {
    prompt = `Translate Hebrew "${text}" to natural British English. Return JSON: {"translation":"British English translation","meaning":"translation context","example":"example sentence using translation"}`;
  }

  // List of models to try. Prioritize gemini-3-flash-preview to prevent exceeding quota on unsupported models.
  const modelsToTry = [
    'gemini-3-flash-preview',
    'gemini-1.5-flash',
    'gemini-2.0-flash',
    'gemini-3.0-flash',
    'gemini-3.5-flash',
    'gemini-1.5-flash-latest'
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
            generationConfig: {
              responseMimeType: "application/json",
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
          return JSON.parse(rawText.trim());
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

  throw new Error(`Failed to connect to Gemini. Details:\n${errors.join('\n')}`);
}
