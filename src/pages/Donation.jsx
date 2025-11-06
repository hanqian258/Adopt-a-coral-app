import { useState } from 'react'
import { storage } from '../data/mockData'
import './Donation.css'

function Donation() {
  const adoptions = storage.get('adoptions') || []
  const activeAdoptions = adoptions.filter(a => a.status === 'active')
  
  const [donationType, setDonationType] = useState('one-time')
  const [amount, setAmount] = useState(50)
  const [selectedCoral, setSelectedCoral] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [cancellationId, setCancellationId] = useState('')

  const handleOneTimeDonation = (e) => {
    e.preventDefault()
    // In a real app, this would integrate with a payment processor
    alert(`Thank you for your $${customAmount || amount} one-time donation!`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleRenewal = (e) => {
    e.preventDefault()
    // In a real app, this would update the subscription
    alert(`Your renewal has been processed successfully!`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancellation = (e) => {
    e.preventDefault()
    if (!cancellationId) {
      alert('Please select a coral to cancel')
      return
    }

    if (window.confirm('Are you sure you want to cancel this adoption? Scientists will be notified and no further updates will be sent.')) {
      // Update adoption status
      const updatedAdoptions = adoptions.map(a => 
        a.id === cancellationId ? { ...a, status: 'cancelled', nextPayment: null } : a
      )
      storage.set('adoptions', updatedAdoptions)

      // Notify scientists (in a real app, this would be an API call)
      const cancelledAdoption = adoptions.find(a => a.id === cancellationId)
      console.log('NOTIFICATION TO SCIENTISTS:', {
        type: 'CANCELLATION',
        coralId: cancellationId,
        coralName: cancelledAdoption.name,
        location: cancelledAdoption.location,
        timestamp: new Date().toISOString(),
        message: `Adoption ${cancellationId} has been cancelled. Please stop sending updates.`
      })
      
      alert('Cancellation successful. Scientists have been notified.')
      setShowSuccess(true)
      setCancellationId('')
      setTimeout(() => {
        setShowSuccess(false)
        window.location.reload()
      }, 2000)
    }
  }

  return (
    <div className="donation">
      <div className="container">
        <h1 className="section-title">Support Coral Conservation</h1>

        {showSuccess && (
          <div className="success-message">
            ✓ Operation completed successfully!
          </div>
        )}

        <div className="donation-tabs">
          <button
            className={`tab ${donationType === 'one-time' ? 'active' : ''}`}
            onClick={() => setDonationType('one-time')}
          >
            One-Time Donation
          </button>
          <button
            className={`tab ${donationType === 'renewal' ? 'active' : ''}`}
            onClick={() => setDonationType('renewal')}
          >
            Renew Subscription
          </button>
          <button
            className={`tab ${donationType === 'cancellation' ? 'active' : ''}`}
            onClick={() => setDonationType('cancellation')}
          >
            Cancel Adoption
          </button>
        </div>

        {donationType === 'one-time' && (
          <div className="card">
            <h2 className="card-title">Make a One-Time Donation</h2>
            <form onSubmit={handleOneTimeDonation}>
              <div className="form-group">
                <label className="form-label">Select Amount</label>
                <div className="amount-buttons">
                  {[25, 50, 100, 250, 500].map(amt => (
                    <button
                      key={amt}
                      type="button"
                      className={`amount-btn ${amount === amt ? 'active' : ''}`}
                      onClick={() => setAmount(amt)}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Or Enter Custom Amount</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Enter amount"
                  min="1"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Donate ${customAmount || amount}
              </button>
            </form>
          </div>
        )}

        {donationType === 'renewal' && (
          <div className="card">
            <h2 className="card-title">Renew Your Subscription</h2>
            {activeAdoptions.length > 0 ? (
              <form onSubmit={handleRenewal}>
                <div className="form-group">
                  <label className="form-label">Select Coral to Renew</label>
                  <select
                    className="form-select"
                    value={selectedCoral}
                    onChange={(e) => setSelectedCoral(e.target.value)}
                    required
                  >
                    <option value="">Select a coral...</option>
                    {activeAdoptions.map(coral => (
                      <option key={coral.id} value={coral.id}>
                        {coral.name} - ${coral.donationAmount}/{coral.donationFrequency}
                      </option>
                    ))}
                  </select>
                </div>
                {selectedCoral && (
                  <div className="renewal-info">
                    <p>Next payment will be processed on: {
                      new Date(activeAdoptions.find(a => a.id === selectedCoral).nextPayment).toLocaleDateString()
                    }</p>
                  </div>
                )}
                <button type="submit" className="btn btn-primary" disabled={!selectedCoral}>
                  Renew Now
                </button>
              </form>
            ) : (
              <p className="card-content">You don't have any active adoptions to renew.</p>
            )}
          </div>
        )}

        {donationType === 'cancellation' && (
          <div className="card">
            <h2 className="card-title">Cancel Your Adoption</h2>
            <p className="card-content warning-text">
              ⚠️ Cancelling an adoption will stop all future updates from scientists. 
              Scientists will be notified immediately.
            </p>
            {activeAdoptions.length > 0 ? (
              <form onSubmit={handleCancellation}>
                <div className="form-group">
                  <label className="form-label">Select Coral to Cancel</label>
                  <select
                    className="form-select"
                    value={cancellationId}
                    onChange={(e) => setCancellationId(e.target.value)}
                    required
                  >
                    <option value="">Select a coral...</option>
                    {activeAdoptions.map(coral => (
                      <option key={coral.id} value={coral.id}>
                        {coral.name} - {coral.location}
                      </option>
                    ))}
                  </select>
                </div>
                {cancellationId && (
                  <div className="cancellation-info">
                    <p><strong>You are cancelling:</strong></p>
                    <p>{activeAdoptions.find(a => a.id === cancellationId).name}</p>
                    <p className="warning-text">
                      This action cannot be undone. Scientists will be notified to stop sending updates.
                    </p>
                  </div>
                )}
                <button type="submit" className="btn btn-danger" disabled={!cancellationId}>
                  Cancel Adoption
                </button>
              </form>
            ) : (
              <p className="card-content">You don't have any active adoptions to cancel.</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Donation

