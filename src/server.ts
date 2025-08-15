import { app } from "./app"
import mongoose from "mongoose";
import { envVars } from "./app/config/env";

const startServer = async()=>{
    await mongoose.connect(envVars.MONGO_URI);
    console.log("✅ mongoose connected");
    app.listen(envVars.PORT, ()=>{
        console.log("server is running at 8000")
    })
}

(async () => {
    await startServer();
})();