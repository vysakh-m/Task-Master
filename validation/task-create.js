const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTaskRegistration(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.label = !isEmpty(data.label) ? data.label : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.priority = !isEmpty(data.priority) ? data.priority : "";
  data.date = !isEmpty(data.date) ? data.date : "";
  data.time = !isEmpty(data.time) ? data.time : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Required";
  }
  if (data.label === "Set Label" || Validator.isEmpty(data.label)) {
    errors.label = "Label field is required";
  }

  if (data.status === "Set Status" || Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (data.priority === "Set Priority" || Validator.isEmpty(data.priority)) {
    errors.priority = "Priority field is required";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Date field is required";
  }

  if (Validator.isEmpty(data.time)) {
    errors.time = "Time field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
