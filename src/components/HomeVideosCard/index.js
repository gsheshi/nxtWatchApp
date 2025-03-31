import {Link} from 'react-router-dom'

// import {formatDistanceToNow} from 'date-fns'

import './index.css'

const VideosCard = props => {
  const {video} = props
  const {id, title, thumbnailUrl, channel, viewCount, publishedAt} = video

  const fetchedChannelData = {
    name: channel.name,
    profileImageUrl: channel.profile_image_url,
  }

  // const formatDate = formatDistanceToNow(new Date(publishedAt))
  // console.log(fetchedChannelData)
  // console.log(video)

  return (
    <Link to={`videos/${id}`} className="link-video-card">
      <li className="home-video-card">
        <img src={thumbnailUrl} alt="video thumbnail" className="thumbnail" />

        <div className="profile-img-container-sm">
          <div className="profile-img-container">
            <img
              src={fetchedChannelData.profileImageUrl}
              alt="channel logo"
              className="profile-img-sm"
            />
          </div>

          <div className="profile-details-container-sm">
            <div>
              <p className="title-sm"> {title}</p>
            </div>
            <div>
              <p>{fetchedChannelData.name}</p>
            </div>

            <div className="view-count-date-container">
              <p className="view-count"> {viewCount}</p>
              <p>{publishedAt}</p>
            </div>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default VideosCard
