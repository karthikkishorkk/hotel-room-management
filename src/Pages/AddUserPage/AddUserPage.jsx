import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './AddUserPage.css';


// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required')
    .test('check-username', 'Username already taken', async (value) => {     
      return true; // Skip validation if no username is entered
    }),

  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),

  // Confirm Password Validation
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const AddUserPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const newUser = { username: values.username, email: values.email, password: values.password };
      await axios.post('http://localhost:5000/api/user/signup', newUser);
      alert('User added successfully!');
      navigate('/admin/manage-users');
    } catch (err) {
      console.error('Error adding user:', err);
      alert('Failed to add user');
    }
  };

  return (
    <div className="add-user-container">
      <h2>Add New User</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          confirmPassword: '',  // Add the confirm password field to the form
        }}
        validationSchema={validationSchema} // Apply Yup schema validation
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="add-user-form">
            <div className="form-group">
              <label>Username</label>
              <Field type="text" name="username" required />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <Field type="email" name="email" required />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <Field type="password" name="password" required />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <Field type="password" name="confirmPassword" required />
              <ErrorMessage name="confirmPassword" component="div" className="error-message" />
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Adding...' : 'Add User'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddUserPage;
