import { Modal, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function AddModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const postContacts = async (data) => {
    console.log(data);
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
  return (
    <>
      <container>
        <button onClick={addHandleOpen} className="add-contact">
          비상 연락망 추가
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
            />
          </svg>
        </button>
      </container>
      <Modal
        open={addOpen}
        onClose={addHandleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h7" component="h2">
            <form onSubmit={handleSubmit(postContacts)}>
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
              <button onClick={addHandleClose} className="close">
                닫기
              </button>
              {/* 추가하기 클릭하면 submit */}
              <button
                type="submit"
                className="add"
                onClick={() => {
                  alert("추가 했습니다.");
                onClick={getContacts}
                }}
              >
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
            width: 100px;
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
