interface PersianButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export function PersianButton({
  children,
  onClick,
  type = 'button',
  className = '',
}: PersianButtonProps) {
  return (
    <button type={type} onClick={onClick} className={`deep-persian-btn ${className}`}>
      {children}
    </button>
  )
}
