import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'main.css';
import Main from 'main';
import workerStore from 'worker-store';

const run = async () => {
  await workerStore.init();

  const root = document.createElement('div');
  document.body.appendChild(root);

  ReactDOM.render(
    <Main />,
    root,
  );
}

run().catch(err => console.error(err));
