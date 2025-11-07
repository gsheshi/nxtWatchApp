import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

export const SideBarContainer = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: ${props => (props.bgColor ? '#212121' : '#ffffff')};
    width: 20%;
    padding-left: 20px;
    padding-top: 20px;
  }
`

export const SideBarList = styled.ul`
  padding: 0px;
  margin: 0px;
`

export const Option = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-top: 10px;
  background-color: ${props => {
    if (props.isActive) {
      return props.bgColor ? '#424242' : '#f1f5f9'
    }
    return 'transparent' // or leave it undefined if no color
  }};
`

export const Link = styled(RouterLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #475569;
`

export const OptionIconContainer = styled.div`
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.isActive ? '#ff0000' : '#94a3b8')};
`

export const ContentText = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#f1f1f1' : '#003063')};
  font-size: 15px;
  font-weight: ${props => props.font};
`

export const ContactLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`
