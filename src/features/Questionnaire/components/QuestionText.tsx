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
      <p className="text-sm text-gray-800 text-center flex-1 mx-4">
        {'rawText' in displayText
          ? displayText.rawText
          : displayText.dynamicText}
      </p>
      {statement ? <div>{statement}</div> : null}
    </>
  );
}
