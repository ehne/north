import {
  Box,
  Button,
  Container,
  Alert,
  Text,
  Stack,
  Heading,
  useColorMode,
  Set,
  List,
  Card
} from "bumbag";
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
import ReactList from "react-list";

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

async function getData(comp, pageNo ) {
  comp.setState({ loading: true });
  await axios
    .get(convertWebcalToHttp(`${Cookies.get("compassURL")}`), {
      cancelToken: new axios.CancelToken(function executor(c) {
          comp.cancel = c
      })
  })
    .then(function (response) {
      // SPLITS THE LONG TEXT DOCUMENT INTO USABLE CHUNKS

      //YAY! we got it bois!
      // handle success
      var lines = response.data.split("\n");
      //console.log(lines)
      
      var events = [];
      var events_i = 0;

      //16 lines for one event
/*       BEGIN:VCALENDAR
      PRODID: -//JDLF Intl//Compass Calendar MIMEDIR//EN
      VERSION:2.0
      CALSCALE:GREGORIAN
      METHOD:PUBLISH
      X-WR-CALNAME:Compass ScheduleLUG0001
      X-WR-TIMEZONE:UTC
      X-WR-CALDESC: Your Compass School Manager Internet Calendar
   */    
      console.log(lines)
      let numberOfEvents = (lines.length-9-1)/14
      console.log(numberOfEvents)
      comp.setState({noOfEvents:numberOfEvents})
//  i < (numberOfEvents/4)*pageNo
      for (let i = 8; events_i <= (numberOfEvents/4)*pageNo; i++) {
        //console.log(lines[i])
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
        } else if (lines[i].includes("DESCRIPTION")) {
          // this one just gets the Staff
          var staff = lines[i].split(":");
          events[events_i]["staff"] = staff[2].replace(" ", "");
        } else if (lines[i].includes("END:VEVENT")) {
          // sees that the specific event has ended and moves to the next one.
          events_i++;
        }
      }
      //console.log(response.data)
      return events;
    })
    .catch((error) => {
      let numberOfEvents = 1
      console.log(numberOfEvents)
      comp.setState({noOfEvents:numberOfEvents})
      return ([{
        date: "20201110T040000Z",
        title: "Error",
        location: 'Please press "Setup"',
        staff: "Error",
      }])
    })
    .then(function (events) {
      // CONVERTS YUCKY ICS FORMAT DATES INTO UTC JS DATE OBJECTS.

      //console.log(events);
      for (let i = 0; i < events.length; i++) {
        events[i]["date"] = converticsDatetoDate(events[i]["date"]);
      }
      // sorts the dates into the correct order, as opposed to whatever was going on before
      events.sort((a, b) => a["date"] - b["date"]);
      comp.setState({ e: events, 
          loading: false, 
          highestLoadedPage: pageNo,
          pageToLoadNext: pageNo+1 });
      console.log(comp.state);
    });
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noOfEvents:0,
      e: [],
      loading: true,
      highestLoadedPage:0,
      pageToLoadNext:1,
      compassURL:Cookies.get("compassURL")   
    };
    this.cancel = null
  }

  componentDidMount() {
    this.reload();
  }

  componentWillUnMount() {
      this.cancel()
  }

  reload = () => {
    var comp = this;
    getData(comp,comp.state.pageToLoadNext);
  }

  ReloadButton(props) {
    if (props.s.loading == true) {
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
      return null;
    }
  }
  renderItem = (index, key) => {
    var event = this.state.e[index]
    if (index ==this.state.e.length-1 && index!=this.state.noOfEvents-1){
        if (!this.state.loading){
          return(
            <>
            <Events event={event} key={key}></Events>
            <Set isFilled orientation="vertical" paddingTop="major-2">
              <Button onClick={this.reload} >Reload</Button>
            </Set>
            </>
          )
        } else{
          return(
            <>
            <Events event={event} key={key}></Events>
            <Set isFilled orientation="vertical" paddingTop="major-2">
              <Button isLoading >Reload</Button>
            </Set>
            </>
          )
        }
        
      
    } else{
      return (
        <Events event={event} key={key}></Events>
      );  
    }
    
  }
  MainContent = (props) =>{
    console.log(Cookies.get("compassURL"))
    if (Cookies.get("compassURL") != undefined) {
      return (
        <ReactList
          itemRenderer={this.renderItem}
          length={this.state.e.length}
          type="simple"
        />
      );
    } else {
      return (
        null
      );
  }}
  render() {
    
    return (
      <>
        <Header></Header>
        <Container breakpoint="tablet">
          <Container isFluid paddingTop="major-10" paddingBottom="major-2">
            <Stack>
              <this.ReloadButton s={this.state}></this.ReloadButton>
            </Stack>

            <Heading>North</Heading>
           
            <Stack width="100%">
            <Alert
                        title="An error occurred"
                        type="danger"
                        variant="tint"
                        display={this.state.compassURL != undefined?'none':''}
                      >
                        You haven't connected your Compass calendar to North.
                        Please press the "Setup" button in the top right hand
                        corner to fix this problem.
                      </Alert>
              
              <this.MainContent></this.MainContent>
              
            </Stack>
          </Container>
        </Container>
      </>
    );
  }
}

export default Main;
