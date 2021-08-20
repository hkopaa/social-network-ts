import { Field, Form, Formik } from 'formik'
import React, { FC } from 'react'
import { FilterType } from '../../redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
  const errors = {}
  return errors
}

type PropsType = {
  onFilterChanged: (filter: FilterType) => void
}
type FormType = {
  term: ''
  friend: 'null' | 'true' | 'false'
}

const UsersSearchForm: FC<PropsType> = React.memo((props) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter: FilterType = { term: values.term, friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false }
    props.onFilterChanged(filter)
    setSubmitting(false)
  }

  return (
    <div>
      <Formik initialValues={{ term: '', friend: 'null' }} validate={usersSearchFormValidate} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type='text' name='term' />
            <Field as='select' name='friend'>
              <option value='null'>All</option>
              <option value='true'>Only followed</option>
              <option value='false'>Only unfollowed</option>
            </Field>
            <button type='submit' disabled={isSubmitting}>
              Find
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )
})

export default UsersSearchForm
