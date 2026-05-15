export const chat = async (req, res) => {
  try {
    const { messages } = req.body
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || ''

    // Check for valid OpenAI key
    const hasApiKey = process.env.OPENAI_API_KEY && 
                      process.env.OPENAI_API_KEY.length > 20 &&
                      process.env.OPENAI_API_KEY.startsWith('sk-')

    if (hasApiKey) {
      try {
        const { default: OpenAI } = await import('openai')
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

        const systemPrompt = {
          role: 'system',
          content: `You are SMT AI Assistant for Star Media Tech in Tamale, Ghana.
          Services: Software Development, IT Training (courses from GHS 500), Consultancy, Commerce Market, AI Solutions.
          Contact: +233 559 137 611, starmedia568@gmail.com.
          Website: StarMediaTech.com
          Be friendly, professional, and helpful. Keep responses concise but informative.
          If asked about pricing, mention our courses start from GHS 500, websites from GHS 2,000.
          Always encourage users to contact us for personalized quotes.`
        }

        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [systemPrompt, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        })

        return res.json({ reply: completion.choices[0].message.content })
      } catch (aiErr) {
        console.error('OpenAI error, using fallback:', aiErr.message)
      }
    }

    // Smart fallback responses
    let reply = "I'm here to help! Ask me about our services, courses, products, or contact info."

    if (lastUserMessage.includes('course') || lastUserMessage.includes('training')) {
      reply = "🎓 We offer IT courses: Web Dev, Mobile Apps, Cybersecurity, Data Science, AI, Networking, Graphic Design. Starting from GHS 500. Contact +233 559 137 611 to enroll!"
    } else if (lastUserMessage.includes('price') || lastUserMessage.includes('cost')) {
      reply = "💰 Courses from GHS 500 | Websites from GHS 2,000 | Mobile Apps from GHS 5,000. Contact us for custom quotes!"
    } else if (lastUserMessage.includes('contact') || lastUserMessage.includes('phone')) {
      reply = "📞 +233 559 137 611 | 📧 starmedia568@gmail.com | 📍 Tamale, Ghana"
    } else if (lastUserMessage.includes('software') || lastUserMessage.includes('website')) {
      reply = "💻 We build websites, mobile apps, enterprise systems, and custom software. Contact us to discuss your project!"
    } else if (lastUserMessage.includes('shop') || lastUserMessage.includes('product') || lastUserMessage.includes('buy')) {
      reply = "🛒 Visit our shop for laptops, phones, accessories! We have MacBooks, iPhones, Samsung devices and more."
    } else if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi')) {
      reply = "Hello! 👋 Welcome to Star Media Tech. How can I help you today?"
    }

    res.json({ reply })
  } catch (err) {
    res.json({ reply: "I'm having trouble. Contact us at +233 559 137 611." })
  }
}