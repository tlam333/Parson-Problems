# Parsons Problems for Data Analytics

This repository contains the code for a web application that generates Parsons problems specifically for data analytics. Parsons problems are a type of educational puzzle where learners must rearrange given code blocks into the correct order to solve a problem. This application allows users to select from predetermined categories to tailor the problems to their learning needs.

## Features

- **Category Selection:** Users can choose from various data analytics categories to receive problems relevant to their interests.
- **Dynamic Problem Generation:** Problems are generated dynamically based on the selected category.
- **User-Friendly Interface:** The web app features an intuitive interface for easy navigation and use.
- **Feedback System:** Provides immediate feedback on the correctness of the arranged code blocks.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/parsons-problems-data-analytics.git
    ```

2. Navigate to the project directory:
    ```bash
    cd COMP30022
    ```

3. Navigate to the client or server directory
    ```bash
    cd server
    ```

    or

    ```bash
    cd client
    ```

4. Install the required dependencies:
    ```bash
    npm install
    ```

5. Start the development server:
    ```bash
    npm start
    ```

6. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

1. **Select a Category:** Choose a data analytics category from the dropdown menu.
2. **Solve the Problem:** Rearrange the code blocks to form the correct solution.
3. **Submit:** Click the "Submit" button to check your answer.
4. **Receive Feedback:** Immediate feedback will be provided to help you understand any mistakes.



# Project Setup and Testing Documentation

## Project Setup

This project utilizes the MERN stack. Ensure **Node.js** is installed on your system.

### Setup Steps

1. **Clone or Fork the Repository**: Access the GitHub repository and clone or fork it as required.
2. **Front End Setup**:
   - Navigate to `client/app`.
   - Open the terminal in this directory and run:
     ```bash
     npm install
     ```
3. **Back End Setup**:
   - Go back to the root directory.
   - Navigate to `/server` and run:
     ```bash
     npm install
     ```
4. **Python Libraries**:
   - Install necessary Python libraries:
     ```bash
     pip install flake8 scikit-learn numpy pandas
     ```
   - **Note**: Python must be installed beforehand.
5. **Environment Variables**:
   - In the `/server` directory, create a `.env` file with the following structure:
     ```
     DATABASE_URI=<Your MongoDB Atlas URL>
     PORT=<Your Desired Port>
     AI_API_KEY=<Your Gemini AI API Key>
     ACCESS_TOKEN_SECRET=''
     REFRESH_TOKEN_SECRET=''
     ```
6. **Database Setup**:
   - Create a **MongoDB Atlas** account, set up a free cluster and collection.
   - Obtain a database key and paste it into `DATABASE_URI`.
7. **API Key for Gemini AI**:
   - Sign up for a Gemini AI account and generate an API key. Paste it into `AI_API_KEY`.

8. **Run the Project**:
   - Open two terminals:
     - **Terminal 1**: Navigate to `client/app` and run:
       ```bash
       npm run start
       ```
     - **Terminal 2**: Navigate to `/server` and run:
       ```bash
       node index.js
       ```

## Testing Guidelines

### Front End Testing Expectations

1. **Responsive Testing**:
   - Ensure all pages are responsive across various screen sizes:
     - Desktop: 800-1000 px
     - Tablet: 500-790 px
     - Mobile: 330-490 px
2. **Interactive Testing**:
   - All interactive components should support both touch and mouse events.
3. **Browser Compatibility**:
   - Test all features across Chrome, Firefox, and Edge browsers.

### Front End Testing Tools
- Use **Chrome DevTools** or equivalent browser developer tools:
  - **Responsive Test**: Adjust viewport sizes.
  - **Interactive Test**: Toggle touch events.

### Back End Testing Expectations

1. **Error Codes and Asserts**:
   - Implement error codes and assertions for debugging ease.
2. **Routes and Request Tests**:
   - Test all HTTP request types on each route.

### Back End Testing Tools
- **Thunder Client** (VS Code Extension):
  - **New Request**: Create and test API requests directly in VS Code.

## Helpful Links
- [Node.js Download](https://nodejs.org/en/download/package-manager)
- [MongoDB Atlas Setup](https://www.mongodb.com/products/platform/atlas-database)
- [Gemini AI API Key](https://ai.google.dev/gemini-api/docs/api-key)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools)
- [Thunder Client](https://www.thunderclient.com/)

---

This documentation provides an overview of project setup and testing protocols. Please refer to the Confluence page for detailed testing standards and expectations.
