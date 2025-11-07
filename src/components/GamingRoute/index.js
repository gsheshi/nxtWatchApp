import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {IoGameController} from 'react-icons/io5'
import Header from '../Header'
import SideBarOptions from '../SideBarOptions'
import CreateAppContext from '../../Context/CreateAppContext'
import MobileViewOption from '../MobileViewOption'
import {
  GamingRouteContainer,
  ResponsiveGamingContainer,
  GamingHedingContainer,
  GamingIconContainer,
  GamingHeading,
  GamingUnorderList,
  GamingList,
  Link,
  GamingThumbnail,
  GamingDescription,
  GamingViews,
  FetchingDataConatainer,
  FetchingDataImg,
  FetchingDataHeading,
  FetchingDataDescription,
  TryAgainButton,
  LoaderContainer,
} from './styledComponent'

const status = {
  isInitial: 'INITIAL',
  isLoading: 'LOADING',
  isFetching: 'FETCHING',
  isFailure: 'FAILURE',
}

class GamingRoute extends Component {
  state = {
    gamingVideos: [],
    statusItem: status.isInitial,
  }

  componentDidMount() {
    this.getGamingData()
  }

  static getFormatedData = data => ({
    id: data.id,
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
  })

  retryButton = () => {
    this.setState(
      {gamingVideos: [], statusItem: status.isLoading},
      this.getGamingData,
    )
  }

  getGamingData = async () => {
    this.setState({statusItem: status.isLoading})
    const url = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const respons = await fetch(url, options)
    if (respons.ok === true) {
      const data = await respons.json()
      const updatedData = data.videos.map(eachItem =>
        GamingRoute.getFormatedData(eachItem),
      )

      this.setState({gamingVideos: updatedData, statusItem: status.isFetching})
    } else {
      this.setState({statusItem: status.isFailure})
    }
  }

  renderFetchingFailureItem = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        const failureImgUrl = colorStatus
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
        return (
          <FetchingDataConatainer>
            <FetchingDataImg src={failureImgUrl} alt="failure view" />
            <FetchingDataHeading color={colorStatus}>
              Oops! Something Went Wrong
            </FetchingDataHeading>
            <FetchingDataDescription color={colorStatus}>
              We are having some trouble
            </FetchingDataDescription>
            <TryAgainButton type="button" onClick={this.retryButton}>
              Retry
            </TryAgainButton>
          </FetchingDataConatainer>
        )
      }}
    </CreateAppContext.Consumer>
  )

  static renderBeforeFetchingDataLoading = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" width={80} height={80} color="#3b82f6" />
    </LoaderContainer>
  )

  renderGameVideosItems = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        const {gamingVideos} = this.state
        return (
          <GamingUnorderList>
            {gamingVideos.map(eachItem => (
              <GamingList key={eachItem.id}>
                <Link to={`/videos/${eachItem.id}`}>
                  <GamingThumbnail
                    src={eachItem.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <GamingDescription color={colorStatus}>
                    {eachItem.title}
                  </GamingDescription>
                  <GamingViews>
                    {eachItem.viewCount} Watching Worldwide
                  </GamingViews>
                </Link>
              </GamingList>
            ))}
          </GamingUnorderList>
        )
      }}
    </CreateAppContext.Consumer>
  )

  renderAllItems = () => {
    const {statusItem} = this.state
    switch (statusItem) {
      case status.isLoading:
        return GamingRoute.renderBeforeFetchingDataLoading()
      case status.isFailure:
        return this.renderFetchingFailureItem()
      case status.isFetching:
        return this.renderGameVideosItems()
      default:
        return null
    }
  }

  render() {
    return (
      <CreateAppContext.Consumer>
        {value => {
          const {colorStatus} = value
          return (
            <>
              <Header />
              <GamingRouteContainer>
                <SideBarOptions />
                <ResponsiveGamingContainer bgColor={colorStatus}>
                  <GamingHedingContainer bgColor={colorStatus}>
                    <GamingIconContainer bgColor={colorStatus}>
                      <IoGameController />
                    </GamingIconContainer>
                    <GamingHeading color={colorStatus}>Gaming</GamingHeading>
                  </GamingHedingContainer>
                  {this.renderAllItems()}
                </ResponsiveGamingContainer>
              </GamingRouteContainer>
              <MobileViewOption />
            </>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }
}

export default GamingRoute
