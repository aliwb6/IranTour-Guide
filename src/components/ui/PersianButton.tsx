import React from 'react'

interface PersianButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const PersianButton: React.FC<PersianButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`deep-persian-btn ${className}`}
    >
      {children}
    </button>
  )
}
