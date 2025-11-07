import React from 'react'

const CreateAppContext = React.createContext({
  colorStatus: 'false',
  saveVideos: [],
  bgThemeToggle: () => {},
  saveVideoItem: () => {},
  likeItem: () => {},
  dislikeItem: () => {},
})

export default CreateAppContext
