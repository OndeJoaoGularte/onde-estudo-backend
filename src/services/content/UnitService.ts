import { AppDataSource } from "../../data-source";
import { Unit } from "../../entities/content/Unit";

export class UnitService {
  private unitRepository = AppDataSource.getRepository(Unit);

  // POST
  async create(data: Partial<Unit>) {
    if (!data.gradeId) {
      throw new Error(
        "Erro ao criar unidade: O gradeId é obrigatório para a criação de uma unidade.",
      );
    }

    const unit = this.unitRepository.create(data);

    try {
      await this.unitRepository.save(unit);
      return unit;
    } catch (error) {
      throw new Error(
        "Erro ao criar unidade: Verifique se o gradeId informado corresponde a uma série existente.",
      );
    }
  }

  // GET
  async list() {
    return await this.unitRepository.find({
      relations: ["grade", "lessons"],
      order: { orderIndex: "ASC" } // Para a lista do Dashboard ficar arrumada
    });
  }

  // GET BY ID
  async getById(id: string) {
    const unit = await this.unitRepository.findOne({
      where: { id },
      relations: ["grade", "lessons", "lessons.contentBlocks"],
      order: {
        lessons: {
          orderIndex: "ASC"
        }
      }
    });

    if (!unit) {
      throw new Error("Erro ao buscar unidade: Unidade não encontrada.");
    }

    return unit;
  }

  // PUT
  async update(id: string, data: Partial<Unit>) {
    const unit = await this.unitRepository.findOneBy({ id });
    if (!unit)
      throw new Error("Erro ao atualizar unidade: Unidade não encontrada.");

    this.unitRepository.merge(unit, data);
    await this.unitRepository.save(unit);

    return unit;
  }

  // DELETE
  async delete(id: string) {
    const unit = await this.unitRepository.findOneBy({ id });
    if (!unit)
      throw new Error("Erro ao deletar unidade: Unidade não encontrada.");

    await this.unitRepository.remove(unit);
  }
}
