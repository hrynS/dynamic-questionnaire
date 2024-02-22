import { DYNAMIC_QUESTIONS_TEXT_REGEX } from '@/features/Questionnaire/constants';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question } from '@/features/Questionnaire/types';
import { getDynamicQuestionPartsFromRules } from '@/features/Questionnaire/utils';
import {
  capitalizeLetter,
  isUpperCase,
  logError,
  lowercaseLetter,
  replacePlaceholdersInString,
} from '@/lib/utils';
import { useSelector } from 'react-redux';

const normalizeDynamicText = (key: string, dynamicInsertion: string) => {
  if (isUpperCase(key.charAt(0))) {
    return capitalizeLetter(dynamicInsertion);
  } else {
    return lowercaseLetter(dynamicInsertion);
  }
};

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
    (_, key) => {
      const insertion = orderedDynamicInsertions.shift();

      if (!insertion) {
        logError(
          `There are no dynamic insertions generated for the question - ${raw}. Check the questionnaire configuration.`,
        );
        return '';
      }

      return normalizeDynamicText(key, insertion);
    },
  );

  return {
    dynamicText,
  };
};
