const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../until/mongoose')
class SiteController {
    //[Get] /
    index(req, res, next) {
        Course.find({})
            .then(courses => {
                res.render('home', { courses: multipleMongooseToObject(courses) })
            })
            .catch(next);
    }
    //[Get] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
