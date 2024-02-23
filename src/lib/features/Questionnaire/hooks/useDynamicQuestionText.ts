import { DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX } from '@/lib/features/Questionnaire/constants';
import { questionnaireSelector } from '@/lib/features/Questionnaire/selectors';
import { Question } from '@/lib/features/Questionnaire/types';
import {
  getDynamicQuestionPartsFromRules,
  normalizeDynamicText,
} from '@/lib/features/Questionnaire/utils';
import { useAppSelector } from '@/lib/store/hooks';
import { replacePlaceholdersInString } from '@/lib/utils';

export const useDynamicQuestionText = (
  questionText: Question['questionText'],
): string => {
  const questionnaire = useAppSelector(questionnaireSelector);
  const isAnyQuestionAnswered = Object.keys(questionnaire).length;
  const { raw, rules } = questionText;

  if (!rules || !isAnyQuestionAnswered) {
    return raw;
  }

  const orderedDynamicInsertions = getDynamicQuestionPartsFromRules(
    rules,
    questionnaire,
  );

  const dynamicText = replacePlaceholdersInString(
    raw,
    DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX,
    (_, key) => {
      const insertion = orderedDynamicInsertions.shift();

      if (insertion === undefined) {
        throw new Error(
          `There are no dynamic insertions generated for the question - ${raw}. Check the questionnaire configuration.`,
        );
      }

      return normalizeDynamicText(key, insertion);
    },
  );

  return dynamicText;
};
