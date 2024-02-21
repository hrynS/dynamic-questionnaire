'use client';

import { useAppDispatch } from '@/app/hooks';
import { useQuestionSubmitAction } from '@/features/Questionnaire/hooks';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { setFieldValue } from '@/features/Questionnaire/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Question, QuestionFieldValueByType, QuestionType } from '../types';
import Button, { BaseButtonProps } from '../../../components/elements/Button';

interface SubmitButtonProps<Value> extends Omit<BaseButtonProps, 'onClick'> {
  question: Question;
  label: string;
  value: Value;
}

export default function SubmitButton<
  Value extends QuestionFieldValueByType[QuestionType],
>({ value, label, question }: SubmitButtonProps<Value>) {
  const dispatch = useAppDispatch();
  const questionnaire = useSelector(questionnaireSelector);
  const handleSubmit = useQuestionSubmitAction(question, questionnaire);

  useEffect(() => {
    if (questionnaire[question.id]?.value) {
      handleSubmit();
    }
  }, [handleSubmit, questionnaire, question.id]);

  const onAnswer = () => {
    dispatch(
      setFieldValue({ id: question.id, field: question.field, value, label }),
    );
  };

  return (
    <Button
      label={label}
      onClick={() => {
        onAnswer();
      }}
    />
  );
}
