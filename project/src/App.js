import React, { useState } from 'react';
import './App.css';
// import { evaluateRule } from './API';

function App() {
  const [rule, setRule] = useState(''); // Keep the rule input state
  const [userData, setUserData] = useState({
    age: '',
    department: '',
    salary: '',
    experience: '',
  });
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRuleChange = (e) => {
    setRule(e.target.value);
  };

  const evaluateRuleAPI = async () => {
    // Ensure rule and userData are set properly
    try {
      const response = await fetch('https://rule-engine-api.vercel.app/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rule, userData }),
      });
  
      if (!response.ok) {
        const errorText = await response.text(); // Get error message
        throw new Error(`Network response was not ok: ${errorText}`);
      }
  
      const data = await response.json();
      setResult(data.isEligible ? 'Eligible' : 'Not Eligible');
    } catch (error) {
      console.error('Error in evaluateRule:', error); // Log error
      return { isEligible: false }; // Fallback response
    }
    // if (!rule) {
    //   alert('Please enter a rule.');
    //   return;
    // }
  };

  return (
    <div className="App">
      <h1>Rule Engine with AST</h1>

      {/* Rule Input */}
      <div>
        <label>Enter Rule:</label>
        <textarea 
          value={rule} 
          onChange={handleRuleChange} 
          placeholder="Enter rule"
        />
      </div>

      {/* User Data Input */}
      <div>
        <label>Age:</label>
        <input 
          type="number" 
          name="age" 
          value={userData.age} 
          onChange={handleInputChange} 
          placeholder="Enter age"
        />
      </div>

      <div>
        <label>Department:</label>
        <input 
          type="text" 
          name="department" 
          value={userData.department} 
          onChange={handleInputChange} 
          placeholder="Enter department"
        />
      </div>

      <div>
        <label>Salary:</label>
        <input 
          type="number" 
          name="salary" 
          value={userData.salary} 
          onChange={handleInputChange} 
          placeholder="Enter salary"
        />
      </div>

      <div>
        <label>Experience (years):</label>
        <input 
          type="number" 
          name="experience" 
          value={userData.experience} 
          onChange={handleInputChange} 
          placeholder="Enter experience"
        />
      </div>

      {/* Button to Evaluate */}
      <button onClick={evaluateRuleAPI}>Evaluate Rule</button>

      {/* Result Display */}
      {result !== null && (
        <div>
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
