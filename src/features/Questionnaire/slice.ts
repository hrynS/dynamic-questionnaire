import { Question, SetFieldValueAction } from '@/features/Questionnaire/types';
import { createSlice } from '@reduxjs/toolkit';

export interface QuestionnaireState {
  [id: Question['id']]: {
    field: Question['field'];
    value: string;
  };
}

const initialState: QuestionnaireState = {
  '1': {
    field: 'gender',
    value: 'male',
  },
};

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setFieldValue(
      state: QuestionnaireState,
      { payload: { id, field, value } }: SetFieldValueAction,
    ) {
      state[id] = {
        field,
        value,
      };
    },
  },
});

export const { setFieldValue } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
