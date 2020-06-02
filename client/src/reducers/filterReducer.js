import { SELECT_FILTER } from "../actions/types";


const initialState = {
  select: false,
  confirm:false,
  data: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SELECT_FILTER:
      return{
        ...state,
        select:true
      }
    default:
      return state;
  }
}