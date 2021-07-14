const mongoose = require('mongoose');
const { Schema } = mongoose;

const subjectSchema = new Schema({
    subName: {
        type: String,
        require: true
    }
});

subjectSchema.statics.checkSubjects = async function (subjects) {
    try {
        await Promise.all(subjects.map(async (item) => {
            let subject =await Subject.findOne({ subName: item });
            if (!subject) {
               subject=new Subject({ subName: item });
                await subject.save();
            }
        }));
    } catch (error)
    {
        return new Error();
    }
}


const Subject = mongoose.model('subject', subjectSchema);
module.exports = Subject;