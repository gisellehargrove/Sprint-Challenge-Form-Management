import React from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';

class FormComponent extends React.Component {

  render() {
    return (
      <Form>
      <div>
        <Field type="text" name="username" placeholder="Username" />
      </div>
      <div>
        <Field type="password" name="password" placeholder="Password" />
      </div>
      <button type="submit">Log In</button>
    </Form>
    );
  }
}


const FormikLoginForm = withFormik({
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
})(FormComponent);

export default FormikLoginForm;
