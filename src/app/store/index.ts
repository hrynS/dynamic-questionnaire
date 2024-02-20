import { questionnaireReducer } from '@/features/Questionnaire';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
