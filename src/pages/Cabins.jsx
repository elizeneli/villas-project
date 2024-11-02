import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import { useState } from "react";
import Button from "../ui/Button";
import CabinForm from "../../src/features/cabins/CreateCabinForm";

function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row style={{ flexDirection: "column" }}>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new Cabin
        </Button>
        {showForm && <CabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
