import { SELECT_FILTER, EXIT_FILTER } from "../actions/types";

const initialState = {
  select: false,
  confirm: false,
  data: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_FILTER:
      return {
        ...state,
        select: true,
      };
    case EXIT_FILTER:
      return {
        ...state,
        select: false,
      };
    default:
      return state;
  }
}
