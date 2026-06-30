import { AppDataSource } from "../../data-source";
import { Lesson } from "../../entities/content/Lesson";
import {
  TextBlock,
  VideoBlock,
  ResourceBlock,
  QuizBlock,
} from "../../entities/content/ContentBlock";

export class LessonService {
  private lessonRepository = AppDataSource.getRepository(Lesson);

  // POST
  async create(data: any) {
    if (!data.unitId) {
      throw new Error(
        "Erro ao criar aula: O unitId é obrigatório para a criação de uma aula.",
      );
    }

    const { contentBlocks, ...lessonData } = data;
    const lesson = this.lessonRepository.create(lessonData as Partial<Lesson>);

    if (contentBlocks && Array.isArray(contentBlocks)) {
      lesson.contentBlocks = contentBlocks.map((block: any) => {
        switch (block.type) {
          case "TEXT":
            return AppDataSource.getRepository(TextBlock).create(
              block as TextBlock,
            );

          case "VIDEO":
            return AppDataSource.getRepository(VideoBlock).create(
              block as VideoBlock,
            );

          case "RESOURCE":
            return AppDataSource.getRepository(ResourceBlock).create(
              block as ResourceBlock,
            );

          case "QUIZ":
            return AppDataSource.getRepository(QuizBlock).create(
              block as QuizBlock,
            );

          default:
            throw new Error(
              `Erro ao criar aula: Tipo de bloco desconhecido (${block.type}).`,
            );
        }
      });
    }

    try {
      await this.lessonRepository.save(lesson);
      return lesson;
    } catch (error) {
      throw new Error(
        "Erro ao criar aula: Verifique se o unitId informado corresponde a uma unidade existente.",
      );
    }
  }

  // GET
  async list() {
    return await this.lessonRepository.find({
      relations: [
        "unit",
        "contentBlocks",
        "feedbacks",
        "contentBlocks.questions",
      ],
      order: { orderIndex: "ASC" }
    });
  }

  // GET BY ID
  async getById(id: string) {
    const lesson = await this.lessonRepository.findOne({
      where: { id },
      relations: [
        "unit",
        "contentBlocks", 
        "feedbacks",
      ],
      order: {
        contentBlocks: {
          orderIndex: "ASC"
        }
      }
    });

    if (!lesson) {
      throw new Error("Erro ao buscar aula: Aula não encontrada.");
    }

    return lesson;
  }

  // PUT
  async update(id: string, data: Partial<Lesson>) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson)
      throw new Error("Erro ao atualizar aula: Aula não encontrada.");

    this.lessonRepository.merge(lesson, data);
    await this.lessonRepository.save(lesson);

    return lesson;
  }

  // DELETE
  async delete(id: string) {
    const lesson = await this.lessonRepository.findOneBy({ id });
    if (!lesson) throw new Error("Erro ao deletar aula: Aula não encontrada.");

    await this.lessonRepository.remove(lesson);
  }
}
