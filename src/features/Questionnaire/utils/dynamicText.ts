import { DynamicQuestionTextRule, QuestionnaireState } from '@/features/Questionnaire/types';
import { capitalizeLetter, isUpperCase, lowercaseLetter } from '@/lib/utils';

export const getDynamicQuestionPartsFromRules = (
  rules: DynamicQuestionTextRule[],
  questionnaire: QuestionnaireState,
): string[] => {
  return rules.map((rule) => {
    const isSimpleReplacement =
      rule.replaceWith && Object.keys(rule).length === 1;
debugger;
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

export const normalizeDynamicText = (key: string, dynamicInsertion: string) => {
  if (isUpperCase(key.charAt(0))) {
    return capitalizeLetter(dynamicInsertion);
  } else {
    return lowercaseLetter(dynamicInsertion);
  }
};