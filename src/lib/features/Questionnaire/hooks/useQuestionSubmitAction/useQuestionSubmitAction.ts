import { useMemoizedSubmitAction } from '@/lib/features/Questionnaire/hooks/useQuestionSubmitAction/useMemoizedSubmitAction';
import { questionnaireSelector } from '@/lib/features/Questionnaire/selectors';
import { Question } from '@/lib/features/Questionnaire/types';
import { useAppSelector } from '@/lib/store/hooks';
import { useEffect, useState } from 'react';

type SubmitAction = (shouldSubmit: boolean) => void;

export const useQuestionSubmitAction = (question: Question): SubmitAction => {
  const questionnaire = useAppSelector(questionnaireSelector);
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
