import {Modal} from "react-bootstrap"


export const ModalWindow = (data) => {


    return (
<Modal show={data.show} onHide={data.handleClose}>
        <Modal.Header closeButton>
            {data.message}
        </Modal.Header>
</Modal>
    )

}