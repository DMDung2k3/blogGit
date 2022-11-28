const mongoose = require('mongoose');
const { arrayAtomicsBackupSymbol } = require('mongoose/lib/helpers/symbols');
const mongooseDelete = require('mongoose-delete');
const slug = require('mongoose-slug-generator');


const Schema = mongoose.Schema;
const Course = new Schema({
    id: { type: Object },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    slug: { type: String, slug: 'name', unique: true },
}, {
    timestamps: true
});


//Add plugin
Course.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});
mongoose.plugin(slug);


module.exports = mongoose.model('Course', Course)