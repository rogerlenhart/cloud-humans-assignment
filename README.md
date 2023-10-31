# Cloud Humans - Backend Take Home Assignment

This repository contains a backend take-home assignment made for Cloud Humans.

The application is a simple API built with NestJS, which has a single API endpoint that receives a JSON payload with the Pro application data and returns a JSON response with the selected project.
## Installation

```bash
    # Clone the repository
    $ git clone https://github.com/rogerlenhart/cloud-humans-assignment.git

    # Access the project folder
    $ cd cloud-humans-assignment

    # Install dependencies
    $ npm install
```

There is a **insomnia-collection.json** file at the root directory, which contais example requests for testing.
    
## Running the app

### Development

```bash
  $ npm run dev
```

Server will start on http://localhost:3000

### Production

```bash
  $ docker-compose up
```

Server will start on http://localhost:3000

### Tests

```bash
  $ npm run test
```

## Technical Decisions

### Technologies

- **Node.js:** it's a lightweight, fast and flexible technology, making it a good choice for building simple web applications like this one.
- **Typescript:** with explicit type annotations, code becomes easier to understand and maintain.
- **NestJs:** while remaining lightweight, this framework offers a more modular and scalable approach, providing greater extensibility to the application.

### Architecture

The application was built based on Clean Architecture principles, mainly regarding the separation of software into layers, which is reflected in the folder structure.

```bash
src
  - domain
    - entities
```
- domain: is the core of the application.
- entities: represent the core concepts and rules of the application.

```bash
src
  - application
    - repositories
    - use-cases
```
- application: layer that implements use cases and interacts with diferent services.
- repositories: contains the abstract repositories.
- use-cases: classes that use domain knowledge to achieve specific goals.

```bash
src
  - infrastructure
    - database
      - repositories
    - http
      - controllers
      - dtos
      - view-models
```
- infrastructure: contains code that is highly coupled with the framework.
- repositories: contains the implementations of the repositories.
- controllers: manages routes, http requests and responses.
- dtos: objects that represent the request of controllers, with specific validation rules.
- view-models: responsible for mapping entities to http responses.

### Database

Due to the small scope of the application, I decided that a database would not be necessary. Despite that, classes were mostly written to depend on interfaces instead of actual implementations, so that business rules are independent of database. This approach also makes it easier to integrate with databases in the future.

### Unit Tests

NestJS relies on the Jest testing framework, which offers various useful features for test creation. One such feature is parameterized tests, that enables us to execute a single test method multiple times with different parameters. This way, it becomes much more practical to test the various possibilities that the scoring system of this application has.

I focused on testing the entities and their business logic, in particular the scoring calculation methods, to ensure that the requirements were met. I also made some tests for the pro applications Controller and Use Case using a in-memory implementation of the repository class.
