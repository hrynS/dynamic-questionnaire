import { Question } from '@/features/Questionnaire/types';
import { jest, beforeEach, describe, it, expect } from '@jest/globals';
import { RootState } from '@/app/store';
import { useMemoizedSubmitAction } from '@/features/Questionnaire/hooks/useQuestionSubmitAction';
import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';

const useRouter = jest.spyOn(require('next/router'), 'useRouter');
const mockPush = jest.fn();
useRouter.mockImplementation(() => ({
  push: mockPush,
}));

describe('useQuestionSubmitAction', () => {
  const mockStore = configureStore<RootState>([]);

  describe('useMemoizedSubmitAction', () => {
    let store: MockStoreEnhanced<RootState>;

    beforeEach(() => {
      jest.clearAllMocks();
      store = mockStore({
        questionnaire: {},
      });
    });

    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={store}>{children}</Provider>
    );

    it('navigates to a specific URL based on href and rules', () => {
      store = mockStore({
        questionnaire: {
          q1: { field: 'favoriteColor', value: 'blue', label: 'Blue' },
        },
      });
      const questionnaire = store.getState().questionnaire;
      const question = {
        id: '1',
        next: {
          href: '/some-path',
          rules: [
            {
              if: 'q1',
              is: 'blue',
              questionId: 'q13',
            },
            {
              if: 'q1',
              is: 'green',
              questionId: 'q14',
            },
          ],
        },
      };

      const {
        result: { current: createSubmitAction },
      } = renderHook(
        () => useMemoizedSubmitAction(question as Question, questionnaire),
        {
          wrapper,
        },
      );
      // Assuming the action was triggered on Next button click
      createSubmitAction(questionnaire)();

      expect(mockPush).toHaveBeenCalledWith(
        '/question/some-path?questionId=q13',
      );
    });

    it('navigates to a URL based on href', () => {
      store = mockStore({
        questionnaire: {
          q1: { field: 'favoriteColor', value: 'blue', label: 'Blue' },
        },
      });
      const questionnaire = store.getState().questionnaire;
      const question = {
        id: '2',
        next: {
          href: '/some-path',
        },
      };

      const {
        result: { current: createSubmitAction },
      } = renderHook(
        () => useMemoizedSubmitAction(question as Question, questionnaire),
        {
          wrapper,
        },
      );
      // Assuming the action was triggered on Next button click
      createSubmitAction(questionnaire)();

      expect(mockPush).toHaveBeenCalledWith('/question/some-path');
    });

    it('navigates to a URL based on rules', () => {
      store = mockStore({
        questionnaire: {
          q1: { field: 'favoriteColor', value: 'green', label: 'Green' },
        },
      });
      const questionnaire = store.getState().questionnaire;
      const question = {
        id: 'q1',
        next: {
          rules: [
            {
              if: 'q1',
              is: 'white',
              questionId: 'q2',
            },
            {
              if: 'q1',
              is: 'green',
              questionId: 'q3',
            },
          ],
        },
      };

      const {
        result: { current: createSubmitAction },
      } = renderHook(
        () => useMemoizedSubmitAction(question as Question, questionnaire),
        {
          wrapper,
        },
      );
      // Assuming the action was triggered on Next button click
      createSubmitAction(questionnaire)();

      expect(mockPush).toHaveBeenCalledWith('/question/q3');
    });

    it('navigates to a URL based on questionId', () => {
      store = mockStore({
        questionnaire: {
          q3: { field: 'gender', value: 'female', label: 'Female' },
        },
      });
      const questionnaire = store.getState().questionnaire;
      const question = {
        id: 'q3',
        next: {
          questionId: 'q4',
        },
      };

      const {
        result: { current: createSubmitAction },
      } = renderHook(
        () => useMemoizedSubmitAction(question as Question, questionnaire),
        {
          wrapper,
        },
      );
      // Assuming the action was triggered on Next button click
      createSubmitAction(questionnaire)();

      expect(mockPush).toHaveBeenCalledWith('/question/q4');
    });

    it('navigates to a URL based on questionId when next object contains redundant', () => {
      store = mockStore({
        questionnaire: {
          q4: { field: 'gender', value: 'male', label: 'Male' },
        },
      });
      const questionnaire = store.getState().questionnaire;
      const question = {
        id: 'q4',
        next: {},
      };

      const {
        result: { current: createSubmitAction },
      } = renderHook(
        () => useMemoizedSubmitAction(question as Question, questionnaire),
        {
          wrapper,
        },
      );
      // Assuming the action was triggered on Next button click
      const handleSubmit = createSubmitAction(questionnaire);

      expect(handleSubmit).toThrow(
        'There is no action on submit. Check the questionnaire configuration. Question id - q4',
      );
    });
  });
});
