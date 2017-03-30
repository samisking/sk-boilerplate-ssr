export const initialState = {
  count: 0,
  hasSetCount: false
};

export const types = {
  INCREMENT: 'counter/INCREMENT',
  DECREMENT: 'counter/DECREMENT',
  SET_COUNT: 'counter/SET_COUNT'
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };

    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };

    case types.SET_COUNT:
      return {
        ...state,
        count: action.count,
        hasSetCount: true
      };

    default:
      return state;
  }
};

const increment = () => dispatch => dispatch({ type: types.INCREMENT });
const decrement = () => dispatch => dispatch({ type: types.DECREMENT });

const getNewCount = (count = 100) => (dispatch, getState) => {
  if (getState().counter.hasSetCount) {
    return getState().counter.count;
  }

  return new Promise(resolve =>
    setTimeout(() => {
      dispatch({
        type: types.SET_COUNT,
        count
      });
      resolve();
    }, 1000)
  );
};

export const actions = {
  increment,
  decrement,
  getNewCount
};
