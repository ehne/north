import {Card,Text} from "bumbag"
export default function Events(props) {
    const items = props.events;
    console.log(items);
  
    const generated = items.map((i) => (
      <Card>
         yay
      </Card>
    ));
    return generated
}