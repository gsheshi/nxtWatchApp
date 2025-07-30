import {Component} from 'react'

import {FaFire} from 'react-icons/fa'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import TrendingVideoCard from '../TrendingVideosCard'
import Slidebar from '../Slidebar'

import Context from '../../context/Context'

import './index.css'

const standardResponseStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Trending extends Component {
  state = {trendingList: [], responseStatus: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({responseStatus: standardResponseStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    // console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedData = data.videos.map(each => ({
        channel: {
          name: each.channel.name,
          profileImageUrl: each.channel.profile_image_url,
        },
        id: each.id,
        publishedAt: each.published_at,
        title: each.title,
        thumbnailUrl: each.thumbnail_url,
        viewCount: each.view_count,
      }))
      this.setState({
        trendingList: fetchedData,
        responseStatus: standardResponseStatus.success,
      })
    } else {
      this.setState({responseStatus: standardResponseStatus.failure})
    }
  }

  onClickRetryButton = () => {
    this.getData()
  }

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
        return this.successView()
      case standardResponseStatus.failure:
        return this.failureView()
      case standardResponseStatus.inProgress:
        return this.loaderView()
      default:
        return null
    }
  }

  successView = () => {
    const {trendingList} = this.state
    return (
      <ul className="trending-videos">
        {trendingList.map(each => (
          <TrendingVideoCard videos={each} key={each.id} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {theme} = value
          return (
            <div>
              <Navbar />

              <div
                className={theme ? 'trending-bg-dark' : 'trending-bg-light'}
                data-testid="trending"
              >
                <div className="flex-container">
                  <div className="slider-container">
                    <Slidebar />
                  </div>
                  <div className="trending-sm">
                    <div className="esm-view">
                      <div
                        className={
                          theme ? 'trending-title-dark' : 'trending-title'
                        }
                      >
                        <div
                          className={
                            theme
                              ? 'fire-icon-container-dark'
                              : 'fire-icon-container'
                          }
                        >
                          <FaFire className="fire-icon" />
                        </div>
                        <h1>Trending</h1>
                      </div>
                    </div>
                    {this.renderContent()}
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}
export default Trending
