import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import {
  DynamicQuestionTextRule,
  QuestionnaireState,
  QuestionNextRule,
} from '@/features/Questionnaire/types';

export const getQuestionUrl = (questionId: QuestionNextRule['questionId']) =>
  `${BASE_PATHNAME}/${questionId}`;

export const getIntermediatePageUrl =
  (nextPathname: string) => (questionId: QuestionNextRule['questionId']) =>
    `${BASE_PATHNAME}/${nextPathname}?questionId=${questionId}`;

export const getNextQuestionUrlFromRules = (
  rules: QuestionNextRule[],
  questionnaire: QuestionnaireState,
  generateTargetUrl: (questionId: QuestionNextRule['questionId']) => string,
): string | undefined => {
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];

    if (!rule.questionId) {
      throw new Error(
        'There is no question id in rule. Check the questionnaire configuration.',
      );
    }

    const stateFieldValue = questionnaire[rule.if].value;

    if ('oneOf' in rule) {
      if (rule.oneOf.includes(stateFieldValue)) {
        return generateTargetUrl(rule.questionId);
      }
    } else {
      if (rule.is === stateFieldValue) {
        return generateTargetUrl(rule.questionId);
      }
    }
  }
};

export const getDynamicQuestionPartsFromRules = (
  rules: DynamicQuestionTextRule[],
  questionnaire: QuestionnaireState,
): string[] => {
  return rules.map((rule) => {
    const isSimpleReplacement =
      rule.replaceWith && Object.keys(rule).length === 1;

    if (isSimpleReplacement) {
      return questionnaire[rule.replaceWith]?.label;
    }

    const stateFieldValue = 'if' in rule ? questionnaire[rule.if]?.value : '';

    if ('oneOf' in rule) {
      if (rule.oneOf.includes(stateFieldValue)) {
        return rule.replaceWith;
      }
    } else {
      if ('is' in rule && rule.is === stateFieldValue) {
        return rule.replaceWith;
      }
    }

    return '';
  });
};
