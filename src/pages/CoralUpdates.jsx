import { useParams, Link } from 'react-router-dom'
import { storage } from '../data/mockData'
import './CoralUpdates.css'

function CoralUpdates() {
  const { id } = useParams()
  const adoptions = storage.get('adoptions') || []
  const coral = adoptions.find(a => a.id === id)
  const updates = storage.get('coralUpdates') || {}
  const coralUpdates = updates[id] || []

  if (!coral) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3>Coral not found</h3>
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  // Sort updates by date (newest first)
  const sortedUpdates = [...coralUpdates].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )

  return (
    <div className="coral-updates">
      <div className="container">
        <Link to={`/coral/${id}`} className="back-link">← Back to {coral.name}</Link>
        
        <h1 className="section-title">Recent Updates</h1>
        <p className="updates-subtitle">{coral.name} - {coral.location}</p>

        {sortedUpdates.length > 0 ? (
          <div className="updates-list">
            {sortedUpdates.map(update => (
              <div key={update.id} className="card update-card">
                <div className="update-header">
                  <h3 className="update-date">
                    {new Date(update.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                </div>
                <p className="update-description">{update.description}</p>
                {update.photos && update.photos.length > 0 && (
                  <div className="update-photos">
                    {update.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Update ${update.date} - Photo ${index + 1}`}
                        className="update-image"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No updates available yet</h3>
            <p>Updates will appear here once scientists post them.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoralUpdates

