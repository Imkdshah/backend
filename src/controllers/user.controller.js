import {asyncHandler} from '../util/asyncHandler.js';

const resgisterUser = asyncHandler( async (req,res)=>{
    res.status(200).json({
        message : "ok"
    })
})


export {resgisterUser};