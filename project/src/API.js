export const evaluateRule = async (rule, userData) => {
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
  
      return await response.json();
    } catch (error) {
      console.error('Error in evaluateRule:', error); // Log error
      return { isEligible: false }; // Fallback response
    }
  };
  