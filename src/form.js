import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import * as Yup from 'yup';
import { Formik, getIn } from 'formik';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  TextField,
  Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    height: '100%'
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const SignUpForm = () => {
  const classes = useStyles();


  const initialValues = {
    name: '',
    age: '',
    email: '',
    phone: '',
    social: {
      facebook: '',
      linkedin: ''
    },
    password: '',
    confirmPassword: ''
  };

  
  return (
    <Card className={clsx(classes.root)}>
      <CardHeader title="Sign Up" />
      <Divider />

      <Formik
        initialValues={{
          ...initialValues
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required('Name is required'),
          age: Yup.number()
            .required('Age is required')
            .min(13, 'You must be at least 13 years old'),
          email: Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
          phone: Yup.string().required('Phone is required'),
          social: Yup.object().shape({
            facebook: Yup.string().required('Facebook username is required'),
            linkedin: Yup.string().required('LinkedIn username is required')
          }),
          password: Yup.string()
            .required('Please enter your password')
            .matches(
              /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
              'Password must contain 8 characters, one uppercase, one lowercase, one number and one special case Character'
            ),
          confirmPassword: Yup.string()
            .required('Please enter the password again')
            .oneOf([Yup.ref('password'), null], "Passwords didn't match")
        })}
        onSubmit={(values) => {
          console.log(values);
        }}>
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          isValid,
          dirty,
          touched,
          values
        }) => (
          <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.name && errors.name)}
                    fullWidth
                    required
                    helperText={touched.name && errors.name}
                    label="Name"
                    name="name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.name}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.age && errors.age)}
                    fullWidth
                    required
                    helperText={touched.age && errors.age}
                    label="Age"
                    name="age"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.age}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    required
                    helperText={touched.email && errors.email}
                    label="Email"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.email}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.phone && errors.phone)}
                    fullWidth
                    required
                    helperText={touched.phone && errors.phone}
                    label="Phone"
                    name="phone"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.phone}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, 'social.facebook') &&
                        getIn(errors, 'social.facebook')
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, 'social.facebook') &&
                      getIn(errors, 'social.facebook')
                    }
                    label="Facebook"
                    name="social.facebook"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.social.facebook}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      getIn(touched, 'social.linkedin') &&
                        getIn(errors, 'social.linkedin')
                    )}
                    fullWidth
                    required
                    helperText={
                      getIn(touched, 'social.linkedin') &&
                      getIn(errors, 'social.linkedin')
                    }
                    label="LinkedIn"
                    name="social.linkedin"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.social.linkedin}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    required
                    helperText={touched.password && errors.password}
                    label="Password"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                    size="small"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    error={Boolean(
                      touched.confirmPassword && errors.confirmPassword
                    )}
                    fullWidth
                    required
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    label="Confirm Password"
                    name="confirmPassword"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.confirmPassword}
                    variant="outlined"
                    size="small"
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <CardActions className={classes.actions}>
              <Button
                color="primary"
                disabled={Boolean(!isValid)}
                type="submit"
                variant="contained">
                Save
              </Button>
            </CardActions>
          </form>
        )}
      </Formik>
    </Card>
  );
};

SignUpForm.propTypes = {
  className: PropTypes.string
};

export default SignUpForm;