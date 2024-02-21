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
    <>
      <div
        key={id}
        className="p-4 max-w-sm mx-auto bg-white rounded-lg shadow-md"
      >
        <div className="flex items-center justify-between">
          <button className="text-gray-400">
            <i className="fas fa-chevron-left"></i>
          </button>
          <QuestionText questionText={questionText} />
        </div>
        <div className="mt-6">
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
    </>
  );
}
