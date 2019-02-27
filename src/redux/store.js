import { createStore } from 'redux';
import data from '../data/data.js'; 
import { next, prev } from '../components/helperFunctions'

const systems = data.systems.map((system, i) => {system.index = i; return system}); 
const paths = systems.map(system => system.path); 

function stateFromIndex(index) {
  if(index < 0 || index > systems.length) {throw new RangeError("State index is out of range.")};
  return {
    prevSystem: prev(systems, index),
    curSystem: systems[index],
    nextSystem: next(systems, index),
  }
}

function prevSystemState(state) {
  let curi = state.curSystem.index; 
  let previ = (curi > 0) ? curi - 1 : systems.length - 1; 
  return {...state, ...stateFromIndex(previ)};  
}

function nextSystemState(state) {
  let curi = state.curSystem.index; 
  let nexti = (curi < systems.length - 1) ? curi + 1 : 0; 
  return {...state, ...stateFromIndex(nexti)};;    
}

function stateFromPath(state, path = "") {
  for(let i = 0; i < paths.length; i++) {
    if(paths[i] === path) {
      // console.log('hitpath', paths[i])
      return {...state, ...stateFromIndex(i)};
    }
  }
  // throw new Error(`System path "${path}" does not exist`);
  return state; 
}

// Reducer 
function systemsReducer(state = [], action) {
  // console.log(action);
  switch (action.type) {
    case 'NEXT_SYSTEM':
      return nextSystemState(state)
    
    case 'PREV_SYSTEM':
      return prevSystemState(state)

    case 'SYSTEM_FROM_PATH': 
      return stateFromPath(state, action.path)

    case 'HIDE_ABOUT':
      return {...state, aboutVisible: false}; 

    case 'SHOW_ABOUT':
      return {...state, aboutVisible: true}; 

    case 'WHEEL_UP':
      return {...prevSystemState(state), wheelIndex: state.wheelIndex + 1};

    case 'WHEEL_DOWN':
      return {...nextSystemState(state), wheelIndex: state.wheelIndex - 1};
    
    default:
      return state
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// let store = createStore(systemsReducer, stateFromPath({}, 'traffic'));
// export default store; 

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
export default function createStoreFromPath(path = 'traffic', _aboutVisible = false) {
  // console.log("path", path)
  return createStore(systemsReducer, stateFromPath({aboutVisible: _aboutVisible, wheelIndex: 0}, path)); 
} 
