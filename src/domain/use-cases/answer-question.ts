
import { Answer } from '../entities/answer.js';

interface AnswerQuestionRequest {
    questionId: string;
    content: string;
    instructorId: string;
}

export class AnswerQuestion {

    execute({ questionId, content, instructorId }: AnswerQuestionRequest) {
        const answer = new Answer(content);

        return answer;
    }
}