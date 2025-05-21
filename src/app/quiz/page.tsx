"use client";
import QuestionProgressBar from '@/components/QuestionProgressBar';
import QuizCard from '@/components/QuizCard';
import allQuestions from '@/constant/question';
import { RootState } from '@/store/store';
import { AnswersCountState } from '@/types/quizCard';
import { Question } from '@/types/quizPage';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const decodeQuestions = (questions: Question[]): Question[] => {
  return questions?.map(q => ({
    ...q,
    category: decodeURIComponent(q?.category),
    question: decodeURIComponent(q?.question),
    correct_answer: decodeURIComponent(q?.correct_answer),
    incorrect_answers: q?.incorrect_answers?.map(a => decodeURIComponent(a))
  }));
};

const Page = () => {
  const decodedQuestions = decodeQuestions(allQuestions);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [noOfCorrectOrIncorrectAnswers, setNoOfCorrectOrIncorrectAnswers] = useState<AnswersCountState>({
    correct: 0,
    incorrect: 0
  });
  const [numberOfMaxScore, setNumberOfMaxScore] = useState(100);
  const [isSelectedCorrect, setIsSelectedCorrect] = useState(false);

  const { correctAnswers, incorrectAnswers } = useSelector((state: RootState) => state.quiz);

  const isLastQuestion = currentQuestionIndex === decodedQuestions?.length - 1;
  const currentQuestion = decodedQuestions[currentQuestionIndex];

  const shuffledAnswers = React.useMemo(() => {
    const allAnswers = [...currentQuestion?.incorrect_answers, currentQuestion?.correct_answer];
    return [...allAnswers]?.sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuestion?.question]);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setShowNextButton(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setShowNextButton(false);
    setIsSelectedCorrect(false);
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center p-4">

      <QuestionProgressBar currentQuestionIndex={currentQuestionIndex} decodedQuestions={decodedQuestions} />

      <QuizCard
        question={currentQuestion}
        currentQuestionNumber={currentQuestionIndex + 1}
        totalQuestions={decodedQuestions?.length}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        showNextButton={showNextButton}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={isLastQuestion}
        isSelectedCorrect={isSelectedCorrect}
        setIsSelectedCorrect={setIsSelectedCorrect}
        setNoOfCorrectOrIncorrectAnswers={setNoOfCorrectOrIncorrectAnswers}
        setNumberOfMaxScore={setNumberOfMaxScore}
        shuffledAnswers={shuffledAnswers}
        noOfCorrectOrIncorrectAnswers={noOfCorrectOrIncorrectAnswers}
        numberOfMaxScore={numberOfMaxScore}
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
      />
    </div>
  );
};

export default Page;