class SiteController {
    //[Get] /
    index(req, res) {
        res.render('news');
    }
    //[Get] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
