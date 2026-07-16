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
  
  if (mode === 'explore') {
    prompt = `You are a British English language expert.
Analyze the word or phrase: "${text}".
Provide:
1. A brief and simple definition in English.
2. A natural example sentence using this word in a British English style/context.

Return a JSON object with this exact structure:
{
  "meaning": "...",
  "example": "..."
}`;
  } else if (mode === 'grammar') {
    prompt = `You are a British English grammar checker.
Analyze this sentence: "${text}".
Important: Ignore minor punctuation (periods, commas, quotation marks) and capitalization differences when determining correctness. If the sentence is grammatically correct and the only issues are capitalization or missing basic punctuation, you MUST mark it as "Correct".

Provide:
1. Status ("Correct" or "Incorrect").
2. Correction: the corrected sentence.
3. Explanation: a simple explanation of the grammar rule/mistake.
4. Meaning: simple explanation of what the sentence means.
5. Example: another example sentence demonstrating the corrected grammar rule.

Return a JSON object with this exact structure:
{
  "status": "Correct" or "Incorrect",
  "correction": "...",
  "explanation": "...",
  "meaning": "...",
  "example": "..."
}`;
  } else if (mode === 'tutor') {
    prompt = `You are a friendly British English tutor.
Answer this question: "${text}".
Provide:
1. A structured response (markdown supported).
2. Up to 3 natural example sentences demonstrating the response, along with brief context descriptions.

Return a JSON object with this exact structure:
{
  "response": "...",
  "examples": [
    {
      "text": "...",
      "context": "..."
    }
  ]
}`;
  } else if (mode === 'translate') {
    prompt = `You are a translator converting Hebrew text to natural, idiomatic British English.
Translate this Hebrew text: "${text}".
Provide:
1. Translation: the best British English translation.
2. Meaning: explain why this translation was chosen and what it means (in English).
3. Example: a natural example sentence using the translated phrase.

Return a JSON object with this exact structure:
{
  "translation": "...",
  "meaning": "...",
  "example": "..."
}`;
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
              responseMimeType: "application/json"
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
