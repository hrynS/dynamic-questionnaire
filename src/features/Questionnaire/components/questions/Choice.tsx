import QuestionText from '@/features/Questionnaire/components/questions/QuestionText';
import { Question } from '../../types';
import SubmitButton from '../SubmitButton';

interface ChoiceQuestionProps {
  question: Question;
}
export default function ChoiceQuestion({ question }: ChoiceQuestionProps) {
  const { questionText, options } = question;
  console.log('ChoiceQuestion', options);

  return (
    <>
      <QuestionText questionText={questionText} />
      <div className="w-full flex flex-col gap-y-6">
        {options.map(({ label, value }) => (
          <SubmitButton
            key={value}
            label={label}
            value={value}
            question={question}
          />
        ))}
      </div>
    </>
  );
}
