import { Link } from 'react-router-dom'
import { storage } from '../data/mockData'
import './Home.css'

function Home() {
  const adoptions = storage.get('adoptions') || []
  const activeAdoptions = adoptions.filter(a => a.status === 'active')

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <h1 className="hero-title">🌊 Adopt a Coral</h1>
          <p className="hero-subtitle">
            Help protect and restore coral reefs around the world
          </p>
        </div>

        <section className="section">
          <h2 className="section-title">Your Adoptions</h2>
          {activeAdoptions.length > 0 ? (
            <div className="grid grid-3">
              {activeAdoptions.map(coral => (
                <div key={coral.id} className="card">
                  <img 
                    src={coral.image} 
                    alt={coral.name}
                    className="coral-image"
                  />
                  <h3 className="card-title">{coral.name}</h3>
                  <p className="card-content">
                    <strong>Location:</strong> {coral.location}
                  </p>
                  <p className="card-content">
                    <strong>Adopted:</strong> {new Date(coral.adoptedDate).toLocaleDateString()}
                  </p>
                  <p className="card-content">
                    <span className={`status-badge status-${coral.status}`}>
                      {coral.status}
                    </span>
                  </p>
                  <Link to={`/coral/${coral.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No active adoptions yet</h3>
              <p>Start making a difference by adopting a coral today!</p>
              <Link to="/donation" className="btn btn-primary">
                Adopt a Coral
              </Link>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Learn About Coral Conservation</h2>
          <div className="learn-cards">
            <div className="card">
              <h3 className="card-title">🌴 Responsible Tourism</h3>
              <p className="card-content">
                Learn how to visit coral reefs responsibly and minimize your impact 
                on these fragile ecosystems.
              </p>
              <Link to="/learn" className="btn btn-secondary">
                Read More
              </Link>
            </div>
            <div className="card">
              <h3 className="card-title">🧴 Reef-Safe Sunscreen</h3>
              <p className="card-content">
                Discover why sunscreen ingredients matter and how to choose products 
                that protect both you and the reefs.
              </p>
              <Link to="/learn" className="btn btn-secondary">
                Read More
              </Link>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Make a Difference</h2>
          <div className="card">
            <h3 className="card-title">Support Coral Restoration</h3>
            <p className="card-content">
              Your donations help fund coral planting, monitoring, and research programs. 
              Choose between one-time donations or monthly subscriptions to support 
              ongoing conservation efforts.
            </p>
            <Link to="/donation" className="btn btn-primary">
              Donate Now
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home

