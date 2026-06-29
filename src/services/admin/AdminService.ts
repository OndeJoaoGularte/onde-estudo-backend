import { AppDataSource } from "../../data-source";
import { Subject } from "../../entities/content/Subject";
import { Grade } from "../../entities/content/Grade";
import { Unit } from "../../entities/content/Unit";
import { Lesson } from "../../entities/content/Lesson";
import { User } from "../../entities/user/User";

export class AdminService {
  async getDashboardStats() {
    const [subjects, grades, units, lessons, users] = await Promise.all([
      AppDataSource.getRepository(Subject).count(),
      AppDataSource.getRepository(Grade).count(),
      AppDataSource.getRepository(Unit).count(),
      AppDataSource.getRepository(Lesson).count(),
      AppDataSource.getRepository(User).count(),
    ]);

    return { subjects, grades, units, lessons, users };
  }
}