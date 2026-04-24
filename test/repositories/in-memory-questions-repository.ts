import type { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository';
import type { Question } from '@/domain/forum/enterprise/entities/question';

export class inMemoryQuestionsRepository implements QuestionsRepository {


  public items: Question[] = [];

  async findById(id: string): Promise<Question | null> {
    const question = this.items.find(item => item.id.toString() === id);

    if (!question) {
      return null;
    }

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = this.items.find(item => item.slug.value === slug);

    if (!question) {
      return null;
    }

    return question;
  }

  async delete(question: Question): Promise<void> {
    const questionIndex = this.items.findIndex(item => item.id === question.id);

    this.items.splice(questionIndex, 1);
  }

  async save (question: Question) {
    const questionIndex = this.items.findIndex(item => item.id === question.id);

    if (questionIndex >= 0) {
      this.items[questionIndex] = question;
    }
  }}