import axios from "axios";
import { LIST_LOADING, LIST_TASK, GET_ERRORS } from "./types";

export const getList = (from) => (dispatch) => {
  dispatch(listLoading());
  if (from === "home") {
    axios.get("/list/view").then((payload) => {
      dispatch({
        type: LIST_TASK,
        payload,
      });
    });
  } else if (from === "archive") {
    axios.get("/list/view-archive").then((payload) => {
      dispatch({
        type: LIST_TASK,
        payload,
      });
    });
  }
};

export const listLoading = () => {
  return {
    type: LIST_LOADING,
  };
};

export const addTaskData = (taskData) => (dispatch) => {
  axios
    .post("/list/add", taskData)
    .then((data) => dispatch(getList("home")))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const deleteTask = (id, from) => (dispatch) => {
  axios
    .delete(`/list/delete/${id}`)
    .then((data) => dispatch(getList(from)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const moveToArchive = (id, from) => (dispatch) => {
  axios
    .post(`/list/archive/${id}`)
    .then((data) => dispatch(getList(from)))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
