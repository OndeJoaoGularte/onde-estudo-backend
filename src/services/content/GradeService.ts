import { AppDataSource } from "../../data-source";
import { Grade } from "../../entities/content/Grade";


export class GradeService {
  private gradeRepository = AppDataSource.getRepository(Grade);

  // POST
  async create(data: Partial<Grade>) {
    if (!data.subjectId) {
      throw new Error(
        "Erro ao criar série: O subjectId é obrigatório para a criação de uma série.",
      );
    }

    const grade = this.gradeRepository.create(data);

    try {
      await this.gradeRepository.save(grade);
      return grade;
    } catch (error) {
      throw new Error(
        "Erro ao criar série: Verifique se o subjectId informado corresponde a uma matéria existente.",
      );
    }
  }

  // GET
  async list() {
    return await this.gradeRepository.find({
      relations: ["subject", "units"],
      order: { orderIndex: "ASC" }
    });
  }

  // PUT
  async update(id: string, data: Partial<Grade>) {
    const grade = await this.gradeRepository.findOneBy({ id });
    if (!grade)
      throw new Error("Erro ao atualizar série: Série não encontrada.");

    this.gradeRepository.merge(grade, data);
    await this.gradeRepository.save(grade);

    return grade;
  }

  // DELETE
  async delete(id: string) {
    const grade = await this.gradeRepository.findOneBy({ id });
    if (!grade) throw new Error("Erro ao deletar série: Série não encontrada.");

    await this.gradeRepository.remove(grade);
  }
}
