import axios from "axios";
import { EDIT_DATA,GET_ERRORS,EDIT_CONFIRM,CLOSE_MODEL } from "./types";
import {getList} from './listActions'

export const editModal = (data) => (dispatch) => {
  dispatch({
    type: EDIT_DATA,
    payload: data,
  });
};

export const editSubmit = (taskData) => (dispatch) => {
  console.log(taskData)
  axios
    .post("/list/edit", taskData)
    .then((data) =>{
      dispatch({
        type:EDIT_CONFIRM
      })
      dispatch(getList("home"))

    } )
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const closeModel=()=>(dispatch)=>{
  dispatch({
    type: CLOSE_MODEL,
    payload: {},
  })
}