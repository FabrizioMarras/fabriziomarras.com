import React, { useState } from 'react';

function AIbot() {
  const [question, setQuestion] = useState('');
  const [answers, setAnswers] = useState([]);

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleSubmitQuestion = () => {
    // Simulate AI response
    const response = getAIResponse(question);

    setAnswers([...answers, { type: 'question', text: question }, { type: 'answer', text: response }]);
    setQuestion('');
  };

  // Simulated function to get AI response
  const getAIResponse = (question) => {
    // Mock response for demonstration
    const mockResponses = {
      'hello': 'Hello! How can I assist you today?',
      'how are you?': 'I am just a virtual assistant, but thanks for asking!',
      'bye': 'Goodbye! Have a great day!'
    };

    // Check if the question exists in mockResponses, otherwise return a default response
    return mockResponses[question.toLowerCase()] || 'I am sorry, I cannot understand that question.';
  };

  return (
    <div className="mt-12 p-10 px-6 md:px-10 border-2 border-tertiary bg-black/70 rounded-xl flex flex-col gap-8">
      {/* Display questions and answers */}
      <div className="bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic text-white rounded-lg outline-none border-none font-medium">
        {answers.map((item, index) => (
          <div key={index}>{item.text}</div>
        ))}
      </div>
      {/* Input for asking questions */}
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        placeholder="Ask me anything..."
        className="bg-zinc-900 py-4 px-6 placeholder:text-tertiary placeholder:font-thin placeholder:italic text-white rounded-lg outline-none border-none font-medium"
      />
      <button
        onClick={handleSubmitQuestion}
        className="bg-zinc-600 py-3 px-8 outline-none w-fit text-white font-bold shadow-sm shadow-tertiary rounded-xl"
      >
        Ask a question
      </button>
    </div>
  );
}

export default AIbot;
