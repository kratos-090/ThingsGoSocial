const mongoose = require('mongoose');
const { Schema } = mongoose;
const Society = require('./society.model');
const Subject = require('./subjects.model');

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: false
    },
    class: {
        type: String,
        required: false
    },
    subjects: [{
        type: String,
        ref:'subject'
    }
    ],
    societies: [{
        type: String,
        ref:'society'
    }]
})

studentSchema.methods.addSubject = async function (subject) {
    const student = this;
    try {
        let present = await Subject.findOne({ subName: subject });
        if (!present) {
            const newSubject = new Subject({ subName: subject });
            await newSubject.save();
        }
        student.subjects.push(subject);
        student.save();
    } catch (error)
    {
        console.log(error);
        return new Error(error);
    }
}
studentSchema.methods.addSociety = async function (society) {
    const student = this;
    try {
        let present = await Society.findOne({ societyName: society });
        if (!present) {
            const newSociety = new Society({ societyName: society });
            await newSociety.save();
        }
        student.societies.push(society);
        student.save();
        
    } catch (error)
    {
        console.log(error);
        return new Error(error);
    }
}
const Student = mongoose.model('student', studentSchema);

module.exports = Student;