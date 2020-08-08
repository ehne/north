import {Card,Text, Heading, Badge, Box} from "bumbag"

export default function Events(props) {
    const items = props.events;
    //console.log(items);
  
    const generated = items.map((i) => (
      <Box>
         <Text>{i.title} • {i.location} • {i.date.toLocaleString()}  </Text>
      </Box>
    ));
    return generated
}