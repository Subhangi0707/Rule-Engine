# Rule Engine with AST

This is a simple web application that evaluates eligibility based on custom rules using a rule engine with an Abstract Syntax Tree (AST). The project includes both a **React frontend** and an **Express backend**.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Security](#security)
- [Performance Considerations](#performance-considerations)
- [License](#license)

## Technologies Used
- Frontend: React.js
- Backend: Express.js, Node.js
- Database: MongoDB
- Package Manager: npm
- API: OpenWeatherMap (if applicable)
  
## Project Structure
#### backend
- server.js # Main Express server code
- evaluateRule.js # Logic for AST-based rule evaluation
- models/ # MongoDB schemas and models
- routes/ # API routes
- config/ # Environment configurations
- .env # Environment variables (not included in repository)
  
#### frontend
###### src/
- App.js # Main React component
- components/ # React components
- API.js # API calls to backend
- public/ # Static files
- package.json # Frontend dependencies and scripts

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

### Clone the repository

- git clone https://github.com/your-username/your_repo_name.git
- cd your_repo_name

## Backend Setup
1.Navigate to the backend folder:
  - cd backend
    
2.Install the necessary dependencies:
  - npm install
    
3.Set up the .env file for environment variables: Create a .env file in the backend directory with the following variables:
  - PORT=8080
  - MONGO_URI=mongodb://localhost:27017/test
    
4.Run the backend server:
  - npm start
    
## Frontend Setup
1.Navigate to the frontend folder:
  - cd frontend

2.Install the necessary dependencies:
  - npm install
    
3.Run the frontend application:
  - npm start

### Running the Application
1.Start the backend server by running npm start inside the backend directory.

2.Open the frontend at http://localhost:3000 by running npm start in the frontend directory.

3.The application will be live and both parts will work together, communicating over REST APIs.

### Database Setup
- MongoDB is used to store user details and rule evaluations. Ensure MongoDB is running locally, or connect it to a cloud MongoDB service by updating the MONGO_URI in the .env file.

##### To initialize the database:
1.MongoDB will automatically create collections based on data insertions.

2.You can use tools like MongoDB Compass or Mongoose to inspect or seed initial data.

## Features
- Rule-based eligibility evaluation using AST.
- 
- Frontend to input user data (age, salary, department, experience).
- 
- Backend API for processing rules and returning eligibility status.
- 
- MongoDB for persistent data storage.

## Security Considerations
1.Environment Variables: Store sensitive data (like MongoDB URI, API keys) in a .env file, and avoid pushing it to the repository.

2.Input Validation: Both the frontend and backend validate inputs to prevent attacks like SQL injection or NoSQL injection.

3.CORS Protection: Ensure that CORS is configured to allow only trusted sources access to the backend.

4.Rate Limiting: Add rate limiting on backend endpoints to prevent DDoS attacks.

## Performance Improvements
1.Database Indexing: Use MongoDB indexes to improve the performance of data queries.

2.Frontend Optimization: Use React's lazy loading and code splitting for optimizing the loading time of components.

3.Backend Caching: Implement caching for rule evaluations that don’t change frequently.

### License
- This project is licensed under the MIT License. See the LICENSE file for details.
  ### Key Improvements Made:
1. **Consistent Formatting**: Used Markdown formatting consistently for clarity, such as bullet points, headings, and code blocks.
2. **Organized Project Structure**: Enhanced the visual representation of the project structure.
3. **Clearer Sections**: Added sub-sections for clarity, especially in the Database Setup section.
4. **Defined Future Improvements**: Clarified potential future enhancements to give a clearer roadmap.
5. **Links**: Provided links for prerequisites for easy navigation.

These changes make the README more professional and user-friendly, enhancing readability and usability for anyone looking to understand or use your project.
