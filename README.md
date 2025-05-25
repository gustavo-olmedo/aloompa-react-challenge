# Aloompa React Challenge

## Overview

This is a technical challenge designed to evaluate your React and GraphQL skills. You'll be working with Apollo Client to fetch and display event data from an API.

## Technologies

- React 17
- TypeScript
- Apollo Client
- GraphQL
- Styled Components

## Requirements

### 1. Project Setup

- **Node.js version 16.x is required.** Please ensure you are using Node 16 before installing dependencies.
- Clone this repository
- Install dependencies using either:
  ```bash
  yarn install
  # or
  npm install
  ```

### 2. Implementation Tasks

1. **Apollo Client Setup**

   - Open `src/index.tsx`
   - Configure the Apollo Client to connect to the API
   - Ensure proper error handling and loading states

2. **Event List Implementation**
   - Open `src/App.tsx`
   - Write a GraphQL query to fetch events with the following fields:
     - id
     - name
     - image
     - description
   - Connect the query response to the `events` variable
   - Implement proper loading and error states

### 3. Testing

- Run the development server:
  ```bash
  yarn start
  # or
  npm start
  ```
- Verify that:
  - The application builds successfully
  - Events are being fetched and displayed correctly
  - Loading states are handled appropriately
  - Error states are handled gracefully

## Evaluation Criteria

Your implementation will be evaluated based on:

- Code organization and cleanliness
- Proper TypeScript usage
- Error handling
- Loading state management
- GraphQL query implementation
- Component structure
- Overall code quality

## Submission

Please ensure your code is:

- Well-documented
- Properly formatted
- Free of console logs and debugging code
- Ready for review

## Time Limit

This challenge should take approximately 2-3 hours to complete.

## Questions?

If you have any questions about the requirements or implementation, please reach out to your contact at Aloompa.
