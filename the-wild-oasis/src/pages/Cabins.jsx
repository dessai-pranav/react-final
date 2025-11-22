import Heading from "../ui/Heading";
import Row from "../ui/Row";
import {useEffect} from "react";
import {getCabins} from "../services/apiCabins.js";
import CabinTable from "../features/cabins/CabinTable.jsx";

import AddCabin from "../features/cabins/AddCabin.jsx";

function Cabins() {
    useEffect(function()  {
        getCabins().then((data) => console.log(data));

    }, []);
  return (
      <>
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>filter / sort</p>
    </Row>
          <Row type = "vertical">
              <CabinTable/>
              <AddCabin/>
          </Row>
      </>
  );
}

export default Cabins;
