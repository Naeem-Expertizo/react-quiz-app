import { Question } from "./quizPage";

export type QuizCardProps = {
  question: Question;
  currentQuestionNumber: number;
  totalQuestions: number;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
  showNextButton: boolean;
  onNextQuestion: () => void;
  setIsSelectedCorrect: (answer: boolean) => void;
  setNoOfCorrectOrIncorrectAnswers: SetAnswersState;
  setNumberOfMaxScore: React.Dispatch<React.SetStateAction<number>>;
  isLastQuestion: boolean;
  isSelectedCorrect: boolean;
  shuffledAnswers: string[];
  noOfCorrectOrIncorrectAnswers: AnswersCountState;
  numberOfMaxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
};

export type AnswersCountState = {
  correct: number;
  incorrect: number;
};

export type SetAnswersState = React.Dispatch<React.SetStateAction<AnswersCountState>>;