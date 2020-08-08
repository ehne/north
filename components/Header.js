import {
  TopNav,
  Modal,
  Dialog,
  Button,
  Paragraph,
  Text,
  Image,
  Disclosure,
  FieldWrapper,
  Input,
  Link} from "bumbag";
import DarkModeToggle from "./darkModeToggle";
import About from "./About"
import { useFormik } from "formik";
import Cookies from 'js-cookie'
import {SettingsIcon} from '@primer/octicons-react'


export default function Header() {
    
  const formik = useFormik({
    initialValues: {
      compassURL: Cookies.get("compassURL"),
    },
    onSubmit: (values) => {
      Cookies.set("compassURL",values["compassURL"]);
      alert("saved");
    },
  });
  return (
    <TopNav paddingY="major-2">
      <TopNav.Section>
          {/* <TopNav.Item>
            <Text use="h1" use="emphasis" paddingLeft="major-2">North</Text>
          </TopNav.Item> */}
      </TopNav.Section>
      <TopNav.Section  paddingX="major-1">
          <TopNav.Item paddingRight="major-1"><About></About></TopNav.Item>
        <TopNav.Item paddingRight="major-1">
          <Modal.State>
            <Dialog.Modal
              title="North Settings"
              type="warning"
              showActionButtons
              actionButtonsProps={{
                onClickSubmit: formik.handleSubmit,
                cancelText:"Close",
                submitText:"Save"
              }}
            >
              <Paragraph>
                <Text use="strong">North</Text> requires the use of your compass
                calendar.
              </Paragraph>
              <Paragraph>
                To get the url of your compass calendar, go to compass. Click
                Settings{">"}Sync my schedule. And copy the value in the green
                box at the bottom of the page.
                <Disclosure.State>
                  <Disclosure paddingLeft="minor-1">
                    <Link> Show Image Instructions</Link>
                  </Disclosure>
                  <Disclosure.Content>
                    <Image src="./images/setup1.png" width="100%" />
                    <Image src="./images/setup2.png" width="100%" />
                  </Disclosure.Content>
                </Disclosure.State>
              </Paragraph>
              <Paragraph>
                  Note: you might have to press the "Reset Private Schedule" link at the top of your compass page if there is no calendar link in the green box.
              </Paragraph>
              <FieldWrapper label="Compass Calendar Link">
              
                <Input
                id="compassURL"
                         name="compassURL"
                  onChange={formik.handleChange}
                  value={formik.values.compassURL}
                />
              </FieldWrapper>
            </Dialog.Modal>

            <Modal.Disclosure {...Button.useProps({size:"small"})}><SettingsIcon /><Text paddingLeft="minor-1">Setup</Text></Modal.Disclosure>
          </Modal.State>
        </TopNav.Item>
        <TopNav.Item paddingRight="major-1"><DarkModeToggle></DarkModeToggle></TopNav.Item>
      </TopNav.Section>

    </TopNav>
  );
}
