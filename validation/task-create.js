const Validator = require('validator');
const moment = require('moment');
const isEmpty = require('./is-empty');


const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
const yyyy = today.getFullYear();

const date = dd + '-' + mm + '-' + yyyy;
const date1 = dd + '/' + mm + '/' + yyyy;


var now = new moment();
const time=now.format("HH:mm")


module.exports = function validateTaskRegistration(data) {
  let errors = {};
  // var data.date = data.date.slice(0);
  // console.log(data.date)
  // data.date=data.date.slice(8,10) + '-' + data.date.slice(5,7) + '-' + data.date.slice(0,4)

  var date_clone = data.date.repeat(1)
  var date_clone1 = data.date.repeat(1)

  data.name = !isEmpty(data.name) ? data.name : '';
  data.label = !isEmpty(data.label) ? data.label : '';
  data.status = !isEmpty(data.status) ? data.status : '';
  data.priority = !isEmpty(data.priority) ? data.priority : '';
  data.date = !isEmpty(data.date) ? data.date : '';
  data.time = !isEmpty(data.time) ? data.time : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Required';
  }
  if(data.label==='Set Label' || Validator.isEmpty(data.label)){
    errors.label = 'Label field is required';
  }

  if(data.status==='Set Status' || Validator.isEmpty(data.status)){
    errors.status = 'Status field is required';
  }
  if(data.priority==='Set Priority' || Validator.isEmpty(data.priority)){
    errors.priority = 'Priority field is required';
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = 'Date field is required';
  }


  if (Validator.isEmpty(data.time)) {
    errors.time = 'Time field is required';
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
