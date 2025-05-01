import {Component} from 'react'

import ReactPlayer from 'react-player'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {BiLike, BiDislike, BiListPlus} from 'react-icons/bi'

import {formatDistanceToNow} from 'date-fns'

import {LikeButton, DislikeButton} from './styledComponents'

import Navbar from '../Navbar'
import Slidebar from '../Slidebar'
import ThemeContext from '../../context/ThemeContext'

import './index.css'

const standardResponseStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class VideoDetails extends Component {
  state = {
    videoData: {},
    responseStatus: '',
    isLiked: false,
    isDisliked: false,
  }

  componentDidMount() {
    //  console.log('running')
    this.getData()
    this.loadStoredPreferences()
  }

  loadStoredPreferences = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const storedPreferences = JSON.parse(localStorage.getItem(`video-${id}`))
    if (storedPreferences) {
      this.setState({
        isLiked: storedPreferences.isLiked,
        isDisliked: storedPreferences.isDisliked,
      })
    }
  }

  storePreferences = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const {isLiked, isDisliked} = this.state
    localStorage.setItem(`video-${id}`, JSON.stringify({isLiked, isDisliked}))
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/${id}`
    this.setState({responseStatus: standardResponseStatus.inProgress})

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //  console.log(data)
      const updatedData = {videoDetails: data.video_details}
      // console.log(updatedData)
      const {videoDetails} = updatedData

      const fetchedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
        id: videoDetails.id,
        isSaved: false,
      }

      console.log(fetchedData)

      this.setState({
        videoData: fetchedData,
        responseStatus: standardResponseStatus.success,
      })
    } else {
      this.setState({responseStatus: standardResponseStatus.failure})
    }
  }

  onClickRetryButton = () => {
    this.getData()
  }

  onClickDislike = () => {
    //  console.log('triggerd')
    this.setState(
      prevState => ({
        isDisliked: !prevState.isDisliked,
        isLiked: false,
      }),
      this.storePreferences,
    )
  }

  onClickLike = () => {
    // console.log('triggerd')
    this.setState(
      prevState => ({
        isLiked: !prevState.isLiked,
        isDisliked: false,
      }),
      this.storePreferences,
    )
  }

  VideoPlayer = () => {
    const {videoData} = this.state
    const {videoUrl} = videoData
    return (
      <div>
        <div>
          <ReactPlayer url={videoUrl} width="100%" />
        </div>
      </div>
    )
  }

  successView = () => {
    const {isLiked, isDisliked} = this.state
    //  console.log(isLiked)

    return (
      <ThemeContext.Consumer>
        {value => {
          const {onClickSave, savedVideosList} = value
          console.log(savedVideosList)

          const {videoData} = this.state

          const {title, channel, viewCount, publishedAt, description} =
            videoData

          const {name, profileImageUrl, subscriberCount} = channel

          const formattedDate = formatDistanceToNow(new Date(publishedAt))

          const isSaved = savedVideosList.some(v => v.id === videoData.id)

          return (
            <div className="flex-container">
              <div className="slider-container">
                <Slidebar />
              </div>
              <div className="home-sm-container">
                <div>
                  {this.VideoPlayer()}
                  <div className="video-detials-container">
                    <p>{title}</p>
                    <div className="views-publishDate-container">
                      <p className="view-count">{viewCount} views</p>
                      <p className="dot">.</p>
                      <p>{publishedAt}</p>
                    </div>
                    <div className="interaction-buttons-container">
                      <LikeButton isLiked={isLiked} onClick={this.onClickLike}>
                        <BiLike className="like-icon" /> Like
                      </LikeButton>

                      <DislikeButton
                        isDisliked={isDisliked}
                        onClick={this.onClickDislike}
                      >
                        <BiDislike className="like-icon" /> Dislike
                      </DislikeButton>
                      <button
                        type="button"
                        className={
                          isSaved
                            ? 'active-interaction-button'
                            : 'interaction-button'
                        }
                        onClick={() => onClickSave(videoData)}
                      >
                        <BiListPlus className="like-icon" />
                        {isSaved ? 'Saved' : 'Save'}
                      </button>
                    </div>
                    <hr className="hr" />
                    <div className="channel-details-container">
                      <div className="profile-img-container">
                        <img
                          src={profileImageUrl}
                          className="profile-img"
                          alt="channel logo"
                        />
                      </div>
                      <div className="name-subcriber-container">
                        <p className="name">{name}</p>
                        <p className="subscriber-count">
                          {subscriberCount} subscribers
                        </p>
                      </div>
                    </div>
                    <p className="description">{description}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  loaderView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureView = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
        alt="failure view"
        className="empty-image"
      />

      <h1 className="empty-heading"> Oops! Something Went Wrong</h1>
      <p>
        We are having some trouble to complete your request. Please try again.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
    </div>
  )

  renderView = () => {
    const {responseStatus} = this.state
    switch (responseStatus) {
      case standardResponseStatus.success:
        return this.successView()
      case standardResponseStatus.failure:
        return this.failureView()
      case standardResponseStatus.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  displayVideoData = () => (
    <ThemeContext.Consumer>
      {value => {
        const {theme} = value

        return (
          <div
            className={theme ? 'trending-dark' : 'trending-light'}
            data-testid="videoItemDetails"
          >
            {this.renderView()}
          </div>
        )
      }}
    </ThemeContext.Consumer>
  )

  render() {
    // const {videoData} = this.state
    // console.log(videoData)
    return (
      <div>
        <Navbar />
        {this.displayVideoData()}
      </div>
    )
  }
}

export default VideoDetails
