import { Request, Response } from "express";
import { GradeService } from "../../services/content/GradeService";

export class GradeController {
  private gradeService = new GradeService();

  // POST
  async create(req: Request, res: Response) {
    try {
      const grade = await this.gradeService.create(req.body);

      return res.status(201).json(grade);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET
  async list(req: Request, res: Response) {
    try {
      const grades = await this.gradeService.list();
      
      return res.status(200).json(grades);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const grade = await this.gradeService.getById(id);
      
      return res.status(200).json(grade);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedGrade = await this.gradeService.update(id, req.body);

      return res.status(200).json(updatedGrade);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.gradeService.delete(id);
      
      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
