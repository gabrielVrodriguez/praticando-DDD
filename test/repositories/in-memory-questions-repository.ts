import type { QuestionRepository } from '@/domain/forum/application/repositories/question-repository';
import type { Question } from '@/domain/forum/enterprise/entities/question';

export class inMemoryQuestionsRepository implements QuestionRepository {

   public items: Question[] = [];

   async create (question: Question): Promise<void> {
     this.items.push(question);
   }
}