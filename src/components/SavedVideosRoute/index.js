import {RiPlayListAddLine} from 'react-icons/ri'
import Header from '../Header'
import SideBarOptions from '../SideBarOptions'
import CreateAppContext from '../../Context/CreateAppContext'
import MobileViewOption from '../MobileViewOption'

import {
  SavedVideosContainer,
  ResposiveSavedVideosContainer,
  SavedVideosHedingContainer,
  SavedVideosIconContainer,
  SavedVideosHeading,
  SavedVideosItemContainer,
  Link,
  ThumbnailItem,
  ListVideoItem,
  DescriptionContainer,
  VideoDescription,
  ChannelNameAndViews,
  SavedNotFoundContainer,
  SearchResultNotFounfImg,
  SavedNotFoundHeading,
  SavedNotFoundDescription,
} from './styledComponent'

const noSavedVideos = () => (
  <CreateAppContext.Consumer>
    {value => {
      const {colorStatus} = value
      return (
        <SavedNotFoundContainer>
          <SearchResultNotFounfImg
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <SavedNotFoundHeading color={colorStatus}>
            No Saved Videos Found
          </SavedNotFoundHeading>
          <SavedNotFoundDescription color={colorStatus}>
            Save your videos by clicking a button
          </SavedNotFoundDescription>
        </SavedNotFoundContainer>
      )
    }}
  </CreateAppContext.Consumer>
)

const SavedVideosRoute = () => (
  <CreateAppContext.Consumer>
    {value => {
      const {colorStatus, saveVideos} = value
      return (
        <>
          <Header />
          <SavedVideosContainer>
            <SideBarOptions />
            <ResposiveSavedVideosContainer bgColor={colorStatus}>
              <SavedVideosHedingContainer bgColor={colorStatus}>
                <SavedVideosIconContainer bgColor={colorStatus}>
                  <RiPlayListAddLine />
                </SavedVideosIconContainer>
                <SavedVideosHeading color={colorStatus}>
                  Saved Videos
                </SavedVideosHeading>
              </SavedVideosHedingContainer>
              {saveVideos.length > 0 ? (
                <SavedVideosItemContainer>
                  {saveVideos.map(eachItem => (
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
                            {eachItem.viewCount} views &bull;{' '}
                            {eachItem.publishedAt}
                          </ChannelNameAndViews>
                        </DescriptionContainer>
                      </ListVideoItem>
                    </Link>
                  ))}
                </SavedVideosItemContainer>
              ) : (
                noSavedVideos()
              )}
            </ResposiveSavedVideosContainer>
          </SavedVideosContainer>
          <MobileViewOption />
        </>
      )
    }}
  </CreateAppContext.Consumer>
)

export default SavedVideosRoute
