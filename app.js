const path = require('path');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
//const path = require('path');
//const { engine } = require('express-handlebars');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const db = require('./config/database');
const sequelizeStore = require('connect-session-sequelize')(session.Store);
//const cors = require('cors');
const helpers = require('./utils/helpers')
const app = express();
//const PORT = process.env.PORT || 3000;

// using cors to allow cross origin resource sharing
//app.use(cors());

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// method override
app.use(methodOverride('_method'));

// static folder
app.use(express.static('public'));


// source to refrence: https://www.npmjs.com/package/connect-session-sequelize
app.use (
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: new sequelizeStore({
            db: db,
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24,
        },
        rolling: true,
    })
);

// passport middleware
require('./config/passport.js');
app.use(passport.initialize());
app.use(passport.session());
//app.use(session(sess));

// flash middleware
// used for storing messages https://www.npmjs.com/package/connect-flash
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

// // handlebars
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');
// app.engine('handlebars', hbs.engine({ extname: '.hbs', defaultLayout: "main"}));
// //app.set('view engine', '.hbs');
// //app.set("views", "./views");

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// // routes
// app.use('/', require('./routes/index.js'));
// app.use('/users', require('./routes/users.js'));
// app.use('/posts', require('./routes/posts.js'));
// app.use('/comments', require('./routes/comments.js'));
// //app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`); })