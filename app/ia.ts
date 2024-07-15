
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
    prompt:
      "Quiero que me generes un codigo de html aleatorio de lo que tu quieras, solo esribre el codigo html y nada mas solo CODIGO (ademas quiero que esribas solo la etiqueta style y luego solo el contenido que iria en la etiqueta body y no quiero que pongas las ``` al principio y al final del codigo) y recuerda que en la respuesta tiene que estar solo el codigo html",
  });
  console.log(text);
  return text;
}
