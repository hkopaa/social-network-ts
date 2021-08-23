import React, { FC } from 'react'
import { InjectedFormProps, reduxForm } from 'redux-form'
import { Input, createField, GetStringKeys } from '../common/FormsControls/FormsControls'
import { required } from '../../utils/validators/validators'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth-reducer'
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
      {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', [], Input, { type: 'checkbox' }, 'remember me')}

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

export type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: FC = () => {
  const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

  const dispatch = useDispatch()

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
  }

  if (isAuth) {
    return <Redirect to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
}
