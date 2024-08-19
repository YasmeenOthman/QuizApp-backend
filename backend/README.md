# Models 
## The Attempt schema:
- it represents a user's attempt at taking a quiz. Each time a user starts and completes a quiz, an Attempt document is created to store information about that specific session. This includes details like which quiz was taken, who took it, when it was taken, the user's answers, the score they received, and how long they took to complete it.

### Purpose of the Attempt Schema:
- Tracking Individual Quiz Sessions: It allows the application to track each instance of a user taking a quiz. This is useful for generating statistics, reviewing past attempts, and monitoring user progress over time.
- Storing User Responses: It records the user's answers to each question in the quiz, which can later be reviewed or analyzed.
- Calculating Performance Metrics: The score and timeTaken fields help in calculating how well the user performed in the quiz and how quickly they completed it.
### Example Use Case:
Imagine a user named Alice takes a quiz on JavaScript basics. The app creates an Attempt document when Alice completes the quiz, which stores:

- The ID of the quiz she took.
- Her unique user ID.
- The date and time she took the quiz.
- Her score (e.g., 8 out of 10).
- The answers she selected for each question.
- The total time she spent on the quiz.

### This information can then be used to:
- Display Alice's performance on her dashboard.
- Provide her with feedback on her answers.
- Aggregate data across all users for analytics (e.g., average score on the quiz, most difficult questions, etc.).