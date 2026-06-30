import { Router } from "express";
import { SubjectController } from "../controllers/content/SubjectController";
import { GradeController } from "../controllers/content/GradeController";
import { UnitController } from "../controllers/content/UnitController";
import { LessonController } from "../controllers/content/LessonController";
import { AuthController } from "../controllers/user/AuthController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { AdminController } from "../controllers/admin/AdminController";

const routes = Router();

const subjectController = new SubjectController();
const gradeController = new GradeController();
const unitController = new UnitController();
const lessonController = new LessonController();
const authController = new AuthController();
const adminController = new AdminController();

// Autenticação
routes.post("/register", (req, res) => authController.register(req, res));
routes.post("/login", (req, res) => authController.login(req, res));

// Admin Dashboard
routes.get("/admin/stats", authMiddleware, (req, res) => adminController.getStats(req, res));

// Matérias
routes.post("/subjects", authMiddleware, (req, res) => subjectController.create(req, res));
routes.get("/subjects", (req, res) => subjectController.list(req, res));
routes.get("/subjects/:id", (req, res) => subjectController.getById(req, res));
routes.put("/subjects/:id", authMiddleware, (req, res) => subjectController.update(req, res));
routes.delete("/subjects/:id", authMiddleware, (req, res) => subjectController.delete(req, res));

// Séries
routes.post("/grades", authMiddleware, (req, res) => gradeController.create(req, res));
routes.get("/grades", (req, res) => gradeController.list(req, res));
routes.get("/grades/:id", (req, res) => gradeController.getById(req, res));
routes.put("/grades/:id", authMiddleware, (req, res) => gradeController.update(req, res));
routes.delete("/grades/:id", authMiddleware, (req, res) => gradeController.delete(req, res));

// Unidades
routes.post("/units", authMiddleware, (req, res) => unitController.create(req, res));
routes.get("/units", (req, res) => unitController.list(req, res));
routes.get("/units/:id", (req, res) => unitController.getById(req, res));
routes.put("/units/:id", authMiddleware, (req, res) => unitController.update(req, res));
routes.delete("/units/:id", authMiddleware, (req, res) => unitController.delete(req, res));

// Aulas
routes.post("/lessons", authMiddleware, (req, res) => lessonController.create(req, res));
routes.get("/lessons", (req, res) => lessonController.list(req, res));
routes.get("/lessons/:id", (req, res) => lessonController.getById(req, res));
routes.put("/lessons/:id", authMiddleware, (req, res) => lessonController.update(req, res));
routes.delete("/lessons/:id", authMiddleware, (req, res) => lessonController.delete(req, res));

export { routes };