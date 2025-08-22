import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { routes } from "./routes/route"

export const app = express()
app.use(cors({
    origin: ["http://localhost:3000"], credentials: true
}))

app.use(cookieParser());
app.use(express.json())
app.use("/api/v1", routes)

app.get("/", (req, res)=>{
    res.send("welcome to loan and express tracker backend")
})



/*

total loan taken -> each month also 
total pending loan -> also show category based loans

*/