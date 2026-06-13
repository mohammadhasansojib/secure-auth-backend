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