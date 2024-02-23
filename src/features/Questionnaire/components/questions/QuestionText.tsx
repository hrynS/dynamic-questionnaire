'use client';

import { useDynamicQuestionText } from '@/features/Questionnaire/hooks';
import { Question } from '@/features/Questionnaire/types';

interface QuestionTextProps {
  questionText: Question['questionText'];
}

export default function QuestionText({ questionText }: QuestionTextProps) {
  const { statement } = questionText;
  const displayText = useDynamicQuestionText(questionText);

  return (
    <>
      <h1 className="text-primary-black font-bold text-2xl mb-2">
        {displayText}
      </h1>
      {statement ? (
        <p className="text-primary-black font-bold text-lg">{statement}</p>
      ) : null}
    </>
  );
}
