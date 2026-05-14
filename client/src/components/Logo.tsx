export default function Logo({ size = 'md', className = '' }: { size?: 'sm' | 'md' | 'lg', className?: string }) {
  const sizes = {
    sm: { container: 'h-8', text: 'text-lg', icon: 'w-6 h-6' },
    md: { container: 'h-10', text: 'text-xl', icon: 'w-8 h-8' },
    lg: { container: 'h-14', text: 'text-3xl', icon: 'w-10 h-10' },
  }

  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon Mark */}
      <div className={`${s.icon} relative flex-shrink-0`}>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg rotate-45 transform-gpu" />
        <div className="absolute inset-[2px] bg-slate-900 rounded-md rotate-45" />
        <span className="absolute inset-0 flex items-center justify-center text-white font-black text-[10px] leading-none">
          SMT
        </span>
      </div>

      {/* Text */}
      <div className={`${s.text} font-black tracking-tight leading-none`}>
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          STAR
        </span>{' '}
        <span className="text-white">MEDIA</span>{' '}
        <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
          TECH
        </span>
      </div>
    </div>
  )
}