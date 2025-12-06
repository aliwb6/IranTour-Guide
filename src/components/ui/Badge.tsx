import React from 'react'

interface BadgeProps {
  children: React.ReactNode
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ children, className = '' }) => {
  return <span className={`kashi-badge ${className}`}>{children}</span>
}
