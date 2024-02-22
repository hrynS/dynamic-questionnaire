export type QuestionType = 'choice';

export type ChoiceQuestionOption = {
  label: string;
  value: string;
};

export interface QuestionNextField {
  questionId: string;
}

export type DynamicQuestionTextRule =
  | {
      if: string;
      is: string;
      replaceWith: string;
    }
  | {
      if: string;
      oneOf: string[];
      replaceWith: string;
    }
  | {
      replaceWith: string;
    };

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

export interface QuestionText {
  raw: string;
  statement?: string;
  rules?: DynamicQuestionTextRule[];
}

export interface ChoiceQuestion {
  id: string;
  field: string;
  questionText: QuestionText;
  type: QuestionType;
  options: ChoiceQuestionOption[];
  next:
    | QuestionNextField
    | QuestionNextWithRules
    | QuestionNextStandalonePage
    | QuestionNextIntermediatePageWithRules;
}

export type Question = ChoiceQuestion;

export interface QuestionFieldValueByType {
  choice: ChoiceQuestionOption['value'];
}

export interface Questionnaire {
  [id: Question['id']]: Question;
}
