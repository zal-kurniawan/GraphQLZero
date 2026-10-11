import { APIRequestContext } from '@playwright/test';

const GRAPHQL_ENDPOINT = 'https://graphqlzero.almansi.me/api';

// Get User
export const getUser = async (request: APIRequestContext, variables: object) => {
  const query = `
    query GetUser($id: ID!) {
      user(id: $id) {
        id
        name
        email
      }
    }
  `;
  const response = await request.post(GRAPHQL_ENDPOINT, {
    data: { query, variables }
  });
  return { status: response.status(), body: await response.json() };
};

// Get Post with Comments
export const getPostWithComments = async (request: APIRequestContext, variables: object) => {
  const query = `
    query GetPost($id: ID!) {
      post(id: $id) {
        title
        comments {
          data {
            name
          }
        }
      }
    }
  `;
  const response = await request.post(GRAPHQL_ENDPOINT, {
    data: { query, variables }
  });
  return { status: response.status(), body: await response.json() };
};

// Create Post
export const createNewPost = async (request: APIRequestContext, variables: object) => {
  const mutation = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        id
        title
        body
      }
    }
  `;
  const response = await request.post(GRAPHQL_ENDPOINT, {
    data: { query: mutation, variables }
  });
  return { status: response.status(), body: await response.json() };
};