import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {RiPlayListAddLine} from 'react-icons/ri'
import ReactPlayer from 'react-player'
import Header from '../Header'
import SideBarOptions from '../SideBarOptions'
import CreateAppContext from '../../Context/CreateAppContext'
import MobileViewOption from '../MobileViewOption'

import {
  VideoItemContianer,
  ResposiveVideoItem,
  DescriptionContainer,
  Description,
  LikeAndViewsSection,
  HorizontalLine,
  SectionContainer,
  YearsAndViewsLikes,
  LikeButton,
  DisLikeButton,
  SaveVideoButton,
  ChannelNameAndSubscribersContainer,
  ChannelNameAndDescription,
  VideoViews,
  ChannelProfileImg,
  LoaderContainer,
} from './styledComponent'

const status = {
  isInitial: 'INITIAL',
  isLoading: 'LOADING',
  isFetching: 'FETCHING',
}

class VideoItemDetailsRoute extends Component {
  state = {
    videoItem: {},
    statusItems: status.isInitial,
  }

  componentDidMount() {
    this.getVideoItem()
  }

  static getFormatData = data => ({
    description: data.description,
    id: data.id,
    publishedAt: formatDistanceToNow(new Date(data.published_at)),
    thumbnailUrl: data.thumbnail_url,
    title: data.title,
    videoUrl: data.video_url,
    viewCount: data.view_count,
    channel: {
      name: data.channel.name,
      profileImageUrl: data.channel.profile_image_url,
      subscriberCount: data.channel.subscriber_count,
    },
  })

  retryButton = () => {
    this.setState(
      {videoItem: {}, statusItems: status.isLoading},
      this.getVideoItem,
    )
  }

  getVideoItem = async () => {
    this.setState({statusItems: status.isLoading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/videos/${id}`

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
      const updatedData = VideoItemDetailsRoute.getFormatData(
        data.video_details,
      )
      this.setState({videoItem: updatedData, statusItems: status.isFetching})
    } else {
      this.setState({statusItems: status.isFailure})
    }
  }

  renderVideoItem = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {
          colorStatus,
          saveVideoItem,
          saveVideos,
          likeItem,
          dislikeItem,
          likedVideos,
          dislikedVideos,
        } = value
        const {videoItem} = this.state
        const {channel = {}} = videoItem
        const {name, profileImageUrl, subscriberCount} = channel
        const onClickSaveVideo = () => {
          saveVideoItem({...videoItem})
        }
        const onClickLike = () => {
          likeItem(videoItem.id)
        }
        const onClickDislike = () => {
          dislikeItem(videoItem.id)
        }

        const saveItemColor = saveVideos.some(
          saved => saved.id === videoItem.id,
        )

        console.log('Like', likedVideos[videoItem.id])
        console.log('Dislike', dislikedVideos[videoItem.id])
        return (
          <>
            <ReactPlayer
              url={videoItem.videoUrl}
              controls
              light={videoItem.thumbnailUrl}
              width="100%"
              height="100%"
            />
            <DescriptionContainer>
              <Description color={colorStatus}>{videoItem.title}</Description>
              <LikeAndViewsSection>
                <SectionContainer>
                  <YearsAndViewsLikes color={colorStatus}>
                    {videoItem.viewCount} views &bull;{' '}
                    {videoItem.publishedAt
                      ? videoItem.publishedAt
                      : 'Loading...'}
                  </YearsAndViewsLikes>
                </SectionContainer>
                <SectionContainer>
                  <LikeButton
                    type="button"
                    color={likedVideos[videoItem.id]}
                    onClick={onClickLike}
                  >
                    <AiOutlineLike /> Like
                  </LikeButton>
                  <DisLikeButton
                    type="button"
                    color={dislikedVideos[videoItem.id]}
                    onClick={onClickDislike}
                  >
                    <AiOutlineDislike /> Dislike
                  </DisLikeButton>
                  <SaveVideoButton
                    type="button"
                    onClick={onClickSaveVideo}
                    color={saveItemColor}
                  >
                    <RiPlayListAddLine />
                    {saveItemColor ? 'Saved' : 'Save'}
                  </SaveVideoButton>
                </SectionContainer>
              </LikeAndViewsSection>
              <HorizontalLine />
              <ChannelNameAndSubscribersContainer>
                <ChannelProfileImg src={profileImageUrl} alt="channel logo" />
                <div>
                  <ChannelNameAndDescription color={colorStatus}>
                    {name}
                  </ChannelNameAndDescription>
                  <VideoViews color={colorStatus}>
                    {subscriberCount} Subscribers
                  </VideoViews>
                  <ChannelNameAndDescription color={colorStatus}>
                    {videoItem.description}
                  </ChannelNameAndDescription>
                </div>
              </ChannelNameAndSubscribersContainer>
            </DescriptionContainer>
          </>
        )
      }}
    </CreateAppContext.Consumer>
  )

  static renderBeforeFetchingDataLoading = () => (
    <CreateAppContext.Consumer>
      {value => {
        const {colorStatus} = value
        return (
          <LoaderContainer data-testid="loader">
            <Loader
              type="ThreeDots"
              width={80}
              height={80}
              color={colorStatus ? '#ffffff' : '#3b82f6'}
            />
          </LoaderContainer>
        )
      }}
    </CreateAppContext.Consumer>
  )

  renderAllItems = () => {
    const {statusItems} = this.state
    switch (statusItems) {
      case status.isLoading:
        return VideoItemDetailsRoute.renderBeforeFetchingDataLoading()
      case status.isFetching:
        return this.renderVideoItem()
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
              <VideoItemContianer>
                <SideBarOptions />
                <ResposiveVideoItem bgColor={colorStatus}>
                  {this.renderAllItems()}
                </ResposiveVideoItem>
              </VideoItemContianer>
              <MobileViewOption />
            </>
          )
        }}
      </CreateAppContext.Consumer>
    )
  }
}

export default VideoItemDetailsRoute
