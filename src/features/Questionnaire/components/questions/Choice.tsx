import QuestionText from '@/features/Questionnaire/components/QuestionText';
import { Question } from '../../types';
import SubmitButton from '../SubmitButton';

interface ChoiceQuestionProps {
  question: Question;
}
export default function ChoiceQuestion({ question }: ChoiceQuestionProps) {
  const { id, questionText, options } = question;
  console.log('ChoiceQuestion', options);

  return (
    <div key={id} className="question-section text-center">
      <QuestionText questionText={questionText} />
      <div className="mt-6">
        <div className="flex flex-col space-x-5">
          {options.map(({ label, value }) => (
            <SubmitButton
              key={value}
              label={label}
              value={value}
              question={question}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
