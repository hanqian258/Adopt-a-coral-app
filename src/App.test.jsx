import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('renders the navbar', () => {
    render(<App />)
    // Use getAllByText since "Adopt a Coral" appears in navbar logo
    const logos = screen.getAllByText(/Adopt a Coral/i)
    expect(logos.length).toBeGreaterThan(0)
  })

  it('renders navigation links', () => {
    render(<App />)
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    // Use getAllByText since "Learn" may appear in multiple places
    const learnLinks = screen.getAllByText(/Learn/i)
    expect(learnLinks.length).toBeGreaterThan(0)
    // Use getAllByText since "Donate" may appear in navbar and home page
    const donateLinks = screen.getAllByText(/Donate/i)
    expect(donateLinks.length).toBeGreaterThan(0)
    expect(screen.getByText(/Admin/i)).toBeInTheDocument()
  })
})

