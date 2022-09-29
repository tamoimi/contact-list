import client from "../../libs/prismaClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log("post 호출");

    const {
      body: {
        data: { role, name, tel, email, birth },
      },
    } = req;

    console.log("백엔드 로그:", role, name, tel, email, birth);
    
    const result = await client.contact.create({
      data: {
        role,
        name,
        tel,
        email,
        birth,
      },
    });
    res.status(200).json(result);
  }
}
