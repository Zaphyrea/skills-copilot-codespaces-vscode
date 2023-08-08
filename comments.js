// Create web server
// 1. npm install express
// 2. npm install body-parser
// 3. npm install cors
// 4. npm install nodemon
// 5. npm install mongoose
// 6. npm install dotenv
// 7. npm install morgan
// 8. npm install bcryptjs
// 9. npm install jsonwebtoken
// 10. npm install express-rate-limit
// 11. npm install helmet
// 12. npm install express-validator
// 13. npm install multer
// 14. npm install sharp
// 15. npm install path

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

const connectDB = require('./config/db');
const app = express();

// Load config
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/posts', require('./routes/api/v1/posts'));
app.use('/api/v1/comments', require('./routes/api/v1/comments'));
app.use('/api/v1/users', require('./routes/api/v1/users'));
app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/profile', require('./routes/api/v1/profile'));

// Error handler
app.use(require('./middleware/error'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, 'client/build')));
    // app.use(express.static('client/build'));
    // app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    // app.use(express.static(path.join(__dirname, 'client/build')));
    // app.use(express.st