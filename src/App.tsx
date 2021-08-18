import styles from './App.module.css'
import Navbar from './components/Navbar/Navbar'
import { Route, withRouter, Switch, Redirect, BrowserRouter } from 'react-router-dom'

import UsersContainer from './components/Users/UsersContainer'
import HeaderContainer from './components/Header/HeaderContainer'
import Login from './components/Login/Login'
import React from 'react'
import { connect, Provider } from 'react-redux'
import { compose } from 'redux'
import { initializeApp } from './redux/app-reducer'
import Preloader from './components/common/Preloader/Preloader'
import { withSuspense } from './hoc/withSuspense'
import store, { AppStateType } from './redux/redux-store'

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors)
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className={styles.appWrapper}>
        <HeaderContainer />
        <Navbar />
        <div className={styles.appWrapperContent}>
          <Switch>
            <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
            <Route path='/dialogs' render={() => <SuspendedDialogs />} />
            <Route path='/profile/:userId?' render={() => <SuspendedProfile />} />
            <Route path='/users' render={() => <UsersContainer pageTitle={'Самураи'} />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='*' render={() => <div>404 NOT FOUND</div>} />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
})

let AppContainer = compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App)

const SamuraiJSApp: React.FC = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SamuraiJSApp
