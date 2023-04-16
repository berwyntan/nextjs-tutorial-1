import { MongoClient } from "mongodb";

const connectDB = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL);
  return client;
};

const insertDocument = async (client, document) => {
  const db = client.db();
  const result = await db.collection("comments").insertOne(document);
  return result;
};

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
    };
    let client;
    try {
      client = await connectDB();
    } catch (error) {
      res.sendStatus(500);
      return;
    }

    try {
      const result = await insertDocument(client, newComment);

      newComment.id = result.insertedId;

      client.close();
    } catch (error) {}

    return res.status(201).json(newComment);

    // mongo
    // const client = await MongoClient.connect(process.env.MONGO_URL);

    // const db = client.db();
    // const result = await db.collection("comments").insertOne(newComment);
  }
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();
      const result = await db
        .collection("comments")
        .find({ eventId: eventId })
        .sort({ _id: -1 })
        .toArray();
      // console.log(result);
      client.close();
      return res.status(200).json({ comments: result });
    } catch (error) {
      return res.status(500).json({ message: "Server errorz" });
    }
  }
};

export default addComment;
