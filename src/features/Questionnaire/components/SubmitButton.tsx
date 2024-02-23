'use client';

import { useAppDispatch } from '@/app/store/hooks';
import { useQuestionSubmitAction } from '@/features/Questionnaire/hooks';
import { setFieldValue } from '@/features/Questionnaire/slice';
import { Question, QuestionFieldValueByType, QuestionType } from '../types';
import { Button, BaseButtonProps } from '@/components';

interface SubmitButtonProps<Value> extends Omit<BaseButtonProps, 'onClick'> {
  question: Question;
  label: string;
  value: Value;
}

export default function SubmitButton<
  Value extends QuestionFieldValueByType[QuestionType],
>({ value, label, question }: SubmitButtonProps<Value>) {
  const dispatch = useAppDispatch();
  const setShouldSubmitQuestion = useQuestionSubmitAction(question);

  const onAnswer = () => {
    const { id, field } = question;
    setShouldSubmitQuestion(true);
    dispatch(setFieldValue({ id, field, value, label }));
  };

  return (
    <Button
      className={'button rounded-2xl bg-secondary-white'}
      onClick={() => {
        onAnswer();
      }}
    >
      {label}
    </Button>
  );
}
