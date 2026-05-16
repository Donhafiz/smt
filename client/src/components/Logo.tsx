interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
}

export default function Logo({ size = 'md', className = '', showText = false }: LogoProps) {
  const sizes = {
    sm: { container: 'h-20 w-20' },
    md: { container: 'h-32 w-32' },
    lg: { container: 'h-44 w-44' },
    xl: { container: 'h-56 w-56' },
  }

  const s = sizes[size]

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`${s.container} relative flex-shrink-0`}>
        <img 
          src="/smt-logo.png" 
          alt="Star Media Tech" 
          className="w-full h-full object-contain"
        />
      </div>
      {showText && (
        <span className="text-xs font-semibold tracking-wide text-gray-300 whitespace-nowrap">
          Star Media Tech
        </span>
      )}
    </div>
  )
}