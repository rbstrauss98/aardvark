# Running the back end
Running `npm start` will start the server. The database will be saved in `aardvark.sqlite` and will persist across shutdowns.

You can also use `npm run dev` which will instead use `aardvark-dev.sqlite` for its database. This database is prepopulated with some test data and will reset on each run.

# Bug Routes

## Get all bugs
- `GET` request to `/api/bugs`
- Returns a list of all bugs

## Get specific bug
- `GET` request to `/api/bugs/:id`
- Returns the bug with the given ID and all its comments

## Create bug
- `POST` request to `/api/bugs`
- Returns an object with attribute `id` that contains the ID of the newly created bug

### Required body fields
- `title`
- `description`

### Optional body fields
- `solution`
    - If provided, will add a new comment to the bug with the solution text and the `isSolution` flag marked.

## Delete bug
- `DELETE` request to `/api/bugs/:id`
- Returns 200 status code if the bug with the given ID was deleted
- Returns 404 status code if the bug with the given ID couldn't be found

## Update bug
- `PUT` request to `/api/bugs/:id`
- Returns 200 status code if the bug with the given ID was successfully updated
- Returns 404 status code if the bug with the given ID couldn't be found

### Required body fields
- `title`
- `description`

## Create comment
- `POST` request to `/api/bugs/:id/comment` where ID is the parent bug ID
- Returns the created comment object if successful
- Returns with 404 status code if a bug with the given ID could not be found

### Required body fields
- `text`

# Comment Routes

## Delete comment
- `DELETE` request to `/api/comments/:id`
- Returns with 200 status code if the comment with the given ID was deleted
- Returns with 404 status code if the comment with the given ID couldn't be found

## Update comment
- `PUT` request to `/api/comments/:id`
- Returns with 200 status code if the comment with the given ID was successfully updated
    - This behavior differs from the create comment behavior, which is to return the entire comment. This can be changed to match if necessary, it just requires an extra DB lookup.
- Returns with 404 status code if the comment with the given ID couldn't be found

### Required body fields
- `text`

## Mark comment as solution
- `POST` request to `/api/comments/:id/solve`
- Returns with 200 status code if the comment with the given ID was successfully updated
- Returns with 404 status code if the comment with the given ID couldn't be found

## Unmark comment as solution
- `POST` request to `/api/comments/:id/unsolve`
- Returns with 200 status code if the comment with the given ID was successfully updated
- Returns with 404 status code if the comment with the given ID couldn't be found
