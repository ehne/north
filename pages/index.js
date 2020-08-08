import Head from 'next/head'
import { Provider as BumbagProvider, Button, Icon, Container, useColorMode, PageContent} from 'bumbag';
import DarkModeToggle from "../components/darkModeToggle"
import Header from "../components/Header"

import Main from "../components/Main"

const theme = {

};

export default function Home() {
  const { colorMode } = useColorMode();
  return (
    <BumbagProvider theme={theme}>
      <Head>
        <title>North | darcylf.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head><Main></Main>

      
      
      
    </BumbagProvider>
  )
}
