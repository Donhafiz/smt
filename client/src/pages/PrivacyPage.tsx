// client/src/pages/PrivacyPage.tsx
export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-28 px-6 max-w-4xl mx-auto pb-20 prose prose-invert">
      <h1 className="text-4xl font-black">Privacy Policy</h1>
      <p className="text-gray-400 mt-4">Last updated: {new Date().getFullYear()}</p>
      <p>We value your privacy. We do not sell or share your personal data with third parties.</p>
      <p>For questions, contact starmedia568@gmail.com.</p>
    </div>
  )
}

// Create similarly for TermsPage, CookiesPage, RefundsPage