import { Button, Section } from '@/components';
import { useMemoizedSubmitAction } from '@/lib/features/Questionnaire/hooks/useQuestionSubmitAction/useMemoizedSubmitAction';
import { questionnaireSelector } from '@/lib/features/Questionnaire/selectors';
import questionnaireStyles from '@/lib/features/Questionnaire/styles/questionnaire.module.css';
import { Question } from '@/lib/features/Questionnaire/types';
import { useAppSelector } from '@/lib/store/hooks';

interface Props {
  question: Question;
}

export default function QuestionnairePage({ question }: Props) {
  const questionnaire = useAppSelector(questionnaireSelector);
  const onSubmit = useMemoizedSubmitAction(question);

  return (
    <Section
      className={questionnaireStyles['question-section']}
      heading={'So how does it work?'}
      text={
        'We analyze hundreds of data points to create your unique astrological\n' +
        '        blueprint. This is combined with AI to tailor-make your astrological\n' +
        '        insights, based on your answers. We’re going to change your relationship\n' +
        '        with astrology.'
      }
    >
      <Button
        className={'w-full text-lg py-3.5 bg-primary-white text-violet'}
        onClick={() => onSubmit(questionnaire)()}
      >
        Next
      </Button>
    </Section>
  );
}
