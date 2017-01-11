# TypeScript Standard Library

This project is aimed to provide a high quality standard library of common and specific functionality for 
server and client applications.


## Goals

- Bring the most frequently used functionality (FUF) into TypeScript class library
- Cover FUF with tests
- Create solutions base for isomorphic applications
- Provide HQ level of abstraction that allow to scale application


## Roadmap

This library should cover many aspects of application architecture. Some of them are:

- Base types
  - Collections
  - Event management
  - State management
- Data
  - Validation
  - Generation
  - Transformation
  - Serialization
- Localization
  - Flexible translation mechanism
  - Translations dictionary
  - Translations resources management
  - Culture information
  - Calendar
  - Date / time formatting
  - Currency formatting
- Automation
  - Tasks management
  - Jobs queue
  - Jobs scheduling
- Tooling
  - Command-line tools framework
- Client-server architecture
  - Client-server data exchange
    - Routing
    - REST API
    - AJAX
  - DB integration, ORM
  - Cache
  - Realtime interaction
    - Web Sockets
    - WebRTC
- UI & UX
  - Abstract algorithms for UI components (UI frameworks changes, but widgets functionality does not)
  - Feature detection
  - Animations and transitions
  - Widgets behavior
  

## Code Style

To ensure code style is the same across all library, `TSLint` is used.


## Contribution

Feel free to make pull-requests if think it worth it ;). Your help is always welcome.
You can also help transferring already existing solutions into this project.


## Project Initiator

Project initiated by Alex Chugaev <achugaev93@gmail.com>


## License

MIT