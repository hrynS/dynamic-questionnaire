import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question, QuestionnaireState } from '@/features/Questionnaire/types';
import {
  getIntermediatePageUrl,
  getNextQuestionUrlFromRules,
  getQuestionUrl,
} from '@/features/Questionnaire/utils';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useMemoizedSubmitAction = (
  question: Question,
  questionnaire: QuestionnaireState,
) => {
  const router = useRouter();

  console.log('useQuestionSubmitAction', questionnaire);
  const createOnSubmitAction = useCallback(
    (questionnaire: QuestionnaireState) => {
      const { next } = question;
      console.log('createOnSubmitAction', questionnaire);
      switch (true) {
        case 'href' in next && 'rules' in next:
          return () => {
            console.log('result_func', questionnaire);
            const url = getNextQuestionUrlFromRules(
              next.rules,
              questionnaire,
              getIntermediatePageUrl(next.href),
            );
            if (!url) return () => {};

            router.push(url);
          };
        case 'href' in next:
          return () => {
            router.push(next.href);
          };
        case 'rules' in next:
          return () => {
            const url = getNextQuestionUrlFromRules(
              next.rules,
              questionnaire,
              getQuestionUrl,
            );
            if (!url) return () => {};

            router.push(url);
          };
        case 'questionId' in next:
          return () => {
            router.push(getQuestionUrl(next.questionId));
          };
        default:
          return () => {
            //   TODO: consider throwing an error when url is not resolved
          };
      }
    },
    [question, questionnaire, router],
  );

  return createOnSubmitAction;
};

export const useQuestionSubmitAction = (
  question: Question,
): ((shouldSubmit: boolean) => void) => {
  const questionnaire = useSelector(questionnaireSelector);
  const [shouldSubmitQuestion, setShouldSubmitQuestion] =
    useState<boolean>(false);
  useEffect(() => {
    if (questionnaire[question.id]?.value) {
      setShouldSubmitQuestion(true);
    }
  }, [questionnaire]);

  const createOnSubmitAction = useMemoizedSubmitAction(question, questionnaire);

  useEffect(() => {
    if (shouldSubmitQuestion) createOnSubmitAction(questionnaire)();
    setShouldSubmitQuestion(false);
  }, [shouldSubmitQuestion, createOnSubmitAction]);

  return setShouldSubmitQuestion;
};
