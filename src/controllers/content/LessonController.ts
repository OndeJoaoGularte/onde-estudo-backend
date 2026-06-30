import { Request, Response } from "express";
import { LessonService } from "../../services/content/LessonService";

export class LessonController {
  private lessonService = new LessonService();
  
  // POST
  async create(req: Request, res: Response) {
    try {
      const lesson = await this.lessonService.create(req.body);

      return res.status(201).json(lesson);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    } 
  }

  // GET
  async list(req: Request, res: Response) {
    try {
      const lessons = await this.lessonService.list();
      
      return res.status(200).json(lessons);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const lesson = await this.lessonService.getById(id);
      
      return res.status(200).json(lesson);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedLesson = await this.lessonService.update(id, req.body);

      return res.status(200).json(updatedLesson);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.lessonService.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
