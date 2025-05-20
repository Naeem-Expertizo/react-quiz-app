import { Question } from '@/types/quizPage'
import React from 'react'

const QuestionProgressBar = ({ currentQuestionIndex, decodedQuestions }: { currentQuestionIndex: number, decodedQuestions: Question[] }) => {
  return (
    <div className="absolute top-0 w-full bg-white h-4 mb-8">
      <div
        className="bg-gray-500 h-4 transition-all duration-300"
        style={{ width: `${((currentQuestionIndex) / decodedQuestions?.length) * 100}%` }}
      ></div>
    </div>
  )
}

export default QuestionProgressBar
