# Learnings through the project

## Generating is_expired column in SQL(PostgreSQL) during selection

For example:
```sql
create table refresh_tokens (
  refresh_token_id serial primary key,
  token_hash text not null,
  session_id text not null,
  user_id int not null,
  expires_at timestamp,
  create at date default now()
);
```

here for this table of refresh_tokens, we can generate is_expired column when selecting row(s).

Here's how to do it:

```sql
select
    *,
    expires_in < now() as is_expired
from
    refresh_tokens;
```


## `@updatedAt` directive in `prisma`
to update the updatedAt/updated_at field automatically when something modified, prisma gives @updatedAt directive to update automatically.

example:
```js
model Post {
  id        String   @id
  updatedAt DateTime @updatedAt
}
```


## Global Error handling

### express error handling in v4
- express(v4) can catch errors inside sync function.

  example:
  ```ts
  app.get('/error', (req: Request, res: Response) => {
      throw new Error("own created error in sync function!!")
  })
  ```
  for this error server will not crash. Because this error is inside sync function and express can catch that.

- but async error can't be catch explicity by express in v4

  example:
  ```ts
  app.get('/error', async (req: Request, res: Response) => {
      throw new Error("own created error in async function!!")
  })
  ```
  for this error server will crash. Becasue express(v4) can not catch this explicitly.

so to catch async function error in express v4, we have to use try/catch.

### express error handling in v5
express(v5) can catch both sync and async error. But to customize the error we can use try/catch.



