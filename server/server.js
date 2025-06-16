const connectDB = require('./configs/db')
const express = require('express');
const app = express();
require('dotenv').config();

const hrRoutes = require('./routes/hr');
const courseRouter = require('./routes/courseRoutes')
const authRouter = require('./routes/authRoutes')
const meetingRouter = require('./routes/meetingRoutes')
const taskRouter = require('./routes/taskRoutes')
const projectRouter = require('./routes/projectRoutes')
const employeeRouter = require('./routes/employeeRoutes')

const errorHandler=require('./middlewares/errorHandler')
app.use(express.json());
app.use(errorHandler);
app.use("/auth", authRouter)
app.use("/course", courseRouter)
app.use("/meeting", meetingRouter)
app.use("/task", taskRouter)
app.use("/project", projectRouter)
app.use("/employee", employeeRouter)


const start = async () => {
    await connectDB(process.env.MONGO_URI);
    console.log(`Connected to MongoDB`);
    app.listen(process.env.PORT, () => {
        console.log(`Server started at ${process.env.PORT}`);
    })
}

start();
