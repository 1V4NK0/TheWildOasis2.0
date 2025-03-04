import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Modal from "../ui/Modal";

import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableOperations from "../features/cabins/CabinTableOperations";
function Cabins() {
  const [isOpenModal, setIsOpenModal] = useState(true);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>

        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />

        <AddCabin onClose={() => setIsOpenModal(true)} />
      </Row>
    </>
  );
}

export default Cabins;
