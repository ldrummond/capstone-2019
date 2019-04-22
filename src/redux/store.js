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
    wheelIndex: index, 
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
  return {...state, ...stateFromIndex(nexti)};   
}

function stateFromPath(state, path = "") {
  for(let i = 0; i < paths.length; i++) {
    if(paths[i] === path) {
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

    case 'SCROLL_CHANGE':  
      return {
        ...state,
        pageHasScrolled: action.pageHasScrolled, 
      }

    case 'WHEEL_UP':
      return {
        ...prevSystemState(state), 
        wheelIndex: state.wheelIndex - 1, 
        prevWheelIndex: state.wheelIndex,
        lastChange: Date.now(),
      };

    case 'WHEEL_DOWN':
      return {
        ...nextSystemState(state), 
        wheelIndex: state.wheelIndex + 1, 
        prevWheelIndex: state.wheelIndex,
        lastChange: Date.now(), 
      };

    case 'SET_PREV_LOCATION':
      return {
        ...state,
        prevLocation: action.prevLocation
      };

    case 'SELECTION_ENTER': 
      return {
        ...state,
        isHoveringSelector: true
      }

    case 'SELECTION_EXIT': 
      return {
        ...state,
        isHoveringSelector: false
      }

    case 'START_TRANSITION': 
      return {
        ...state,
        isTransitioning: true
      }

    case 'END_TRANSITION': 
      return {
        ...state,
        isTransitioning: false
      }
     
    default:
      return state
  }
}

const initialState = {
  prevLocation: '/about',
  prevWheelIndex: -1,
  wheelIndex: 0,
  lastChange: Date.now(),
  isHoveringSelector: false, 
}

// Create a Redux store holding the state of the app. 
export default createStore(systemsReducer, stateFromPath(initialState, 'traffic')); 