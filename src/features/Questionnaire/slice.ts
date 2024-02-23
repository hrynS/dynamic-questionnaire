import {
  QuestionnaireState,
  SetFieldValueAction,
} from '@/features/Questionnaire/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: QuestionnaireState = {};

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
