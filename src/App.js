import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import CreateAppContext from './Context/CreateAppContext'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetailsRoute from './components/VideoItemDetailsRoute'
import TrendingRoute from './components/TrendingRoute'
import GamingRoute from './components/GamingRoute'
import SavedVideosRoute from './components/SavedVideosRoute'
import NotFoundRoute from './components/NotFoundRoute'
import './App.css'

// Replace your code here
class App extends Component {
  state = {
    colorStatus: false,
    saveVideos: [],
    likedVideos: {},
    dislikedVideos: {},
  }

  bgThemeToggle = () => {
    this.setState(prevState => ({
      colorStatus: !prevState.colorStatus,
    }))
  }

  saveVideoItem = video => {
    this.setState(prevState => {
      const {saveVideos} = prevState
      const saveItem = saveVideos.find(eachItem => eachItem.id === video.id)

      if (saveItem) {
        return {
          saveVideos: saveVideos.filter(eachItem => eachItem.id !== video.id),
        }
      }
      return {
        saveVideos: [...saveVideos, video],
      }
    })
  }

  likeItem = videoId => {
    this.setState(prevState => {
      const {likedVideos, dislikedVideos} = prevState
      const isLiked = likedVideos[videoId]

      return {
        likedVideos: {...likedVideos, [videoId]: !isLiked},
        dislikedVideos: {...dislikedVideos, [videoId]: false},
      }
    })
  }

  dislikeItem = videoId => {
    this.setState(prevState => {
      const {likedVideos, dislikedVideos} = prevState
      const isDisliked = dislikedVideos[videoId]

      return {
        dislikedVideos: {...dislikedVideos, [videoId]: !isDisliked},
        likedVideos: {...likedVideos, [videoId]: false},
      }
    })
  }

  render() {
    const {colorStatus, saveVideos, likedVideos, dislikedVideos} = this.state
    return (
      <CreateAppContext.Provider
        value={{
          colorStatus,
          saveVideos,
          likedVideos,
          dislikedVideos,
          bgThemeToggle: this.bgThemeToggle,
          saveVideoItem: this.saveVideoItem,
          likeItem: this.likeItem,
          dislikeItem: this.dislikeItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/trending" component={TrendingRoute} />
          <ProtectedRoute exact path="/gaming" component={GamingRoute} />
          <ProtectedRoute
            exact
            path="/saved-videos"
            component={SavedVideosRoute}
          />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetailsRoute}
          />
          <Route path="/not-found" component={NotFoundRoute} />
          <Redirect to="/not-found" />
        </Switch>
      </CreateAppContext.Provider>
    )
  }
}

export default App
