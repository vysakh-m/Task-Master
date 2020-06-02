import axios from 'axios'
import {LIST_TASK} from './types'
import {listLoading} from './listActions'
export const applyFilter=(data)=>dispatch=>{
  dispatch(listLoading());
  axios.post('/list/filter',data)
  .then(payload=>{
    dispatch({
      type:LIST_TASK,
      payload
    })
  })
}