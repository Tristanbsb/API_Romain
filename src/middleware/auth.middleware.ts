import { Request, Response, NextFunction } from "express";

// Middleware to check if the user is authenticated using api key
export const checkApiKey = (req: Request, res: Response, next: NextFunction) => {
  let apiKey = req.headers["x-api-key"];
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
