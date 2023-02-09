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