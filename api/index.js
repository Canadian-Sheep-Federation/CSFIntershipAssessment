import express from "express";
import pkg from "@prisma/client";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

/*
POST /: Takes in the form and stores it in your chosen data store. Should return the id of the newly created form response.
*/
// creates a movie
app.post("/forms", async(req, res) => {
    const {firstName, lastName, email, phone, province, doses, comment} = req.body;
    const form = await prisma.survey.create({
      data:{
        firstName,
        lastName,
        email,
        phone,
        province,
        doses,
        comment,
      },
    });
    
    if (form){
      res.status(201).json(form);
    }
    else {
      res.status(400).send("Error: Incorrect Param Value");
    }
});

/*
GET /: Returns all responses to the form
*/
app.get("/forms", async (req, res) => {
    try {
      const getForms = await prisma.survey.findMany();
      if (getForms){
        res.status(200).json(getForms);
      }
    }
    catch(e) {
      res.status(404).send("Not Found");
    }
  });

/*
GET /{id}: Returns the form corresponding to the id. E.g. GET /1 would return the form corresponding to the id 1
*/
app.get("/forms/:id", async (req, res) => {
    const formId = parseInt(req.params.id)
  
    try {
      const getForm = await prisma.survey.findUnique({
        where: {
          id: formId,
        },
      });
      if (getForm){
        res.status(200).json(getForm);
      }
    }
    catch(e){
      res.status(404).send("Id Not Found");
    }
  });

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000 🎉 🚀");
});