import styled from 'styled-components'

export const HomeContainer = styled.div`
  display: flex;
`

export const HomeResponsiveContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#181818' : '#f1f1f1')};
  width: 100%;
  max-width: 1250px;
  min-height: 100vh;
`

export const BannerImageContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  width: 100%;
  max-width: 1250px;
  height: 150px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  @media screen and (min-width: 768px) {
    height: 250px;
  }
`

export const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
`

export const BannerLogo = styled.img`
  width: 100px;
  height: 25px;
  @media screen and (min-width: 768px) {
    width: 200px;
    height: 50px;
  }
`

export const BannerText = styled.p`
  font-family: Roboto;
  color: #0f0f0f;
  font-size: 12px;
  @media screen and (min-width: 768px) {
    font-size: 25px;
  }
`

export const BannerButton = styled.button`
  background-color: transparent;
  width: 80px;
  height: 20px;
  outline: none;
  border: 2px solid #181818;
  font-family: Roboto;
  font-size: 10px;
  color: #181818;
  @media screen and (min-width: 768px) {
    width: 150px;
    height: 40px;
    font-size: 15px;
  }
`

export const BannerCloseContainer = styled.div``

export const BannerCloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
`

export const SearchBarContainer = styled.div`
  border: 2px solid #cbd5e1;
  background-color: ${props => (props.bgColor ? '#181818' : '#f8fafc')};
  width: 40%px;
  height: 40px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 10px;
  border-radius: 5px;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
`

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  flex-grow: 1;
  color: ${props => (props.color ? '#f8fafc' : '#181818')};
`

export const SearchIconButton = styled.button`
  background-color: ${props => (props.bgColor ? '#212121' : '#f1f1f1')};
  color: ${props => (props.bgColor ? '#f1f1f1' : '#0f0f0f')};
  height: 36px;
  width: 50px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
`

export const VideoThumbnailUnorderList = styled.ul`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1250px;
  overflow-y: scroll;
  height: 600px;
`

export const ListItem = styled.li`
  list-style: none;
  margin-right: 15px;
  margin-top: 15px;
  margin-bottom: 15px;
`

export const VideoThumbnailImg = styled.img`
  width: 100%;
  height: 180px;
  @media screen and (min-width: 768px) {
    width: 300px;
    height: 150px;
  }
`

export const ProfileContainer = styled.div`
  display: flex;
`

export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
  margin-top: 10px;
`

export const VideoDescriptionContent = styled.div`
  max-width: 290px;
`

export const DescriptionDetailText = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#f1f1f1' : '#181818')};
  font-size: 15px;
  padding: 4px;
  margin: 0px;
`

export const YearAndViews = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#d7dfe9' : '#475569')};
  font-size: 15px;
  padding: 4px;
  margin: 0px;
`

export const SearchNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SearchResultNotFoundImg = styled.img`
  width: 300px;
  height: 300px;
`
export const SeachResultHeading = styled.h1`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 25px;
  font-weight: 600;
  padding: 0px;
  margin: 0px;
`

export const SearchResultDescription = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 20px;
`
export const FetchingDataConatainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FetchingDataImg = styled.img`
  width: 300px;
  height: 300px;
`

export const FetchingDataHeading = styled.h1`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 25px;
  font-weight: 600;
  padding: 0px;
  margin: 0px;
`

export const FetchingDataDescription = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 20px;
`

export const TryAgainButton = styled.button`
  width: 150px;
  height: 50px;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 8px;
  outline: none;
  cursor: pointer;
  border: none;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
