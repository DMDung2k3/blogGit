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
        formData.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEXCNACELwBSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLCJ7GkmVcmAg6KPKaAPAX0DyTnCvw`
        // res.json(req.body)
        const course = new Course(formData)
        course.save();
        res.send('course save')
    }
}
module.exports = new CourseController();
