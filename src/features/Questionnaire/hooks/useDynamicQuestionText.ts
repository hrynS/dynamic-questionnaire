import { DYNAMIC_QUESTIONS_TEXT_REGEX } from '@/features/Questionnaire/constants';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question } from '@/features/Questionnaire/types';
import { getDynamicQuestionPartsFromRules } from '@/features/Questionnaire/utils';
import { replacePlaceholdersInString } from '@/lib/utils';
import { useSelector } from 'react-redux';

export const useDynamicQuestionText = (
  questionText: Question['questionText'],
):
  | {
      rawText: string;
    }
  | {
      dynamicText: string;
    } => {
  const questionnaire = useSelector(questionnaireSelector);
  const { raw, rules } = questionText;

  if (!rules) {
    return {
      rawText: raw,
    };
  }

  const orderedDynamicInsertions = getDynamicQuestionPartsFromRules(
    rules,
    questionnaire,
  );
  const dynamicText = replacePlaceholdersInString(
    raw,
    DYNAMIC_QUESTIONS_TEXT_REGEX,
    () => orderedDynamicInsertions.shift() ?? '',
  );

  return {
    dynamicText,
  };
};
