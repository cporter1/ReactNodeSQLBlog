const express     = require('express');
const session     = require('express-session')
const cors        = require('cors');
const app         = express(); // create express app
const authRoutes  = require('./routes/auth.routes'); 
const postsRoutes = require('./routes/posts.routes');
const SessRoutes  = require('./routes/session.routes')
const port        = process.env.port || 3001;
const bodyParser  = require('body-parser');

app.use(cors({
  origin: [
    'http://10.0.0.164:3000',
    'http://localhost:3000'
  ],
  credentials: true,
}));

app.use(express.json()); //allows server to handle json

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cookieparser = require('cookie-parser')
app.use(cookieparser())

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'jlkahdfbeulbiadb',
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
      secure: false,
    }
}))

////   define my routes
app.use('/users', authRoutes)
app.use('/posts', postsRoutes)
// app.use('/sessions', SessRoutes)

// start express server on the enviroment port or port 3001
app.listen(port, err  => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("server started on port " + port);
});