# Technic Test Lite ThinKing

## Description

This Project just expose a simple that show a table of users and companies API with validations, and security with JWT for purpose test.

#### Download node packages

```
yarn install
```

#### Execute project

```
yarn start
```

#### To Deploy

```
yarn deploy
```

#### Jest config
Write this in package.json > scripts > test for jest detect the imports
````
WINDOWS
set NODE_OPTIONS=--experimental-vm-modules && npx jest

MAC
export NODE_OPTIONS=--experimental-vm-modules && npx jest
````
#### Structure of project
````
Directory/
|--.github/
|--|--workflows/
|--|--|--CiCd.yml
|--docs/
|--|--swagger.js
|--src/
|--|--config/
|--|--controllers/
|--|--middleware/
|--|--models/
|--|--public/
|--|--routes/
|--|--utils/
|--|--validators/
|--test/
|--|--app.test.js
|---app.js
````