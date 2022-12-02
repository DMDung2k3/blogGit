const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override')
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const SortMiddleware = require('./app/middlewares/SortMiddlewares')
const port = 3000;
const db = require('./config/db');
const route = require('./routes');

app.use(express.static(__dirname + '/public'));
//Connect db
db.connect();
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);
app.use(bodyParser.json());
app.use(methodOverride('_method'))
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
        helpers: {
            sum: (a, b) => a + b,
            sortable: (field, sort) => {
                const sortType = field === sort.column ? sort.type : "default";
                const types = {
                    default: 'desc',
                    asc: 'desc',
                    desc: 'asc',
                }
                const icons = {
                    default: 'fa-solid fa-sort',
                    asc: 'fa-solid fa-arrow-up-wide-short',
                    desc: 'fa-solid fa-arrow-up-short-wide'
                }
                const icon = icons[sortType]
                const type = types[sortType]
                return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>`
            }
        }
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'sources', 'views'));
//Custom middle wares
app.use(SortMiddleware)
//Routes init
route(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

