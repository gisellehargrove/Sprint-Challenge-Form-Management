// import React from 'react';
// import axios from 'axios';
// import * as Yup from 'yup';
// import { withFormik, Form, Field } from 'formik';
//
// class FormComponent extends React.Component {
//   constructor() {
//     super();
//
//     this.state = {}
//   }
//
//   render() {
//     return (
//       <div>
//         <Form>
//           {this.props.errors.username && <p>this.props.errors.username</p>}
//           <div>
//             <Field type="text" name="username" placeholder="Username" />
//           </div>
//           <div>
//             {this.props.errors.password && <p>this.props.errors.password</p>}
//             <Field type="password" name="password" placeholder="Password" />
//           </div>
//           <button type="submit">Log In</button>
//         </Form>
//         <div>{this.props.status}</div>
//       </div>
//     );
//   }
// }
//
//
// const FormikLoginForm = withFormik({
//   mapPropsToValues({username, password}) {
//     return {
//       username: username || '',
//       password: password || ''
//     };
//   },
//   validationSchema: Yup.object().shape({
//     username: Yup.string()
//       .required('Username is Required'),
//     password: Yup.string()
//       .min(4, 'Password must be at least 4 characters')
//       .required('Password is required')
//   }),
//   handleSubmit(values, { resetForm, setStatus }) {
//     axios.post('http://localhost:5000/api/register', values)
//       .then(response => {
//         resetForm();
//         return response.data;
//       })
//       .then(response => {
//         axios.get('http://localhost:5000/api/restricted/data')
//           .then(res => {
//             console.log(res, 'restricted data')
//             setStatus(response.data);
//           })
//       })
//       .catch(error => {
//         console.log(error);
//       })
//   }
// })(FormComponent);
//
// export default FormikLoginForm;

import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function FormComponent({ errors, touched, values, status }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if(status) setData([...data, status])
    console.log(data, 'status')
  }, [status])

  return (
    <div>
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

      <div>
        {data.map((course, key) =>
          <div key={key}>
            {course.name} : {course.technique}
          </div>
        )}
      </div>

    </div>
  )
};

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
        return response.data;
      })
      .then(res => {
        axios.get('http://localhost:5000/api/restricted/data')
          .then(response => {
            console.log(response.data, 'response')
            setStatus(response.data);
          })
      })
      .catch(error => {
        console.log(error);
      })
  }
})(FormComponent);

export default FormikLoginForm;
