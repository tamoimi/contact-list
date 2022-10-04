import { Box, Modal, Typography } from "@mui/material";
import { getValue } from "@mui/system";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditModal = ({ selectedData, closeModalFn }) => {
  const { register, setValue, getValues } = useForm({ mode: "onChange" });

  useEffect(() => {
    setValue("role", selectedData.selectedContact.role);
    setValue("name", selectedData.selectedContact.name);
    setValue("tel", selectedData.selectedContact.tel);
    setValue("email", selectedData.selectedContact.email);
    setValue("birth", selectedData.selectedContact.birth);
  }, [selectedData, setValue]);

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
  // const inputChangeHandler = (e) => {
  //   console.log(e.currentTarget.value);
  // };

  const update = async () => {
    console.log("update 함수 호출됨!!!");

    const id = selectedData.selectedContact.id;
    const role = getValues("role");
    const name = getValues("name");
    const tel = getValues("tel");
    const email = getValues("email");
    const birth = getValues("birth");

    const response = await (
      await fetch(`/api/contacts/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { id, role, name, tel, email, birth },
        }),
      })
    ).json();
    console.log(response);
  };

  return (
    <>
      <Modal
        open={selectedData.isModalOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            <form>
              <h4>직원 비상 연락망 수정</h4>
              <label>직위·직책</label>
              <input {...register("role")} />
              <br />
              <label>성명</label>
              <input {...register("name")} />
              <br />
              <label>전화번호</label>
              <input {...register("tel")} />
              <br />
              <label>이메일</label>
              <input {...register("email")} />
              <br />
              <label>생년월일</label>
              <input {...register("birth")} />
            </form>
          </Typography>
          <button onClick={closeModalFn} className="close">
            닫기
          </button>
          <button onClick={update} className="edit">
            수정하기
          </button>
        </Box>
      </Modal>
      <style jsx>{`
        form {
          width: 400px;
          margin: 0 auto;
        }
        label {
          display: inline-block;
          width: 100px;
          text-align: left;
          font-size: 18px;
          font-weight: bold;
        }
        input {
          width: 230px;
          height: 30px;
          margin: 10px 0;
          padding: 0 10px;
          border: none;
          background: #fcf8e8;
        }
        .close,
        .edit {
          width: 100px;
          height: 40px;
          margin: 40px 30px;
        }
        .edit {
          background: #ecb390;
        }
      `}</style>
    </>
  );
};

export default EditModal;
