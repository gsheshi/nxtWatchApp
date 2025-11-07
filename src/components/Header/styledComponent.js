import styled from 'styled-components'
import {Link as RouterLink} from 'react-router-dom'

export const NvaBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.bgColor ? '#212121' : '#ffffff')};
  padding: 25px;
`

export const Link = styled(RouterLink)`
  text-decoration: npone;
`

export const NavBarLogo = styled.img`
  width: 80px;
  height: 20px;
  @media screen and (min-width: 768px) {
    width: 160px;
    height: 40px;
  }
`

export const ProfileAndOtherOptionsContainer = styled.div`
  display: flex;
  align-items: center;
`

export const NavBarDarkAndLightIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

export const DarkAndLightBtn = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
`

export const ProfileImg = styled.img`
  width: 25px;
  height: 25px;
  @media screen and (min-width: 768px) {
    width: 40px;
    height: 40px;
  }
`
