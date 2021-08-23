import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, getUsers } from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersPage } from '../../redux/users-selectors'
import { useEffect } from 'react'

type PropsType = {}

export const Users: FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const users = useSelector(getUsersPage)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
  }, [])

  const dispatch = useDispatch()

  const onPageChanged = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter))
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  const follow = (userId: number) => {
    dispatch(follow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize} totalItemsCount={totalUsersCount} />
      <div>
        {users.map((u) => (
          <User user={u} followingInProgress={followingInProgress} key={u.id} follow={follow} unfollow={unfollow} />
        ))}
      </div>
    </div>
  )
}
