'use client'

import React, { useState, useLayoutEffect } from 'react'

interface RippleProps {
  duration?: number
  color?: string
}

export const Ripple: React.FC<RippleProps> = ({
  duration = 500,
  color = 'rgba(255, 255, 255, 0.7)'
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; size: number }>>([])

  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setRipples([])
    }, duration)

    return () => clearTimeout(timer)
  }, [ripples, duration])

  const addRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect()
    const size = rippleContainer.width > rippleContainer.height ? rippleContainer.width : rippleContainer.height
    const x = event.clientX - rippleContainer.x - size / 2
    const y = event.clientY - rippleContainer.y - size / 2
    const newRipple = { x, y, size }

    setRipples([...ripples, newRipple])
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ borderRadius: 'inherit' }}
      onClick={addRipple}
    >
      {ripples.map((ripple, index) => (
        <span
          key={index}
          style={{
            position: 'absolute',
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: color,
            transform: 'scale(0)',
            animation: `ripple ${duration}ms linear`,
          }}
        />
      ))}
    </div>
  )
}