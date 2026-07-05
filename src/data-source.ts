import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Subject } from "./entities/content/Subject";
import { Grade } from "./entities/content/Grade";
import { Unit } from "./entities/content/Unit";
import { Lesson } from "./entities/content/Lesson";
import { LessonFeedback } from "./entities/content/LessonFeedback";
import {
  ContentBlock,
  QuizBlock,
  ResourceBlock,
  TextBlock,
  VideoBlock,
} from "./entities/content/ContentBlock";
import { QuizQuestion } from "./entities/content/QuizQuestion";
import { User } from "./entities/user/User";
import { UserEnrollmentSubject } from "./entities/user/UserEnrollmentSubject";
import { LessonProgress } from "./entities/user/LessonProgress";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL ? {} : {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  }),
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
  synchronize: true,
  logging: false,
  entities: [
    Subject,
    Grade,
    Unit,
    Lesson,
    LessonFeedback,
    ContentBlock,
    TextBlock,
    VideoBlock,
    ResourceBlock,
    QuizBlock,
    QuizQuestion,
    User,
    UserEnrollmentSubject,
    LessonProgress,
  ],
  migrations: [],
  subscribers: [],
});
