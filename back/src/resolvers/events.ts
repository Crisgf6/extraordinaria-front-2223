import express from "express";
import client from "../db.ts";
import { EventSchema } from "../types.ts";
import { DB_NAME } from "../env.ts";

const events = async (req: express.Request, res: express.Response) => {
  try {
    // read date from body
    const { date } = req.body;
    // check if date is valid
    if (!date) {
      res.status(400).json({ message: "Date is required" });
      return;
    }

    // check if date is valid date
    if (isNaN(Date.parse(date))) {
      res.status(400).json({ message: "Date is not valid" });
      return;
    }

    // connect to database
    await client.connect();
    const db = client.db(DB_NAME);
    // find events
    const events = await db
      .collection<EventSchema>("events")
      .find({ date: new Date(date) })
      .toArray();
    // send events
    res.json(
      events.map(({ _id, ...rest }) => ({ id: _id.toString(), ...rest }))
    );
    // close connection
    client.close();
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default events;
