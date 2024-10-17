const evaluateRule = (ast, userData) => {
    if (ast.type === 'operand') {
      return evaluateOperand(ast.value, userData);
    } else if (ast.type === 'AND') {
      return evaluateRule(ast.left, userData) && evaluateRule(ast.right, userData);
    } else if (ast.type === 'OR') {
      return evaluateRule(ast.left, userData) || evaluateRule(ast.right, userData);
    } else {
      throw new Error(`Unknown node type: ${ast.type}`);
    }
  };
  
  const evaluateOperand = (condition, userData) => {
    const tokens = condition.split(' ');
    const attribute = tokens[0];
    const operator = tokens[1];
    let value = tokens.slice(2).join(' '); // Change 'const value' to 'let value'
  
    let userValue = userData[attribute];
  
    // Convert the value to appropriate type
    if (!isNaN(value)) {
      value = parseFloat(value);
    } else {
      value = value.replace(/'/g, '').replace(/"/g, ''); // Clean quotes
    }
  
    // Comparison
    switch (operator) {
      case '>':
        return userValue > value;
      case '>=':
        return userValue >= value;
      case '<':
        return userValue < value;
      case '<=':
        return userValue <= value;
      case '=':
        return userValue == value; // Changed to '===' if you want strict comparison
      case '!=':
        return userValue != value; // Changed to '!=='
      default:
        throw new Error(`Unknown operator: ${operator}`);
    }
  };
  
  module.exports = { evaluateRule };
  