import QuestionnairePageLayout from '@/lib/features/Questionnaire/components/layouts/PageLayout';
import QuestionLayout from '@/lib/features/Questionnaire/components/layouts/QuestionLayout';
import QuestionnairePage from '@/lib/features/Questionnaire/components/questions/Page';
import ChoiceQuestion from '../components/questions/Choice';

const CHOICE_QUESTION_TYPE = 'choice';

const PAGE_TYPE = 'page';

export const QUESTION_TYPE_TO_LAYOUT = {
  [CHOICE_QUESTION_TYPE]: QuestionLayout,
  [PAGE_TYPE]: QuestionnairePageLayout,
};

export const QUESTION_TYPE_TO_COMPONENT = {
  [CHOICE_QUESTION_TYPE]: ChoiceQuestion,
  [PAGE_TYPE]: QuestionnairePage,
};

export const BASE_PATHNAME = '/question';

export const DYNAMIC_QUESTIONS_PLACEHOLDER_REGEX = /{{(.*?)}}/g;
