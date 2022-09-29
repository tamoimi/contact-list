import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
// import { Modal, Box } from "@mui/material";
// import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AddModal from "../components/AddModal";
import { useQuery } from "@tanstack/react-query";
import EditModal from "../components/editModal";

export default function ContactList() {
  const getContacts = async () => {
    const result = await (await fetch(`/api/contacts`)).json();
    console.log(result);
    return result;
  };

  const {
    isLoading,
    error,
    data: contacts,
  } = useQuery(["contacts"], getContacts);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(0);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  /**
   * 업데이트 모달
   */
  const updateModalOpen = (contactId) => {
    setSelectedContactId(contactId);
    setIsModalOpen(true);
    console.log(selectedContactId);
  };

  if (error) return "에러 발생" + error.message;
  return (
    <>
      <TableContainer component={Paper}>
        <h2>직원 비상 연락망</h2>
        <AddModal />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>직위·직책</TableCell>
              <TableCell>성명</TableCell>
              <TableCell>전화번호</TableCell>
              <TableCell>이메일</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>수정하기</TableCell>
              <TableCell>삭제하기</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((contact) => (
              <TableRow
                key={contact.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {contact.role}
                </TableCell>
                <TableCell>{contact.name}</TableCell>
                <TableCell>{contact.tel}</TableCell>
                <TableCell>{contact.email}</TableCell>
                <TableCell>{contact.birth}</TableCell>
                <TableCell>
                  {/* 수정하기 모달창 */}
                  <button
                    // className="edit"
                    onClick={() => updateModalOpen(contact.id)}
                    style={{ width: 35, margin: 15 }}
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                </TableCell>

                {/* 삭제하기 모달창 */}
                <TableCell>
                  <button
                    className="delete"
                    style={{ width: 35, margin: 15 }}
                    onClick={() => {
                      delStudents(student.id);
                    }}
                  >
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <EditModal
          contactId={selectedContactId}
          isModalOpenProp={isModalOpen}
          closeModalFn={closeModal}
        />
      </TableContainer>
      <style>
        {`
  .MuiPaper-root {
    width: 1000px;
    margin: 50px auto;
  }
  h2 {
    text-align: center;
  }
  thead {
    background: #FCF8E8;
  }
  button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #CEE5D0;
  }
  button:hover {
    opacity: 0.7;
  }
  `}
      </style>
    </>
  );
}
