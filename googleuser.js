const mongoose=require('mongoose');
const googleuserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type: String,required: true},
   userName:{type :String,required:true},
   email:{type: String, required:true}
});

module.exports = mongoose.model('googlUser', googleuserSchema);