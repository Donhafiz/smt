interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: { logo: 'h-9 w-12', text: 'text-[10px]', gap: 'gap-1.5' },
    md: { logo: 'h-11 w-[58px]', text: 'text-[11px]', gap: 'gap-2' },
    lg: { logo: 'h-14 w-[72px]', text: 'text-xs', gap: 'gap-2.5' },
  }

  const s = sizes[size]

  return (
    <div className={`flex flex-col items-center ${s.gap} ${className}`}>
      {/* Rounded Logo */}
      <div className={`${s.logo} relative rounded-2xl overflow-hidden shadow-lg shadow-cyan-500/20`}>
        <img 
          src="/smt-logo.svg" 
          alt="Star Media Tech" 
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      
      {/* Site Name Below */}
      <span className={`${s.text} font-semibold tracking-wide text-gray-300 whitespace-nowrap`}>
      Star Media Technology
      </span>
    </div>
  )
}