import axios from 'axios'
import {SELECT_FILTER} from './types'
export const selectFilter=()=>{
  return{
    type:SELECT_FILTER
  }
}