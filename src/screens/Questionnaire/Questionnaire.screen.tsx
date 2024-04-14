import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { motion } from 'framer-motion';

import { Button, GridList, Paragraph, showToast } from '../../components';
import { Category, Option, Question } from '../../models';
import { QuestionnaireServices } from '../../services';
import { Stack } from '../../utils';
import { OptionItem } from './OptionItem';

interface QuestionnaireProps {}

interface CustomizedState {
  category: Category;
}

export const QuestionnaireScreen: React.FC<QuestionnaireProps> = () => {
  const location = useLocation();
  const state: CustomizedState = location.state;
  const { category } = state;
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<Option[]>([]);
  const [select, setSelect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [currentNumber, setCurrentNumber] = useState<number>(0);
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const navigate = useNavigate();

  const stackQuestions = useMemo(() => {
    return new Stack<Question>();
  }, []);

  const initQuiz = async () => {
    try {
      const questions = await QuestionnaireServices.initQuiz(category.id);
      for (const question of questions) {
        stackQuestions.push(question);
      }
      setQuestionNumber(questions.length);
      next();
      setShowQuiz(true);
    } catch (error) {
      showToast('Error al traer el quiz', 'error');
    }
  };

  const next = () => {
    setSelect(false);
    if (stackQuestions.isEmpty()) {
      setFinish(true);
      return;
    }
    const nextQuestion = stackQuestions.pop();
    if (nextQuestion) {
      setQuestion(nextQuestion.title);
      setOptions(nextQuestion.options);
      setCurrentNumber(currentNumber + 1);
    }
  };

  return (
    <>
      {showQuiz ? (
        <Container maxWidth="sm">
          {!finish ? (
            <>
              <Paragraph
                text={question}
                align="center"
                variant="h6"
                sx={{ py: 2 }}
              />
              <Box sx={{ pointerEvents: select ? 'none' : 'auto' }}>
                <GridList
                  items={options}
                  sm={12}
                  md={12}
                  xs={12}
                  lg={12}
                  xl={12}
                  renderItem={(item: Option) => (
                    <OptionItem
                      option={item}
                      wasSelected={select}
                      selectOption={(isCorrect) => {
                        if (isCorrect) {
                          setScore(score + 1);
                        }
                        setSelect(true);
                      }}
                    />
                  )}
                />
              </Box>
              <Box sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
                <Button
                  onClick={() => next()}
                  title="Siguiente"
                  animation
                  disabled={!select}
                />
              </Box>
              <Paragraph text={'Puntaje: ' + score} />
              <Paragraph
                text={'Pregunta: ' + currentNumber + ' de ' + questionNumber}
              />
            </>
          ) : (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <Paragraph
                  text={'¡Quiz Terminado!'}
                  align="center"
                  variant="h3"
                />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Paragraph text={'Tu puntaje fue de ' + score} align="center" />
              </motion.div>
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                <Button
                  title="Volver"
                  onClick={() => navigate('/home')}
                  animation
                />
              </Box>
            </>
          )}
        </Container>
      ) : (
        <>
          <Paragraph text={'Empieza este Quiz!'} variant="h3" align="center" />
          <Paragraph text={'Categoria ' + category.name} align="center" />
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <Button title="Empezar" onClick={() => initQuiz()} animation />
          </Box>
        </>
      )}
    </>
  );
};
