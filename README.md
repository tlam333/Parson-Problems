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



# Project Setup and Testing Guide

## Table of Contents
- [Project Setup](#project-setup)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [Front End Testing Expectations](#front-end-testing-expectations)
- [Front End Testing Methods](#front-end-testing-methods)
- [Back End Testing Expectations](#back-end-testing-expectations)
- [Back End Testing Methods](#back-end-testing-methods)
- [Additional Resources](#additional-resources)

**_Contents_**

- [Project Setup](file:///C:/Users/Thomas%20Lam/Downloads/Testing+And+Project+Setup.doc#TestingAndProjectSetup-ProjectSetup)
- [Front End Testing Expectations](file:///C:/Users/Thomas%20Lam/Downloads/Testing+And+Project+Setup.doc#TestingAndProjectSetup-FrontEndTestingE)&#x20;
- - [Front end testing methods](file:///C:/Users/Thomas%20Lam/Downloads/Testing+And+Project+Setup.doc#TestingAndProjectSetup-Frontendtestingm)
  [Back End Testing Expectations](file:///C:/Users/Thomas%20Lam/Downloads/Testing+And+Project+Setup.doc#TestingAndProjectSetup-BackEndTestingEx)&#x20;
  - [Backend testing methods](file:///C:/Users/Thomas%20Lam/Downloads/Testing+And+Project+Setup.doc#TestingAndProjectSetup-Backendtestingme)

---

## Project Setup
This project uses the MERN stack. Follow these steps for the initial setup.

1. **Clone or fork the repository** from GitHub.
2. **Frontend Setup**:
   - Navigate to `client/app`.
   - Open the terminal in the `app` folder and run:
     ```bash
     npm install
     ```
   - This will install all frontend dependencies.
3. **Backend Setup**:
   - Navigate to the root directory, then go to `/server`, and run:
     ```bash
     npm install
     ```
4. **Python Libraries**:
   - Ensure the following Python libraries are installed with `pip install`:
     - `flake8`
     - `scikit-learn`
     - `numpy`
     - `pandas`
   - If Python is not installed, install it first.
5. **Environment File (.env)**:
   - Create a `.env` file in the `/server` directory with the following structure:
     ```plaintext
     DATABASE_URI=
     PORT=
     AI_API_KEY=
     ACCESS_TOKEN_SECRET=''
     REFRESH_TOKEN_SECRET=''
     ```
   - Set up a MongoDB Atlas account, create a free cluster and collection, and generate a database key.
   - Copy the MongoDB Atlas URL into `DATABASE_URI`.
   - Specify an available port in the `PORT` variable.
6. **AI API Key**:
   - Create a Gemini AI account and generate an API key.
   - Place the AI key into the `AI_API_KEY` field in `.env`.

---

## Running the Project
To run the project, open two terminal instances:

- **Frontend**: Navigate to `client/app` and execute:
  ```bash
  npm run start
- **Backend**: Navigate to `/server` and execute:
  ```bash
  node index.js
---
  ## Front End testing expectations
  Expectations
1.	Responsive test. Frequent checks must be made to ensure that pages remain responsive across different screen sizes.
2.	Interactive test. Every interactable component must support touch, and mouse events.
3.	Browser test. Ensure that all pages and features are supported for the three major web-browsers repeat steps 1.) and 2.) for each browser.
  
  ## Front End testing expectations
  For front end testing use it is sufficient to use the developer tools provided by each major browsers being tested. See See [Front end testing methods](https://techballers.atlassian.net/wiki/spaces/Artefacts/pages/edit-v2/5046282#Front-end-testing-methods)_ _for frontend testing expectations.

  
