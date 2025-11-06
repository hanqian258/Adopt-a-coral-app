import { useState } from 'react'
import { storage } from '../data/mockData'
import './Admin.css'

function Admin() {
  const adoptions = storage.get('adoptions') || []
  const updates = storage.get('coralUpdates') || {}
  
  const [selectedCoral, setSelectedCoral] = useState('')
  const [updateDate, setUpdateDate] = useState(new Date().toISOString().split('T')[0])
  const [updateDescription, setUpdateDescription] = useState('')
  const [updatePhotos, setUpdatePhotos] = useState([''])
  const [showSuccess, setShowSuccess] = useState(false)

  const handlePhotoChange = (index, value) => {
    const newPhotos = [...updatePhotos]
    newPhotos[index] = value
    setUpdatePhotos(newPhotos)
  }

  const addPhotoField = () => {
    setUpdatePhotos([...updatePhotos, ''])
  }

  const removePhotoField = (index) => {
    if (updatePhotos.length > 1) {
      const newPhotos = updatePhotos.filter((_, i) => i !== index)
      setUpdatePhotos(newPhotos)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!selectedCoral || !updateDescription.trim()) {
      alert('Please fill in all required fields')
      return
    }

    // Create new update
    const newUpdate = {
      id: `u${Date.now()}`,
      date: updateDate,
      description: updateDescription,
      photos: updatePhotos.filter(url => url.trim() !== '')
    }

    // Get existing updates for this coral
    const existingUpdates = updates[selectedCoral] || []
    const updatedCoralUpdates = {
      ...updates,
      [selectedCoral]: [newUpdate, ...existingUpdates]
    }

    // Save to storage
    storage.set('coralUpdates', updatedCoralUpdates)

    // Reset form
    setUpdateDescription('')
    setUpdatePhotos([''])
    setUpdateDate(new Date().toISOString().split('T')[0])
    
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
    
    alert('Update posted successfully!')
  }

  const activeAdoptions = adoptions.filter(a => a.status === 'active')

  return (
    <div className="admin">
      <div className="container">
        <h1 className="section-title">Admin Portal</h1>
        <p className="admin-subtitle">Upload coral updates and manage adoptions</p>

        {showSuccess && (
          <div className="success-message">
            ✓ Update posted successfully!
          </div>
        )}

        <div className="admin-grid">
          <div className="card">
            <h2 className="card-title">Post Coral Update</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Select Coral *</label>
                <select
                  className="form-select"
                  value={selectedCoral}
                  onChange={(e) => setSelectedCoral(e.target.value)}
                  required
                >
                  <option value="">Choose a coral...</option>
                  {adoptions.map(coral => (
                    <option key={coral.id} value={coral.id}>
                      {coral.name} - {coral.location} 
                      {coral.status === 'cancelled' && ' (CANCELLED - No updates)'}
                    </option>
                  ))}
                </select>
                {selectedCoral && adoptions.find(a => a.id === selectedCoral)?.status === 'cancelled' && (
                  <p className="warning-text">
                    ⚠️ This adoption is cancelled. Updates should not be sent.
                  </p>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Update Date *</label>
                <input
                  type="date"
                  className="form-input"
                  value={updateDate}
                  onChange={(e) => setUpdateDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description *</label>
                <textarea
                  className="form-textarea"
                  value={updateDescription}
                  onChange={(e) => setUpdateDescription(e.target.value)}
                  placeholder="Describe the coral's current status, growth, health, or any notable observations..."
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Photos (URLs)</label>
                {updatePhotos.map((photo, index) => (
                  <div key={index} className="photo-input-group">
                    <input
                      type="url"
                      className="form-input"
                      placeholder="Enter photo URL"
                      value={photo}
                      onChange={(e) => handlePhotoChange(index, e.target.value)}
                    />
                    {updatePhotos.length > 1 && (
                      <button
                        type="button"
                        className="btn-remove"
                        onClick={() => removePhotoField(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={addPhotoField}
                >
                  + Add Another Photo
                </button>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={selectedCoral && adoptions.find(a => a.id === selectedCoral)?.status === 'cancelled'}
              >
                Post Update
              </button>
            </form>
          </div>

          <div className="card">
            <h2 className="card-title">Adoption Status Overview</h2>
            <div className="stats">
              <div className="stat-item">
                <span className="stat-label">Total Adoptions:</span>
                <span className="stat-value">{adoptions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Active:</span>
                <span className="stat-value status-active-badge">
                  {activeAdoptions.length}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Cancelled:</span>
                <span className="stat-value status-cancelled-badge">
                  {adoptions.filter(a => a.status === 'cancelled').length}
                </span>
              </div>
            </div>

            <h3 className="card-title" style={{marginTop: '2rem', fontSize: '1.25rem'}}>
              Recent Cancellations
            </h3>
            {adoptions.filter(a => a.status === 'cancelled').length > 0 ? (
              <ul className="cancellation-list">
                {adoptions
                  .filter(a => a.status === 'cancelled')
                  .map(coral => (
                    <li key={coral.id}>
                      <strong>{coral.name}</strong> - {coral.location}
                      <br />
                      <small>Cancelled (no updates should be sent)</small>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="card-content">No cancelled adoptions</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admin

