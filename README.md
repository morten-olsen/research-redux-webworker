# Toolkit for generating redux stores running in a separate thread

[demo](https://morten-olsen.github.io/research-redux-webworker/index.html)

The idea is to move redux to a web worker so that the UI thread remains free. Object dispatches are transferred to the to the worker thread and the resulting state is transferred back to the main thread using `redux`s `subscribe`.

This also means that this will **ONLY** work with objects which can be serialized, both for actions and for the resulting state.

### Creating a worker

The easiest way to get started if you are using `webpack` is to look inside the `/demo` folder for a working example
