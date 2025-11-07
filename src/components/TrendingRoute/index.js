import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Header from '../Header'
import SideBarOptions from '../SideBarOptions'
import CreateAppContext from '../../Context/CreateAppContext'
import MobileViewOption from '../MobileViewOption'

import {
  TrendingContainer,
  ResposiveTrendingContainer,
  TrendingHedingContainer,
  TrendingIconContainer,
  TrendingHeading,
  TrendingVideoItemContainer,
  Link,
  ThumbnailItem,
  ListVideoItem,
  DescriptionContainer,
  ChannelNameAndViews,
  VideoDescription,
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

class TrendingRoute extends Component {
  state = {
    trendingVideo: [],
    statusItems: status.isInitial,
  }

  componentDidMount() {
    this.getTrendingVideo()
  }

  static getFormatData = data => ({
    id: data.id,
    publishedAt: formatDistanceToNow(new Date(data.published_at)),
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    viewCount: data.view_count,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
    },
  })

  retryButton = () => {
    this.setState(
      {trendingVideo: [], statusItems: status.isLoading},
      this.getTrendingVideo,
    )
  }

  getTrendingVideo = async () => {
    this.setState({statusItems: status.isLoading})
    const url = 'https://apis.ccbp.in/videos/trending'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.videos.map(eachItem =>
        TrendingRoute.getFormatData(eachItem),
      )
      this.setState({
        trendingVideo: updatedData,
        statusItems: status.isFetching,
      })
    } else {
      this.setState({statusItems: status.isFailure})
    }
  }

  renderTrendingData = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        const {trendingVideo} = this.state
        return (
          <TrendingVideoItemContainer>
            {trendingVideo.map(eachItem => (
              <Link to={`/videos/${eachItem.id}`}>
                <ListVideoItem key={eachItem.id}>
                  <ThumbnailItem
                    src={eachItem.thumbnailUrl}
                    alt="video thumbnail"
                  />
                  <DescriptionContainer>
                    <VideoDescription color={colorStatus}>
                      {eachItem.title}
                    </VideoDescription>
                    <ChannelNameAndViews>
                      {eachItem.channel.name}
                    </ChannelNameAndViews>
                    <ChannelNameAndViews>
                      {eachItem.viewCount} views &bull; {eachItem.publishedAt}
                    </ChannelNameAndViews>
                  </DescriptionContainer>
                </ListVideoItem>
              </Link>
            ))}
          </TrendingVideoItemContainer>
        )
      }}
    </CreateAppContext.Consumer>
  )

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

  renderAllItems = () => {
    const {statusItems} = this.state
    switch (statusItems) {
      case status.isLoading:
        return TrendingRoute.renderBeforeFetchingDataLoading()
      case status.isFailure:
        return this.renderFetchingFailureItem()
      case status.isFetching:
        return this.renderTrendingData()
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
              <TrendingContainer>
                <SideBarOptions />
                <ResposiveTrendingContainer bgColor={colorStatus}>
                  <TrendingHedingContainer bgColor={colorStatus}>
                    <TrendingIconContainer bgColor={colorStatus}>
                      <FaFire />
                    </TrendingIconContainer>
                    <TrendingHeading color={colorStatus}>
                      Trending
                    </TrendingHeading>
                  </TrendingHedingContainer>
                  {this.renderAllItems()}
                </ResposiveTrendingContainer>
              </TrendingContainer>
              <MobileViewOption />
            </>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }
}

export default TrendingRoute
