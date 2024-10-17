const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { evaluateRule } = require('./evaluateRule');

const app = express();
const PORT = 8080;

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rule Schema
const ruleSchema = new mongoose.Schema({
  ruleString: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  userData: {
    age: { type: String, required: true },
    department: { type: String, required: true },
    salary: { type: String, required: true },
    experience: { type: String, required: true },
  },
});

const Rule = mongoose.model('Rule', ruleSchema);

app.post('/evaluate', async (req, res) => {
    const { rule, userData } = req.body;
    console.log(userData);
    // Save the rule to MongoDB
    try {
      const newRule = new Rule({ ruleString: rule , userData: userData});
      await newRule.save(); // Store the rule in the database
      console.log("Rule saved:", newRule);
    } catch (error) {
      return res.status(500).json({ error: "Failed to save rule." });
    }
  
    // Logic to create AST from rule string would go here
    const ast = createMockAST(rule);
  
    // Evaluate the AST against user data
    const isEligible = evaluateRule(ast, userData);
  
    res.json({ isEligible });
  });

// Function to create a mock AST
const createMockAST = (rule) => {
  return {
    type: "AND",
    left: {
      type: "OR",
      left: {
        type: "AND",
        left: { type: "operand", value: "age > 30" },
        right: { type: "operand", value: "department = 'Sales'" }
      },
      right: {
        type: "AND",
        left: { type: "operand", value: "age < 25" },
        right: { type: "operand", value: "department = 'Marketing'" }
      }
    },
    right: {
      type: "OR",
      left: { type: "operand", value: "salary > 50000" },
      right: { type: "operand", value: "experience > 5" }
    }
  };
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
