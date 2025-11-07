import {useLocation} from 'react-router-dom'
import {IoGameController} from 'react-icons/io5'
import {AiFillHome} from 'react-icons/ai'
import {FaFire} from 'react-icons/fa'
import {RiPlayListAddLine} from 'react-icons/ri'
import {
  MobileSideBarList,
  MobileOption,
  MobileLink,
  MobileOptionIconContainer,
} from './styledComponents'
import CreateAppContext from '../../Context/CreateAppContext'

const MobileViewOption = () => {
  const location = useLocation()
  return (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        const optionStatus = location.pathname
        return (
          <MobileSideBarList bgColor={colorStatus}>
            <MobileOption isActive={optionStatus === '/'}>
              <MobileLink to="/">
                <MobileOptionIconContainer isActive={optionStatus === '/'}>
                  <AiFillHome />
                </MobileOptionIconContainer>
              </MobileLink>
            </MobileOption>
            <MobileOption
              bgColor={colorStatus}
              isActive={optionStatus === '/trending'}
            >
              <MobileLink to="/trending">
                <MobileOptionIconContainer
                  isActive={optionStatus === '/trending'}
                >
                  <FaFire />
                </MobileOptionIconContainer>
              </MobileLink>
            </MobileOption>
            <MobileOption isActive={optionStatus === '/gaming'}>
              <MobileLink to="/gaming">
                <MobileOptionIconContainer
                  isActive={optionStatus === '/gaming'}
                >
                  <IoGameController />
                </MobileOptionIconContainer>
              </MobileLink>
            </MobileOption>
            <MobileOption isActive={optionStatus === '/saved-videos'}>
              <MobileLink to="/saved-videos">
                <MobileOptionIconContainer
                  isActive={optionStatus === '/saved-videos'}
                >
                  <RiPlayListAddLine />
                </MobileOptionIconContainer>
              </MobileLink>
            </MobileOption>
          </MobileSideBarList>
        )
      }}
    </CreateAppContext.Consumer>
  )
}

export default MobileViewOption
