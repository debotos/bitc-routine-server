import {
  GET_ALL_SEMESTER,
  ADD_SEMESTER,
  REMOVE_SEMESTER,
  UPDATE_SEMESTER,
  RESET_SEMESTER_REDUCER,
  ADD_COURSE,
  REMOVE_COURSE,
  UPDATE_COURSE
} from '../actions/types';

const initialState = {
  semesterArray: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case RESET_SEMESTER_REDUCER:
      console.log('***** Cleaning all semester data *****');
      return initialState;
    case ADD_SEMESTER:
      // action.payload is an obj
      // console.log(action.payload);
      // console.log('state', state['semesterArray']);

      let newSemesterList;
      if (state['semesterArray'] === null) {
        newSemesterList = [action.payload];
      } else {
        newSemesterList = [action.payload, ...state['semesterArray']];
      }
      // console.log('after calc', newSemesterList);

      return {
        ...state,
        semesterArray: newSemesterList
      };
    case UPDATE_SEMESTER:
      let resUpdate = action.payload;
      let updatedAllSemesterList = state['semesterArray'].map(singleItem => {
        if (singleItem._id.toString() === resUpdate._id.toString()) {
          return resUpdate;
        } else {
          return singleItem;
        }
      });
      return {
        ...state,
        semesterArray: updatedAllSemesterList
      };
    case GET_ALL_SEMESTER:
      // action.payload is an array
      // console.log('All SemesterList -> ', action.payload);
      let semesterArray;
      if (state['semesterArray'] === null) {
        semesterArray = [...action.payload];
      } else {
        semesterArray = [...action.payload, ...state['semesterArray']];
      }
      return {
        ...state,
        semesterArray: semesterArray.reverse()
      };
    case REMOVE_SEMESTER:
      let res = action.payload.removedSemester;
      // console.log('Before semester delete ', state['semesterArray']);
      let allsemesterArray = state['semesterArray'].filter(
        singleItem => singleItem._id.toString() !== res._id.toString()
      );
      // console.log('After semester delete ', allsemesterArray);
      return {
        ...state,
        semesterArray: allsemesterArray
      };
    /* COURSE INSIDE SEMESTER */
    // It can be done using one case like COURSE_DATA_CHANGED but for the sake of future leaving it
    case ADD_COURSE:
      let resCourseAdded = action.payload;
      // console.log('Response => ', resCourseAdded);
      let withNewAddedCourse = state['semesterArray'].map(singleSemester => {
        // console.log(singleSemester);
        if (singleSemester._id.toString() === resCourseAdded._id.toString()) {
          /*
                   IMPORTANT RULE TO NOTE
              -------------------------------
            [{id, name, courses:[{teacher:{name, code}, subject:{title, code}}, ...]}, ...]
            In such DEEP stage, Don't try to assign the value to a variable
            It will not deeply cloned
            Like, let response = singleSemester.course // It will not copy full data to response var
            Always return & edit the same var that you getting directly, here such type of var is 'singleSemester'
          */
          delete singleSemester['courses'];
          // console.log('Before => ', singleSemester);
          singleSemester.courses = resCourseAdded.courses;
          // console.log('After => ', singleSemester);
          return singleSemester;
        } else {
          return singleSemester;
        }
      });

      return {
        ...state,
        semesterArray: withNewAddedCourse
      };
    case REMOVE_COURSE:
      let resCourseDeleted = action.payload;
      let withNewDeletedCourse = state['semesterArray'].map(singleSemester => {
        if (singleSemester._id.toString() === resCourseDeleted._id.toString()) {
          /*
                   IMPORTANT RULE TO NOTE
              -------------------------------
            [{id, name, courses:[{teacher:{name, code}, subject:{title, code}}, ...]}, ...]
            In such DEEP stage, Don't try to assign the value to a variable
            It will not deeply cloned
            Like, let response = singleSemester.course // It will not copy full data to response var
            Always return & edit the same var that you getting directly, here such type of var is 'singleSemester'
          */
          delete singleSemester['courses'];
          // console.log('Before => ', singleSemester);
          singleSemester.courses = resCourseDeleted.courses;
          // console.log('After => ', singleSemester);
          return singleSemester;
        } else {
          return singleSemester;
        }
      });
      return {
        ...state,
        semesterArray: withNewDeletedCourse
      };
    case UPDATE_COURSE:
      let resCourseUpdated = action.payload;
      let withNewUpdatedCourse = state['semesterArray'].map(singleSemester => {
        if (singleSemester._id.toString() === resCourseUpdated._id.toString()) {
          /*
                   IMPORTANT RULE TO NOTE
              -------------------------------
            [{id, name, courses:[{teacher:{name, code}, subject:{title, code}}, ...]}, ...]
            In such DEEP stage, Don't try to assign the value to a variable
            It will not deeply cloned
            Like, let response = singleSemester.course // It will not copy full data to response var
            Always return & edit the same var that you getting directly, here such type of var is 'singleSemester'
          */
          delete singleSemester['courses'];
          // console.log('Before => ', singleSemester);
          singleSemester.courses = resCourseUpdated.courses;
          // console.log('After => ', singleSemester);
          return singleSemester;
        } else {
          return singleSemester;
        }
      });
      return {
        ...state,
        semesterArray: withNewUpdatedCourse
      };
    default:
      return state;
  }
}
