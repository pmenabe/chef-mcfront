module.exports = {
  PORT: 3001,
  WEBSOCKET_PORT: 8081,
  APP_CLIENT_URL: '',
  BUILT_PATH: './builts',
  DATABASE: {
    HOST: '',
    NAME: '',
    USER: '',
    PASS: '',
    BUILD: false // First Install it must be true
  },
  USER: {
    ADMIN_USER: '' // email
  },
  MAIL: {
    SERVICE: '', // nodemailer services
    USER: '',  // email
    TOKEN: ''
  },
}