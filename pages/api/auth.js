import { admin } from "../../config/firebaseAdmin";

export default async (req, res) => {
  if (!req.headers.token) {
    return res.status(401).json({ error: "Please include the ID token" });
  }

  try {
    const { uid } = await admin.auth().verifyToken(req.headers.token);
    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
