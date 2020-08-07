import Head from 'next/head'
import { Provider as BumbagProvider, Button, Icon} from 'bumbag';
import DarkModeToggle from "../components/darkModeToggle"
import Header from "../components/Header"
const theme = {
  Icon: {
    icons: {
      calendar: {
        viewBoxWidth: 16,
        viewBoxHeight: 16,
        paths: ['M11 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1s-1 .4-1 1v1c0 .5.4 1 1 1zm3-2h-1v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H6v1c0 1.1-.9 2-2 2s-2-.9-2-2V1H1c-.6 0-1 .5-1 1v12c0 .6.4 1 1 1h13c.6 0 1-.4 1-1V2c0-.6-.5-1-1-1zM5 13H2v-3h3v3zm0-4H2V6h3v3zm4 4H6v-3h3v3zm0-4H6V6h3v3zm4 4h-3v-3h3v3zm0-4h-3V6h3v3zM4 3c.6 0 1-.5 1-1V1c0-.6-.4-1-1-1S3 .4 3 1v1c0 .5.4 1 1 1z']
      }
    }
  }
};

export default function Home() {
  return (
    <BumbagProvider theme={theme}>
      <Head>
        <title>north | darcylf.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>

      
    </BumbagProvider>
  )
}
