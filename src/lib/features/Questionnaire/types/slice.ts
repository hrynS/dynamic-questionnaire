import {
  Question,
  QuestionFieldValueByType,
  QuestionType,
} from '@/lib/features/Questionnaire/types/question';
import { PayloadAction } from '@reduxjs/toolkit';

export type SetFieldValueAction = PayloadAction<{
  id: string;
  field: string;
  value: QuestionFieldValueByType[QuestionType];
  label: string;
}>;

export interface QuestionnaireState {
  [id: Question['id']]: {
    field: Question['field'];
    value: QuestionFieldValueByType[QuestionType];
    label: string;
  };
}
