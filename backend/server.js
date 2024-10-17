require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { evaluateRule } = require('./evaluateRule');

const app = express();
const PORT = 8080;

// MongoDB Atlas connection URI with password from .env
const uri = `mongodb+srv://subhangipriya681:${process.env.DB_PASSWORD}@cluster0.qe5oa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create MongoClient
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB and get a reference to the database and collection
async function runMongoConnection() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Access the specific database and collection
    const database = client.db("test");
    const rulesCollection = database.collection("rules");

    // POST route to evaluate and store rules
    app.post('/evaluate', async (req, res) => {
      const { rule, userData } = req.body;

      // Create a rule object to be inserted
      const ruleDocument = {
        ruleString: rule,
        createdAt: new Date(),
        userData: {
          age: userData.age,
          department: userData.department,
          salary: userData.salary,
          experience: userData.experience,
        }
      };

      // Insert the rule into MongoDB
      try {
        await rulesCollection.insertOne(ruleDocument);
        console.log("Rule saved:", ruleDocument);
      } catch (error) {
        return res.status(500).json({ error: "Failed to save rule." });
      }

      // Logic to create AST from rule string
      const ast = createMockAST(rule);

      // Evaluate AST against user data
      const isEligible = evaluateRule(ast, userData);

      // Send response back to the client
      res.json({ isEligible });
    });

  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

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
app.get('/', (req, res) => {
  res.send('Welcome to the API!'); // or any other response you'd like
});

// Start MongoDB connection and server
runMongoConnection().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
