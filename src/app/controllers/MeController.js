const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../until/mongoose')
class MeController {
    //[GET] /me/courses/stored


    storedCourses(req, res, next) {
        Promise.all([Course.find(), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => res.render('me/stored-courses', {
                deletedCount,
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }

    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(courses => res.render('me/trash-courses', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next)
    }
}


module.exports = new MeController();
