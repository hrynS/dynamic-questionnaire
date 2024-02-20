import { ChoiceQuestion } from '@/components';

const CHOICE_QUESTION_TYPE = 'choice';

export const QUESTION_TYPE_TO_COMPONENT = {
  [CHOICE_QUESTION_TYPE]: ChoiceQuestion,
};
