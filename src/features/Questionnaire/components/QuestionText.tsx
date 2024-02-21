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
      <h1 className="flex font-bold text-2xl mb-2">
        {'rawText' in displayText
          ? displayText.rawText
          : displayText.dynamicText}
      </h1>
      {statement ? <p className="flex font-bold text-lg">{statement}</p> : null}
    </>
  );
}
