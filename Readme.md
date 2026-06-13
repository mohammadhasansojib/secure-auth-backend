# Secure Auth Backend

Secure auth backend is a basic authentication and authorization backend system where a user normally needs to authentice and authorize with basic credentials.

Here a user's action flow will be `Register` -> `Login` -> `Profile` -> `Logout`

## Database Design
Relational Database is being used here called PostgreSQL.

### Entities
- `users`
- `refresh_tokens`
- `password_reset_tokens`
- `email_verification_tokens`

### Relationship Cardinality
- `users`(1) -> `refresh_tokens`(N)
- `users`(1) -> `password_reset_tokens`(N)
- `users`(1) -> `email_verification_tokens`(N)

### Attributes
#### `users: `
```
-> user_id
-> username
-> email
-> age
-> password_hash
-> is_verified
-> role
-> created_at
-> updated_at
```

#### `refresh_tokens: `
```
-> refresh_token_id
-> token_hash
-> session_id
-> user_id
-> expires_at
-> created_at
```

#### `password_reset_tokens: `
```
-> reset_token_id
-> token_hash
-> user_id
-> expires_at
-> created_at
```

#### `email_verification_tokens: `
```
-> verification_token_id
-> token_hash
-> session_id
-> user_id
-> expires_at
-> created_at
```


