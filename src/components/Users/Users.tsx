import React, { FC } from 'react'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import { UserType } from './../../types/types'

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  followingInProgress: Array<number>
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

let Users: FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChanged={onPageChanged} pageSize={pageSize} totalItemsCount={totalUsersCount} />
      <div>
        {users.map((u) => (
          <User user={u} followingInProgress={props.followingInProgress} key={u.id} follow={props.follow} unfollow={props.unfollow} />
        ))}
      </div>
    </div>
  )
}

export default Users
