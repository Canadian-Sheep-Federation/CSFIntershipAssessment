import * as React from "react"
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Grid,
  theme,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { BookListing } from "./components/BookListing"
import { LocalBook } from "./components/LocalBook"
import { PublicBook } from "./components/PublicBook"
import { BookPosting } from "./components/BookPosting"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Text>CSF INTERNSHIP FRONTEND (stylized with handcrafted, "artisan" css)</Text>
        <Flex justifyContent='center' py={{ base: 10 }} px={{ base: 2 }} gap='400'>
          
          <PublicBook />
          <LocalBook />
          
        </Flex>
        <BookPosting />
        <BookListing />
      </Grid>
    </Box>
  </ChakraProvider>
)
