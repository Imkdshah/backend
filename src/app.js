import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
const app  = express();


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

// how much json size should be accepted 
app.use(express.json({
    limit : "16kb"
}))

app.use(express.static("public"))app.use(cookieParser())
app.use(express.urlencoded())
app.use(cookieParser())
export {app}

