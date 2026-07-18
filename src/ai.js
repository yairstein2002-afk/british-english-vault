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

function extractJSON(text) {
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

/**
 * Call Gemini 1.5 Flash to process the AI Assistant prompts
 */
export async function askGeminiTutor(mode, text) {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured. Please add it in Settings first.");
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
  }

  // List of models to try. Prioritize gemini-3-flash-preview to prevent exceeding quota on unsupported models.
  const modelsToTry = [
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

  throw new Error(`Failed to connect to Gemini. Details:\n${errors.join('\n')}`);
}
