import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    res.json({ message: "successfully get list of authors", data: authors });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getAuthor = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      message: "successfully get author with id " + req.params.id,
      data: author,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createAuthor = async (req: Request, res: Response) => {
  try {
    const reqAuthor = req.body;
    const author = await prisma.author.create({
      data: {
        ...reqAuthor,
      },
    });
    res.json({
      message: "successfully create author with id " + author.id,
      data: author,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateAuthor = async (req: Request, res: Response) => {
  try {
    const reqAuthor = req.body;
    const author = await prisma.author.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...reqAuthor,
        updatedAt: new Date(),
      },
    });
    res.json({
      message: "successfully update author with id :" + req.params.id,
      data: author,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const deleteAuthor = async (req: Request, res: Response) => {
  try {
    const author = await prisma.author.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "successfully delete author with id :" + req.params.id,
      data: null,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
