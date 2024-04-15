import React from 'react';
import ApplicationForm from './ApplicationForm';

function App() {
  const handleSubmit = (formData) => {
    console.log(formData); // Handle form submission here
  };

  return (
    <div className="App">
      <header className="App-header">
        <ApplicationForm onSubmit={handleSubmit} />
      </header>
    </div>
  );
}

export default App;
