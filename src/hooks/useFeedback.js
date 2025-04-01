"use client";
import { useReducer, useEffect } from "react";

const initialFeedbackState = {
  feedbackData: { rating: 0, comment: "", name: "", email: "", service: "" },
  feedbacks: [],
  averageRating: 0
};

function feedbackReducer(state, action) {
  switch (action.type) {
    case "SET_FEEDBACKS":
      return { ...state, feedbacks: action.payload, averageRating: calculateAverage(action.payload) };
    case "ADD_FEEDBACK":
      const updatedFeedbacks = [action.payload, ...state.feedbacks];
      return { ...state, feedbacks: updatedFeedbacks, averageRating: calculateAverage(updatedFeedbacks) };
    case "UPDATE_FEEDBACK_DATA":
      return { ...state, feedbackData: { ...state.feedbackData, ...action.payload } };
    case "RESET_FEEDBACK_DATA":
      return { ...state, feedbackData: initialFeedbackState.feedbackData };
    default:
      return state;
  }
}

const calculateAverage = (feedbacks) => {
  if (!feedbacks.length) return 0;
  const total = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
  return (total / feedbacks.length).toFixed(1);
};

export default function useFeedback() {
  const [state, dispatch] = useReducer(feedbackReducer, initialFeedbackState);

  useEffect(() => {
    fetch("/api/feedbacks")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "SET_FEEDBACKS", payload: data }))
      .catch(console.error);
  }, []);

  return { state, dispatch };
}