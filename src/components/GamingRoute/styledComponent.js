import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

export const GamingRouteContainer = styled.div`
  display: flex;
`

export const ResponsiveGamingContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#181818' : '#f1f1f1')};
  width: 100%;
  max-width: 1250px;
  min-height: 100vh;
`
export const GamingHedingContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#231f20' : '#ebebeb')};
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-left: 20px;
`
export const GamingIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ff0000;
  background-color: ${props => (props.bgColor ? '#000000' : '#f9f9f9')};
  width: 50px;
  height: 50px;
  border-radius: 25px;
`

export const GamingHeading = styled.h1`
  font-family: Roboto;
  font-size: 25px;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  font-weight: bold;
  padding-left: 10px;
`
export const GamingUnorderList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  margin: 20px;
  overflow-y: scroll;
  height: 768px;
`

export const GamingList = styled.li`
  list-style: none;
  padding: 0px;
  margin: 10px;
`
export const Link = styled(RouterLink)`
  text-decoration: none;
`

export const GamingThumbnail = styled.img`
  width: 100%;
  height: 400px;
  @media screen and (min-width: 768px){
    width: 250px;
    height: 400px:
  }
`
export const GamingDescription = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  foont-size: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin: 0px;
`
export const GamingViews = styled.p`
  font-family: Roboto;
  color: #64748b;
  foont-size: 20px;
  padding: 0px;
  margin: 0px;
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
  min-height: 50vh;
`
