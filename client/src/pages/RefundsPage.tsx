export default function RefundsPage() {
  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20">
      <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        Refund Policy
      </h1>
      <p className="text-gray-400 mb-8">Last updated: {new Date().getFullYear()}</p>

      <div className="space-y-6 text-gray-300 leading-relaxed">
        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Eligibility for Refunds</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Products:</strong> Unopened items may be returned within 7 days of purchase.</li>
            <li><strong>Courses:</strong> Full refund if canceled at least 48 hours before the course starts.</li>
            <li><strong>Services:</strong> Refunds are evaluated on a case-by-case basis.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Non-Refundable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Digital products after download</li>
            <li>Custom software after delivery</li>
            <li>Opened physical products</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">How to Request a Refund</h2>
          <p>Contact us at <a href="mailto:starmedia568@gmail.com" className="text-cyan-400">starmedia568@gmail.com</a> or call <a href="tel:+233559137611" className="text-cyan-400">+233 559 137 611</a> with your order details.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-white mb-3">Processing Time</h2>
          <p>Refunds are processed within 5-10 business days after approval.</p>
        </section>
      </div>
    </div>
  )
}