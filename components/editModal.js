import { Box, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const EditModal = ({ contactId, isModalOpenProp, closeModalFn }) => {
  const [selectedContactId, setSelectedContactId] = useState(0);
  useEffect(() => {
    setSelectedContactId(contactId);
  }, [contactId]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    border: "none",
    boxShadow: 2,
    p: 4,
    borderRadius: 4,
  };
  return (
    <Modal
      open={isModalOpenProp}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {selectedContactId}
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <form>
            <h4>직원 비상 연락망 수정</h4>
            <label>직위·직책</label>
            <span>{selectedContactId}</span>
            <br />
            <label>성명</label>
            <input />
            <br />
            <label>전화번호</label>
            <input />
            <br />
            <label>이메일</label>
            <input />
            <br />
            <label>생년월일</label>
            <input />
          </form>
        </Typography>
        <button onClick={closeModalFn}>닫기</button>
        <button onClick={closeModalFn}>수정하기</button>
      </Box>
    </Modal>
  );
};

export default EditModal;
