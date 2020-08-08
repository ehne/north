import { Stack } from "bumbag";
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Events from "./Events";
function convertWebcalToHttp(_input) {
  return _input.replace("webcal://", "https://");
}

function converticsDatetoDate(_icsDate) {
  // Convert times to iCalendar format. They require a block for yyyymmdd and then another block
  // for the time, which is in hhiiss. Both of those blocks are separated by a "T". The Z is
  // declared at the end for UTC time, but shouldn't be included in the date conversion.

  // iCal date format: yyyymmddThhiissZ
  // iCal dates are based off UTC time lol...

  var cleanedArray = _icsDate.replace("Z", "").split("T");

  let date = cleanedArray[0];
  let time = cleanedArray[1];
  //console.log(time);
  let od = {
    year: date.slice(0, 4),
    month: parseInt(date.slice(4, 6)) - 1,
    day: date.slice(6, 8),
    hour: time.slice(0, 2),
    minute: time.slice(2, 4),
    second: time.slice(4, 6),
  };
  //console.log(outputData)
  //console.log(new Date(`${od.day} ${months[od.month]} ${od.year} ${od.hour}:${od.minute}:${od.second} UTC`).toLocaleString())

  return new Date(
    `${od.day} ${months[od.month]} ${od.year} ${od.hour}:${od.minute}:${
      od.second
    } UTC`
  );
}

function getData(comp) {
  axios
    .get(convertWebcalToHttp(Cookies.get("compassURL")))
    .then(function (response) {
      // SPLITS THE LONG TEXT DOCUMENT INTO USABLE CHUNKS

      //YAY! we got it bois!
      // handle success
      var lines = response.data.split("\n");
      //console.log(lines)
      var events = [];
      var events_i = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes("DTSTART")) {
            // this one gets the start time of the event
            var date = lines[i].split(":");
            events[events_i] = { date: date[1] };

        } else if (lines[i].includes("SUMMARY")) {
            // this one basically just gets the title of the event
            var title = lines[i].split(":");
            events[events_i]["title"] = title[1];

        } else if (lines[i].includes("LOCATION")) {
            // this one just gets the Location/room of the event
            var location = lines[i].split(":");
            events[events_i]["location"] = location[1];

        } else if (lines[i].includes("END:VEVENT")) {
            // sees that the specific event has ended and moves to the next one.
            events_i++;
        }
      }
      return events;
    })
    .then(function (events) {
      // CONVERTS YUCKY ICS FORMAT DATES INTO UTC JS DATE OBJECTS.

      //console.log(events);
      for (let i = 0; i < events.length; i++) {
        events[i]["date"] = converticsDatetoDate(events[i]["date"]);
      }
      // sorts the dates into the correct order, as opposed to whatever was going on before
      events.sort((a, b) => a["date"] - b["date"]);
      comp.setState({ e: events });
    });
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      e: [],
    };
  }

  componentDidMount() {
    //var events = [];
    var comp = this;
    //getData(comp);

    // console.log(events)
  }

  changeEvents = (events) => {
    this.setState({ e: events });
  };

  render() {
    return (
      <Stack spcaing="minor-1">
        <Events events={this.state.e}></Events>
      </Stack>
    );
  }
}

export default Main;
