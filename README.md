# chatalytics

## Description
This application is built to analyze private text messages between two parties and display them on a webpage. We use telegram messages for analysis.

## Data cleaning
1. Remove stop words
2. Remove emoji
3. Remove numbers
4. Lowercase
5. Lemmatizer

## Analysis
1. Number of messages
2. Average words per message
3. Monthly text frequency
4. Number of questions asked (inferred)
5. Number of caps word used
6. Wordcloud
7. General sentiment of messages

## Tech stack
100% javascript project, 
Frontend: React.js
Backend: Nodejs
Animation assets from LottieFiles

## Data to use
1. Go to telegram desktop -> Private Chat with anyone
2. Click on the top right corner -> Export Chat History
3. Select "Machine-readable JSON" export format

## Running the project
1. Ensure you have Nodejs downloaded to the device
2. Open both the "backend" and "telechatanalysis" on an IDE
3. At the root directory, run "npm install" and "npm start"

