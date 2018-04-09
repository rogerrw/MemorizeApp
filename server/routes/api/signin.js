const User = require('../../models/User');
const UserSession = require('../../models/UserSession');

module.exports = (app) => {
  // app.get('/api/counters', (req, res, next) => {
  //   Counter.find()
  //     .exec()
  //     .then((counter) => res.json(counter))
  //     .catch((err) => next(err));
  // });
  //
  // app.post('/api/counters', function (req, res, next) {
  //   const counter = new Counter();
  //
  //   counter.save()
  //     .then(() => res.json(counter))
  //     .catch((err) => next(err));
  // });

  /*
   * Create Account
   */
  app.post('/api/account/create', (req, res, next) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    let {
      email
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: 'Error: Email address cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    email = email.toLowerCase();

    User.find({
      email: email
    }, (err, existingUsers) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      } else if (existingUsers.length > 0) {
        return res.send({
          success: false,
          message: 'Error: Account already exists.'
        });
      }

      const newUser = new User();
      newUser.username = username;
      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      newUser.save((err, user) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }

        return res.send({
          success: true,
          message: 'Account successfully created!'
        });
      })
    });
  });

  /*
   * Sign In
   */
  app.post('/api/account/signin', (req, res, next) => {
    const { body } = req;
    const {
      username,
      password
    } = body;

    let {
      email
    } = body;

    if (!username) {
      return res.send({
        success: false,
        message: 'Error: Username cannot be blank.'
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: 'Error: Password cannot be blank.'
      });
    }

    User.find({
      username: username
    }, (err, users) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      if (users.length !== 1) { // greater than 1 should be impossible
        return res.send({
          success: false,
          message: 'Error: User does not exist. Would you like to create an account?'
        });
      }

      const user = users[0];
      if (!user.validPassword(password)) {
        return res.send({
          success: false,
          message: 'Error: Invalid username or password.'
        });
      }

      // User sign in correct
      const userSession = new UserSession();
      userSession.userId = user._id;
      userSession.save((err, doc) => {
        if (err) {
          return res.send({
            success: false,
            message: 'Error: Server error.'
          });
        }

        return res.send({
          success: true,
          message: 'Sign in successful.',
          token: doc._id
        });
      });
    });
  });


  app.get('/api/account/verify', (req, res, next) => {
    const { query } = req;

    const {
      token
    } = query;

    UserSession.find({
      _id: token,
      isDeleted: false
    }, (err, sessions) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error.'
        });
      }

      if (sessions.length !== 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid session.'
        });
      }

      return res.send({
        success: true,
        message: 'Session is valid.'
      })
    });
  });

  app.get('/api/account/logout', (req, res, next) => {
    const { query } = req;

    const {
      token
    } = query;

    UserSession.findOneAndUpdate({
      _id: token,
      isDeleted: false
    }, {
      isDeleted: true
    }, (err, session) => {
      if (err) {
        return res.send({
          success: false,
          message: 'Error: Server error'
        });
      }

      if (!session) {
        return res.send({
          success: false,
          message: 'Error: Logout failure.'
        });
      }
      return res.send({
        success: true,
        message: 'Logged out.'
      });
    });
  });
};
