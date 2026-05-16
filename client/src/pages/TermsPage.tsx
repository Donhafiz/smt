import { useTranslation } from 'react-i18next'

export default function TermsPage() {
  const { t } = useTranslation()
  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Terms of Service
      </h1>
      <p className="text-gray-400 mb-8">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p>By accessing or using Star Media Tech services, you agree to be bound by these Terms of Service.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">2. Services</h2>
          <p>Star Media Tech provides software development, IT training, consultancy, and commerce services. All services are subject to availability and may be modified at our discretion.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">3. Payments</h2>
          <p>All payments are processed securely through our payment partners. Prices are subject to change without notice. Refunds are governed by our Refund Policy.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">4. Intellectual Property</h2>
          <p>All content, logos, and materials on this website are the property of Star Media Tech unless otherwise stated.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">5. Limitation of Liability</h2>
          <p>Star Media Tech shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">6. Contact</h2>
          <p>For questions about these Terms, contact us at <a href="mailto:starmedia568@gmail.com" className="text-cyan-400">starmedia568@gmail.com</a> or call <a href="tel:+233559137611" className="text-cyan-400">+233 559 137 611</a>.</p>
        </section>
      </div>
    </div>
  )
}


