import 'babel-polyfill';

export default (createStore) => {

  let store = null;

  const emit = () => {
    const state = store.getState();
    self.postMessage({
      type: 'update',
      payload: state,
    });
  }

  const actions = {
    init: async () => {
      store = createStore();
      emit();
      store.subscribe(emit)
    },
    dispatch: async (action) => {
      return await store.dispatch(action);
    },
  };

  self.addEventListener('message', async ({ data }) => {
    const { id, type, payload } = data;
    const response = {
      id,
      payload: undefined,
      error: false,
    };

    if (actions[type]) {
      try {
        response.payload = await actions[type](payload);
      } catch (err) {
        response.payload = err.toString();
        response.error = true;
      }
    }
    self.postMessage(response);
  });
};
