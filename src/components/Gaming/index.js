import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {SiYoutubegaming} from 'react-icons/si'

import Navbar from '../Navbar'
import GamingVideoCard from '../GamingVideoCard'
import Slidebar from '../Slidebar'

import Context from '../../context/Context'

import './index.css'

const standardResponseStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class Gaming extends Component {
  state = {gamingList: [], responseStatus: ''}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const url = 'https://apis.ccbp.in/videos/gaming'
    this.setState({responseStatus: standardResponseStatus.inProgress})

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      //   console.log(data)
      const fetchedData = data.videos.map(each => ({
        id: each.id,
        thumbnailUrl: each.thumbnail_url,
        title: each.title,
        viewCount: each.view_count,
      }))
      console.log(fetchedData)
      this.setState({
        gamingList: fetchedData,
        responseStatus: standardResponseStatus.success,
      })
    } else {
      this.setState({responseStatus: standardResponseStatus.failure})
    }
  }

  onClickRetryButton = () => {
    this.getData()
  }

  successFetch = () => {
    const {gamingList} = this.state

    return (
      <ul className="game-video-card">
        {gamingList.map(each => (
          <GamingVideoCard gameVideo={each} key={each.id} />
        ))}
      </ul>
    )
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
    return (
      <Context.Consumer>
        {value => {
          const {theme} = value
          return (
            <div>
              <Navbar />

              <div
                className={theme ? 'gaming-bg-dark' : 'gaming-bg-light'}
                data-testid="gaming"
              >
                <div className="flex-container">
                  <div className="slider-container">
                    <Slidebar />
                  </div>
                  <div className="gaming-sm">
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
                        <SiYoutubegaming className="game-icon" />
                      </div>
                      <h1>Gaming</h1>
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

export default Gaming
