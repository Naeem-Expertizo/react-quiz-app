import { AnswersCountState } from '@/types/quizCard'
import React from 'react'

const ScoreProgressBar = ({ noOfCorrectOrIncorrectAnswers, numberOfMaxScore, correctAnswers, incorrectAnswers }: { noOfCorrectOrIncorrectAnswers: AnswersCountState, numberOfMaxScore: number, correctAnswers: number, incorrectAnswers: number }) => {

  const completedCorrectQuestions = correctAnswers !== 0 ? (correctAnswers / (correctAnswers + incorrectAnswers)) * 100 : 0;
  return (
    <div className=' w-full mx-auto'>
      <div className='flex justify-between mb-1 font-semibold'>
        <span>Score: {noOfCorrectOrIncorrectAnswers?.correct}%</span>
        <span>Max Score: {Math.round(numberOfMaxScore)}%</span>
      </div>
      <div className="w-full bg-white h-8 relative rounded-md border border-black z-40">
        {/* main max score bar */}
        <div
          className={`bg-gray-200 h-full ${numberOfMaxScore === 100 ? "rounded-md" : "rounded-tl-md rounded-bl-md"} transition-all duration-300 absolute top-0 z-10`}
          style={{ width: `${numberOfMaxScore}%` }}
        >
        </div>
        {/* number of correct answer according to completed question */}
        <div
          className={`bg-gray-400 h-full ${completedCorrectQuestions === 100 ? "rounded-md" : "rounded-tl-md rounded-bl-md"} transition-all duration-300 w-[95%] absolute top-0 z-20`}
          style={{ width: `${completedCorrectQuestions}%` }}
        >
        </div>
        {/* current score */}
        <div
          className={`bg-gray-800 h-full ${(correctAnswers * 5) === 100 ? "rounded-md" : "rounded-tl-md rounded-bl-md"} transition-all duration-300 absolute top-0 z-30`}
          style={{ width: `${correctAnswers * 5}%` }}
        ></div>
      </div>
    </div >
  )
}

export default ScoreProgressBar
