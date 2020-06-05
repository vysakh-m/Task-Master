import { EDIT_DATA,EDIT_CONFIRM,CLOSE_MODEL } from "../actions/types";

const initialState = {
  show: false,
  editData: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case EDIT_DATA:
      return {
        
        ...state,
        show: true,
        editData:action.payload
      };
    case EDIT_CONFIRM:
      return {
        ...state,
        show:false,
        editData:{}
      }
    case CLOSE_MODEL:
      return {
        ...state,
        show:false,
        editData:{}
      }
    default:
      return state;
  }
}
