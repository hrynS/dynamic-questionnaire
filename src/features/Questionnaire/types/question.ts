export type QuestionType = 'choice';

export type ChoiceQuestionOption = {
  label: string;
  value: string;
};

export interface QuestionNextField {
  questionId: string;
}
export type QuestionNextRule =
  | {
      if: string;
      is: string;
      questionId: string;
    }
  | {
      if: string;
      oneOf: string[];
      questionId: string;
    };

export interface QuestionNextWithRules {
  rules: QuestionNextRule[];
}

export interface QuestionNextStandalonePage {
  href: string;
}

export interface QuestionNextIntermediatePageWithRules
  extends QuestionNextWithRules {
  href: string;
}

export interface Question {
  id: string;
  field: string;
  questionText: string;
  type: QuestionType;
  options: ChoiceQuestionOption[];
  next:
    | QuestionNextField
    | QuestionNextWithRules
    | QuestionNextStandalonePage
    | QuestionNextIntermediatePageWithRules;
}

export interface Questionnaire {
  [id: Question['id']]: Question;
}
