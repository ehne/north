import Head from 'next/head'
import { Provider as BumbagProvider } from 'bumbag';
import DarkModeToggle from "../components/darkModeToggle"
import Header from "../components/Header"
export default function Home() {
  return (
    <BumbagProvider>
      <Head>
        <title>north | darcylf.me</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      
    </BumbagProvider>
  )
}
