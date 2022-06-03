import React, {useState, useEffect} from 'react';
import { MDBDataTableV5 } from 'mdbreact';

export default function Basic({data}) {
  return <MDBDataTableV5 hover entriesOptions={[5, 20, 25]} entries={5} pagesAmount={4} data={data}/>;
}