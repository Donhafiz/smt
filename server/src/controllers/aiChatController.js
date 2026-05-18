export const chat = async (req, res) => {
  try {
    const { messages } = req.body
    const lastMessage = messages.filter(m => m.role === 'user').pop()?.content?.toLowerCase() || ''

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
          Services: Software Development, IT Training, Consultancy, Commerce Market, AI Solutions.
          Contact: +233 559 137 611, starmedia568@gmail.com.
          Website: smt-tech.vercel.app
          Be friendly, professional, and helpful. Keep responses concise.`
        }

        const completion = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [systemPrompt, ...messages],
          max_tokens: 500,
          temperature: 0.7,
        })

        return res.json({ reply: completion.choices[0].message.content })
      } catch (aiErr) {
        console.error('OpenAI error:', aiErr.message)
      }
    }

    // ========================
    // SMART FALLBACK RESPONSES
    // ========================
    let reply = "I'm here to help! Ask me about our services, courses, products, or contact info.\n\nTry: \"What courses do you offer?\" or \"How can I hire your tech team?\""

    // Check multiple keywords in the last message
    const msg = lastMessage

    // Contact
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email') || msg.includes('location') || msg.includes('address')) {
      reply = "📞 **Contact Star Media Tech**\n\n• Phone: +233 559 137 611\n• Email: starmedia568@gmail.com\n• Location: Tamale, Ghana\n• Hours: Mon-Fri 8AM-6PM"
    }
    // Hire / Consultancy / Tech Team
    else if (msg.includes('hire') || msg.includes('consult') || msg.includes('tech team') || msg.includes('fix my') || msg.includes('help me')) {
      reply = "🔧 **Hire Our Tech Team**\n\nWe offer:\n• Software Development\n• Cybersecurity Audits\n• Cloud Solutions\n• IT Infrastructure\n• AI Integration\n\n📞 Contact us: +233 559 137 611\n📧 starmedia568@gmail.com"
    }
    // AI Solutions
    else if (msg.includes('ai') || msg.includes('artificial intelligence') || msg.includes('automation') || msg.includes('machine learning')) {
      reply = "🤖 **AI Solutions**\n\n• Custom AI Integration\n• Chatbot Development\n• Process Automation\n• AI Consulting\n• Machine Learning Models\n\nLet us help you leverage AI for your business!\n📞 +233 559 137 611"
    }
    // Courses / Training
    else if (msg.includes('course') || msg.includes('training') || msg.includes('learn') || msg.includes('class') || msg.includes('study')) {
      reply = "🎓 **IT Training Courses**\n\n• Web Development\n• Mobile Apps\n• Cybersecurity\n• Data Science & AI\n• Networking\n• Graphic Design & UI/UX\n\n✅ Includes: Projects, Mentorship, Certificate\n💰 From GHS 500\n📞 Enroll: +233 559 137 611"
    }
    // Graphic Design (specific check after courses)
    else if (msg.includes('graphic') || msg.includes('design') || msg.includes('ui') || msg.includes('ux')) {
      reply = "🎨 **Graphic Design & UI/UX Course**\n\nLearn:\n• Adobe Photoshop & Illustrator\n• Figma & UI Design\n• Brand Identity Design\n• Print & Digital Media\n\n💰 GHS 1,500 | 8 Weeks\n📞 Enroll: +233 559 137 611"
    }
    // Price / Cost
    else if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('fee') || msg.includes('pricing')) {
      reply = "💰 **Our Pricing**\n\n• IT Courses: From GHS 500\n• Websites: From GHS 2,000\n• Mobile Apps: From GHS 5,000\n• Consultancy: Custom quotes\n\n📞 +233 559 137 611 for details"
    }
    // Software / Website / App
    else if (msg.includes('software') || msg.includes('website') || msg.includes('app') || msg.includes('develop') || msg.includes('build')) {
      reply = "💻 **Software Development**\n\n• Business Websites\n• Mobile Apps (iOS & Android)\n• Enterprise Systems\n• E-commerce Platforms\n\n📞 Contact us: +233 559 137 611"
    }
    // Shop / Product
    else if (msg.includes('shop') || msg.includes('product') || msg.includes('buy') || msg.includes('laptop') || msg.includes('phone') || msg.includes('device')) {
      reply = "🛒 **Commerce Market**\n\nVisit our shop for laptops, phones, accessories & gadgets!\n\n🌐 smt-tech.vercel.app/shop"
    }
    // Hello / Hi
    else if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') || msg.includes('ok') || msg.includes('thanks')) {
      reply = "Hello! 👋 How can I help you today?\n\n• 💻 Software Development\n• 🎓 IT Training\n• 🔧 Hire Tech Team\n• 🛒 Products\n• 🤖 AI Solutions"
    }

    res.json({ reply })
  } catch (err) {
    console.error('Chat Error:', err)
    res.json({ reply: "I'm having trouble. Contact us at +233 559 137 611 or starmedia568@gmail.com." })
  }
}