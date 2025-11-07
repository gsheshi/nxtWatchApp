import styled from 'styled-components'

export const VideoItemContianer = styled.div`
  display: flex;
`

export const ResposiveVideoItem = styled.div`
  background-color: ${props => (props.bgColor ? '#181818' : '#f1f1f1')};
  width: 100%;
  max-width: 1250px;
  padding: 20px;
`

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`
export const Description = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#f9f9f9' : '#0f0f0f')};
  font-size: 15px;
`
export const LikeAndViewsSection = styled.div`
  display: flex;
  justify-content: space-between;
`

export const HorizontalLine = styled.hr`
  width: 100%;
`

export const SectionContainer = styled.div`
  display: flex;
  align-items: center;
`

export const YearsAndViewsLikes = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#616e7c' : '#475569')};
  font-size: 15px;
  padding: 4px;
  margin: 0px;
`

export const LikeButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => (props.color ? '#2563eb' : '#64748b')};
`

export const DisLikeButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => (props.color ? '#2563eb' : '#64748b')};
`

export const SaveVideoButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  color: ${props => (props.color ? '#3b82f6' : '#475569')};
`

export const ChannelNameAndSubscribersContainer = styled.div`
  display: flex;
`
export const ChannelNameAndDescription = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#f9f9f9' : '#0f0f0f')};
  font-size: 15px;
`
export const VideoViews = styled.p`
  font-family: Roboto;
  color: #7e858e;
  font-siz: 15px;
`

export const ChannelProfileImg = styled.img`
  width: 50px;
  height: 40px;
  margin-top: 15px;
  padding-right: 10px;
`

export const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`
