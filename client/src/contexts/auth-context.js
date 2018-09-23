import React from 'react';
import notify from 'utils/notify';

const login = async () => Promise.resolve();

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
      const {token} = await login(data);

      localStorage.setItem('token', token);

      this.setState(
        {
          token,
        },
        () => {
          notify({
            type: 'success',
            text: 'Successfully logged in!',
          });
        }
      );
    } catch (error) {
      notify({
        type: 'error',
        text: 'Invalid user or password',
      });
    }
  };

  logout = () => {
    localStorage.removeItem('token');
    this.setState(
      {
        token: null,
      },
      () => {
        notify({
          type: 'success',
          text: 'Successfully logged out!',
        });
      }
    );
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
