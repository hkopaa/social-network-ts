import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, getUsers } from '../../redux/users-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsersFilter, getUsersPage } from '../../redux/users-selectors'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'

type PropsType = {}
type QueryParamsType = {
  term?: string
  page?: string
  friend?: string
}

export const Users: FC<PropsType> = (props) => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const users = useSelector(getUsersPage)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter

    if (!!parsed.page) actualPage = +parsed.page
    if (!!parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }

    switch (parsed.friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    })
  }, [filter, currentPage])

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
