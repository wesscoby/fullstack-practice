import { createError } from 'apollo-errors';

// Any internal errors
export const UnknownError = createError("UnknownError", {
    message: "An unknown error has occured"
});

// User must be logged in
export const AuthenticationRequiredError = createError("AuthenticationRequiredError", {
    message: "Please login first"
});

// User is already logged in
export const AlreadyAuthenticatedUserError = createError("AlreadyAuthenticatedUserError", {
    message: "You are already authenticated"
});

// User does not have access rights
export const ForbiddenError = createError("", {
    message: "You are not allowed"
});