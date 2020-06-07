import React from 'react';
import './App.css';
import hookActions from './actions/hookActions';
import Input from "./input";

/**
 * Reducer to update state, called automatically by dispatch
 * state {object} - existing state
 * action {object} - contains 'type' and 'payload' properties for the state update
 *                   for example: {type: 'setSecretWord', payload: 'party' }
 * @ return {object} - new state
 */
function reducer(state, action) {
  switch (action.type) {
    case "setSecretWord":
      return {...state, secretWord: action.payload };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
}

function App() {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  );

  const setSecretWord = (secretWord) =>
    dispatch({ type: "setSecretWord", payload: secretWord });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, []);

  if(!state.secretWord) {
    return (
      <div
        data-test="spinner"
        className="container"
      >
        <div
          className="spinner-border"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
        <p>
          Loading secret word
        </p>
      </div>
    );
  }

  return (
    <div
      data-test="component-app"
      className="container"
    >
      <Input secretWord={state.secretWord} />
    </div>
  );
}

export default App;
