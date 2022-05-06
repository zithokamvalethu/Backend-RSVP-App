const express = require("express");
const app = express();
const guestList = require("./model/index");
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

const cors = require("cors");
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => console.log('("i am connected to mangoDB")'))
  .catch((err) => console.log(err));

app.get("/invites/", async (req, res) => {
  try {
    const invites = await guestList.find();
    // console.log("invites", invites);
    res.send(invites);
  } catch (error) {
    console.log("error", error);
  }
});
app.get("invites/:id", async (req, res) => {
  const { id } = req.params;
  const { name, surname, cuisines, time, attendance } = req.body;
  try {
    const attendanceList = await guestList.findOneAndUpdate(
      { _id: `${id}` },
      { name, surname, cuisines, time, attendance }
    );
    res.send(attendanceList);
  } catch (error) {
    console.log("error", error);
  }
});

app.post("/invites", async (req, res) => {
  try {
    const { name, surname, cuisines, time, attendance } = req.body;
    if (
      name == "" ||
      surname == "" ||
      cuisines == [""] ||
      time === Number ||
      attendance == Boolean
    ) {
      return res.send(400);
    }
    const invites = new guestList({
      name,
      surname,
      cuisines,
      time,
      attendance,
    });
    // console.log("invites", invites);
    // res.send(invites);
    const value = await invites.save();
    console.log("value", value);
    res.send(value);
  } catch (error) {
    res.send(404);
  }
});

app.put("/edit_invites/:id", async (req, res) => {
  const { id } = req.params;
  const { cuisines, time, attendance } = req.body;
  try {
    const attendanceList = await guestList.findOneAndUpdate(
      { _id: `${id}` },
      { cuisines, time, attendance }
    );
    res.send(attendanceList);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete_invites/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const guestAttendance = await guestList.deleteOne({ _id: id });
    res.send(guestAttendance);
  } catch (err) {
    console.log(err);
    res.send(501);
  }
});

app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + process.env.PORT);
});
