const connectDB = require('./configs/db')
const express = require('express');
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const hrRoutes = require('./routes/hr');
const courseRouter = require('./routes/courseRoutes')
const authRouter = require('./routes/authRoutes')
const meetingRouter = require('./routes/meetingRoutes')
const taskRouter = require('./routes/taskRoutes')
const projectRouter = require('./routes/projectRoutes')
const employeeRouter = require('./routes/employeeRoutes')
const rolesRouter = require('./routes/rolesRoutes')
const shiftRouter = require('./routes/shiftRoutes')
const geoLocationRouter = require('./routes/geoLocationRouter')
const reminderRouter = require('./routes/reminderRoutes')
const holidayRoutes = require('./routes/holidayRoutes');
const companyDocumentsRouter = require('./routes/companyDocumentsRoutes');
const path = require("path");

const errorHandler=require('./middlewares/errorHandler')
const JWTauth = require('./middlewares/authenticateJWT')

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:5174"
    ],
    credentials: true, // Include cookies and auth headers if needed
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 
app.use("/auth", authRouter)
app.use("/api", JWTauth);

app.use("/api/hr", hrRoutes);
app.use("/api/course", courseRouter);
app.use("/api/meeting", meetingRouter);
app.use("/api/task", taskRouter);
app.use("/api/project", projectRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/shifts", shiftRouter);
app.use("/api/branch", geoLocationRouter);
app.use("/api/reminder", reminderRouter);
app.use('/api/docs', companyDocumentsRouter);
app.use("/api/holidays", holidayRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
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
