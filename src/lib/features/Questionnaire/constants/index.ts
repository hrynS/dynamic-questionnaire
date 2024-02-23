import ChoiceQuestion from '../components/questions/Choice';

const CHOICE_QUESTION_TYPE = 'choice';

export const QUESTION_TYPE_TO_COMPONENT = {
  [CHOICE_QUESTION_TYPE]: ChoiceQuestion,
};

export const BASE_PATHNAME = '/question';

export const DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX = /{{(.*?)}}/g;