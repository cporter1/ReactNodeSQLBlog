const express     = require('express');
const cors        = require('cors');
const app         = express(); // create express app
const authRoutes  = require('./routes/auth.routes'); 
const postsRoutes   = require('./routes/posts.routes');
const port          = process.env.port || 3001;
const bodyParser    = require('body-parser');
const session  = require('express-session');

app.use(cors({
  origin: [
    'http://10.0.0.97:3000',
    'http://localhost:3000',
    'http://10.0.0.164:3000'
  ],
  credentials: true,
}));

app.use(express.json()); //allows server to handle json

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(cookieparser())

app.use(session({
  name: 'sessionCookie',
  secret: 'bigShhhh',
  saveUninitialized: false,
  resave: false,
  store: false,
  cookie: {
    maxAge: 10 * 60 * 1000,
    secure: false,
    httpOnly: true
  }
}))

////   define my routes
app.use('/users', authRoutes);
app.use('/posts', postsRoutes);

// start express server on the enviroment port or port 3001
app.listen(port, err  => {
  if (err) {
    return console.log("Error: ", err);
  }
  console.log("server started on port " + port);
});