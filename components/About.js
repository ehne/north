import {
    Stack,
    Text,
    Paragraph,
    Dialog,
    Modal,
    Button,
    List,
    Navigation,
    Link,
    Set
  } from "bumbag";
import {QuestionIcon, MarkGithubIcon, SmileyIcon} from '@primer/octicons-react'

export default function About() {
    return(
      <Modal.State>
        <Dialog.Modal
          title="About"
          showCloseButton
        >
          <Paragraph>
            North was made by darcylf during the 2020 Covid-19 Melbourne Lockdown.
          </Paragraph>  
          <Set spacing="major-1" isFilled>
          <Button use="a" href="https://darcylf.me" variant="ghost" palette="primary"><SmileyIcon/><Text paddingLeft="major-1">darcylf.me</Text></Button>

                <Button use="a" href="https://github.com/ehne/north" variant="ghost" palette="primary"><MarkGithubIcon/><Text paddingLeft="major-1">Github</Text></Button>

          </Set>
      
        </Dialog.Modal>

        <Modal.Disclosure {...Button.useProps({size:"small"})}><Text>About</Text></Modal.Disclosure>
    </Modal.State>

    )
}