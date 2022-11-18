const newsRouter = require('./news')


function routes(app) {

    app.use('./news', newsRouter)

    app.get('/search', (req, res) => {
        res.render('search')
    });
    app.get('/home', (req, res) => {
        res.render('home')
    });
    app.post('/search', (req, res) => {
        console.log(req.body.q);
        res.send('')
    });
}
module.exports = routes