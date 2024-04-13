import { Question } from '../models/question.model';
import { get } from './Fetch.service';

const SERVICE_ENDPOINT = 'questionnaire';

export const QuestionnaireServices = (() => {
  const getQuestionnaire = async () => {
    try {
      const questions: Question[] = await get(SERVICE_ENDPOINT);
      return questions;
    } catch (error) {
      throw newError('GET-QUESTIONNIRE-FAIL', error);
    }
  };

  type QuestionnireServiceError = 'GET-QUESTIONNIRE-FAIL';

  const newError = (code: QuestionnireServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { getQuestionnaire };
})();
