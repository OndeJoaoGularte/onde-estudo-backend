import { Request, Response } from "express";
import { SubjectService } from "../../services/content/SubjectService";

export class SubjectController {
  private subjectService = new SubjectService();
  
  // POST
  async create(req: Request, res: Response) {
    try {
      const subject = await this.subjectService.create(req.body);

      return res.status(201).json(subject);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET
  async list(req: Request, res: Response) {
    try {
      const subjects = await this.subjectService.list();
      
      return res.status(200).json(subjects);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const subject = await this.subjectService.getById(id);
      
      return res.status(200).json(subject);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedSubject = await this.subjectService.update(id, req.body);

      return res.status(200).json(updatedSubject);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.subjectService.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
