import {Card,Text, Stack, Badge, Box, Tag, Heading} from "bumbag"

export default function Events(props) {
    const items = props.events;
    //console.log(items);
    
    const generated = items.map((i) => (
      <Box marginBottom="major-1">
          
        <Text><Tag>{i.title}</Tag> <Text use="strong">{i.location}</Text> {i.date.toLocaleString()}  </Text>
      </Box>
    ));
    return (
        generated
      
    )
}