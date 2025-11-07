import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const MobileSideBarList = styled.ul`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${props => (props.bgColor ? '#181818' : '#f1f1f1')};
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  margin: 0;
  list-style: none;
  z-index: 1000;
  border-top: 1px solid #ccc;

  @media (min-width: 768px) {
    display: none; /* Show only on mobile */
  }
`

export const MobileOption = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${props => (props.isActive ? '#ff0000' : '#606060')};
`

export const MobileLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`

export const MobileOptionIconContainer = styled.div`
  font-size: 24px;
  color: ${props => (props.isActive ? '#ff0000' : '#606060')};
`
