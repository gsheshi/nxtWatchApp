import React from 'react'

const ThemeContext = React.createContext()

class ThemeProvider extends React.Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  onClickSave = video => {
    this.setState(prevState => {
      const {savedVideosList} = prevState

      const isAlreadySaved = savedVideosList.some(v => v.id === video.id)

      const updatedList = isAlreadySaved
        ? savedVideosList.filter(v => v.id !== video.id) // Remove if already saved
        : [...savedVideosList, video] // Add if not saved

      return {savedVideosList: updatedList}
    })
  }

  render() {
    const {isDarkTheme, savedVideosList} = this.state
    const {children} = this.props

    return (
      <ThemeContext.Provider
        value={{
          theme: isDarkTheme,
          savedVideosList,
          onChangeTheme: this.toggleTheme,
          onClickSave: this.onClickSave,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}

export {ThemeProvider}

export default ThemeContext
