import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import {LoginButton} from './styledComponent'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isChecked: false,
    errorMsg: '',
    submissionStatus: '',
  }

  onSubmitForm = event => {
    event.preventDefault()
    this.getData()
  }

  onSuccessSubmssion = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')

    this.setState({submissionStatus: false})
  }

  onFailureSubmission = errorMsg => {
    this.setState({errorMsg, submissionStatus: true})
  }

  getData = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify({username, password}),
    }

    const response = await fetch(url, options)

    const data = await response.json()
    //  console.log(data)

    if (response.ok) {
      this.onSuccessSubmssion(data.jwt_token)
    } else {
      this.onFailureSubmission(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePssword = event => {
    this.setState({password: event.target.value})
  }

  onChangeCheckbox = event => {
    this.setState({isChecked: event.target.checked})
  }

  render() {
    const {username, password, isChecked, errorMsg, submissionStatus} =
      this.state
    console.log(isChecked)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to='/' />
    }

    return (
      <form className='login-bg' onSubmit={this.onSubmitForm}>
        <div className='card'>
          <div className='channel-logo-container'>
            <img
              src='https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
              alt='website logo'
              className='channel-logo'
            />
          </div>

          <div className='label-input-container'>
            <label htmlFor='inbox-1' className='label'>
              USERNAME
            </label>
            <input
              type='text'
              id='inbox-1'
              className='input'
              placeholder='Username'
              onChange={this.onChangeUsername}
              value={username}
            />
          </div>
          <div className='label-input-container'>
            <label htmlFor='inbox-2' className='label'>
              PASSWORD
            </label>
            <input
              type={isChecked ? 'text' : 'password'}
              id='inbox-2'
              className='input'
              placeholder='Password'
              onChange={this.onChangePssword}
              value={password}
            />
          </div>

          <div className='show-password-container'>
            <input
              type='checkbox'
              id='checkbox'
              onChange={this.onChangeCheckbox}
              checked={isChecked}
            />
            <label htmlFor='checkbox'>Show Password</label>
          </div>
          <LoginButton type='submit'>Login</LoginButton>

          {submissionStatus && <p className='err-msg'>*{errorMsg}</p>}
        </div>
      </form>
    )
  }
}

export default Login
