import SubmitButton from './SubmitButton';

interface ChoiceQuestionProps {
  label: string;
  onClick: () => void;
}
export default function ChoiceQuestion({ question }) {
  const { id, questionText, options, next } = question;
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
          <p className="text-sm text-gray-800 text-center flex-1 mx-4">
            {questionText}
          </p>
          <div></div>
        </div>
        <div className="mt-6">
          {options.map(({ label, value }) => (
            <SubmitButton key={value} label={label} nextStep={next} />
          ))}
        </div>
      </div>
    </>
  );
}
