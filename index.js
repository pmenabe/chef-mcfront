const express = require('express')
const cors = require('cors')
const app = express()
const CONFIG = require('./config')
const port = CONFIG.PORT || 3001
require('./io')

app.use(cors())
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})

app.use(express.urlencoded())
app.use(express.json())

// Bundle API routes.
app.use('/', require('./router/api')())
