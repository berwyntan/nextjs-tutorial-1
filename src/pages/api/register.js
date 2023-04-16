import { MongoClient } from "mongodb";

const register = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.sendStatus(400);
    }

    try {
      const client = await MongoClient.connect(process.env.MONGO_URL);
      const db = client.db();
      await db.collection("emails").insertOne({ email: email });

      client.close();
      return res.status(201).json({ email: email });
    } catch (error) {
      return res.status(500).json({message: "Internal server errorzz"});
    }
  }
};

export default register;
