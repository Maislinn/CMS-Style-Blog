const app = require('./app');
const db = require('./config/database');

// Connect to database & start server
db.sequlize.sync().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
});