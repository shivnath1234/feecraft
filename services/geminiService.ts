import { GoogleGenAI } from "@google/genai";
import { Product, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getShoeRecommendations = async (history: Message[], userInput: string, currentProducts: Product[]) => {
  const modelName = "gemini-3-flash-preview";
  
  const systemInstruction = `
    You are "Dikhava Assistant", a professional fashion consultant for Dikhava, a luxurious shop established since 2022 in North Dumdum, Kolkata.
    
    Address: Dikhava, School Rd Vivekanand Pally, Durga Nagar, North Dumdum Kolkata, West Bengal 700065
    Phone: +918902810144
    
    Our specific categories include:
    - Sneakers
    - Crocs and slippers
    - Shirts
    - T-shirts
    - Pants and Track Pants
    - Sweat Shirts
    - All Type Jackets
    - Premium Sets
    - Essential (Everyday wear)
    
    Your goal is to help users find the best trendy clothing and footwear from our catalog.
    
    Our CURRENT Dynamic Inventory:
    ${JSON.stringify(currentProducts.map(p => ({ id: p.id, name: p.name, brand: p.brand, category: p.category, price: p.price, description: p.description })))}
    
    Tone: Sophisticated, helpful, and knowledgeable about local Kolkata street style and high-end trends.
    
    Rules:
    1. Recommend specific items from our CURRENT dynamic inventory list provided above.
    2. If a user asks for something we don't have, politely mention our categories and offer to help them find the closest match.
    3. Always mention the premium quality of Dikhava.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: userInput }] }
      ],
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "I'm sorry, I couldn't process that. How can I help you find the best trends at Dikhava today?";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having a small glitch. Visit us at North Dumdum or try asking again!";
  }
};