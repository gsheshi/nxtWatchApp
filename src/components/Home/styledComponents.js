import styled from 'styled-components'

export const HomeTheme = styled.div`
  background-color: ${props => (props.theme === true ? '#181818' : '#f9f9f9')};
  display: flex;
  flex-direction: column;
  height: 100%;
`
export const Banner = styled.div`
  background-color: #ffffff;
  height: 100%;
  background-size: cover;
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border-color: transparent;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
`
