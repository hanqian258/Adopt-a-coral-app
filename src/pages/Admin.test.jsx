import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import Admin from './Admin'
import { storage } from '../data/mockData'

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('Admin', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
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
      },
      {
        id: '2',
        name: 'Coral Reef #2',
        location: 'Red Sea',
        adoptedDate: '2024-01-20',
        status: 'cancelled',
        image: 'https://example.com/image2.jpg',
        nextPayment: null,
        donationAmount: 75,
        donationFrequency: 'monthly'
      }
    ]
    storage.set('adoptions', adoptions)
    storage.set('coralUpdates', {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders admin portal', () => {
    renderWithRouter(<Admin />)
    expect(screen.getByText(/Admin Portal/i)).toBeInTheDocument()
    expect(screen.getByText(/Post Coral Update/i)).toBeInTheDocument()
  })

  it('displays adoption statistics', () => {
    renderWithRouter(<Admin />)
    expect(screen.getByText(/Total Adoptions:/i)).toBeInTheDocument()
    expect(screen.getByText(/Active:/i)).toBeInTheDocument()
    expect(screen.getByText(/Cancelled:/i)).toBeInTheDocument()
  })

  it('shows cancelled adoptions in list', () => {
    renderWithRouter(<Admin />)
    expect(screen.getByText(/Recent Cancellations/i)).toBeInTheDocument()
    // Use getAllByText since it appears in both dropdown and list
    const coralTexts = screen.getAllByText(/Coral Reef #2/i)
    expect(coralTexts.length).toBeGreaterThan(0)
  })

  it('allows posting an update', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Admin />)
    
    // Select coral
    const select = screen.getByDisplayValue(/Choose a coral/i)
    await user.selectOptions(select, '1')
    
    // Fill description
    const description = screen.getByPlaceholderText(/Describe the coral/i)
    await user.type(description, 'Test update description')
    
    // Submit
    const submitButton = screen.getByText(/Post Update/i)
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Update posted successfully!')
    })
  })

  it('prevents posting update for cancelled coral', async () => {
    const user = userEvent.setup()
    renderWithRouter(<Admin />)
    
    // Select cancelled coral
    const select = screen.getByDisplayValue(/Choose a coral/i)
    await user.selectOptions(select, '2')
    
    // Check warning appears
    expect(screen.getByText(/This adoption is cancelled/i)).toBeInTheDocument()
    
    // Submit button should be disabled
    const submitButton = screen.getByText(/Post Update/i)
    expect(submitButton).toBeDisabled()
  })
})

