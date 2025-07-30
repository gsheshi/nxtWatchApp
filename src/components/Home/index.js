import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {IoMdClose} from 'react-icons/io'
import {BsSearch} from 'react-icons/bs'

import {Banner, HomeTheme} from './styledComponents'

import Navbar from '../Navbar'
import VideosCard from '../HomeVideosCard'
import Slidebar from '../Slidebar'

import Context from '../../context/Context'

import './index.css'

const standardResponseStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    responseStatus: '',
    userInput: '',
    closeDefaultView: true,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({responseStatus: standardResponseStatus.inProgress})
    const {userInput} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/videos/all?search=${userInput}`
    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const fetchedData = data.videos.map(each => ({
        channel: each.channel,
        id: each.id,
        publishedAt: each.published_at,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      // console.log(fetchedData)
      this.setState({
        videosList: fetchedData,
        responseStatus: standardResponseStatus.success,
      })
    } else {
      this.setState({responseStatus: standardResponseStatus.failure})
    }
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onKeyDownInput = event => {
    if (event.key === 'Enter') {
      this.getData()
    }
  }

  onClickSearchButton = () => {
    this.getData()
  }

  onClickRetryButton = () => {
    this.getData()
  }

  onClickDefaultCloseButton = () => {
    this.setState({closeDefaultView: false})
  }

  successFetch = () => {
    const {videosList} = this.state
    // console.log(videosList)
    return (
      <div>
        {videosList.length > 0 ? (
          <ul className="videos-container">
            {videosList.map(video => (
              <VideosCard key={video.id} video={video} />
            ))}
          </ul>
        ) : (
          this.noItemsFound()
        )}
      </div>
    )
  }

  defaultVisibleView = () => {
    const {userInput, closeDefaultView} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {theme, isSidebarOpen} = value
          const sidebarClassName = isSidebarOpen
            ? 'slider-container show'
            : 'slider-container'
          return (
            <HomeTheme data-testid="home" theme={theme}>
              <Navbar />
              <div className="flex-container">
                <div className={sidebarClassName}>
                  <Slidebar />
                </div>

                <div className="home-view">
                  {closeDefaultView && (
                    <Banner data-testid="banner">
                      <div className="channel-logo-close-btn-container">
                        <img
                          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                          alt="nxt watch logo"
                          className="home-channel-logo-sm"
                        />
                        <button
                          data-testid="close"
                          type="button"
                          className="close-banner-button"
                          onClick={this.onClickDefaultCloseButton}
                        >
                          <IoMdClose className="close-button" />
                        </button>
                      </div>
                      <div className="banner-content">
                        <p className="description-sm">
                          Buy Nxt Watch Premium prepaid plans with UPI
                        </p>
                        <button type="button" className="get-it-button">
                          GET IT NOW
                        </button>
                      </div>
                    </Banner>
                  )}

                  <div className="videos-data-sm">
                    <div className="main-search-container">
                      <div className="input-container">
                        <input
                          type="search"
                          className="input"
                          placeholder="Search"
                          value={userInput}
                          onChange={this.onChangeInput}
                          onKeyDown={this.onKeyDownInput}
                        />
                      </div>
                      <div className="search-container">
                        <button
                          data-testid="searchButton"
                          type="button"
                          className="search-button"
                          onClick={this.onClickSearchButton}
                        >
                          <BsSearch className="search-icon" />
                        </button>
                      </div>
                    </div>
                    {this.renderContent()}
                  </div>
                </div>
              </div>
            </HomeTheme>
          )
        }}
      </Context.Consumer>
    )
  }

  noItemsFound = () => (
    <div className="empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="empty-image"
      />
      <h1 className="empty-heading">No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryButton}
      >
        Retry
      </button>
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

  loaderView = () => {
    const dummy = this
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  renderContent = () => {
    const {responseStatus} = this.state

    switch (responseStatus) {
      case standardResponseStatus.success:
        return this.successFetch()
      case standardResponseStatus.failure:
        return this.failureView()
      case standardResponseStatus.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.defaultVisibleView()}</div>
  }
}

export default Home
