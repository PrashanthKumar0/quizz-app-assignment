import { Button } from '@nextui-org/button'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Divider } from '@nextui-org/divider'
import { Progress } from '@nextui-org/progress'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { Input } from '@nextui-org/react'
import React, { useRef } from 'react'
import { cn } from 'tailwind-variants'

function QuestionCard({ question, currentQuestionNumber, totalQuestions, handleAnswer = () => { }, handleNext = () => { }, handlePrev = () => { }, readOnly = false }) {
    const formRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        saveResponse();
    }

    const saveResponse = () => {
        if (!formRef || !formRef.current) return;

        const formData = new FormData(formRef.current);
        const answer = formData.get('answer');
        question.response = answer;

        handleAnswer({ question, answer });
    }

    return (
        <Card className="min-w-[300px]">
            <CardHeader>
                <div className='text-sm opacity-50'>
                    {currentQuestionNumber} of {totalQuestions}
                </div>
            </CardHeader>
            {!readOnly &&
                <Progress size='sm' value={(currentQuestionNumber / totalQuestions) * 100} />
            }

            <CardBody className='mx-auto'>
                <div className='my-2'>
                    <div>
                        {
                            question.question
                        }
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} >
                        <RadioGroup
                            name='answer'
                            className='my-4 mx-4'
                            defaultValue={question.response}
                            isDisabled={readOnly}
                        >
                            {
                                question.options.map((option, idx) => (
                                    <Radio
                                        key={idx + option + question.question}
                                        name='answer'
                                        value={option}
                                        color={
                                            readOnly ? (
                                                (option == question.answer) ? 'success' : 'danger'
                                            ) : 'primary'
                                        }
                                        classNames={{
                                            base: cn(
                                                "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
                                                "flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
                                                "data-[selected=true]:border-primary"
                                            ),
                                        }}
                                    >
                                        {option}
                                    </Radio>
                                ))
                            }
                        </RadioGroup>

                        {/* {!readOnly &&
                            <Input variant="bordered" color="success" className='m-auto cursor-pointer' size="sm" type="submit" value="submit" />
                        } */}
                    </form>
                </div>


            </CardBody>

            <Divider />

            <CardFooter>
                {!readOnly ?
                    <>
                        <Button size="sm" variant="bordered" className='m-auto' onClick={() => { handlePrev(); saveResponse() }}>Previous</Button>
                        {(totalQuestions == currentQuestionNumber)
                            ?
                            <Button size="sm" variant="bordered" color="success" className='m-auto' onClick={() => { handleNext(); saveResponse() }}>
                                Submit
                            </Button>
                            :
                            <Button size="sm" variant="bordered" className='m-auto' onClick={() => { handleNext(); saveResponse() }}>
                                Next
                            </Button>
                        }
                    </>
                    :
                    (question.answer != question.response) &&
                    <>
                        <div className='text-sm opacity-50'>
                            Correct Answer : {question.answer}
                        </div>

                    </>
                }
            </CardFooter>
        </Card>
    )
}

export default QuestionCard