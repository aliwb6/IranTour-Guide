import React from 'react'

interface TagProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

export const Tag: React.FC<TagProps> = ({ children, onClick, className = '' }) => {
  return (
    <button onClick={onClick} className={`deep-tag ${className}`} type="button">
      {children}
    </button>
  )
}
