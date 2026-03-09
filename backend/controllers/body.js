import Body from "../models/Body.js";


export const getBodyData = async (req, res) => {
  try {
    // Latest entry fetch karega
    const data = await Body.findOne().sort({ createdAt: -1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Data fetch nahi ho paya", error });
  }
};

export const addBodyData = async (req, res) => {
  try {
    const newEntry = new Body(req.body);
    await newEntry.save();
    res.status(201).json({ message: "Data save ho gaya!", data: newEntry });
  } catch (error) {
    res.status(400).json({ message: "Error saving data", error });
  }
};