import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'

import './index.css'

const SavedVideoCard = props => {
  const {videos} = props
  const {id, channel, title, publishedAt, thumbnailUrl, viewCount} = videos
  const {name, profileImageUrl} = channel

  const formattedDate = formatDistanceToNow(new Date(publishedAt))

  return (
    <Link to={`/videos/${id}`} className="link-video-card">
      <li className="trending-card">
        <div>
          <img
            className="thumbnailUrl"
            src={thumbnailUrl}
            alt="video thumbnail"
          />
        </div>

        <div className="details">
          <div className="profileImageUrl-container">
            <img src={profileImageUrl} className="profile-img-url" alt={id} />
          </div>
          <div>
            <div>
              <p className="title">{title}</p>
            </div>
            <div className="name-view-date-container">
              <p className="name">{name}</p>
              <p className="view">{viewCount} views</p>
              <p className="date">{formattedDate}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SavedVideoCard
