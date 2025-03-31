import React from 'react'

const ThemeContext = React.createContext({
  theme: false,
  onChangeTheme: () => {},
  savedVideosList: [],

  onClickSave: () => {},
})

export default ThemeContext
