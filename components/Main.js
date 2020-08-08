import { Box, Button, Container, Alert, Text, Stack, Heading, useColorMode } from "bumbag";
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
import Header from "./Header";
import { SyncIcon } from "@primer/octicons-react";

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
  comp.setState({ loading: true });
  axios
    .get(convertWebcalToHttp(`${Cookies.get("compassURL")}`))
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
    .catch((error) => [
      {
        date: "20201110T040000Z",
        title: "Error",
        location: 'Please press "Setup"',
      },
    ])
    .then(function (events) {
      // CONVERTS YUCKY ICS FORMAT DATES INTO UTC JS DATE OBJECTS.

      //console.log(events);
      for (let i = 0; i < events.length; i++) {
        events[i]["date"] = converticsDatetoDate(events[i]["date"]);
      }
      // sorts the dates into the correct order, as opposed to whatever was going on before
      events.sort((a, b) => a["date"] - b["date"]);
      comp.setState({ e: events, loading: false });
      console.log(comp.state)
    });
}


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      e: [],
      loading: false,
    };
    
  }

  componentDidMount() {
    this.reload();
  }

  reload() {
    var comp = this;
    getData(comp);
    
  }

  ReloadButton (props){
    if (props.s.loading==true) {
      return (
        <Button
          isLoading
          size="small"
          position="fixed"
          left="major-2"
          top="major-3"
          variant="ghost"

        >
          <SyncIcon />
        </Button>
      );
    } else {
      return (
        null
      );
    }
  }
  render() {
    return (
      <>
        <Header ></Header>
        <Container breakpoint="tablet">
          <Container isFluid paddingTop="major-10" paddingBottom="major-2">
            <Stack >
            <this.ReloadButton s={this.state}></this.ReloadButton>
            </Stack>
            

            <Heading>North</Heading>
            <Box>
              {() => {
                if (Cookies.get("compassURL") != undefined) {
                  return (
                    <Events events={this.state.e} spacing="major-2"></Events>
                  );
                } else {
                  return (
                    <Alert
                      title="An error occurred"
                      type="danger"
                      variant="tint"
                    >
                      You haven't connected your Compass calendar to North.
                      Please press the "Setup" button in the top right hand
                      corner to fix this problem.
                    </Alert>
                  );
                }
              }}
            </Box>
          </Container>
        </Container>
      </>
    );
  }
}

export default Main;
