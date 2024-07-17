// @ts-nocheck

import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getEditorInstance } from "./page";

export async function ia(api: string) { 
  let context
  if (localStorage.getItem("context") === false){
    context = ""
  }else{
    const editor = getEditorInstance()
    context = editor?.getHtml()
  }
  const groq = createOpenAI({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: `${api}`,
  });

  const { text } = await generateText({
    model: groq("llama3-70b-8192"),
    prompt: `${localStorage.getItem("prompt")}
    ${context}
    ` });
  console.log(text);
  return text;
}
