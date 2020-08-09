import { Provider as BumbagProvider,Box, Set, Button,Link, Heading, Stack, useColorMode, Text, Container} from 'bumbag';

function Error({ statusCode }) {
    return (
        <BumbagProvider colorMode="dark" >
            <Container height="100vh" alignY="center" maxWidth="600px">
                <Stack orientation="vertical" spacing="major-3" paddingX="major-3" isFilled> 
                    
                    <Set orientation="vertical" isFilled alignY="center">
                         <Button use="a" href="/">Something Went Wrong — Go Home</Button>
                    </Set>
                        
                    
                </Stack>
            </Container>
            <Text position="fixed" bottom="major-2" left="major-1" right="major-1" textAlign="center">{statusCode
        ? `An error ${statusCode} occurred on server`
        : 'An error occurred on client'}  </Text>  
        </BumbagProvider>
    )
  }
  
  Error.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
  }
  
  export default Error