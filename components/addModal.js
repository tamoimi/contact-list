import { Modal, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { fontFamily } from "@mui/system";

export default function AddModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postContacts = async (data) => {
    console.log("data", data);
    const response = await (
      await fetch("/api/contacts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
      })
    ).json();
    console.log(response);
  };

  const [addOpen, setAddOpen] = useState(false);
  const addHandleOpen = () => setAddOpen(true);
  const addHandleClose = () => setAddOpen(false);

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

  //data를 가져와야함! 
  const submitHandler = (data) => {
    alert("정상적으로 요청되었습니다");
    postContacts(data);
    console.log(postContacts);
  };

  return (
    <>
      <button onClick={addHandleOpen} className="add-contact">
        <span>비상 연락망 추가</span>
      </button>
      <Modal
        open={addOpen}
        onClose={addHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            <form onSubmit={handleSubmit(submitHandler)}>
              <h4>직원 비상 연락망 추가</h4>
              <label>직위·직책</label>
              <input
                {...register("role", { required: "필수 입력값 입니다." })}
              />
              {errors.role && <p>{errors.role.message}</p>}
              <label>성명</label>
              <input
                {...register("name", { required: "필수 입력값 입니다." })}
              />
              {errors.name && <p>{errors.name.message}</p>}
              <label>전화번호</label>
              <input
                {...register("tel", {
                  required: "필수 입력값 입니다.",
                  maxLength: {
                    value: 11,
                    message: "번호는 11자로 작성해주세요. ",
                  },
                  minLength: {
                    value: 11,
                    message: "번호는 11자로 작성해주세요. ",
                  },
                })}
                placeholder="01012345678"
              />
              {errors.tel && <p>{errors.tel.message}</p>}
              <label>이메일</label>
              <input
                {...register("email", {
                  required: "필수 입력값 입니다.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                    message: "이메일 형식이 아닙니다.",
                  },
                })}
                placeholder="name@optatumplatform.com"
              />
              {errors.email && <p>{errors.email.message}</p>}
              <label>생년월일</label>
              <input
                {...register("birth", {
                  required: "필수 입력값 입니다.",
                  maxLength: {
                    value: 6,
                    message: "6자로 작성해주세요. ",
                  },
                  minLength: {
                    value: 6,
                    message: "6자로 작성해주세요. ",
                  },
                })}
                placeholder="주민번호 앞 6자를 입력해주세요."
              />
              {errors.birth && <p>{errors.birth.message}</p>}
              <button type="button" onClick={addHandleClose} className="close">
                닫기
              </button>
              {/* 추가하기 클릭하면 submit */}
              <button type="submit" className="add">
                추가하기
              </button>
            </form>
          </Typography>
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
        .add {
          width: 100px;
          height: 40px;
          margin: 40px 30px;
        }
        .add {
          background: #ecb390;
        }
        p {
          margin: 0;
          font-size: 12px;
          color: tomato;
        }
        .add-contact {
          width: 150px;
          height: 60px;
          line-height: 60px;
        }
        .container {
          width: 100%;
          height: 300px;
          text-align: right;
        }
      `}</style>
    </>
  );
}
