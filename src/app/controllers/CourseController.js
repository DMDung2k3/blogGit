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

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    //[POST] /courses/create
    store(req, res, next) {
        const formData = req.body;
        // formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAUk6B51gwcMQn7B-DtNtDXwmmhTQ`
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/default.jpg`
        // res.json(req.body)
        const course = new Course(formData)
        course.save()
            .then(() => res.redirect('/'))
            .catch((error) => {

            })
    }
}
module.exports = new CourseController();
