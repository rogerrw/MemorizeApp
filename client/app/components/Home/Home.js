import 'whatwg-fetch';
import { Component } from 'react';

import {
  getFromStorage
  // setInStorage
} from '../../utils/storage';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      isLoading: true,

      createAccountUsername: '',
      createAccountEmail: '',
      createAccountPassword: '',
      createAccountError: '',

      signInUsername: '',
      signInPassword: '',
      signInError: ''

    };

    this.onChangeSignInUsernameInput = this.onChangeSignInUsernameInput.bind(this);
    this.onChangeSignInPasswordInput = this.onChangeSignInPasswordInput.bind(this);

    this.onChangeCreateAccountUsernameInput = this.onChangeCreateAccountUsernameInput.bind(this);
    this.onChangeCreateAccountEmailInput = this.onChangeCreateAccountEmailInput.bind(this);
    this.onChangeCreateAccountPasswordInput = this.onChangeCreateAccountPasswordInput.bind(this);

    this.signIn = this.signIn.bind(this);
    this.createAccount = this.createAccount.bind(this);
  }

  componentDidMount() {
    const token = getFromStorage('the_main_app');
    if (token) {
      // verify token
      fetch(`/api/account/verify?token=#{token}`)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInUsername,
      signInPassword,
      createAccountUsername,
      createAccountEmail,
      createAccountPassword,
      createAccountError
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p> Loading... </p>
        </div>
      );
    }

    const errorMessage = signInError ? (
      <div>
        <p>signInError</p>
      </div>
    ) : null;

    if (!token) {
      return (
        <div>
          {errorMessage}
          <div>
            <p> Sign In </p>
            <input
              type="text"
              placeholder="username"
              value={signInUsername}
              onChange={this.onChangeSignInUsernameInput}
            />
            <input
              type="password"
              placeholder="password"
              value={signInPassword}
              onChange={this.onChangeSignInPasswordInput}
            />
            <button type="button" onClick={this.signIn}>Sign In</button>
          </div>

          <div>
            <p> Create Account </p>
            <input
              type="text"
              placeholder="username"
              value={createAccountUsername}
              onChange={this.onChangeCreateAccountUsernameInput}
            />
            <input
              type="email"
              placeholder="email"
              value={createAccountEmail}
              onChange={this.onChangeCreateAccountEmailInput}
            />
            <input
              type="password"
              placeholder="password"
              value={createAccountPassword}
              onChange={this.onChangeCreateAccountPasswordInput}
            />
            <button type="button" onClick={this.createAccount}>Create Account</button>
          </div>

        </div>
      );
    }
    return (
      <div>
        <p>Account</p>
      </div>
    );
  }

  // Sign in methods
  onChangeSignInUsernameInput(event) {
    this.setState({
      signInUsername: event.target.value
    });
  }

  onChangeSignInPasswordInput(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  signIn() {
    const {
      signInUsername,
      signInPassword
    } = this.state;

    fetch('/api/account/signin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: signInUsername,
        password: signInPassword
      })
    });
  }

  // Create account methods
  onChangeCreateAccountUsernameInput(event) {
    this.setState({
      createAccountUsername: event.target.value
    });
  }

  onChangeCreateAccountEmailInput(event) {
    this.setState({
      createAccountEmail: event.target.value
    });
  }

  onChangeCreateAccountPasswordInput(event) {
    this.setState({
      createAccountPassword: event.target.value
    });
  }

  createAccount() {
    const {
      createAccountUsername,
      createAccountEmail,
      createAccountPassword
    } = this.state;

    fetch('/api/account/create', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: createAccountUsername,
        email: createAccountEmail,
        password: createAccountPassword
      })
    });
  }
}

export default Home;
