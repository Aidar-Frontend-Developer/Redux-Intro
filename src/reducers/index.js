import { combineReducers } from "redux";
import { ADD_COMMENT } from "../actions/commentsTypes";

// REDUCERS FOR COMMENT
const commentator = (state = { count: 0, comments: [] }, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        count: state.count + 1,
        comments: [...state.comments, action.payload]
      };
    default:
      return state;
  }
};

// REDUCERS FOR USERS
const users = (state = { count: 0, record: [] }, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        count: state.count + 1,
        record: [...state.record, action.payload]
      };
    default:
      return state;
  }
};

export default combineReducers({
  commentator,
  users
});

export const getCommentsCount = state => state.commentator.count;
export const getCommentsList = state => state.commentator.comments;
export const getRecords = state => state.users.record;
