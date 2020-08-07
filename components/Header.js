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
  Link,
Icon} from "bumbag";
import DarkModeToggle from "./darkModeToggle";
import { useFormik } from "formik";
import Cookies from 'js-cookie'
import {BeakerIcon} from '@primer/octicons-react'


export default function Header() {
    var visi = false
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
    <TopNav>
      <TopNav.Section></TopNav.Section>
      <TopNav.Section paddingY="major-2" paddingX="major-1">
        <TopNav.Item paddingX="major-1">
          <Modal.State>
            <Dialog.Modal
              title="North Settings"
              type="warning"
              showActionButtons
              actionButtonsProps={{
                onClickSubmit: formik.handleSubmit,
                cancelText:"Close"
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
                    <Link use="Button"> Show Image Instructions</Link>
                  </Disclosure>
                  <Disclosure.Content>
                    <Image src="./images/setup1.png" width="100%" />
                    <Image src="./images/setup2.png" width="100%" />
                  </Disclosure.Content>
                </Disclosure.State>
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
            <Modal.Disclosure {...Button.useProps({size:"small"})}>Setup</Modal.Disclosure>
          </Modal.State>
        </TopNav.Item>
        <TopNav.Item>{/* <DarkModeToggle></DarkModeToggle> */}</TopNav.Item>
      </TopNav.Section>

    </TopNav>
  );
}
