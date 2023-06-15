import { Response } from "express";

const sendResponseObj = (
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  res.status(status).json({ message, ...data });
};

const sendResponseData = (
  res: Response,
  status: number,
  message?: string,
  data?: any
) => {
  res.status(status).json(data);
};

const sendResponseError = (res: Response, status: number, message?: string) => {
  res.status(status).json(message);
};

export { sendResponseObj, sendResponseData, sendResponseError };
