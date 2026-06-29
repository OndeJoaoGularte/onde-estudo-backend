import { Request, Response } from "express";
import { AdminService } from "../../services/admin/AdminService";

export class AdminController {
  private adminService = new AdminService();

  async getStats(req: Request, res: Response) {
    try {
      const stats = await this.adminService.getDashboardStats();

      return res.status(200).json(stats);
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
  }
}
