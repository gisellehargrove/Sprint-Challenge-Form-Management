import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const FunctionalFormComponent = ({ errors, touched, values, status }) => {

  return (
    <Form>
      <div>
        {touched.username && errors.username && <p>errors.username</p>}
        <Field type="text" name="username" placeholder="Username" />
      </div>
      <div>
        {touched.password && errors.password && <p>errors.password</p>}
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <button type="submit">Log In</button>
    </Form>
  )
};

const FunctionalFormikLoginForm = withFormik({
  mapPropsToValues({username, password}) {
    return {
      username: username || '',
      password: password || ''
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required('Username is Required'),
    password: Yup.string()
      .min(4, 'Password must be at least 4 characters')
      .required('Password is required')
  }),
  handleSubmit(values, { resetForm, setStatus }) {
    axios.post('http://localhost:5000/api/register', values)
      .then(response => {
        console.log(response);
        resetForm();
      })
      .catch(error => {
        console.log(error);
      })
  }
})(FunctionalFormComponent);

export default FunctionalFormikLoginForm;
