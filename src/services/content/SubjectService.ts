import { AppDataSource } from "../../data-source";
import { Subject } from "../../entities/content/Subject";

export class SubjectService {
  private subjectRepository = AppDataSource.getRepository(Subject);

  // POST
  async create(data: Partial<Subject>) {
    if (!data.name) {
      throw new Error("Erro ao criar matéria: O nome da matéria é obrigatório.");
    }
    const subject = this.subjectRepository.create(data);
    await this.subjectRepository.save(subject);

    return subject;
  }

  // GET
  async list() {
    return await this.subjectRepository.find({
      relations: ["grades"],
      order: { name: "ASC" }
    });
  }

  // GET BY ID
  async getById(id: string) {
    const subject = await this.subjectRepository.findOne({
      where: { id },
      relations: ["grades"],
      order: {
        grades: {
          orderIndex: "ASC"
        }
      }
    });

    if (!subject) {
      throw new Error("Erro ao buscar matéria: Matéria não encontrada.");
    }

    return subject;
  }

  // PUT
  async update(id: string, data: Partial<Subject>) {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject)
      throw new Error("Erro ao atualizar matéria: Matéria não encontrada.");

    this.subjectRepository.merge(subject, data);
    await this.subjectRepository.save(subject);

    return subject;
  }

  // DELETE
  async delete(id: string) {
    const subject = await this.subjectRepository.findOneBy({ id });
    if (!subject) throw new Error("Erro ao deletar matéria: Matéria não encontrada.");

    await this.subjectRepository.remove(subject);
  }
}
