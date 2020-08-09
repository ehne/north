import {Card,Text, Set, Badge, Box, Tag, Heading, Group} from "bumbag"

export default function Events(props) {
    var i = props.event
    return (
      <Set marginBottom="major-1" spacing="major-1" width="100%">
        <Group><Tag variant="tint">{i.title}</Tag> <Tag palette="secondary">{i.staff}</Tag></Group>
        <Text> <Text use="strong">{i.location}</Text> {i.date.toLocaleString()}  </Text>
      </Set>
      
    )
}