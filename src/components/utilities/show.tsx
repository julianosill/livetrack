import type React from 'react'

interface ShowProps {
  when: boolean
  render: React.ReactNode
  fallback: React.ReactNode
}

export function Show({ when, render, fallback }: ShowProps) {
  return when ? render : fallback
}
