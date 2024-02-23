import { RootState } from '@/app/store';
import { QuestionText } from '@/features/Questionnaire/types';
import {
  jest,
  beforeEach,
  describe,
  expect,
  it,
  afterEach,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import { useDynamicQuestionText } from '../useDynamicQuestionText'; // Adjust the import path to your hook's location

const mockStore = configureStore<RootState>([]);

describe('useDynamicQuestionText', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      questionnaire: {},
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  it('returns rawText when there are no rules', () => {
    const questionText: QuestionText = {
      raw: 'What\'s your favorite color?',
    };

    const { result } = renderHook(() => useDynamicQuestionText(questionText), {
      wrapper,
    });

    expect(result.current).toEqual( 'What\'s your favorite color?');
  });

  it('returns dynamicText with placeholders replaced according to rules', () => {
    store = mockStore({
      questionnaire: {
        q1: { field: 'favoriteColor', value: 'blue', label: 'Blue' },
      },
    });

    const questionText: QuestionText = {
      raw: 'Here will be displayed {{color}}.',
      rules: [{ if: 'q1', is: 'blue', replaceWith: 'some color' }],
    };

    const { result } = renderHook(() => useDynamicQuestionText(questionText), {
      wrapper,
    });

    expect(result.current).toEqual('Here will be displayed some color.');
  });

  it('handles multiple dynamic parts in the question text', () => {
    store = mockStore({
      questionnaire: {
        q1: { field: 'favoriteColor', value: 'blue', label: 'Blue' },
        q2: { field: 'leastFavoriteColor', value: 'green', label: 'Green' },
      },
    });

    const questionText: QuestionText = {
      raw: 'First question answer was: {{firstColor}}, second question answer was: {{secondColor}}.',
      rules: [
        { if: 'q1', is: 'blue', replaceWith: 'Blue' },
        { if: 'q2', is: 'green', replaceWith: 'Green' },
      ],
    };

    const { result } = renderHook(() => useDynamicQuestionText(questionText), {
      wrapper,
    });

    expect(result.current).toEqual('First question answer was: blue, second question answer was: green.');
  });

  it('logs error on empty rules array', () => {
    const consoleSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    store = mockStore({
      questionnaire: {
        q1: { field: 'favoriteColor', value: 'blue', label: 'Blue' },
        q2: { field: 'leastFavoriteColor', value: 'green', label: 'Green' },
      },
    });

    const questionText: QuestionText = {
      raw: 'First question answer was: {{firstColor}}, second question answer was: {{secondColor}}.',
      rules: [],
    };

    const { result } = renderHook(() => useDynamicQuestionText(questionText), {
      wrapper,
    });

    expect(consoleSpy).toHaveBeenCalledWith(
      'There are no dynamic insertions generated for the question - First question answer was: {{firstColor}}, second question answer was: {{secondColor}}.. Check the questionnaire configuration.',
    );

    expect(result.current).toEqual('First question answer was: , second question answer was: .');
  });
});
