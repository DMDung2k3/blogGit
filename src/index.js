const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./config/db');
const route = require('./routes');

//Connect db
db.connect();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());
//HTTP loggers
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(morgan('combined'));
//templates engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: 'hbs',
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'sources', 'views'));

//Routes init
route(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

