import OpenAI from "openai";

const client = new OpenAI({
  timeout: 5 * 60 * 1000, // 5 minutes
  baseURL: "https://semestra.openai.azure.com/openai/v1",
  apiKey: process.env.AZURE_OPENAI_KEY ?? "",
});

const DEPLOYMENT = "gpt-4.1-mini";

export async function generateAdvisorSection(
  systemPrompt: string,
  userPrompt: string,
  maxTokens = 600,
) {
  const completion = await client.chat.completions.create({
    model: DEPLOYMENT,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    max_tokens: maxTokens,
  });

  return completion.choices[0].message.content ?? "";
}
