import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  TableInheritance,
  ChildEntity,
  OneToMany,
} from "typeorm";
import { Lesson } from "./Lesson";
import { QuizQuestion } from "./QuizQuestion";

export enum Resource {
  LINK = "link",
  BOOK = "book",
  ARTICLE = "article",
}

@Entity("content_blocks")
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class ContentBlock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  type: string;

  @ManyToOne(() => Lesson, (lesson) => lesson.contentBlocks, {
    onDelete: "CASCADE",
  })
  lesson: Lesson;

  @Column({ type: "int" })
  orderIndex: number;

  @Column({ type: "text" })
  title: string;
}

@ChildEntity("TEXT")
export class TextBlock extends ContentBlock {
  @Column({ type: "text" })
  mainText: string;

  @Column({ type: "text", nullable: true })
  exerciseText: string;

  @Column({ type: "text", nullable: true })
  historicalContext: string;
}

@ChildEntity("VIDEO")
export class VideoBlock extends ContentBlock {
  @Column({ type: "text" })
  videoUrl: string;

  @Column({ type: "int" })
  durationInMinutes: number;
}

@ChildEntity("RESOURCE")
export class ResourceBlock extends ContentBlock {
  @Column({ type: "enum", enum: Resource })
  resourceType: Resource;

  @Column({ type: "text", nullable: true })
  url: string;
}

@ChildEntity("QUIZ")
export class QuizBlock extends ContentBlock {
  @OneToMany(() => QuizQuestion, (question) => question.quizBlock)
  questions: QuizQuestion[];
}
