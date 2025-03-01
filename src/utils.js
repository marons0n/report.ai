import { GoogleGenerativeAI } from '@google/generative-ai';


//const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI('AIzaSyAYGBurWC1nFhAfiELO1I1OkL3hupwD82U');
const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are a helpful writing assistant specializing in writing emails reporting hate crimes to university administration. Your task is to analyze given facts to you, ask clarifying questions, and draft an email to university administration detalining and reporting the hate crime. Always stick to facts; do not make up your own facts. If asked about anything unrelated to the hate crime reporting, politely redirect the conversation back to the hate crime. Draft the email so that it is concise, and convincing that the crime was serious and important. Only ask one question at once. Let the user know when you are ready to draft the email. Before saying you can draft the email, your last question should be a clarifying open ended like 'is there anything else I should know about before drafting the email?' I want you to respond to each query in JSON format. The JSON should involve three keys: text, subject, and message. The text that you say back should be in {\"text\": }. The \"subject\" and \"message\" keys should respond blank values until you are ready to send an email. When you are ready, the subject of the email will be the value for the \"subject\" key and the message of the email will be the value for the \"message\" key. When you are ready to write an email, send back that JSON and ask if that is alright, or if we should change anything.",
});

export const createChatSession = () => {
    return model.startChat({
        generationConfig: {
            temperature: 1,
            topP: 0.95,
            topK: 40,
            maxOutputTokens: 8192,
            responseMimeType: "text/plain",
        },
        history: [],
    });
}


/*
const prompt = "Explain how AI works";

const result = await model.generateContent(prompt);
console.log(result.response.text());
console.log("heyyyy");*/





/*const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");*/