import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import CreateAppContext from '../../Context/CreateAppContext'
import {
  PopupContainer,
  PopupImageContainer,
  AlertLogOut,
  CancelButton,
  ConfirmButton,
  LogOutButton,
} from './styledComponent'

const PopupDesignFiles = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        return (
          <Popup
            modal
            trigger={
              <LogOutButton type="button" color={colorStatus}>
                Logout
              </LogOutButton>
            }
          >
            {close => (
              <PopupContainer>
                <PopupImageContainer bgColor={colorStatus}>
                  <AlertLogOut color={colorStatus}>
                    Are you sure, you want to logout
                  </AlertLogOut>
                  <div>
                    <CancelButton
                      type="button"
                      data-testid="closeButton"
                      onClick={() => close()}
                      color={colorStatus}
                    >
                      Cancel
                    </CancelButton>
                    <ConfirmButton type="button" onClick={onClickLogout}>
                      Confirm
                    </ConfirmButton>
                  </div>
                </PopupImageContainer>
              </PopupContainer>
            )}
          </Popup>
        )
      }}
    </CreateAppContext.Consumer>
  )
}

export default withRouter(PopupDesignFiles)
