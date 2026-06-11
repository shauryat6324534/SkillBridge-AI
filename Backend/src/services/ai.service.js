const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey :process.env.GOOGLE_GENAI_API_KEY
})

async function invokeGeminiAI(){
    const response = await ai.models.generateContent({
        model:"gemini-2.5-flash",
        contents:"Hello, how are you?"
    })
console.log(response.text)
}

module.exports={invokeGeminiAI};