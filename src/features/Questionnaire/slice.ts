import {
  QuestionnaireState,
  SetFieldValueAction,
} from '@/features/Questionnaire/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: QuestionnaireState = {
  '1': {
    field: 'gender',
    value: 'male',
    label: 'Male',
  },
  '3': {
    field: 'isSingleParent',
    value: 'no',
    label: 'Yes',
  },
};

export const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setFieldValue(
      state: QuestionnaireState,
      { payload: { id, ...values } }: SetFieldValueAction,
    ) {
      state[id] = {
        ...values,
      };
    },
  },
});

export const { setFieldValue } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
