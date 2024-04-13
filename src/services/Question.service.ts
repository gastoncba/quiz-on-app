import { post } from './Fetch.service';

const SERVICE_ENDPOINT = 'question';

type QuestionDTO = {
  title: string;
  categoryId: number;
  options: OptionDTO[];
};

type OptionDTO = {
  value: string;
  isCorrect: boolean;
};

export const QuestionServices = (() => {
  const createQuestion = async (newQuestion: QuestionDTO) => {
    try {
      await post(SERVICE_ENDPOINT, newQuestion);
    } catch (error) {
      throw newError('POST-QUESTION-FAIL', error);
    }
  };

  type QuestionServiceError = 'POST-QUESTION-FAIL';

  const newError = (code: QuestionServiceError, error?: any) => {
    return {
      code: code,
      error: error,
    };
  };

  return { createQuestion };
})();
