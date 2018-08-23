import {
  GET_ALL_ROUTINE_PERIOD,
  ADD_ROUTINE_PERIOD,
  REMOVE_ROUTINE_PERIOD,
  UPDATE_ROUTINE_PERIOD,
  RESET_ROUTINE_PERIOD_REDUCER,
  ADD_CLASSES,
  REMOVE_CLASSES,
  UPDATE_CLASSES
} from '../actions/types';

const initialState = {
  routineArray: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_ROUTINE_PERIOD_REDUCER:
      console.log('***** Cleaning all routine data *****');
      return initialState;
    case ADD_ROUTINE_PERIOD:
      // console.log(action.payload);
      // console.log('state', state['routineArray']);
      let newRoutineList;
      if (state['routineArray'] === null) {
        newRoutineList = [action.payload];
      } else {
        newRoutineList = [...state['routineArray'], action.payload];
      }
      return {
        ...state,
        routineArray: newRoutineList.sort(
          (a, b) => (a.serial < b.serial ? -1 : 1)
        )
      };
    case UPDATE_ROUTINE_PERIOD:
      let resUpdate = action.payload;
      let updatedAllRoutineList = state['routineArray'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        routineArray: updatedAllRoutineList.sort(
          (a, b) => (a.serial < b.serial ? -1 : 1)
        )
      };
    case GET_ALL_ROUTINE_PERIOD:
      // action.payload is an array
      // console.log('All RoutineList -> ', action.payload);
      let routineArray;
      if (state['routineArray'] === null) {
        routineArray = [...action.payload];
      } else {
        routineArray = [...action.payload, ...state['routineArray']];
      }
      return {
        ...state,
        routineArray: routineArray.sort(
          (a, b) => (a.serial < b.serial ? -1 : 1)
        )
      };
    case REMOVE_ROUTINE_PERIOD:
      let res = action.payload.removedRoutine;
      // console.log('Before routine delete ', state['routineArray']);
      let allroutineArray = state['routineArray'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      // console.log('After routine delete ', allroutineArray);
      return {
        ...state,
        routineArray: allroutineArray.sort(
          (a, b) => (a.serial < b.serial ? -1 : 1)
        )
      };
    /* CLASSES INSIDE ROUTINE_PERIOD */
    // It can be done using one case like CLASSES_DATA_CHANGED but for the sake of future leaving it
    case ADD_CLASSES:
      let resClassAdded = action.payload;
      // console.log('Response => ', resClassAdded);
      let withNewAddedClass = state['routineArray'].map(singleRoutine => {
        // console.log(singleRoutine);
        if (singleRoutine._id.toString() === resClassAdded._id.toString()) {
          delete singleRoutine['days'];
          // console.log('Before => ', singleRoutine);
          singleRoutine.days = resClassAdded.days;
          // console.log('After => ', singleRoutine);
          return singleRoutine;
        } else {
          return singleRoutine;
        }
      });

      return {
        ...state,
        routineArray: withNewAddedClass
      };
    case REMOVE_CLASSES:
      let resClassDeleted = action.payload;
      let withNewDeletedClass = state['routineArray'].map(singleRoutine => {
        if (singleRoutine._id.toString() === resClassDeleted._id.toString()) {
          delete singleRoutine['days'];
          // console.log('Before => ', singleRoutine);
          singleRoutine.days = resClassDeleted.days;
          // console.log('After => ', singleRoutine);
          return singleRoutine;
        } else {
          return singleRoutine;
        }
      });
      return {
        ...state,
        routineArray: withNewDeletedClass
      };
    case UPDATE_CLASSES:
      let resClassUpdated = action.payload;
      let withNewUpdatedClass = state['routineArray'].map(singleRoutine => {
        if (singleRoutine._id.toString() === resClassUpdated._id.toString()) {
          delete singleRoutine['days'];
          // console.log('Before => ', singleRoutine);
          singleRoutine.days = resClassUpdated.days;
          // console.log('After => ', singleRoutine);
          return singleRoutine;
        } else {
          return singleRoutine;
        }
      });
      return {
        ...state,
        routineArray: withNewUpdatedClass
      };
    default:
      return state;
  }
}
