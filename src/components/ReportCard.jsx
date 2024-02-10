import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { Divider, ScrollShadow } from '@nextui-org/react';
import React from 'react'
import QuestionCard from './QuestionCard';

function ReportCard({ questions }) {

    const getNumCorrect = () => {
        let numCorrect = 0;
        questions.forEach(q => {
            numCorrect += q.response && (q.answer == q.response);
        });
        return numCorrect;
    }

    return (
        <ScrollShadow className='w-full px-8'>
            <div className="flex flex-col gap-10 mx-auto max-w-[300px]">
                <Card className="min-w-[300px]">
                    <CardHeader>
                        <div className='text-sm opacity-50'>
                            Your Report
                        </div>
                    </CardHeader>

                    <Divider />

                    <CardBody className='mx-auto flex items-center'>
                        SCORE : {getNumCorrect()} of {questions.length}
                    </CardBody>

                    <Divider />
                </Card>
                {
                    questions.map((question, idx) => (
                        <QuestionCard key={question.question + idx} question={question} currentQuestionNumber={idx} totalQuestions={questions.length} readOnly={true} />
                    ))
                }
            </div>
        </ScrollShadow>

    )
}

export default ReportCard