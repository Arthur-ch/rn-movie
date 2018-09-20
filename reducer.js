const defaultState = {
  message: 'Loading',
  chatLog: '',
  statusMessage: '',
  userName: ''
};
export const listReducer = (state = defaultState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'setMessage':
      return Object.assign({}, state, {
        message: payload
      });
    default: return state;
  }
};