import express, { Request, Response } from "express"

const app = express()

app.get("/", (req: Request, res: Response) => {
  return res.send("server running")
})

app.listen(3000, () => {
  console.log("started server on port 3000")
})