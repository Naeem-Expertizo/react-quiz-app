"use client";
import React from 'react';
import { useDispatch } from 'react-redux';
import { incrementCorrect, incrementIncorrect, resetScores } from '@/store/quizSlice';
import { useRouter } from 'next/navigation';
import Button from './Button';
import { QuizCardProps } from '@/types/quizCard';
import { IoMdStar } from "react-icons/io";
import ScoreProgressBar from './ScoreProgressBar';


const QuizCard = ({
  question,
  currentQuestionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showNextButton,
  onNextQuestion,
  isLastQuestion,
  isSelectedCorrect,
  setIsSelectedCorrect,
  setNoOfCorrectOrIncorrectAnswers,
  setNumberOfMaxScore,
  shuffledAnswers,
  noOfCorrectOrIncorrectAnswers,
  numberOfMaxScore,
  correctAnswers,
  incorrectAnswers
}: QuizCardProps) => {

  // show result
  const [showResult, setShowResult] = React.useState(false);

  // Router for navigation
  const router = useRouter()
  // Redux dispatch
  const dispatch = useDispatch();

  // Difficulty display
  const difficultyStars =
    question?.difficulty === "easy" ? <IoMdStar /> :
      question?.difficulty === "medium" ? <div className='flex gap-[2px]'><IoMdStar /> <IoMdStar /></div> :
        <div className='flex gap-[2px]'><IoMdStar /> <IoMdStar /> <IoMdStar /></div>;

  // store the correct answer in a variable
  const correctAnswer = question?.correct_answer;

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    onAnswerSelect(answer);
    setIsSelectedCorrect(answer === correctAnswer);
    if (answer !== correctAnswer) {
      setNoOfCorrectOrIncorrectAnswers(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1,
      }))
      setNumberOfMaxScore(prev => Math.max(prev - 5, 0));
      dispatch(incrementIncorrect());
    } else {
      dispatch(incrementCorrect());
      setNoOfCorrectOrIncorrectAnswers(prev => ({
        ...prev,
        correct: prev.correct + 5,
      }))

    }
  }

  // Handle finish quiz
  const handleFinishQuiz = () => {
    router.push("/");
    setNoOfCorrectOrIncorrectAnswers({
      correct: 0,
      incorrect: 0
    });
    dispatch(resetScores());
    setNumberOfMaxScore(100);
  }

  const handleShowResult = () => {
    setShowResult(true)
  }

  return (
    <div className='relative flex flex-col justify-between md:w-2xl max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-gray-400 shadow-2xl  h-[80vh] overflow-y-auto'>
      {!showResult && <div className='flex flex-col gap-4'>
        <div className='mb-4'>
          <h2 className='text-3xl font-semibold text-gray-700'>Question {currentQuestionNumber} of {totalQuestions}</h2>
          <p className='text-gray-600'>{question?.category?.includes("Entertainment") ? question?.category : `Entertainment: ${question?.category}`}</p>
          <p className='text-black'>{difficultyStars}</p>
        </div>

        <div className='mb-8'>
          <h3 className='text-2xl'>{question?.question}</h3>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
          {shuffledAnswers?.map((answer, index) => (
            <Button className={`px-4 py-2 border rounded-lg transition-colors cursor-pointer text-xl font-[400] 
            ${selectedAnswer === answer
                ? 'bg-black text-white' : (selectedAnswer && correctAnswer === answer) ? "border-black"
                  : 'bg-[#dcdedc] border border-black rounded-md hover:bg-[#9f9f9f]'}`} key={index} disabled={selectedAnswer !== null} title={answer} onClick={() => handleAnswerSelect(answer)}
            />
          ))}
        </div>

        <div className='flex flex-col items-center gap-8'>
          {showNextButton && (
            <p className='text-3xl font-semibold'>
              {isSelectedCorrect ? "Correct!" : "Sorry!"}
            </p>
          )}

          {showNextButton && (
            <Button title={isLastQuestion ? "Show Result" : "Next Question"} onClick={!isLastQuestion ? onNextQuestion : handleShowResult} />
          )}
        </div>
      </div>}

      {/* component of botton score board with multiple bars */}
      {!showResult && <ScoreProgressBar noOfCorrectOrIncorrectAnswers={noOfCorrectOrIncorrectAnswers} numberOfMaxScore={numberOfMaxScore} correctAnswers={correctAnswers} incorrectAnswers={incorrectAnswers} />}

      {/* show result */}
      {showResult && <div className='flex flex-col gap-4 items-center my-auto'>
        <h2 className='text-3xl font-semibold text-gray-700'>Quiz Completed!</h2>
        <p className='text-gray-600'>You answered {correctAnswers} out of {totalQuestions} questions correctly.</p>
        <div className='flex flex-col items-center gap-8'>
          <Button title="Finish Quiz" onClick={handleFinishQuiz} />
        </div>
      </div>}

    </div>
  );
};

export default QuizCard;