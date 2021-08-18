import React from 'react'
import classes from './Header.module.css'
import { NavLink } from 'react-router-dom'

export type MapPropsType = {
  isAuth: boolean
  login: string | null
}

export type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
  return (
    <header className={classes.header}>
      <img src='https://www.pngarts.com/files/3/Logo-PNG-Download-Image.png'></img>

      <div className={classes.loginBlock}>
        {props.isAuth ? (
          <div>
            {' '}
            {props.login} - <button onClick={props.logout}>Log out</button>{' '}
          </div>
        ) : (
          <NavLink to={'/login'}>Login</NavLink>
        )}
      </div>
    </header>
  )
}

export default Header
