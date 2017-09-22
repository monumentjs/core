# Contributing

**Table Of Contents**

- [Running Tests](#running-tests)

## Running Tests

We use [Jest](https://facebook.github.io/jest) as test runner. 

1\. Install dependencies

```bash
npm i
```

2\. Ensure that you have TypeScript compiler and Jest CLI installed on your machine.
If not, install them with following command:

```bash
npm i -g typescript jest
```

3\. Ensure that TypeScript is compiled. 
To compile all changed project files run:

```bash
npm run compile
```

4\. To run tests use:

```bash
npm test
```

Also you can use Jest in watch mode running tests with:

```bash
npm run jest
```
