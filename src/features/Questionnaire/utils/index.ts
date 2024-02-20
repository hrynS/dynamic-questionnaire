import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import { QuestionnaireState } from '@/features/Questionnaire/slice';
import { QuestionNextRule } from '@/features/Questionnaire/types';

export const getNextQuestionUrlFromRules = (
  rules: QuestionNextRule[],
  questionnaire: QuestionnaireState,
): string | undefined => {
  for (let i = 0; i < rules.length; i++) {
    debugger;
    const rule = rules[i];
    const stateFieldValue = questionnaire[rule.if].value;

    if ('oneOf' in rule) {
      if (rule.oneOf.includes(stateFieldValue)) {
        return `${BASE_PATHNAME}/${rule.questionId}`;
      }
    } else {
      if (rule.is === stateFieldValue) {
        return `${BASE_PATHNAME}/${rule.questionId}`;
      }
    }
  }
};
