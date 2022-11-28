const Course = require('../models/Course')
const { mongooseToObject } = require('../../until/mongoose')
class CourseController {
    //[GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('courses/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    /// [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch((error) => { });
    }

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findOne({ id: req.params.id })
            .then(course => {
                res.render('courses/edit', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.deleteOne({ id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new CourseController();
