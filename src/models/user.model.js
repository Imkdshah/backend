import mongoose ,{Schema}  from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema  = new Schema({

    username : {
        type : String,
        reqiured : true,
        unique : true ,
        lowercase : true ,
        trim : true,
        index : true  
    },
    email : {
        type : String,
        reqiured : true,
        unique : true ,
        lowercase : true ,
        trim : true,
    },
    fullname : {
        type : String,
        reqiured : true,
        trim : true,
        index: true 
    },
    avatar :{
        type : String,
        reqiured : true,
    },
    avatar :{
        type : String,
    },
    watchHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : "Video"
        }
    ],
    password : {
        type : String,
        reqiured: [true , "Password is  Required"]
    },
    refreshToken : {
        type : String,
    },

},
{
    timestamps : true
}

)


userSchema.pre("save" , async function(next){

    if(!this.ismodified("password"))return next(); 
    this.password = bcrypt.hash(this.password , 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrpt.compare(password , this.password)
}

userSchema.methods.generateAccessToken = function(){
        return jwt.sign(
            {
                _id : this._id,
                email : this.email,
                userName : this.username,
                fullName : this.fullname
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn : process.env.ACCESS_TOKEN_EXPIRY
            }
        )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id : this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const User = mongoose.model("User",userSchema);