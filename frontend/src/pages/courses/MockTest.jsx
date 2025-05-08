import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuestionByCategoryQuery, useSaveResultsMutation } from '../../redux/api/questions/questionApiSlice';
import './MockTest.css';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getFeedback = (percentage) => {
  if (percentage >= 90) return "Excellent work! 🎉";
  if (percentage >= 70) return "Good job! Keep practicing to reach perfection.";
  if (percentage >= 50) return "Not bad! Review your mistakes and try again.";
  return "Keep working hard! Practice makes perfect.";
};

const MockTest = () => {
  const { category } = useParams();
  const { data: originalQuestions = [], isLoading, isError } = useQuestionByCategoryQuery(category, {
    refetchOnMountOrArgChange: true
  });
  
  const questions = React.useMemo(() => 
    shuffleArray(originalQuestions).slice(0, 20), 
    [originalQuestions]
  );

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [saveResults] = useSaveResultsMutation();
  const [startTime] = useState(Date.now());
  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    setTimeLeft(20);
  }, [currentQuestion]);

  useEffect(() => {
    if (!isSubmitted && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleAutoAdvance();
    }
  }, [timeLeft, isSubmitted]);

  const handleAutoAdvance = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const formatTime = (seconds) => `0:${seconds.toString().padStart(2, '0')}`;

  const calculateScore = async () => {
    let correct = 0;
    const answers = questions.map((q, index) => {
      const isCorrect = selectedOptions[index] === q.correctAnswer;
      if (isCorrect) correct++;
      return {
        questionId: q._id,
        userAnswer: selectedOptions[index] || "Not answered",
        correctAnswer: q.correctAnswer,
        isCorrect,
      };
    });

    setScore(correct);
    setIsSubmitted(true);

    try {
      await saveResults({
        userId: userInfo?._id,
        category,
        score: correct,
        totalQuestions: questions.length,
        timeTaken: Math.floor((Date.now() - startTime) / 1000),
        answers,
      }).unwrap();
    } catch (err) {
      console.error('Failed to save results:', err);
    }
  };

  const handleOptionSelect = (optionKey) => {
    setSelectedOptions(prev => ({ ...prev, [currentQuestion]: optionKey }));
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (isLoading) return <div className="loading">Loading questions...</div>;
  if (isError) return <div className="error">Error loading questions</div>;
  if (questions.length === 0) return <div className="error">No questions available for this category</div>;

  const percentage = Math.round((score / questions.length) * 100);
  const feedback = getFeedback(percentage);

  return (
    <div className="quiz-container">
      {!isSubmitted ? (
        <div className="test-active">
          <div className="quiz-header">
            <div className="category-badge">{category}</div>
            <div className={`timer ${timeLeft <= 5 ? "timer-warning" : ""}`}>
              Time Remaining: {formatTime(timeLeft)}
            </div>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(currentQuestion + 1) / questions.length * 100}%`}} />
          </div>
          
          <div className="question-count">
            Question {currentQuestion + 1}/{questions.length}
          </div>

          <div className="question-card">
            <h2>{questions[currentQuestion]?.text}</h2>
            <div className="options-container">
              {questions[currentQuestion]?.options.map((option, idx) => {
                const optionKey = String.fromCharCode(65 + idx);
                return (
                  <div 
                    key={idx} 
                    className={`option ${selectedOptions[currentQuestion] === optionKey ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(optionKey)}
                  >
                    <span className="option-letter">{optionKey}</span>
                    <span className="option-text">{option}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="navigation">
            <button
              onClick={() => setCurrentQuestion(p => Math.max(0, p - 1))}
              disabled={currentQuestion === 0}
              className="nav-btn prev-btn"
            >
              Previous
            </button>
            
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={() => setCurrentQuestion(p => p + 1)}
                className="nav-btn next-btn"
              >
                Next
              </button>
            ) : (
              <button
                onClick={calculateScore}
                className="nav-btn submit-btn"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="results">
          <h2 className="results-title">
            {timeLeft === 0 ? "Time's Up!" : "Test Complete"}
          </h2>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-value">{score}</span>
              <span className="score-total">/{questions.length}</span>
            </div>
            <div className="percentage">
              {percentage}%
            </div>
            <div className="feedback-message" style={{ margin: "18px 0 0 0", fontSize: "1.15rem", fontWeight: "500", color: "#2980b9" }}>
              {feedback}
            </div>
          </div>

          <h3 className="feedback-title">Question Review</h3>
          <div className="feedback-list">
            {questions.map((q, index) => (
              <div 
                key={index} 
                className={`feedback-item ${selectedOptions[index] === q.correctAnswer ? 'correct' : 'incorrect'}`}
              >
                <div className="feedback-question">
                  <span className="question-number">Q{index + 1}:</span> {q.text}
                </div>
                <div className="feedback-details">
                  <div className="user-answer">
                    <strong>Your answer:</strong> 
                    {selectedOptions[index] 
                      ? `${selectedOptions[index]} - ${q.options[selectedOptions[index].charCodeAt(0) - 65]}` 
                      : "Not answered"}
                  </div>
                  <div className="correct-answer">
                    <strong>Correct answer:</strong> 
                    {`${q.correctAnswer} - ${q.options[q.correctAnswer.charCodeAt(0) - 65]}`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="action-buttons">
            <button onClick={() => window.location.href = '/courses'} className="action-btn">
              Back to Courses
            </button>
            <button onClick={handleRetry} className="action-btn retry-btn">
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MockTest;
