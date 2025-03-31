import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import VideoDetails from './components/VideoDetails'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import ThemeContext from './context/ThemeContext'

import './App.css'

// Replace your code here
class App extends Component {
  state = {theme: false, savedVideosList: []}

  onChangeTheme = () => {
    this.setState(prevState => ({theme: !prevState.theme}))
  }

  onClickSave = video => {
    this.setState(prevState => {
      const {savedVideosList} = prevState

      // Check if the video is already in the saved list
      const isAlreadySaved = savedVideosList.some(v => v.id === video.id)

      // console.log(isAlreadySaved)
      // Toggle isSaved state
      const updatedVideo = {...video, isSaved: !isAlreadySaved}
      //  console.log(updatedVideo)

      // Update saved list: Remove if isSaved is false, otherwise add it
      const updatedList = isAlreadySaved
        ? savedVideosList.filter(v => v.id !== video.id) // Remove if already saved
        : [...savedVideosList, updatedVideo] // Add if not saved

      return {savedVideosList: updatedList}
    })
  }

  render() {
    const {theme, savedVideosList} = this.state

    return (
      <ThemeContext.Provider
        value={{
          theme,
          savedVideosList,
          onChangeTheme: this.onChangeTheme,
          onClickSave: this.onClickSave,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute exact path="/videos/:id" component={VideoDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
