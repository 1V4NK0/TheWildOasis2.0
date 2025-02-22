import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CabinTable from "../features/cabins/CabinTable";
import Modal from "../ui/Modal";

import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";
import AddCabin from "../features/cabins/AddCabin";
function Cabins() {
  const [isOpenModal, setIsOpenModal] = useState(true);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        {/* <Button onClick={() => setIsOpenModal(true)}>Create new cabin</Button>
        {isOpenModal && (
          <Modal>
            <CreateCabinForm onClose={() => setIsOpenModal(false)} />
          </Modal>
        )} */}
        <AddCabin onClose={() => setIsOpenModal(true)}/>
      </Row>
    </>
  );
}

export default Cabins;
