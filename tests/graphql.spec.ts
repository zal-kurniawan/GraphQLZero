import { test, expect } from '@playwright/test';
import * as graphqlSteps from '../steps/graphql.steps';

test.describe('GraphQL API Automation Tests', () => {

    // 1. Positive Test: Get User By ID
    test('Should fetch user details successfully', async ({ request }) => {
        const { status, body } = await graphqlSteps.getUser(request, { id: "1" });

        // Assertion
        expect(status).toBe(200);
        expect(body.errors).toBeUndefined();
        expect(body.data.user.id).toBe("1");
        expect(body.data.user.name).toBeDefined();
    });

    // 2. Negative Test: Verify non-existent user ID
    test('Should return null data for non-existent user ID', async ({ request }) => {
        const { status, body } = await graphqlSteps.getUser(request, { id: "99999" });

        expect(status).toBe(200);
        expect(body.data.user).toEqual({
            id: null,
            name: null,
            email: null
        });
    });

    // 3. Positive Test: Get Post with Comments
    test('Should fetch post and its comments', async ({ request }) => {
        const { status, body } = await graphqlSteps.getPostWithComments(request, { id: "1" });

        // Assertion
        expect(status).toBe(200);
        expect(body.errors).toBeUndefined();
        expect(body.data.post.title).toBeTruthy();
    });


    // 4. Positive Test: Create a new post
    test('Should create a new post successfully', async ({ request }) => {
        const payload = { input: { title: "Test Kumparan", body: "This is body for Test Kumparan" } };
        const { status, body } = await graphqlSteps.createNewPost(request, payload);

        // Assertion
        expect(status).toBe(200);
        expect(body.errors).toBeUndefined();
        expect(body.data.createPost.title).toBe("Test Kumparan");
        expect(body.data.createPost.id).toBeDefined();
    });

    // 5. Negative Test: Failed to create a new post when variables are mising
    test('Should return GraphQL errors when required variables are missing', async ({ request }) => {
        const { status, body } = await graphqlSteps.createNewPost(request, {});

        // Assertion
        expect(status).toBe(200);
        expect(body.errors).toBeDefined();
        expect(body.errors.length).toBeGreaterThan(0);
        expect(body.errors[0].message).toContain('Variable "$input" of required type');
    });

    // 6. Negative Test: Create a new post with empty strings
    test('Should handle creating a post with empty strings', async ({ request }) => {
        // Menguji bagaimana API menangani input string kosong
        const payload = { input: { title: "", body: "" } };
        const { status, body } = await graphqlSteps.createNewPost(request, payload);

        // Assertion
        expect(status).toBe(200);
        expect(body.errors).toBeUndefined();
        expect(body.data.createPost.title).toBe("");
        expect(body.data.createPost.body).toBe("");
    });

});