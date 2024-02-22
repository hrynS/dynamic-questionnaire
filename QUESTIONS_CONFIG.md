# Data Structure Documentation

## Overview

This document outlines the structure, conventions, and rules for utilizing the JSON structure of questions 
configuration that our application depends on. 

## JSON config Structure

The data structure is designed to represent questions, their types, options, and navigation flow within the questionnaire. Below is a brief overview of the structure:

```json
{
  "questionId": {
    "id": "Unique question identifier",
    "field": "Corresponding field in the database",
    "questionText": {
      "raw": "Text of the question presented to the user"
    },
    "type": "Type of question (e.g., choice, text)",
    "options": [
      {
        "label": "Option label displayed to the user",
        "value": "Value stored in the database"
      }
    ],
    "next": {
      "questionId": "Identifier of the next question",
      "rules": [
        {
          "if": "Condition based on response",
          "is": "Expected response",
          "questionId": "Directed question based on condition"
        }
      ]
    }
  }
}
