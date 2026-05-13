export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-20 py-10 text-center text-sm text-gray-400">

      <h3 className="text-cyan-400 text-lg font-semibold">
        STAR MEDIA TECH (SMT)
      </h3>

      <p className="mt-2">
        Tamale, Ghana | +233 559 137 611 | +233 505 957 381
      </p>

      <p className="mt-1">
        starmedia568@gmail.com
      </p>

      <p className="mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} SMT. All rights reserved.
      </p>

    </footer>
  )
}