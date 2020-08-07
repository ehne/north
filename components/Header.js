import { TopNav } from 'bumbag'
import DarkModeToggle from "./darkModeToggle"

export default function Header() {
    return(
       <TopNav>
           <TopNav.Section>
            
        </TopNav.Section>
           <TopNav.Section padding="major-2">
                <TopNav.Item>
                <DarkModeToggle></DarkModeToggle>
                </TopNav.Item>

            </TopNav.Section>
       </TopNav>  
    )
}