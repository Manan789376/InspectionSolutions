const mongoose=require('mongoose');
const facebookuserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId:{type: String,required: true},
   userName:{type :String,required:true},
   email:{type: String}
});

module.exports = mongoose.model('fbuser', facebookuserSchema);