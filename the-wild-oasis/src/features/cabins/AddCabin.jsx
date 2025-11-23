import Button from "../../ui/Button.jsx";
import CreateCabinForm from "./CreateCabinForm.jsx";
import Modal from "../../ui/Modal.jsx";
import CabinTable from "./CabinTable.jsx";

export default function AddCabin() {
    return <Modal>

            <Modal.Open opens="cabin-form">
                <Button>Add new cabin</Button>
            </Modal.Open>
        <Modal.Window name="cabin-form">
                <CreateCabinForm onCloseModal={() => {}} />
            </Modal.Window>
        <Modal.Open opens = 'table'>
            <Button>Show Table</Button>
        </Modal.Open>
        <Modal.Window name ="table">
         <CabinTable />
        </Modal.Window>

    </Modal>
}

