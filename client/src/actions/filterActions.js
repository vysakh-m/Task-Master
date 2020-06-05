import axios from "axios";
import { LIST_TASK, SELECT_FILTER, EXIT_FILTER } from "./types";
import { listLoading } from "./listActions";
export const applyFilter = (data) => (dispatch) => {
  dispatch(listLoading());
  axios.post("/list/filter", data).then((payload) => {
    dispatch({
      type: LIST_TASK,
      payload,
    });
  });
};

export const selectFilter = () => {
  return {
    type: SELECT_FILTER,
  };
};

export const exitFilter = () => {
  return {
    type: EXIT_FILTER,
  };
};
