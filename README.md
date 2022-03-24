# Prepare local env

## Migration dev db to local db

```
mongodump --uri=${MONGO_URL}
mongorestore dump/
```

# TODO:

use this 2 commands for check errors and formatting files in project:

```
npm run format
npm run lint
```
