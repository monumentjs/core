# TypeScript Standard Library

![Travis CI Status](https://travis-ci.org/typescript-standard-library/Core.svg?branch=master)

**Standard library** provides **high quality** and **reusable** codebase written in TypeScript. 
It designed for development of **large applications** when **scalability** and **consistency** 
are very important.


## The course to maximum efficiency

Standard library is aimed to provide a **comprehensive codebase** for developing any applications.


## OOP way

Many of modern libraries and frameworks are written in _functional style_.
They are completely _unsuitable for developing large applications_ with a complex domain, 
when you need to describe the entities and the connections between them. 
Many of such libraries and frameworks _impose a certain model_ of the application. 
This leads to the complexity of the separation of responsibilities due to the _lack of flexibility_ 
in their architecture.

The **standard library does not impose any application model** at all. 
This gives you complete control over the scaling of the application and 
the separation of logic into layers that reflect the subject area of **your** application.

This standard library is a large codebase built in accordance with the principles of OOP.

Many functions of Javascript platforms are reflected in the corresponding classes, 
which provide a more consistent and reliable layer over low-level API platforms.


## Modular

Standard library **does not force to use it entirely and does not impose restrictions** 
on the use of third-party solutions. You can easily use only the functionality that you really need.

Each class is a separate module that can be compiled with AMD, CommonJS or UMD wrapper.


## Modern

Standard library written in [TypeScript](https://www.typescriptlang.org), and this gives a lot of advantages.
The most significant are:

- **Static typing** allows to keep the application codebase in a strong shape;
- **Easy refactoring** thanks to awesome support of TypeScript in IDEs;
- **Errors detection** before launching thanks to built-in compiler.

Standard library hides all those historical complexity of working with asynchronous code. 
Now it's pretty simple to write asynchronous code using `async/await`.
So, forget about callback hell and long promises chains!
In standard library functions that performs async work are always `async`.

Also thanks to TypeScript **we can use the latest ECMAScript features today**.


## Test coverage

Ask yourself, how many frameworks and libraries you know that still grow over the years of development?

Many frameworks and libraries become "petrified" because of lack of tests.
Without test coverage constant growth and safe changes in project are not possible. 
Everything will just fall apart. 
And work will start from scratch.

That's why standard library's development follows **TDD** to guarantee that changes have predictable character
and fix problems caused by changes from release to release.


## Contribution

Feel free to make pull-requests.
Your help is always welcome.
For more information see [this document](CONTRIBUTING.md).


## License

MIT
