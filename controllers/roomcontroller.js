const room = require("../models/rooms");

const create = async (req, res, next) => {
  try {
    const { room_name } = req.body;
      await room
        .findOne({ name: room_name })
        .exec()
        .then(async (data) => {
          if (data) {
            res.render('room',{ err: true, msg: 'Room Exists'});
          } else {
            let roomData = new room({
              name: room_name,
              active_users: 1
            });
            let savedData = await roomData.save();
            res.render('chat',{ err: true, msg: 'Room Created Successfully', data:savedData});
          }
        })
        .catch((err) => {
          console.log(err);
          res.render('room',{ err: true, msg: 'Something Went Wrong'});
        });
  } catch (error) {
    console.log(error);
    res.render('room',{ err: true, msg: 'Something Went Wrong'});
  }
};

module.exports = {
  create: create
};
