import axios from 'axios'
import {LIST_LOADING,LIST_TASK} from './types'

export const getList = () => dispatch =>{
  dispatch(listLoading());
  axios.get('list/view')
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