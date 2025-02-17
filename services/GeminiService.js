const GEMINI_API_KEY = "AIzaSyDQvFyemLg1lcL7z3xBTUhjaW5iUq2WN2c";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export const getDefinitionFromGemini = async (prompt) => {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": GEMINI_API_KEY, // Use the API key for authentication
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Full API Response:", data); // Log the full response

    if (data.candidates && data.candidates.length > 0) {
      const text = data.candidates[0]?.content?.parts[0]?.text;
      return text; // Return the AI's response
    } else {
      throw new Error("No response from Jutsie");
    }
  } catch (error) {
    console.error("From service: Error calling Gemini API:", error);
    return "Sorry, Something went wrong with my Data.";
  }
};
