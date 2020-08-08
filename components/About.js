import {
    Stack,
    Text,
    Paragram,
    Dialog,
    Modal,
    Button
  } from "bumbag";
import {QuestionIcon} from '@primer/octicons-react'

export default function About() {
    return(
      <Modal.State>
        <Dialog.Modal
          title="About"
          showCloseButton
        >
          Hello
          
            
        </Dialog.Modal>

        <Modal.Disclosure {...Button.useProps({size:"small"})}><Text>About</Text></Modal.Disclosure>
    </Modal.State>

    )
}