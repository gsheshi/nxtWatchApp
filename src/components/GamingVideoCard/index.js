import {Link} from 'react-router-dom'

import './index.css'

const GamingVideoCard = props => {
  const {gameVideo} = props
  const {id, title, thumbnailUrl, viewCount} = gameVideo
  return (
    <li className="video-card">
      <Link to={`videos/${id}`} className="link-video-card">
        <img
          src={thumbnailUrl}
          alt="video thumbnail"
          className="game-thumbnail"
        />
        <p>{title}</p>
        <p>{viewCount} Watching Worldwide</p>
      </Link>
    </li>
  )
}

export default GamingVideoCard
