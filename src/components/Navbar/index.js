import {Link, withRouter} from 'react-router-dom'

import Popup from 'reactjs-popup'

import Cookies from 'js-cookie'

import {BsBrightnessHigh, BsList, BsBoxArrowRight} from 'react-icons/bs'

import {IoMoon} from 'react-icons/io5'

import Context from '../../context/Context'

import './index.css'

const Navbar = props => {
  const onClickConfirm = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <Context.Consumer>
      {value => {
        const {theme, onChangeTheme, onChangeSidebar} = value

        return (
          <div>
            <div className={theme ? 'navbar' : 'navbar-light'}>
              <Link to="/">
                <img
                  src={
                    theme
                      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
                  }
                  alt="website logo"
                  className="nav-channel-logo"
                />
              </Link>

              <ul className="sm-nav">
                <li>
                  <button
                    data-testid="theme"
                    type="button"
                    className="light-button"
                    onClick={onChangeTheme}
                  >
                    {theme ? (
                      <BsBrightnessHigh className="light-icon" />
                    ) : (
                      <IoMoon className="light-icon-light" />
                    )}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="light-button"
                    onClick={onChangeSidebar}
                  >
                    <BsList
                      className={theme ? 'light-icon' : 'light-icon-light'}
                    />
                  </button>
                </li>

                <li>
                  <Popup
                    modal
                    trigger={
                      <button type="button" className="light-button">
                        <BsBoxArrowRight
                          className={theme ? 'light-icon' : 'light-icon-light'}
                        />
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="popup">
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <button type="button" onClick={() => close()}>
                            Cancel
                          </button>
                          <button type="button" onClick={onClickConfirm}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>

              <ul className="lg-nav">
                <li>
                  <button
                    data-testid="theme"
                    type="button"
                    className="light-button-lg"
                    onClick={onChangeTheme}
                  >
                    {theme ? (
                      <BsBrightnessHigh className="light-icon-lg" />
                    ) : (
                      <IoMoon className="light-icon-lg-light" />
                    )}
                  </button>
                </li>
                <li>
                  <button type="button" className="light-button-lg">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                      className="profile-img"
                      alt="profile"
                    />
                  </button>
                </li>
                <li>
                  <Popup
                    modal
                    trigger={
                      <button
                        type="button"
                        className={
                          theme ? 'logout-button-lg' : 'logout-button-lg-light'
                        }
                      >
                        Logout
                      </button>
                    }
                    className="popup-content"
                  >
                    {close => (
                      <div className="popup">
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <button type="button" onClick={() => close()}>
                            Cancel
                          </button>
                          <button type="button" onClick={onClickConfirm}>
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )
}

export default withRouter(Navbar)
