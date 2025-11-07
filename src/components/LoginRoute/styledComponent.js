import styled from 'styled-components'

export const LoginAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${props => (props.bgColor ? '#212121' : '#ffffff')};
`

export const FormContainer = styled.form`
  height: 440px;
  width: 300px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.5);
  padding: 30px;
  background-color: ${props => (props.bgColor ? '#000000' : '#ffffff')};
  @media screen and (min-width: 768px) {
    width: 400px;
    height: 420px;
  }
`

export const LoginLogo = styled.img`
  width: 250px;
  height: 50px;
`

export const InputContaier = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;
  width: 100%;
`

export const LabelText = styled.label`
  font-family: Roboto;
  font-size: 15px;
  font-weight: 600;
  padding-bottom: 5px;
  color: ${props => (props.color ? '#f1f1f1' : '#475569')};
`

export const UserInput = styled.input`
  height: 35px;
  border-radius: 5px;
  border: 2px solid #94a3b8;
  padding-left: 10px;
  background-color: ${props => (props.bgColor ? '#000000' : '#ffffff')};
  color: ${props => (props.bgColor ? '#f1f1f1' : '#475569')};
`

export const ShowPasswordContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`

export const ShowPasswordLabel = styled.label`
  cursor: pointer;
  font-size: 16px;
  color: ${props => (props.color ? '#f1f1f1' : '#000000')};
  font-weight: 500;
`

export const CheckBox = styled.input`
  margin-right: 8px;
  cursor: pointer;
  width: 15px;
  height: 15px;
`

export const LoginButton = styled.button`
  background-color: #3b82f6;
  border-radius: 10px;
  width: 100%;
  height: 40px;
  font-family: Roboto;
  font-size: 15px;
  color: #ffffff;
  outline: none;
  border: none;
  cursor: pointer;
`

export const ErrorMsg = styled.p`
  font-family: Roboto;
  font-size: 15px;
  color: #ff0000;
`
