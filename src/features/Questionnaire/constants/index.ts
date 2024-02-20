import { ChoiceQuestion } from '@/components';

const CHOICE_QUESTION_TYPE = 'choice';

export const QUESTION_TYPE_TO_COMPONENT = {
  [CHOICE_QUESTION_TYPE]: ChoiceQuestion,
};

export const BASE_PATHNAME = '/question';

// export const DYNAMIC_QUESTIONS_TEXT_REGEX = ;
