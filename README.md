# GraphQL API Automation Test

This project contains automation test scripts for a GraphQL API using the **Playwright** framework and **TypeScript**. These tests are directed at the mock endpoint from `https://graphqlzero.almansi.me/api`.

## 📂 Project Structure

Based on your `GraphQLZero` project architecture, the code is divided into two main directories:

*   **`steps/`**: Contains the `graphql.steps.ts` file, which encapsulates the GraphQL query and mutation definitions. The core functions include `getUser`, `getPostWithComments`, and `createNewPost`.
*   **`tests/`**: Contains the test execution file `graphql.spec.ts`, which defines the test cases and handles assertions against the API responses.

## 🧪 Test Scenarios

This suite covers both positive and negative testing scenarios defined in the `graphql.spec.ts` file:

1.  **Positive Test**: Successfully fetches user details based on a valid ID.
2.  **Negative Test**: Returns `null` data when attempting to fetch a user with an unregistered ID (e.g., ID "99999").
3.  **Positive Test**: Successfully fetches a post along with its associated comments.
4.  **Positive Test**: Successfully creates a new post and verifies the generated title and ID.
5.  **Negative Test**: Returns a GraphQL error message when attempting to create a post without the required input variables.
6.  **Negative Test**: Handles the creation of a new post when inputs are filled with empty strings.

## 💻 Prerequisites

Ensure you have the following software installed:
*   [Node.js](https://nodejs.org/)
*   Node package manager (such as npm)

## 🚀 Installation

Clone this repository to your local machine, then install the required dependencies:

```bash
# Install project dependencies
npm install

# Install Playwright supported browsers (optional for API tests, but recommended)
npx playwright install