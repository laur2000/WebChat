import { Request, Response } from "express";
export default (app: any) =>
  //Requests to the api not handled will give 404
  app.use("*", (req: Request, res: Response) => {
    const notFound = {
      error: `Cannot ${req.method} ${req.originalUrl}`,
      success: null,
    };
    res.status(404);
    res.send(notFound);
    res.end();
  });
