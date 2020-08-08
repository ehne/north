import Head from 'next/head'
import { Provider as BumbagProvider, Button, Icon, Container} from 'bumbag';
import DarkModeToggle from "../components/darkModeToggle"
import Header from "../components/Header"

import Main from "../components/Main"

const theme = {

};

export default function Home() {
  return (
    <BumbagProvider theme={theme}>
      <Head>
        <title>North | darcylf.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Main></Main>
      
      
    </BumbagProvider>
  )
}
