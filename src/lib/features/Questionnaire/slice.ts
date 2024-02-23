import {
  QuestionnaireState,
  SetFieldValueAction,
} from '@/lib/features/Questionnaire/types';
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
    resetQuestionnaire() {
      return initialState;
    },
  },
});

export const { setFieldValue, resetQuestionnaire } = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
