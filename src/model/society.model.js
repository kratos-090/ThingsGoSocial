const mongoose = require('mongoose');
const { Schema } = mongoose;

const societySchema = new Schema({
    societyName: {
        type: String,
        require: true
    }
});

societySchema.statics.checkSocieties = async function (societies) {
    try {
        await Promise.all(societies.map(async (item) => {
            let society =await Society.findOne({ subName: item });
            if (!society) {
               society=new Society({ societyName: item });
                await society.save();
            }
        }));
    } catch (error)
    {
        return new Error();
    }
    
}

const Society = mongoose.model('society', societySchema);

module.exports = Society;