import { actions } from '../../../redux/profile-reducer'
import { connect } from 'react-redux'
import MyPostsMemorized, { DispatchPropsType, MapPropsType } from './MyPosts'
import { AppStateType } from '../../../redux/redux-store'

let mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  }
}

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, { addPost: actions.addPostActionCreator })(
  MyPostsMemorized
)

export default MyPostsContainer
