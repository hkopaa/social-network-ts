import { useSelector } from 'react-redux'
import React from 'react'
import { getIsFetching } from '../../redux/users-selectors'
import { Users } from './Users'
import Preloader from '../common/Preloader/Preloader'

type UsersPageType = {
  pageTitle: string
}

export const UsersPage: React.FC<UsersPageType> = (props) => {
  const isFetching = useSelector(getIsFetching)

  return (
    <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader /> : null}
      <Users />
    </>
  )
}
