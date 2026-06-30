import { Request, Response } from "express";
import { UnitService } from "../../services/content/UnitService";

export class UnitController {
  private unitService = new UnitService();

  // POST
  async create(req: Request, res: Response) {
    try {
      const unit = await this.unitService.create(req.body);

      return res.status(201).json(unit);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  // GET
  async list(req: Request, res: Response) {
    try {
      const units = await this.unitService.list();
      
      return res.status(200).json(units);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // GET BY ID
  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const unit = await this.unitService.getById(id);
      
      return res.status(200).json(unit);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // PUT
  async update(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedUnit = await this.unitService.update(id, req.body);

      return res.status(200).json(updatedUnit);
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }

  // DELETE
  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      await this.unitService.delete(id);

      return res.status(204).send();
    } catch (error: any) {
      return res.status(404).json({ error: error.message });
    }
  }
}
