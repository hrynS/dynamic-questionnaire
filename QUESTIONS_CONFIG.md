# Questions configuration Documentation

## Overview

This document outlines the structure, conventions, and rules for utilizing the JSON structure of questions 
configuration that our application depends on. 

###  Complete questionnaire config example

```json
{
  "222": {
    "id": "222",
    "field": "question",
    "questionText": {
      "raw": "Choose the {{dynamic text to be replaced}}",
      "rules":[
        {
          "replaceWith":"option"
        }]
    },
    "type": "choice",
    "options": [
      {
        "label": "Option 1",
        "value": "option_1"
      },
      {
        "label": "Option 2",
        "value": "option_2"
      }
    ],
    "next": {
      "rules": [
        {
          "if": "111",
          "is": "value_of_field_111",
          "questionId": "333"
        }
      ]
    }
  }
}
```

# Details

## Root Object

The root object represents the collection of questions, where each key is a unique question identifier.
```json
{
  "questionId": { }
}
```

- **questionId**: String

## Question Object
Each question object contains details about the question, its type, options for answers, and the logic for progressing to subsequent questions based on user responses.

```json
{
  "questionId":{
      "id": "1",
      "field": "gender",
      "questionText": {},
      "type": "choice",
      "options": [
        {
          "label": "Option label",
          "value": "option_value"
        }
      ],
      "next": {}
    }
}
```

- **id**: String
- **field**: String. Specifies the corresponding field name in the database where the answer is stored. 
- **questionText**: Object. Contains the text of the question along with any rules for dynamic content. 
- **type**: String. The type of question, such as 'choice', indicating the expected kind of response.
- **options**: Array(only for choice questions). A list of possible answers for 'choice' type questions, with each 
  option being an 
  object comprising label and value.
- **next**: Object. Defines the logic for navigating to the next question or questions, based on rules.

##  Options Array
- **label**: String. The text shown to the user for each option.
- **value**: String. The value stored in the database when this option is selected by the user.


##  QuestionText Object
Contains the raw question text and any rules for dynamically replacing content based on prior answers.

```json
{
  "questionText": {
    "raw": "Text of the question {{may be with dynamic parts wrapped in a placeholder - in this case it will bereplaced with value of the question  with id 1}}",
    "rules": [{
      "replaceWith":"1"
    }]
  }
}
```
- **raw**: String. The question text as displayed to the user, potentially including placeholders for dynamic 
  content. If the first letter of a placeholder text is uppercase - the dynamic part will be capitalized, if 
  lowercase - vice versa.
- **rules**: Array (optional). Defines rules for replacing placeholders in the raw text, based on responses to 
  previous questions. **By default placeholder is {{}}**
- **replaceWith**: String(optional). The value of question with this id will be used to replace a placeholder in the question 
  text if no rules are specified.

```json
{
  "questionText": {
    "raw": "Text of the question presented to the user {{may be with dynamic parts wrapped in double brackets}}",
    "rules": [
      {
        "if":"15",
        "is":"yes",
        "replaceWith":"text to replace the dynamic part when question with id 15 was answered yes"
      },
      {
        "if":"15",
        "oneOf":["no", "maybe"],
        "replaceWith":"text to replace the dynamic part when question with id 15 was answered no or maybe"
      }]
  }
}
```

###  Question text object Rules Array
- **if**: String. The ID of the question whose answer determines the condition.
- **is**: String(required when no oneOf). The specific answer on question with id in **if** - value that triggers the 
  rule.
- **oneOf**: String Array (required when no is). The list of answers on question with id in **if** - any of the value 
  triggers the rule.
- **replaceWith**: String. The text to replace a placeholder in the question text.


##  Next Object
Specifies the subsequent step in the questionnaire flow, directing to a specific question or page  based on conditional 
logic.

```json
{
  "next": {
    "questionId": "Next question identifier"
  }
}
```

- **questionId**: String (required when no href or rules). If it is the only field specified - the next page will be 
  the page of this question.

```json
{
  "next": {
    "href": "URL for redirection"
  }
}
```
- **href**: String (required when no questionId or rules). If it is the only field specified - a URL to redirect the user upon answering the 
  current question.

```json
{
  "next": {
    "rules": [
      {
        "if":"5",
        "is":"yes",
        "questionId":"13"
      },
      {
        "if":"5",
        "oneOf":"no",
        "questionId":"14"
      }
    ]
  }
}
```

- **rules**: Array (required when no href or questionId). A list of conditional rules to determine the next question, based 
  on user previous responses.

###  Next object Rules Array
- **if**: String. The ID of the question whose answer determines the condition.
- **is**: String(required when no oneOf). The specific answer on question with id in **if** - value that triggers the
  rule.
- **oneOf**: String Array (required when no is). The list of answers on question with id in **if** - any of the value
  triggers the rule.
- **questionId**: String. The ID of the next question if the condition is true.

```json
{
  "next": {
    "href":"/intermediate-page-url",
    "rules": [
      {
        "if":"5",
        "is":"yes",
        "questionId":"13"
      },
      {
        "if":"5",
        "oneOf":"no",
        "questionId":"14"
      }
    ]
  }
}
```
- **href**: String (optional). If it is specified along with the rules - the user will go to a page with this URL 
  containing the following question id in the query parameters:

    */intermediate-page-url?questionId=13*

This is the case when we want to handle some intermediate pages between the questions.


