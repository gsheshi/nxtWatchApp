import {useLocation} from 'react-router-dom'
import {IoGameController} from 'react-icons/io5'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {RiPlayListAddLine} from 'react-icons/ri'
import CreateAppContext from '../../Context/CreateAppContext'
import {
  SideBarContainer,
  SideBarList,
  Option,
  Link,
  OptionIconContainer,
  ContentText,
  ContactLogo,
} from './styledComponent'

const SideBarOptions = () => {
  const location = useLocation()

  return (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        const optionStatus = location.pathname
        return (
          <SideBarContainer bgColor={colorStatus}>
            <SideBarList>
              <Option bgColor={colorStatus} isActive={optionStatus === '/'}>
                <Link to="/">
                  <OptionIconContainer isActive={optionStatus === '/'}>
                    <AiFillHome />
                  </OptionIconContainer>
                  Home
                </Link>
              </Option>
              <Option
                bgColor={colorStatus}
                isActive={optionStatus === '/trending'}
              >
                <Link to="/trending">
                  <OptionIconContainer isActive={optionStatus === '/trending'}>
                    <FaFire />
                  </OptionIconContainer>
                  Trending
                </Link>
              </Option>
              <Option
                bgColor={colorStatus}
                isActive={optionStatus === '/gaming'}
              >
                <Link to="/gaming">
                  <OptionIconContainer isActive={optionStatus === '/gaming'}>
                    <IoGameController />
                  </OptionIconContainer>
                  Gaming
                </Link>
              </Option>
              <Option
                bgColor={colorStatus}
                isActive={optionStatus === '/saved-videos'}
              >
                <Link to="/saved-videos">
                  <OptionIconContainer
                    isActive={optionStatus === '/saved-videos'}
                  >
                    <RiPlayListAddLine />
                  </OptionIconContainer>
                  Saved Videos
                </Link>
              </Option>
            </SideBarList>
            <div>
              <ContentText font={600} color={colorStatus}>
                CONTACT US
              </ContentText>
              <div>
                <ContactLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <ContactLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <ContactLogo
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked in logo"
                />
              </div>
              <ContentText color={colorStatus}>
                Enjoy! Now to see your channels and recommendations!
              </ContentText>
            </div>
          </SideBarContainer>
        )
      }}
    </CreateAppContext.Consumer>
  )
}

export default SideBarOptions
