interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizes = {
    sm: { container: 'h-8', width: 100 },
    md: { container: 'h-10', width: 125 },
    lg: { container: 'h-14', width: 175 },
  }

  const s = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${s.container} aspect-[5/2] relative flex-shrink-0`}>
        <img 
          src="/smt-logo.svg" 
          alt="Star Media Tech" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}