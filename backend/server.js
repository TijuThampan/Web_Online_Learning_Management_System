import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import attemptRoutes from "./routes/attemptRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import examRoutes from "./routes/examRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(express.json()); //middleware

app.get("/", (req, res) => {
  res.send("Let's goo!!");
});

app.use("/api/teacher", teacherRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/exam", examRoutes);
app.use("/api/question", questionRoutes);
app.use("/api/attempt", attemptRoutes);

const port = 8000 || process.env.PORT;


//
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'public')));

// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
//

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
