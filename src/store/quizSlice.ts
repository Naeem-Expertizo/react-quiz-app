import { createSlice } from '@reduxjs/toolkit';

interface QuizState {
  correctAnswers: number;
  incorrectAnswers: number;
}

const initialState: QuizState = {
  correctAnswers: 0,
  incorrectAnswers: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    incrementCorrect: (state) => {
      state.correctAnswers += 1;
    },
    incrementIncorrect: (state) => {
      state.incorrectAnswers += 1;
    },
    resetScores: (state) => {
      state.correctAnswers = 0;
      state.incorrectAnswers = 0;
    },
  },
});

export const { incrementCorrect, incrementIncorrect, resetScores } = quizSlice.actions;
export default quizSlice.reducer;