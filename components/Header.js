import { TopNav, Modal, Dialog, Button,Paragraph,Text } from 'bumbag'
import DarkModeToggle from "./darkModeToggle"

export default function Header() {
    return(
       <TopNav>
           <TopNav.Section>
            
        </TopNav.Section>
           <TopNav.Section paddingY="major-2" paddingX="major-1">
               <TopNav.Item paddingX="major-1">
               <Modal.State>
                <Dialog.Modal title="North Settings" type="warning" showActionButtons>
                    <Paragraph>
                        <Text use="strong">North</Text> requires the use of your compass calendar.
                    </Paragraph>
                    <Paragraph>
                        To 
                    </Paragraph>
                </Dialog.Modal>
                <Modal.Disclosure use={Button}>
                    Setup
                </Modal.Disclosure>
                </Modal.State>
               </TopNav.Item>
                <TopNav.Item>
                {/* <DarkModeToggle></DarkModeToggle> */}
                </TopNav.Item>
                
            </TopNav.Section>
       </TopNav>  
    )
}