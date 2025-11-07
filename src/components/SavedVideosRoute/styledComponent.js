import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

export const SavedVideosContainer = styled.div`
  display: flex;
`

export const ResposiveSavedVideosContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#181818' : '#f1f1f1')};
  width: 100%;
  max-width: 1250px;
`
export const SavedVideosHedingContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#231f20' : '#ebebeb')};
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
`
export const SavedVideosIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  background-color: ${props => (props.bgColor ? '#000000' : '#f9f9f9')};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export const SavedVideosHeading = styled.h1`
  font-family: Roboto;
  font-size: 25px;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-weight: bold;
  padding-left: 10px;
`

export const SavedVideosItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0px;
  margin: 20px;
  overflow-y: scroll;
  height: 120vh;
`
export const Link = styled(RouterLink)`
  display: flex;
  text-decoration: none;
`

export const ThumbnailItem = styled.img`
  width: 100%;
  height: 250px;
  @media screen and (min-width: 768px) {
    width: 500px;
    height: 250px;
  }
`

export const ListVideoItem = styled.li`
  list-style: none;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 0px;
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`

export const VideoDescription = styled.p`
  font-family: Roboto;
  font-size: 25px;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  max-width: 668px;
  padding: 5px;
  margin: 0px;
`

export const ChannelNameAndViews = styled.p`
  font-family: Roboto;
  font-size: 15px;
  color: #7e858e;
  padding: 5px;
  margin: 0px;
`

export const SavedNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const SearchResultNotFounfImg = styled.img`
  width: 100%;
  height: 400px;
  @media screen and (min-width: 768px) {
    width: 500px;
    height: 400px;
  }
`

export const SavedNotFoundHeading = styled.h1`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 25px;
  font-weight: 600;
  padding: 0px;
  margin: 0px;
`

export const SavedNotFoundDescription = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-size: 20px;
`
