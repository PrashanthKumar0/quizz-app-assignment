import React, { useEffect, useState } from 'react'
import { Spinner } from "@nextui-org/react";
import { quizzes } from '../constants';
import QuestionCard from '../components/QuestionCard';
import ReportCard from '../components/ReportCard';

function QuizzScreen() {
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);

  useEffect(() => {
    setQuestions((quizzes).map(quizz => ({ ...quizz, response: '' })));
  }, [])

  useEffect(() => {
    console.log('qid', questionIdx);
  }, [questionIdx])

  const handleAnswer = ({ question, answer }) => {
    const updatedQuestions = questions.map(q => {
      if (q.question == question.question) {
        return { ...question };
      } else {
        return q;
      }
    });
    setQuestions(updatedQuestions);
  }

  const handleNext = () => {
    setQuestionIdx(questionIdx + 1);
    // if (questionIdx + 1 < questions.length)
    //   setQuestionIdx(questionIdx + 1);

    // console.log('next', questionIdx + 1);
  }

  const handlePrev = () => {
    if (questionIdx - 1 >= 0)
      setQuestionIdx(questionIdx - 1);

    console.log('prev', questionIdx - 1);
  }


  return (
    <div className="flex flex-col items-center justify-center py-8 min-h-[100vh]">
      {questions && (questionIdx == questions.length)
        ?
        <ReportCard questions={questions} />
        :
        <>
          {(questions.length > 0) ?
            <QuestionCard question={questions[questionIdx]} handleAnswer={handleAnswer} totalQuestions={questions.length} currentQuestionNumber={questionIdx + 1} handleNext={handleNext} handlePrev={handlePrev} />
            :
            <Spinner size="lg" />
          }
        </>

      }
    </div>
  )
}

export default QuizzScreen