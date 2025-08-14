import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoadingSpinner from './LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />)
    
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Please wait..." />)
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument()
  })

  it('renders without text when text prop is empty', () => {
    render(<LoadingSpinner text="" />)
    
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('applies correct size classes', () => {
    const { rerender } = render(<LoadingSpinner size="sm" />)
    
    const spinner = screen.getByRole('generic').querySelector('div')
    expect(spinner).toHaveClass('w-4', 'h-4')
    
    rerender(<LoadingSpinner size="lg" />)
    expect(spinner).toHaveClass('w-12', 'h-12')
  })
})





