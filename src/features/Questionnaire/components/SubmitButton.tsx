'use client';

import { useAppDispatch } from '@/app/hooks';
import { questionnaireSelector } from '@/features/Questionnaire/selectors';
import { setFieldValue } from '@/features/Questionnaire/slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useQuestionSubmitAction } from '../hooks';
import { ChoiceQuestionOption, Question } from '../types';
import Button, { BaseButtonProps } from '../../../components/elements/Button';

interface SubmitButtonProps extends Omit<BaseButtonProps, 'onClick'> {
  question: Question;
  //  TODO: make SubmitButtonProps generic
  label: ChoiceQuestionOption['value'];
  value: ChoiceQuestionOption['value'];
}

export default function SubmitButton({
  value,
  label,
  question,
}: SubmitButtonProps) {
  const dispatch = useAppDispatch();
  const questionnaire = useSelector(questionnaireSelector);
  const handleSubmit = useQuestionSubmitAction(question, questionnaire);

  useEffect(() => {
    debugger;
    if (questionnaire[question.id]?.value) {
      handleSubmit();
    }
  }, [handleSubmit, questionnaire, question.id]);

  const onQuestionChange = () => {
    debugger;
    dispatch(setFieldValue({ id: question.id, field: question.field, value }));
  };

  console.log('SubmitButtonProps', questionnaire);
  return (
    <Button
      label={label}
      onClick={() => {
        console.log('handleSubmit', handleSubmit);
        onQuestionChange();
      }}
    />
  );
}
