import OpenAI from 'openai'

let client

const getClient = () => {
  if (!client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY missing')
    }

    client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    })
  }

  return client
}

export const generateAIResponse = async (prompt) => {
  try {
    const openai = getClient()

    const res = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })

    return res.choices[0].message.content

  } catch (err) {
    console.error('AI ERROR:', err)
    return 'AI service unavailable'
  }
}