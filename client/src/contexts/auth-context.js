import React from 'react';
import notify from 'utils/notify';
import client from './../client';
import {LOGIN_FAILED, LOGIN_SUCCESS} from './../messages';

import gql from 'graphql-tag';

const login = async ({email, password}) => {
  const response = await client.mutate({
    variables: {email, password},
    mutation: gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `,
  });

  return response.data.login;
};

const AuthContext = React.createContext();

const __state__ = () => {
  try {
    return {
      token: localStorage.getItem('token'),
    };
  } catch (err) {
    return {
      token: null,
    };
  }
};

class AuthProvider extends React.Component {
  state = __state__();
  login = async (data = {}) => {
    try {
      const token = await login(data);

      localStorage.setItem('token', token);

      notify({
        type: 'success',
        text: LOGIN_SUCCESS,
      });

      setTimeout(() => {
        window.location.replace('/dashboard');
      });
    } catch (error) {
      notify({
        type: 'error',
        text: LOGIN_FAILED,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');

    notify({
      type: 'success',
      text: 'Successfully logged out!',
    });

    setTimeout(() => {
      window.location.replace('/auth/login');
    });
  };

  render() {
    const {token} = this.state;
    return (
      <AuthContext.Provider
        value={{
          token,
          isAuth: !!token,
          login: this.login,
          logout: this.logout,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};
