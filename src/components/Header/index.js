import {IoSunny, IoMoon} from 'react-icons/io5'
import CreateAppContext from '../../Context/CreateAppContext'
import {
  NvaBarContainer,
  Link,
  NavBarLogo,
  ProfileAndOtherOptionsContainer,
  NavBarDarkAndLightIcon,
  ProfileImg,
  DarkAndLightBtn,
} from './styledComponent'
import PopupDesignFiles from '../PopupDesignFiles'

const Header = () => (
  <CreateAppContext.Consumer>
    {value => {
      const {bgThemeToggle, colorStatus} = value
      const onClickIconTheme = () => {
        bgThemeToggle()
      }
      const websiteLogo = colorStatus
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
      return (
        <NvaBarContainer bgColor={colorStatus}>
          <div>
            <Link to="/">
              <NavBarLogo src={websiteLogo} alt="website logo" />
            </Link>
          </div>
          <ProfileAndOtherOptionsContainer>
            <NavBarDarkAndLightIcon>
              <DarkAndLightBtn
                type="button"
                data-testid="theme"
                onClick={onClickIconTheme}
                color={colorStatus}
              >
                {colorStatus ? <IoSunny size={30} /> : <IoMoon size={30} />}
              </DarkAndLightBtn>
            </NavBarDarkAndLightIcon>
            <ProfileImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
            />
            <PopupDesignFiles />
          </ProfileAndOtherOptionsContainer>
        </NvaBarContainer>
      )
    }}
  </CreateAppContext.Consumer>
)

export default Header
