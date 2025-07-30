import React from 'react'

const Context = React.createContext()

class ContextProvider extends React.Component {
  state = {
    isDarkTheme: false,
    savedVideosList: [],
    isSidebarOpen: false,
  }

  toggleTheme = () => {
    this.setState(prevState => ({
      isDarkTheme: !prevState.isDarkTheme,
    }))
  }

  toggleSidebar = () => {
    this.setState(prev => ({
      isSidebarOpen: !prev.isSidebarOpen,
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
    const {isDarkTheme, savedVideosList, isSidebarOpen} = this.state
    const {children} = this.props

    return (
      <Context.Provider
        value={{
          theme: isDarkTheme,
          savedVideosList,
          isSidebarOpen: isSidebarOpen,
          onChangeTheme: this.toggleTheme,
          onClickSave: this.onClickSave,
          onChangeSidebar: this.toggleSidebar,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export {ContextProvider}

export default Context
