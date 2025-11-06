import { useParams, Link, useNavigate } from 'react-router-dom'
import { storage } from '../data/mockData'
import './CoralDetail.css'

function CoralDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
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

  return (
    <div className="coral-detail">
      <div className="container">
        <Link to="/" className="back-link">← Back to Home</Link>
        
        <div className="coral-header">
          <img 
            src={coral.image} 
            alt={coral.name}
            className="coral-detail-image"
          />
          <div className="coral-info">
            <h1 className="coral-name">{coral.name}</h1>
            <p className="coral-location">📍 {coral.location}</p>
            <div className="coral-status-info">
              <span className={`status-badge status-${coral.status}`}>
                {coral.status}
              </span>
              {coral.status === 'active' && coral.nextPayment && (
                <p className="next-payment">
                  Next payment: {new Date(coral.nextPayment).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="coral-details-grid">
          <div className="card">
            <h3 className="card-title">Adoption Details</h3>
            <div className="detail-item">
              <strong>Adopted:</strong> {new Date(coral.adoptedDate).toLocaleDateString()}
            </div>
            <div className="detail-item">
              <strong>Donation Amount:</strong> ${coral.donationAmount}/{coral.donationFrequency}
            </div>
            <div className="detail-item">
              <strong>Status:</strong> 
              <span className={`status-badge status-${coral.status}`}>
                {coral.status}
              </span>
            </div>
          </div>

          <div className="card">
            <h3 className="card-title">Recent Updates</h3>
            {coralUpdates.length > 0 ? (
              <>
                <p className="card-content">
                  {coralUpdates.length} update{coralUpdates.length !== 1 ? 's' : ''} available
                </p>
                <Link 
                  to={`/coral/${id}/updates`} 
                  className="btn btn-primary"
                >
                  View All Updates
                </Link>
              </>
            ) : (
              <p className="card-content">
                No updates yet. Check back soon!
              </p>
            )}
          </div>
        </div>

        {coral.status === 'active' && (
          <div className="card">
            <h3 className="card-title">Manage Adoption</h3>
            <p className="card-content">
              Want to modify your donation or cancel your adoption?
            </p>
            <Link to="/donation" className="btn btn-secondary">
              Manage Donation
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CoralDetail

