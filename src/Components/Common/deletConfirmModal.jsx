import { Modal } from 'antd';

const DeleteConfirmModal = ({ handleConfirm, handleCancel, visible, id }) => {
    return (
        <div>
            <Modal
                title="Delete Record"
                open={visible}
                onOk={handleConfirm}
                onCancel={handleCancel}
            >
                <p>Are you sure you want to delete this <b>{id}</b> member?</p>
            </Modal>
        </div>
    );
}

export default DeleteConfirmModal;
