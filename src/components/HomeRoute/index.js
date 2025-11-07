import {Component} from 'react'
import {formatDistanceToNow} from 'date-fns'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdSearch, IoMdClose} from 'react-icons/io'
import Header from '../Header'
import SideBarOptions from '../SideBarOptions'
import MobileViewOption from '../MobileViewOption'
import CreateAppContext from '../../Context/CreateAppContext'
import {
  HomeContainer,
  HomeResponsiveContainer,
  BannerImageContainer,
  BannerContent,
  BannerLogo,
  BannerText,
  BannerButton,
  BannerCloseContainer,
  BannerCloseButton,
  SearchBarContainer,
  SearchInput,
  SearchIconButton,
  VideoThumbnailUnorderList,
  ListItem,
  VideoThumbnailImg,
  ProfileContainer,
  ProfileImg,
  VideoDescriptionContent,
  DescriptionDetailText,
  YearAndViews,
  SearchNotFoundContainer,
  SearchResultNotFoundImg,
  SeachResultHeading,
  SearchResultDescription,
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

class HomeRoute extends Component {
  state = {
    closeBanner: true,
    videosList: [],
    searchInput: '',
    statusItems: status.isInitial,
  }

  componentDidMount() {
    this.getVideosItem()
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

  getVideosItem = async () => {
    this.setState({statusItems: status.isLoading})
    const url = 'https://apis.ccbp.in/videos/all?search='
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
      const videosData = data.videos
      const updatedData = videosData.map(eachItem =>
        HomeRoute.getFormatData(eachItem),
      )
      this.setState({videosList: updatedData, statusItems: status.isFetching})
    } else {
      this.setState({statusItems: status.isFailure})
    }
  }

  onClickClose = () => {
    this.setState({closeBanner: false})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  retryButton = () => {
    this.setState(
      {videosList: [], statusItems: status.isLoading},
      this.getVideosItem,
    )
  }

  renderbannerSection = () => {
    const {closeBanner} = this.state
    return (
      <>
        {closeBanner && (
          <BannerImageContainer data-testid="banner">
            <BannerContent>
              <BannerLogo
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                alt="nxt watch logo"
              />
              <BannerText>
                Buy Nxt Watch Premium prepaid with <br />
                UPI
              </BannerText>
              <BannerButton type="button">GET IT NOW</BannerButton>
            </BannerContent>
            <BannerCloseContainer>
              <BannerCloseButton
                className="close-button"
                type="button"
                data-testid="close"
                onClick={this.onClickClose}
              >
                <IoMdClose size="30" color="#616e7c" />
              </BannerCloseButton>
            </BannerCloseContainer>
          </BannerImageContainer>
        )}
      </>
    )
  }

  static renderSearchNotFoundResult = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        return (
          <SearchNotFoundContainer>
            <SearchResultNotFoundImg
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              alt="no videos"
            />
            <SeachResultHeading color={colorStatus}>
              No Search results found
            </SeachResultHeading>
            <SearchResultDescription color={colorStatus}>
              Try different key words or remove search filter
            </SearchResultDescription>
          </SearchNotFoundContainer>
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

  renderVideosItems = () => {
    const {videosList, searchInput} = this.state
    const searchResult = videosList.filter(eachItem =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase()),
    )
    return (
      <CreateAppContext.Consumer>
        {value => {
          const {colorStatus} = value
          return (
            <>
              {searchResult.length > 0 ? (
                <VideoThumbnailUnorderList>
                  {searchResult.map(eachItem => (
                    <ListItem key={eachItem.id}>
                      <Link to={`/videos/${eachItem.id}`}>
                        <VideoThumbnailImg
                          src={eachItem.thumbnailUrl}
                          alt="video thumbnail"
                        />
                      </Link>
                      <ProfileContainer>
                        <ProfileImg
                          src={eachItem.channel.profileImageUrl}
                          alt="channel logo"
                        />
                        <VideoDescriptionContent>
                          <DescriptionDetailText color={colorStatus}>
                            {eachItem.title}
                          </DescriptionDetailText>
                          <YearAndViews colorName={colorStatus}>
                            {eachItem.channel.name}
                          </YearAndViews>
                          <YearAndViews colorName={colorStatus}>
                            {eachItem.viewCount} views &bull;{' '}
                            {eachItem.publishedAt}
                          </YearAndViews>
                        </VideoDescriptionContent>
                      </ProfileContainer>
                    </ListItem>
                  ))}
                </VideoThumbnailUnorderList>
              ) : (
                HomeRoute.renderSearchNotFoundResult()
              )}
            </>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }

  static renderBeforeFetchingDataLoading = () => (
    <LoaderContainer data-testid="loader">
      <Loader type="ThreeDots" width={80} height={80} color="#3b82f6" />
    </LoaderContainer>
  )

  renderAllItems = () => {
    const {statusItems} = this.state
    switch (statusItems) {
      case status.isLoading:
        return HomeRoute.renderBeforeFetchingDataLoading()
      case status.isFailure:
        return this.renderFetchingFailureItem()
      case status.isFetching:
        return this.renderVideosItems()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <CreateAppContext.Consumer>
        {value => {
          const {colorStatus} = value
          return (
            <>
              <Header />
              <HomeContainer>
                <SideBarOptions />
                <HomeResponsiveContainer
                  bgColor={colorStatus}
                  data-testid="home"
                >
                  {this.renderbannerSection()}
                  <SearchBarContainer bgColor={colorStatus}>
                    <SearchInput
                      type="search"
                      placeholder="Search"
                      value={searchInput}
                      onChange={this.onChangeSearch}
                      color={colorStatus}
                    />
                    <SearchIconButton
                      bgColor={colorStatus}
                      data-testid="searchButton"
                      type="button"
                    >
                      <IoMdSearch size={30} />
                    </SearchIconButton>
                  </SearchBarContainer>
                  {this.renderAllItems()}
                </HomeResponsiveContainer>
              </HomeContainer>
              <MobileViewOption />
            </>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }
}

export default HomeRoute
