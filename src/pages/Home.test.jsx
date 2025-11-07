import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from './Home'
import { storage } from '../data/mockData'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Home', () => {
  beforeEach(() => {
    // Reset localStorage
    localStorage.clear()
    // Initialize with mock data
    const adoptions = [
      {
        id: '1',
        name: 'Coral Reef #1',
        location: 'Great Barrier Reef',
        adoptedDate: '2024-01-15',
        status: 'active',
        image: 'https://example.com/image.jpg',
        nextPayment: '2024-02-15',
        donationAmount: 50,
        donationFrequency: 'monthly'
      }
    ]
    storage.set('adoptions', adoptions)
  })

  it('renders the hero section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Adopt a Coral/i)).toBeInTheDocument()
    expect(screen.getByText(/Help protect and restore coral reefs/i)).toBeInTheDocument()
  })

  it('displays active adoptions', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Your Adoptions/i)).toBeInTheDocument()
    expect(screen.getByText(/Coral Reef #1/i)).toBeInTheDocument()
    expect(screen.getByText(/Great Barrier Reef/i)).toBeInTheDocument()
  })

  it('shows empty state when no adoptions', () => {
    localStorage.clear()
    storage.set('adoptions', [])
    renderWithRouter(<Home />)
    expect(screen.getByText(/No active adoptions yet/i)).toBeInTheDocument()
  })

  it('renders learn section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Learn About Coral Conservation/i)).toBeInTheDocument()
  })

  it('renders donation section', () => {
    renderWithRouter(<Home />)
    expect(screen.getByText(/Support Coral Restoration/i)).toBeInTheDocument()
  })
})

