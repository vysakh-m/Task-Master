import { LIST_LOADING, LIST_TASK, EDIT_DATA } from "../actions/types";

const initialState = {
  loading: false,
  listData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case LIST_TASK:
      return {
        ...state,
        loading: false,
        listData: action.payload,
      };
    default:
      return state;
  }
}
