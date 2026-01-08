
import { GoogleGenAI } from "@google/genai";

// Always initialize GoogleGenAI with a named parameter using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAiraResponse = async (userMessage: string, history: { role: string; parts: string }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.parts }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: `You are Aira, a compassionate, first-line emotional support chatbot for students (ages up to 25) on the SafeSpace app. 
        Your goal is to provide calming, grounding, and reassuring support. 
        If you detect signs of high-risk behavior, self-harm, or severe distress, you MUST gently recommend seeing a professional counsellor from our app.
        Keep responses concise, empathetic, and professional. 
        Do not replace clinical therapy. 
        If the user is in severe distress, add [URGENT_RECOMMENDATION] at the end of your response.`,
        temperature: 0.7,
      },
    });
    // Use .text property to get the generated text
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please know that I'm here for you. If you're in immediate danger, please contact a crisis helpline.";
  }
};

export const getArticleSummary = async (articleTitle: string, context: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a very short (2-sentence) summary for an article titled "${articleTitle}" with this context: "${context}".`,
    });
    // Use .text property to get the generated text
    return response.text;
  } catch (error) {
    return context;
  }
};
