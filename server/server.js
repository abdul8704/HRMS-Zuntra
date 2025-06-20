const connectDB = require('./configs/db')
const express = require('express');
const app = express();
const cors = require("cors");
require('dotenv').config();

const hrRoutes = require('./routes/hr');
const courseRouter = require('./routes/courseRoutes')
const authRouter = require('./routes/authRoutes')
const meetingRouter = require('./routes/meetingRoutes')
const taskRouter = require('./routes/taskRoutes')
const projectRouter = require('./routes/projectRoutes')
const employeeRouter = require('./routes/employeeRoutes')
const rolesRouter = require('./routes/rolesRoutes')

const errorHandler=require('./middlewares/errorHandler')
const JWTauth = require('./middlewares/authenticateJWT')

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter)
app.use("/api", JWTauth);

app.use("/api/course", courseRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/task", taskRouter);
app.use("/api/project", projectRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/roles", rolesRouter);
app.use(errorHandler);

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        await connectDB(process.env.MONGO_URI);
        console.log(`Connected to MongoDB✅`);
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}🔥`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1); 
    }
};


start();
