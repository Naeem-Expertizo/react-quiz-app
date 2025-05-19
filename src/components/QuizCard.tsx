"use client";
import React from 'react';
import { Question } from '@/app/quiz/page';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCorrect, incrementIncorrect } from '@/store/quizSlice';
import { RootState } from '@/store/store';


type QuizCardProps = {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showNextButton: boolean;
  onNextQuestion: () => void;
  setIsSelectedQuestionIsCorrect: (answer: boolean) => void;
  setNumberOfCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfIncorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  setNumberOfMaxScore: React.Dispatch<React.SetStateAction<number>>;
  isLastQuestion: boolean;
  isSelectedQuestionIsCorrect: boolean;
  numberOfIncorrectAnswers: number;
};

const QuizCard = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showNextButton,
  onNextQuestion,
  isLastQuestion,
  isSelectedQuestionIsCorrect,
  setIsSelectedQuestionIsCorrect,
  setNumberOfIncorrectAnswers,
  setNumberOfMaxScore,
  // numberOfIncorrectAnswers,
  setNumberOfCorrectAnswers
}: QuizCardProps) => {
  // Combine and shuffle answers
  const allAnswers = [...question.incorrect_answers, question.correct_answer];
  const shuffledAnswers = [...allAnswers].sort(() => Math.random() - 0.5);
  const correctAnswer = question.correct_answer;

  const dispatch = useDispatch();
  const { incorrectAnswers } = useSelector((state: RootState) => state.quiz);

  // Difficulty display
  const difficultyStars =
    question.difficulty === "easy" ? "⭐" :
      question.difficulty === "medium" ? "⭐⭐" :
        "⭐⭐⭐";

  const handleAnswerSelect = (answer: string) => {
    onAnswerSelect(answer);
    setIsSelectedQuestionIsCorrect(answer === correctAnswer);
    if (answer !== correctAnswer) {
      setNumberOfIncorrectAnswers((prev: number) => prev + 1);
      const maxScore = ((20 - incorrectAnswers ) / 20) * 100;

      console.log(maxScore)
      setNumberOfMaxScore(maxScore);
      dispatch(incrementIncorrect());
    } else {
      dispatch(incrementCorrect());
      setNumberOfCorrectAnswers((prev: number) => prev + 5);
    }
  }

  return (
    <div className='flex flex-col justify-center gap-4 max-w-2xl mx-auto'>
      <div className='mb-4'>
        <h2>Question {currentQuestionNumber} of {totalQuestions}</h2>
        <p className='text-gray-600'>{question.category}</p>
        <p className='text-yellow-500'>{difficultyStars}</p>
      </div>

      <div className='mb-8'>
        <h3 className='text-xl font-semibold'>{question.question}</h3>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`px-4 py-3 border rounded-lg transition-colors
              ${selectedAnswer === answer
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white border-gray-300 hover:bg-gray-50'}`}
            onClick={() => handleAnswerSelect(answer)}
            disabled={selectedAnswer !== null}
          >
            {answer}
          </button>
        ))}
      </div>

      {showNextButton && (
        <p
          className=''
        >
          {isSelectedQuestionIsCorrect ? "Correct!" : "Incorrect!"}
        </p>
      )}

      {showNextButton && (
        <button
          className='px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
          onClick={onNextQuestion}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
        </button>
      )}
    </div>
  );
};

export default QuizCard;