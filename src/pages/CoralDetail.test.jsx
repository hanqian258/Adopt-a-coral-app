import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import CoralDetail from './CoralDetail'
import { storage } from '../data/mockData'

describe('CoralDetail', () => {
  beforeEach(() => {
    localStorage.clear()
    const adoptions = [
      {
        id: '1',
        name: 'Coral Reef #1',
        location: 'Great Barrier Reef, Australia',
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

  it('renders coral details', () => {
    render(
      <MemoryRouter initialEntries={['/coral/1']}>
        <Routes>
          <Route path="/coral/:id" element={<CoralDetail />} />
        </Routes>
      </MemoryRouter>
    )
    
    expect(screen.getByText(/Coral Reef #1/i)).toBeInTheDocument()
    expect(screen.getByText(/Great Barrier Reef/i)).toBeInTheDocument()
  })

  it('shows not found for invalid coral ID', () => {
    render(
      <MemoryRouter initialEntries={['/coral/999']}>
        <Routes>
          <Route path="/coral/:id" element={<CoralDetail />} />
        </Routes>
      </MemoryRouter>
    )
    
    expect(screen.getByText(/Coral not found/i)).toBeInTheDocument()
  })

  it('displays adoption status', () => {
    render(
      <MemoryRouter initialEntries={['/coral/1']}>
        <Routes>
          <Route path="/coral/:id" element={<CoralDetail />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Use getAllByText since "active" may appear multiple times
    const activeElements = screen.getAllByText(/active/i)
    expect(activeElements.length).toBeGreaterThan(0)
  })
})

