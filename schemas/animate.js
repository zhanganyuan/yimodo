var mongoose = require('mongoose');

var AnimateSchema = new mongoose.Schema({
	title_CN: String,
	title_OG: String,
	director: String,
	country: String,
	year: Number,
	type: String,
	parts: Number,
	poster: String,
	flash: String,
	summary: String,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
})


// 每次存储之前都要来调用一下这个方法
AnimateSchema.pre('save', function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	}
	else{
		this.meta.updateAt = Date.now();
	}

	next();
});


AnimateSchema.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb)
	},
	findById: function (id, cb) {
		return this
			.findOne({_id: id})
			.exec(cb)
	}
}


module.exports = AnimateSchema