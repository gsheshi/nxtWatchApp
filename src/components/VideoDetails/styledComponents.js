import styled from 'styled-components'

export const LikeButton = styled.button`
  display: flex;
  align-items: center;
  color: ${props => (props.isLiked === true ? '#2563eb' : '#64748b')};
  border-style: none;
  margin-right: 10px;
`
export const DislikeButton = styled.button`
  display: flex;
  align-items: center;
  color: ${props => (props.isDisliked === true ? '#2563eb' : '#64748b')};
  border-style: none;
  margin-right: 10px;
`
