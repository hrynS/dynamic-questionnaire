import {
  useMemoizedSubmitAction,
} from '@/features/Questionnaire/hooks/useQuestionSubmitAction/useMemoizedSubmitAction';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question } from '@/features/Questionnaire/types';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type SubmitAction = (shouldSubmit: boolean) => void;

export const useQuestionSubmitAction = (
  question: Question,
): SubmitAction => {
  const questionnaire = useSelector(questionnaireSelector);
  const [shouldSubmitQuestion, setShouldSubmitQuestion] =
    useState<boolean>(false);

  // set shouldSubmit flag to true when the Next button is clicked
  useEffect(() => {
    if (questionnaire[question.id]?.value) {
      setShouldSubmitQuestion(true);
    }
  }, [questionnaire]);

  // generate link to the next page
  const createOnSubmitAction = useMemoizedSubmitAction(question, questionnaire);

  // go to the next page after shouldSubmit flag was to true
  useEffect(() => {
    if (shouldSubmitQuestion) {
      createOnSubmitAction(questionnaire)();
    }
    setShouldSubmitQuestion(false);
  }, [shouldSubmitQuestion, createOnSubmitAction]);

  return setShouldSubmitQuestion;
};
