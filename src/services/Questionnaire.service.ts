import { Question } from '../models';
import { get } from './Fetch.service';

const SERVICE_ENDPOINT = 'questionnaire';

export const QuestionnaireServices = (() => {
  const initQuiz = async (categoryId: number) => {
    try {
      const questions: Question[] = await get(
        SERVICE_ENDPOINT + '/' + categoryId
      );
      return questions;
    } catch (error) {
      throw newError('INIT-QUIZ-FAIL', error);
    }
  };

  type QuestionnireServiceError = 'INIT-QUIZ-FAIL';

  const newError = (code: QuestionnireServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { initQuiz };
})();
