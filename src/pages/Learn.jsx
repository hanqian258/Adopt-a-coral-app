import { Link } from 'react-router-dom'
import { learnArticles } from '../data/mockData'
import './Learn.css'

function Learn() {
  return (
    <div className="learn">
      <div className="container">
        <h1 className="section-title">Learn About Coral Conservation</h1>
        <p className="learn-intro">
          Discover how you can help protect coral reefs through responsible practices 
          and informed choices.
        </p>

        <div className="articles-list">
          {learnArticles.map(article => (
            <article key={article.id} className="card article-card">
              <h2 className="article-title">{article.title}</h2>
              <p className="article-date">
                Published: {new Date(article.date).toLocaleDateString()}
              </p>
              <div className="article-content">
                {article.content.split('\n\n').map((paragraph, index) => {
                  // Handle bold text
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    const text = paragraph.slice(2, -2)
                    return (
                      <p key={index} className="article-bold">
                        {text}
                      </p>
                    )
                  }
                  // Handle bullet points
                  if (paragraph.trim().startsWith('-')) {
                    const items = paragraph.split('\n').filter(line => line.trim().startsWith('-'))
                    return (
                      <ul key={index} className="article-list">
                        {items.map((item, i) => (
                          <li key={i}>{item.replace(/^-\s*/, '')}</li>
                        ))}
                      </ul>
                    )
                  }
                  return (
                    <p key={index} className="article-paragraph">
                      {paragraph}
                    </p>
                  )
                })}
              </div>
            </article>
          ))}
        </div>

        <div className="card">
          <h2 className="card-title">Get Involved</h2>
          <p className="card-content">
            Want to make an even bigger impact? Adopt a coral today and receive regular 
            updates on its growth and health.
          </p>
          <Link to="/donation" className="btn btn-primary">
            Adopt a Coral
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Learn

