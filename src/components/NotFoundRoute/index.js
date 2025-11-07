import CreateAppContext from '../../Context/CreateAppContext'
import {
  NotFoundConainer,
  NotFoundImg,
  NotFoundHeading,
  NotFoundDescription,
} from './styledComponent'

const NotFoundRoute = () => (
  <CreateAppContext.Consumer>
    {value => {
      const {colorStatus} = value
      return (
        <NotFoundConainer bgColor={colorStatus}>
          <NotFoundImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
            alt="not found"
          />
          <NotFoundHeading color={colorStatus}>Page Not Found</NotFoundHeading>
          <NotFoundDescription color={colorStatus}>
            we are sorry, the page you requested could not be found.
          </NotFoundDescription>
        </NotFoundConainer>
      )
    }}
  </CreateAppContext.Consumer>
)

export default NotFoundRoute
