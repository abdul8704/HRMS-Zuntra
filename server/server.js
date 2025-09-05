const connectDB = require("./src/configs/db");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const  UsersCredentials  = require("./src/models/userCredentials");
const { createDefaultAdmin } = require("./src/configs/setUp");
require("dotenv").config();

const hrRoutes = require("./src/routes/hr");
const adminRoutes = require("./src/routes/adminRoutes");
const courseRouter = require("./src/routes/courseRoutes");
const authRouter = require("./src/routes/authRoutes");
const taskRouter = require("./src/routes/projectRoutes/taskRoutes");
const projectRouter = require("./src/routes/projectRoutes/projectRoutes");
const employeeRouter = require("./src/routes/employeeRoutes");
const rolesRouter = require("./src/routes/rolesRoutes");
const shiftRouter = require("./src/routes/shiftRoutes");
const geoLocationRouter = require("./src/routes/geoLocationRouter");
const reminderRouter = require("./src/routes/reminderRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const holidayRoutes = require("./src/routes/holidayRoutes");
const companyDocumentsRouter = require("./src/routes/companyDocumentsRoutes");
const teamRoutes = require("./src/routes/projectRoutes/teamRoutes");
const phaseRoutes = require("./src/routes/projectRoutes/phaseRoutes");
const toolsRoutes = require("./src/routes/projectRoutes/toolsRoutes");
const notificationRoutes = require("./src/routes/notificationRoutes");
const taskRoutes = require("./src/routes/projectRoutes/taskRoutes");
const path = require("path");

const errorHandler = require("./src/middlewares/errorHandler");
const JWTauth = require("./src/middlewares/authenticateJWT");
const apiLogger = require("./src/middlewares/apiLogger");

const corsOptions = {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true, // Include cookies and auth headers if needed
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use("/auth", authRouter);
app.use("/api", JWTauth, apiLogger);

app.use("/api/hr", hrRoutes);
app.use("/api/course", courseRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/task", taskRouter);
app.use("/api/project", projectRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/roles", rolesRouter);
app.use("/api/shifts", shiftRouter);
app.use("/api/branch", geoLocationRouter);
app.use("/api/reminder", reminderRouter);
app.use("/api/events", eventRoutes);
app.use("/api/docs", companyDocumentsRouter);
app.use("/api/holidays", holidayRoutes);
app.use("/api/project/team", teamRoutes);
app.use("/api/phase", phaseRoutes);
app.use("/api/tools", toolsRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/task", taskRoutes);
app.use("/uploads", express.static(path.join(__dirname, "./src/uploads")));
app.use(errorHandler);

const start = async () => {
    try {
        const PORT = process.env.PORT || 5000;
        await connectDB(process.env.MONGO_URI);
        console.log(`Connected to MongoDB✅`);

        const needDefaultAdmin = await UsersCredentials.countDocuments();

        if(needDefaultAdmin === 0) {
            await createDefaultAdmin();
        }

        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}🔥`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

start();
