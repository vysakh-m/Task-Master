import axios from 'axios'
import {LIST_LOADING,LIST_TASK,GET_ERRORS} from './types'

export const getList = () => dispatch =>{
  dispatch(listLoading());
  axios.get('/list/view')
  .then(payload=>{
    dispatch({
      type:LIST_TASK,
      payload
    })
  })

}

export const listLoading = () =>{
  return{
    type: LIST_LOADING
  }
}

export const addTaskData = (taskData) =>dispatch=>{
  axios.post('/list/add',taskData)
  .then(data=>dispatch(getList()))
  .catch(err=>
    dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}

export const deleteTask=(id)=>dispatch=>{
  axios.delete(`/list/delete/${id}`)
  .then(data=>dispatch(getList()))
  .catch(err=>
    dispatch({
    type: GET_ERRORS,
    payload: err.response.data
  }))
}