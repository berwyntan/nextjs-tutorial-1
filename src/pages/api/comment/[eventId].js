import { MongoClient } from "mongodb";

const addComment = async (req, res) => {
  const { eventId } = req.query;
  if (req.method === "POST") {
    // console.log(req.body);
    const { email, name, text } = req.body;
    // validation

    const newComment = {
      eventId: eventId,
      email: email,
      name: name,
      text: text,
    }
    // mongo
    const client = await MongoClient.connect(
      process.env.MONGO_URL
    );
    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId

    client.close();
    return res.status(201).json(newComment);
  }
  if (req.method === "GET") {
    const data = [
      {
        text: "comment 1",
        name: "BT"
      },
      {
        text: "comment 2",
        name: "tcw"
      },
    ]
    return res.status(200).json({comments: data})
  }
};

export default addComment;
