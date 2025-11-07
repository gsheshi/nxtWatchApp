import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import CreateAppContext from '../../Context/CreateAppContext'
import {
  LoginAppContainer,
  FormContainer,
  LoginLogo,
  InputContaier,
  LabelText,
  UserInput,
  ShowPasswordContainer,
  ShowPasswordLabel,
  CheckBox,
  LoginButton,
  ErrorMsg,
} from './styledComponent'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    unAuthorizationMsg: '',
    showPassword: false,
  }

  onChangeInput = event => {
    this.setState({[event.target.id]: event.target.value})
  }

  onTogglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({unAuthorizationMsg: errorMsg})
  }

  onSubmitLoginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'

    const details = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(details),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <CreateAppContext.Consumer>
        {value => {
          const {colorStatus} = value
          const {
            username,
            password,
            unAuthorizationMsg,
            showPassword,
          } = this.state
          return (
            <LoginAppContainer bgColor={colorStatus}>
              <FormContainer
                onSubmit={this.onSubmitLoginForm}
                bgColor={colorStatus}
              >
                <LoginLogo
                  src={
                    colorStatus
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                />
                <InputContaier>
                  <LabelText htmlFor="username" color={colorStatus}>
                    USERNAME
                  </LabelText>
                  <UserInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    value={username}
                    onChange={this.onChangeInput}
                    bgColor={colorStatus}
                  />
                </InputContaier>
                <InputContaier>
                  <LabelText htmlFor="password" color={colorStatus}>
                    PASSWORD
                  </LabelText>
                  <UserInput
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.onChangeInput}
                    bgColor={colorStatus}
                  />
                  <ShowPasswordContainer>
                    <CheckBox
                      type="checkbox"
                      id="showPassword"
                      onChange={this.onTogglePassword}
                    />
                    <ShowPasswordLabel
                      htmlFor="showPassword"
                      color={colorStatus}
                    >
                      Show Password
                    </ShowPasswordLabel>
                  </ShowPasswordContainer>
                </InputContaier>
                <LoginButton type="submit">Login</LoginButton>
                <ErrorMsg>{unAuthorizationMsg}</ErrorMsg>
              </FormContainer>
            </LoginAppContainer>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }
}

export default LoginRoute
