import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField, GetStringKeys } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { connect } from 'react-redux'
import { login, logout } from '../../redux/auth-reducer'
import { Redirect } from 'react-router'
import styles from './../common/FormsControls/FormsControls.module.css'
import { AppStateType } from './../../redux/redux-store'

type LoginFormOwnPropsType = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>('Email', 'email', [required], Input)}
      {createField<LoginFormValuesTypeKeys>('Password', 'password', [required], Input, { type: 'password' })}
      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'chechbox' }, 'remember me')}

      {captchaUrl && <img src={captchaUrl} />}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('Symbols from img', 'captcha', [required], Input, {})}

      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({ form: 'login' })(LoginForm)

type MapStatePropsType = {
  isAuth: boolean
  captchaUrl: string | null
}

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  if (props.isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  )
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
})

export default connect(mapStateToProps, { login, logout })(Login)
