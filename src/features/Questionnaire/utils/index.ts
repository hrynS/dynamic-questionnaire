import { BASE_PATHNAME } from '@/features/Questionnaire/constants';
import {
  DynamicQuestionTextRule,
  QuestionnaireState,
  QuestionNextRule,
} from '@/features/Questionnaire/types';
import { replacePlaceholdersInString } from '@/lib/utils';

// export function checkQuestionRule<Rule, Callback extends Function>(rule: Rule, state: QuestionnaireState, callback: Callback) {
//   const stateFieldValue = state[rule.if].value;
//
//   if ('oneOf' in rule) {
//     if (rule.oneOf.includes(stateFieldValue)) {
//       return callback(rule);
//     }
//   } else {
//     if (rule.is === stateFieldValue) {
//       return callback(rule);
//     }
//   }
// }

export const getNextQuestionUrlFromRules = (
  rules: QuestionNextRule[],
  questionnaire: QuestionnaireState,
): string | undefined => {
  for (let i = 0; i < rules.length; i++) {
    debugger;
    const rule = rules[i];
    // const getUrl = (rule: QuestionNextRule) => `${BASE_PATHNAME}/${rule.questionId}`;
    //
    // const result = checkQuestionRule<QuestionNextRule, typeof getUrl>(rule, questionnaire, getUrl);
    //
    // if (result) return result;

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

export const getDynamicQuestionPartsFromRules = (
  rules: DynamicQuestionTextRule[],
  questionnaire: QuestionnaireState,
): string[] => {
  return rules.map((rule) => {
    const isSimpleReplacement =
      rule.replaceWith && Object.keys(rule).length === 1;

    if (isSimpleReplacement) {
      return questionnaire[rule.replaceWith].label;
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
