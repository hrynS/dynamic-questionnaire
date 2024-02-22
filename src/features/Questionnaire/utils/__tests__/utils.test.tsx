import {
  getDynamicQuestionPartsFromRules,
  getNextQuestionUrlFromRules,
} from '@/features/Questionnaire/utils';
import { describe, expect, it, jest } from '@jest/globals';

describe('Questionnaire utils', () => {
  describe('getNextQuestionUrlFromRules', () => {
    const mockGenerateTargetUrl = jest.fn(
      (questionId) => `/question/${questionId}`,
    );

    it('should return the correct url for a rule matched by "is" condition', () => {
      const rules = [{ if: 'q1', is: 'yes', questionId: 'q2' }];
      const questionnaire = {
        q1: { value: 'yes', field: 'foo', label: 'Yes' },
      };
      const expectedUrl = '/question/q2';

      const url = getNextQuestionUrlFromRules(
        rules,
        questionnaire,
        mockGenerateTargetUrl,
      );

      expect(url).toEqual(expectedUrl);
    });

    it('should return the correct url for a rule matched by "oneOf" condition', () => {
      const rules = [{ if: 'q1', oneOf: ['yes', 'maybe'], questionId: 'q3' }];
      const questionnaire = {
        q1: { value: 'maybe', field: 'bar', label: 'Maybe' },
      };
      const expectedUrl = '/question/q3';

      const url = getNextQuestionUrlFromRules(
        rules,
        questionnaire,
        mockGenerateTargetUrl,
      );

      expect(url).toEqual(expectedUrl);
    });

    it('should return undefined if no rule is matched', () => {
      const rules = [{ if: 'q1', is: 'yes', questionId: 'q2' }];
      const questionnaire = { q1: { value: 'no', field: 'baz', label: 'No' } };

      const url = getNextQuestionUrlFromRules(
        rules,
        questionnaire,
        mockGenerateTargetUrl,
      );

      expect(url).toBeUndefined();
    });

    it('should call generateTargetUrl with correct questionId when a rule is matched', () => {
      const rules = [{ if: 'q1', is: 'yes', questionId: 'q2' }];
      const questionnaire = {
        q1: { value: 'yes', field: 'foo', label: 'Yes' },
      };

      getNextQuestionUrlFromRules(rules, questionnaire, mockGenerateTargetUrl);

      expect(mockGenerateTargetUrl).toHaveBeenCalledWith('q2');
    });
  });

  describe('getDynamicQuestionPartsFromRules', () => {
    it('returns an array of labels for simple replacement rules', () => {
      const rules = [{ replaceWith: 'q1' }];
      const questionnaire = {
        q1: { label: 'Answer 1', value: 'answer_1', field: 'bar' },
      };
      const expected = ['Answer 1'];

      const result = getDynamicQuestionPartsFromRules(rules, questionnaire);

      expect(result).toEqual(expected);
    });

    it('returns an array with replaced values based on "if" and "is" condition', () => {
      const rules = [
        { if: 'q1', is: 'yes', replaceWith: 'Correct' },
        { if: 'q2', is: 'no', replaceWith: 'Incorrect' },
      ];
      const questionnaire = {
        q1: { value: 'yes', label: 'Yes', field: 'baz' },
        q2: { value: 'yes', label: 'Yes', field: 'foo' },
      };
      const expected = ['Correct', ''];

      const result = getDynamicQuestionPartsFromRules(rules, questionnaire);

      expect(result).toEqual(expected);
    });

    it('returns an array with replaced values based on "oneOf" condition', () => {
      const rules = [
        { if: 'q1', oneOf: ['yes', 'maybe'], replaceWith: 'Positive' },
        { if: 'q2', oneOf: ['no'], replaceWith: 'Negative' },
      ];
      const questionnaire = {
        q1: { value: 'maybe', label: 'Maybe', field: 'test1' },
        q2: { value: 'no', label: 'No', field: 'test2' },
      };
      const expected = ['Positive', 'Negative'];

      const result = getDynamicQuestionPartsFromRules(rules, questionnaire);

      expect(result).toEqual(expected);
    });

    it('returns an empty string for unmatched rules', () => {
      const rules = [{ if: 'q1', is: 'yes', replaceWith: 'Yes' }];
      const questionnaire = {
        q1: { value: 'no', label: 'No', field: 'question1' },
      };
      const expected = [''];

      const result = getDynamicQuestionPartsFromRules(rules, questionnaire);

      expect(result).toEqual(expected);
    });

    it('handles rules without "if" condition as simple replacements', () => {
      const rules = [{ replaceWith: 'q2' }];
      const questionnaire = {
        q2: { label: 'Answer 2', value: 'answer_1', field: 'random2' },
      };
      const expected = ['Answer 2'];

      const result = getDynamicQuestionPartsFromRules(rules, questionnaire);

      expect(result).toEqual(expected);
    });
  });
});
