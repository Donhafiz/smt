export default function CookiesPage() {
  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Cookie Policy
      </h1>
      <p className="text-gray-400 mb-8">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">What Are Cookies?</h2>
          <p>Cookies are small text files stored on your device when you visit a website. They help us improve your browsing experience.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">How We Use Cookies</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Essential Cookies:</strong> Required for the website to function (authentication, security).</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site.</li>
            <li><strong>Preference Cookies:</strong> Remember your settings and preferences.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Managing Cookies</h2>
          <p>You can disable cookies in your browser settings. However, some features may not function properly without cookies.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Contact</h2>
          <p>Questions? Email <a href="mailto:starmedia568@gmail.com" className="text-cyan-400">starmedia568@gmail.com</a>.</p>
        </section>
      </div>
    </div>
  )
}