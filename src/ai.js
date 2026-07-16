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

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    const errMsg = errData.error?.message || response.statusText;
    throw new Error(`Gemini API Error: ${errMsg}`);
  }

  const result = await response.json();
  const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    throw new Error("No response received from Gemini.");
  }

  return JSON.parse(rawText.trim());
}
