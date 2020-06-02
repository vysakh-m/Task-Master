const express = require("express");
const router = express();
const passport = require("passport");
const moment = require("moment");

const User = require("../models/user");
const List = require("../models/lists");

const validateTaskRegistration = require("../validation/task-create");
const isEmpty = require("../validation/is-empty");

router.get(
  "/view",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    List.find({ email: req.user.email })
      .then((list) => {
        if (list) {
          var notComplete = list[0].data.filter((item) => {
            return item.status !== "Completed";
          });
          return res.json(notComplete);
        } else {
          return res.json({});
        }
      })
      .catch((err) => res.json({}));
  }
);

router.get(
  "/view-archive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    List.find({ email: req.user.email })
      .then((list) => {
        if (list) {
          var notComplete = list[0].data.filter((item) => {
            return item.status === "Completed";
          });
          return res.json(notComplete);
        } else {
          return res.json({});
        }
      })
      .catch((err) => res.json({}));
  }
);

router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTaskRegistration(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newData = {
      name: req.body.name,
      label: req.body.label,
      status: req.body.status,
      priority: req.body.priority,
      date: req.body.date,
      time: req.body.time,
    };

    List.findOne({ email: req.user.email }).then((list) => {
      if (list) {
        list.data.unshift(newData);
        List.updateOne(
          { email: req.user.email },
          { data: list.data },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        return res.json(list.data);
      } else {
        const newValue = new List({
          email: req.user.email,
          data: [newData],
        });
        newValue
          .save()
          .then((data) => res.json(data))
          .catch((err) => console.log(err));
      }
    });
  }
);

router.post(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newData = {
      name: req.body.name,
      label: req.body.label,
      status: req.body.status,
      priority: req.body.priority,
      date: req.body.date,
      time: req.body.time,
    };

    List.findOne({ email: req.user.email }).then((list) => {
      if (list) {
        for (var i = 0; i < list.data.length; i++) {
          if (list.data[i]._id == req.body.id) {
            newData._id = req.body.id;
            list.data[i] = newData;
          }
        }
        List.updateOne(
          { email: req.user.email },
          { data: list.data },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        return res.json(list.data);
      } else {
        return res.json({
          status: "User not found",
        });
      }
    });
  }
);
router.post(
  "/filter",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //labels
    const label_object = {
      Personal: req.body.personal,
      Work: req.body.work,
      Shopping: req.body.shopping,
      Others: req.body.others,
    };

    //priority
    const priority_object = {
      High: req.body.high,
      Medium: req.body.medium,
      Low: req.body.low,
    };

    const removeFalseElements = (object) => {
      Object.keys(object).forEach((key) =>
        object[key] === undefined || object[key] === '' || object[key] === false ? delete object[key] : {}
      );
    };

    removeFalseElements(label_object);
    removeFalseElements(priority_object);


    //date
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;
    //time
    const start_time = req.body.start_time;
    const end_time = req.body.end_time;

    //filter arrays




    function isLabelPresent(item) {
      return item.label in label_object;
    }

    function isPriorityPresent(item) {
      return item.priority in priority_object;
    }


    Date.prototype.addDays = function (days) {
      var date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };

    function getDates(startDate, stopDate) {
      var dateArray = new Array();
      var currentDate = startDate;
      while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
      }
      return dateArray;
    }

    function isAllKeyFalse(object) {
      var flag = 0;
      for (const property in object) {
        if (isEmpty(object)) {
          return true;
        } else {
          return false;
        }
      }
    }

    List.find({ email: req.user.email })
      .then((list) => {
        console.log("=============================================")
        if (list) {
          var finalFilter = [];
          listData = list[0].data;

          finalFilter = listData;


          console.log("INITIAL")

          console.log(finalFilter.length)


          if (isAllKeyFalse(label_object)!=undefined ) {
            finalFilter = finalFilter.filter(isLabelPresent);
          }

          console.log("LABEL")
          console.log(finalFilter.length)

          if (isAllKeyFalse(priority_object)!=undefined) {
            finalFilter = finalFilter.filter(isPriorityPresent);
          }

          console.log("PRIORITY")

          console.log(finalFilter.length)



          //date filter not empty condition


          if (!isEmpty(start_date) && !isEmpty(end_date)) {

            var start_parts = start_date.split("-");
            var end_parts = end_date.split("-");
            var s_date = new Date(
              start_parts[0],
              start_parts[1] - 1,
              start_parts[2]
            );
            var e_date = new Date(
              end_parts[0],
              end_parts[1] - 1,
              end_parts[2]
            );


            const arr = getDates(s_date, e_date);
            const clean_date = arr.map(function (item) {
              return moment(item).format("DD-MM-YYYY");
            });

            var dateFiltered = [];
            finalFilter.forEach(function (item) {
              clean_date.forEach(function (date_item) {
                if (item.date === date_item) {
                  dateFiltered.push(item);
                }
              });
            });
            finalFilter=dateFiltered;
          }else if(!isEmpty(start_date) && isEmpty(end_date) ){
            console.log("IF ELSE")
            var end_date_local = new Date();
            var end_d = end_date_local.toISOString().substring(0, 10);
            var start_parts = start_date.split("-");
            var end_parts = end_d.split("-");



            var s_date = new Date(
              start_parts[0],
              start_parts[1] - 1,
              start_parts[2]
            );
            
            var e_date = new Date(
              end_parts[0],
              end_parts[1] - 1,
              end_parts[2]
            );



            const arr = getDates(s_date, e_date);
            const clean_date = arr.map(function (item) {
              return moment(item).format("DD-MM-YYYY");
            });

            console.log(clean_date)
            var dateFiltered = [];
            finalFilter.forEach(function (item) {
              clean_date.forEach(function (date_item) {
                if (item.date === date_item) {
                  dateFiltered.push(item);
                }
              });
            });
            finalFilter=dateFiltered;
            console.log(finalFilter)
          }
          console.log("DATE")
          
          console.log(finalFilter.length)

          //time filtering


          if (!isEmpty(start_time) && !isEmpty(end_time)){
            const format = "hh:mm";
            const beforeTime = moment(start_time, format);
            const afterTime = moment(end_time, format);
            var timeFiltered = [];
            finalFilter.forEach(function (item) {
              var time = moment(item.time, format);
              if (time.isBetween(beforeTime, afterTime)) {
                timeFiltered.push(item);
              }
            });
            finalFilter=timeFiltered;
          }
          
          


          console.log("TIME")

          console.log(finalFilter.length)
          return res.json(finalFilter)
        }
      })

      .catch((err) => res.status(400).json({}));
    }) 
  

router.post(
  "/archive",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    List.findOne({ email: req.user.email }).then((list) => {
      if (list) {
        for (var i = 0; i < list.data.length; i++) {
          if (list.data[i]._id == req.body.id) {
            list.data[i].status = "Completed";
          }
        }
        List.updateOne(
          { email: req.user.email },
          { data: list.data },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        return res.json(list.data);
      } else {
        return res.json({
          status: "User not found",
        });
      }
    });
  }
);

router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    List.findOne({ email: req.user.email }).then((list) => {
      if (list) {
        var index;
        for (var i = 0; i < list.data.length; i++) {
          if (list.data[i]._id == req.params.id) {
            index = i;
          }
        }
        list.data.splice(index, 1);
        List.updateOne(
          { email: req.user.email },
          { data: list.data },
          (err, result) => {
            if (err) {
              console.log(err);
            }
          }
        );
        return res.json(list.data);
      } else {
        return res.json({
          status: "User not found",
        });
      }
    });
  }
);

module.exports = router;
