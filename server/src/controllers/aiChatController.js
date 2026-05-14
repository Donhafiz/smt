export const chat = async (req, res) => {
  try {
    const { messages } = req.body
    
    const lastUserMessage = messages
      .filter(m => m.role === 'user')
      .pop()?.content?.toLowerCase() || ''

    console.log('Chat:', lastUserMessage)

    // Check for OpenAI
    const hasApiKey = process.env.OPENAI_API_KEY && 
                      process.env.OPENAI_API_KEY.length > 20 &&
                      process.env.OPENAI_API_KEY.startsWith('sk-')

    if (hasApiKey) {
      try {
        const { default: OpenAI } = await import('openai')
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
        const systemPrompt = {
          role: 'system',
          content: `You are SMT AI Assistant for Star Media Tech in Tamale, Ghana. Services: Software, Training, Consultancy, Commerce, AI. Contact: +233 559 137 611. Be friendly and helpful.`
        }
        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [systemPrompt, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        })
        return res.json({ reply: completion.choices[0].message.content })
      } catch (aiErr) {
        console.error('OpenAI fallback:', aiErr.message)
      }
    }

    // Fallback — check most specific keywords FIRST
    let reply = "I'm here to help! Ask me about our services, courses, products, or contact info."

    // Price/Cost
    if (lastUserMessage.includes('cost') || lastUserMessage.includes('price') || lastUserMessage.includes('fee') || lastUserMessage.includes('how much')) {
      reply = "💰 Our pricing:\n\n• IT Courses: From GHS 500\n• Website Development: From GHS 2,000\n• Mobile Apps: From GHS 5,000\n• Consultancy: Custom quotes\n\n📞 Call +233 559 137 611 for details!"
    }
    // Contact
    else if (lastUserMessage.includes('contact') || lastUserMessage.includes('phone') || lastUserMessage.includes('email') || lastUserMessage.includes('reach') || lastUserMessage.includes('location') || lastUserMessage.includes('address')) {
      reply = "📞 Contact us:\n\n• Phone: +233 559 137 611\n• Email: starmedia568@gmail.com\n• Location: Tamale, Ghana\n• Hours: Mon-Fri, 8AM-6PM"
    }
    // Software/Website/App
    else if (lastUserMessage.includes('software') || lastUserMessage.includes('website') || lastUserMessage.includes('app') || lastUserMessage.includes('develop') || lastUserMessage.includes('build') || lastUserMessage.includes('system')) {
      reply = "💻 Our software development services:\n\n• Business Websites\n• Mobile Apps (iOS & Android)\n• Enterprise Systems\n• E-commerce Platforms\n• Custom Software\n\n📞 Contact us to discuss your project!"
    }
    // AI
    else if (lastUserMessage.includes('ai') || lastUserMessage.includes('artificial') || lastUserMessage.includes('automation') || lastUserMessage.includes('machine learning')) {
      reply = "🤖 Our AI Solutions:\n\n• Custom AI Integration\n• Chatbot Development\n• Process Automation\n• AI Consulting\n• Machine Learning Models\n\nLet us help you leverage AI!"
    }
    // Shop/Products
    else if (lastUserMessage.includes('shop') || lastUserMessage.includes('buy') || lastUserMessage.includes('product') || lastUserMessage.includes('laptop') || lastUserMessage.includes('phone') || lastUserMessage.includes('device')) {
      reply = "🛒 Our Commerce Market offers:\n\n• Laptops (MacBook, Dell, HP)\n• Smartphones (iPhone, Samsung)\n• Accessories & Gadgets\n• Networking Equipment\n\nBrowse our shop or contact us!"
    }
    // Consultancy
    else if (lastUserMessage.includes('consult') || lastUserMessage.includes('advice') || lastUserMessage.includes('audit') || lastUserMessage.includes('cloud') || lastUserMessage.includes('network')) {
      reply = "🔧 Our IT Consultancy:\n\n• Business IT Setup\n• Cloud Solutions\n• Security Audits\n• Digital Transformation\n\n📞 Schedule a consultation: +233 559 137 611"
    }
    // Courses/Training
    else if (lastUserMessage.includes('course') || lastUserMessage.includes('training') || lastUserMessage.includes('learn') || lastUserMessage.includes('class') || lastUserMessage.includes('teach') || lastUserMessage.includes('study')) {
      reply = "🎓 IT Training Courses:\n\n• Web Development (HTML, CSS, JS, React)\n• Mobile Apps (Flutter, React Native)\n• Cybersecurity & Hacking\n• Data Analysis\n• AI Fundamentals\n• Networking\n• Graphic Design\n\n✅ Includes: Projects, Mentorship, Certificate\n📞 Enroll: +233 559 137 611"
    }
    // Greeting
    else if (lastUserMessage.includes('hello') || lastUserMessage.includes('hi') || lastUserMessage.includes('hey') || lastUserMessage.includes('ok') || lastUserMessage.includes('thanks') || lastUserMessage.includes('thank')) {
      reply = "Hello! 👋 How can I help you today?\n\n• IT Training Courses\n• Software Development\n• Consultancy Services\n• Products & Shopping\n• AI Solutions\n\nJust ask!"
    }

    res.json({ reply })

  } catch (err) {
    console.error('Chat Error:', err)
    res.json({ reply: "I'm having trouble. Contact us at +233 559 137 611 or starmedia568@gmail.com." })
  }
}