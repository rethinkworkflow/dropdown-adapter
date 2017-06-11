# Rethink Workflow Autocomplete Adapter
This repository is an example adapter for Rethink Workflow autocomplete. 

# Development

1. Check out the code
2. Install dependencies
```bash
npm install
```
3. Change the database URL in package.json
```json
{
...
"start": "POSTGRESQL_DATABASE_URI=<YOUR DATABSE URL> POSTGRESQL_SYNC_STRUCTURE=false ./node_modules/.bin/babel-node --debug --presets es2015 -- src/server.js --debug",
...
}
```
 * ```POSTGRESQL_DATABASE_URI```: your postgresql database URL
 * ```POSTGRESQL_SYNC_STRUCTURE```: set to ```true``` to perform structure sync (will remove your existing tables)
4. Run the application on development mode
```bash
npm start
```

# Production
1. Build the application to ES5
```bash
npm run build
```
2. Take ```dist``` and deploy to your production server
3. To start the app, run 
```bash
npm start
```