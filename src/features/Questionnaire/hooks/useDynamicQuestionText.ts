import { DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX } from '@/features/Questionnaire/constants';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { Question } from '@/features/Questionnaire/types';
import { getDynamicQuestionPartsFromRules, normalizeDynamicText } from '@/features/Questionnaire/utils';
import { logError, replacePlaceholdersInString } from '@/lib/utils';
import { useSelector } from 'react-redux';

let counter = 0;

export const useDynamicQuestionText = (
  questionText: Question['questionText'],
): string => {
  const questionnaire = useSelector(questionnaireSelector);
  const { raw, rules } = questionText;
debugger;
  if (!rules) {
    return raw;
  }

  const orderedDynamicInsertions = getDynamicQuestionPartsFromRules(
    rules,
    questionnaire,
  );
  const dynamicText = replacePlaceholdersInString(
    raw,
    DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX,
    (_, key, anotherThing) => {
      const insertion = orderedDynamicInsertions.shift();
      debugger;
      console.log('anotherThing',anotherThing);
      counter++;
      if (!insertion) {
        debugger;
        console.log('SOMEHOW_GOES_HERE', insertion, new Date());
        logError(
          `There are no dynamic insertions generated for the question - ${raw}. Check the questionnaire configuration.`,
        );
        return '';
      }

      return normalizeDynamicText(key, insertion);
    },
  );
  console.log('counter', counter);
  return dynamicText;
};
