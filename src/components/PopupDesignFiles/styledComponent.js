import styled from 'styled-components'

export const PopupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PopupImageContainer = styled.div`
  background-color: ${props => (props.bgColor ? '#212121' : '#ffffff')};
  width: 400px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

export const AlertLogOut = styled.p`
  font-family: Roboto;
  color: ${props => (props.color ? '#ffffff' : '#0f0f0f')};
  font-size: 20px;
`

export const CancelButton = styled.button`
  background-color: transparent;
  font-size: 15px;
  border: 2px solid ${props => (props.color ? '#ffffff' : '#000000')};
  width: 100px;
  height: 40px;
  color: ${props => (props.color ? '#ffffff' : '#000000')};
  outline: none;
  border-radius: 5px;
`

export const ConfirmButton = styled.button`
  background-color: #3b82f6;
  font-size: 15px;
  width: 100px;
  height: 40px;
  color: #ffffff;
  margin-left: 20px;
  outline: none;
  border: none;
  border-radius: 5px;
`

export const LogOutButton = styled.button`
  background-color: transparent;
  border: 2px solid ${props => (props.color ? '#ffffff' : '#4f46e5')};
  width: 60px;
  height: 30px;
  border-radius: 5px;
  margin-left: 15px;
  color: ${props => (props.color ? '#ffffff' : '#4f46e5')};
  @media screen and (min-width: 768px) {
    width: 80px;
    height: 40px;
  }
`
