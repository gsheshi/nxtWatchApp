import {Component} from 'react'

import {FaFire} from 'react-icons/fa'

import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import SavedVideoCard from '../SavedVideoCard'
import Slidebar from '../Slidebar'

import ThemeContext from '../../context/ThemeContext'

import './index.css'

class SavedVideos extends Component {
  state = {loader: true}

  componentDidMount() {
    this.setState({loader: false})
  }

  failureView = () => {
    const dummy = this
    return (
      <div className="empty-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
          alt="no saved videos"
          className="empty-image"
        />

        <h1 className="empty-heading"> No saved videos found</h1>
        <p>You can save your videos while watching them</p>
      </div>
    )
  }

  loaderView = () => {
    const dummy = this
    return (
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    )
  }

  successView = savedList => (
    <div>
      {savedList.length > 0 ? (
        <ul className="trending-videos">
          {savedList.map(each => (
            <SavedVideoCard videos={each} key={each.id} />
          ))}
        </ul>
      ) : (
        this.failureView()
      )}
    </div>
  )

  render() {
    const {loader} = this.state
    //  console.log(savedList)
    return (
      <ThemeContext.Consumer>
        {value => {
          const {theme, savedVideosList} = value
          return (
            <div>
              <Navbar />

              <div
                className={theme ? 'saved-bg-dark' : 'saved-bg-light'}
                data-testid="savedVideos"
              >
                <div className="flex-container">
                  <div className="slider-container">
                    <Slidebar />
                  </div>
                  <div className="saved-sm">
                    <div>
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
                          <h1>Saved Videos</h1>
                        </div>
                      </div>
                      {loader
                        ? this.loaderView()
                        : this.successView(savedVideosList)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }}
      </ThemeContext.Consumer>
    )
  }
}
export default SavedVideos
