import { 
  TableContainer, 
  Table, 
  TableCaption, 
  Thead,
  Tr,
  Th,
  Tbody
} from "@chakra-ui/react"
import { useEffect, useState } from 'react';
import axios from 'axios';

export const BookListing: React.FC = () => {
  const [data, setData] = useState<{
    _id: string,
    title: string, 
    author: string, 
    subject: string
  }[]>([]);
  const fetchData = async () => {
    const response = await axios(
      "http://localhost:4000"
    );
    setData(response.data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <TableContainer
      borderTop={1}
      borderStyle={'solid'}
      borderColor={'red.400'}
    >
      <Table size='sm'>
        <TableCaption>Books Found in Local Database</TableCaption>
        <Thead>
          <Tr>
            <Th>Database ID</Th>
            <Th>Title</Th>
            <Th>Author</Th>
            <Th>Subject</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map(item => (
            <Tr key={item.title}>
              <Th>{item._id}</Th>
              <Th>{item.title}</Th>
              <Th>{item.author}</Th>
              <Th>{item.subject}</Th>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}