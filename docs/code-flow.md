# Code Flow for the application

## Code Flow

### `POST - /api/auth/register`

- API Contract
    ```ts
    {
        name: string,
        email: string,
        password: string,
        role: 'admin' | 'user' (optional)
    }
    ```
- Flow
    - collect data from req.body
    - validate email format
    - validate password strongness
    - validate name character length(3-30)
    - generate hash password
    - create user
    - return response
- Test Cases
    - valid and unique email
    - strong password
    - correct name length
- Error Cases
    - invalid email
    - email already exists
    - weak password
    - name character length not meet
- Response (201)
    ```ts
    {
        success: true,
        message: "registration successfully completed",
        data: {
            user: {...}
        },
    }
    ```

### `POST - /api/auth/login`

- API Contract
    ```ts
    {
        email: string,
        password: string,
        rememberMe: boolean,
    }
    ```
- Flow
    - collect data from req.body
    - validate email format
    - check user existance by email
    - match password
    - generate access token, refresh token and session id
    - set refresh token and session id in cookie
    - store refresh token in db
    - return response
- Test Cases
    - valid email
    - email exists
    - password matched
- Error Cases
    - invalid email
    - email does not exist
    - password mismatch
- Response (200)
    ```ts
    {
        success: true,
        message: "login successful",
        data: {
            accessToken: "...",
        },
    }
    ```

### `POST - /api/auth/refresh`

- Flow
    - get refresh token and session id from cookies
    - check refresh token in db with same session id
    - match refresh token
    - generate new access token
    - return response
- Test Cases
    - find refresh token in db with same sid
    - match refresh token
- Error Cases
    - no refresh token found with same sid
    - refresh token mismatch
- Response (200)
    ```ts
    {
        success: true,
        message: "token refresh successfully",
        accessToken: "...",
    }
    ```

### `GET - /api/users/me`

- Flow
    - get user id from request.user object
    - find user with the same user id
    - return response
- Test Cases
    - no test case
- Error Cases
    - no error case
- Response (200)
    ```ts
    {
        success: true,
        message: "user get successfully",
        user: {...},
    }
    ```

### `PATCH - /api/users/me`
- API Contract
    ```ts
    {
        name: string,
        email: string,
        password: string,
        role: "admin" | "user"
    }
    ```
- Flow
    - get user id from request.user object
    - find user with the same user id
    - update user
    - return response
- Test Cases
    - no test case
- Error Cases
    - no error case
- Response (200)
    ```ts
    {
        success: true,
        message: "user update successfully",
        user: {...},
    }
    ```

### `POST - /api/auth/logout`
- Flow
    - get all-device data from req.query.all-device
    - if all device true, delete all refresh token with same user id from db
    - if all device false, delete only refresh token with same session id
    - return response
- Test Cases
    - no test cases
- Error Cases
    - no error cases
- Response (200)
    ```ts
    {
        success: true,
        message: "logout successful",
    }
    ```

### `POST - /api/auth/forget-password`
- API Contract
    ```ts
    {
        email: string,
    }
    ```
- Flow
    - validate email format
    - check email existance
    - send reset token to email
    - return response
- Test Cases
    - validate email format
    - check email existance
- Error Cases
    - invalid email format
    - email does not exist
- Response (200)
    ```ts
    {
        success: true,
        message: "sent reset token to your email, it will be expired in certain minutes",
    }
    ```

### `POST - /api/auth/reset-password`
- API Contract
    ```ts
    {
        password: string,
        confirm: string
    }
    ```
- Flow
    - find reset token with same mail from db
    - check reset token valid and same
    - check req body contains password
    - validate password
    - update password
    - return response
- Test Cases
    - validate reset token
    - validate password
- Error Cases
    - invalid reset token
    - invalid password
- Response (200)
    ```ts
    {
        success: true,
        message: "password reset successfully",
    }
    ```




