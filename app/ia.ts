
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function ia(api: string) {
  console.log(localStorage.getItem("apigroq"));
  console.log(process.env.NEXT_PUBLIC_GROQ_API_KEY);
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: `${api}`,
  });

  const { text } = await generateText({
    model: groq("llama3-70b-8192"),
    prompt: `${localStorage.getItem("prompt")}` });
  console.log(text);
  return text;
}
