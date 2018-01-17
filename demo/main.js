import React from 'react';
import workerStore from 'worker-store';
import normalStore from 'normal-store';
import { Provider, connect } from 'react-redux';

const View = ({ time, count, onIncrement, onDecrement }) => (
  <div className="container">
    <div>{time}</div>
    {count}
    <button onClick={onIncrement}>Increment</button>
    <button onClick={onDecrement}>Decrement</button>
    <div className="animation" />
  </div>
)

const Connected = connect(state => ({
  time: state.time,
  count: state.count,
}), (dispatch) => ({
  onIncrement: () => {
    dispatch({
      type: 'INCREMENT',
    });
  },
  onDecrement: () => {
    dispatch({
      type: 'DECREMENT',
    });
  },
}))(View);

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      worker: true,
    };
    this.update();
  }

  useWorker(worker) {
    this.setState({
      worker,
    });
  }

  update() {
    const store = this.state.worker ? workerStore : normalStore;
    store.dispatch({
      type: 'SET_TIME',
      value: new Date(),
    });
    setTimeout(() => {
      this.update();
    }, 0);
  }

  renderNormalStore() {
    return (
      <Provider store={normalStore} key="normal">
        <div>
          <div>Normal store</div>
          <Connected />
        </div>
      </Provider>
    )
  }

  renderWorkerStore() {
    return (
      <Provider store={workerStore} key="worker">
        <div>
          <div>Worker store</div>
          <Connected />
        </div>
      </Provider>
    )
  }

  render() {
    return (
      <div>
        <a href="https://github.com/trendsales/research-redux-webworker">
          <h1>Redux in WebWorker</h1>
        </a>
        <button
          onClick={() => this.useWorker(true)}
        >
          Use webworker store
        </button>
        <button
          onClick={() => this.useWorker(false)}
        >
          Use normal store
        </button>
        {this.state.worker ? this.renderWorkerStore() : this.renderNormalStore()}
      </div>
    )
  }
}

export default Main;
