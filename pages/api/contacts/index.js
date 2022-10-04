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

  if (req.method === "GET") {
    const result = await client.contact.findMany({
      select: {
        id: true,
        role: true,
        name: true,
        tel: true,
        email: true,
        birth: true,
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "PUT") {
    console.log("api put 호출됨!");
    const {
      body: {
        data: { id, role, name, tel, email, birth },
      },
    } = req;

    console.log("api input id = ", id);

    const result = await client.contact.update({
      data: {
        role,
        name,
        tel,
        email,
        birth,
      },
      where: {
        id: +id,
      },
    });
    res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    console.log("api delete 호출됨!");
    const {
      body: { id },
    } = req;

    const result = await client.contact.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json(result);
  }
}
