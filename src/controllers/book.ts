import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBooks = async (req: Request, res: Response) => {
  try {
    const formData: any = req.fields;
    const books = await prisma.book.findMany({
      where: {
        AND: {
          author_id: formData.author_id,
          publication_year: formData.publication_year,
          genre_ids: formData?.genre_id && {
            has: formData?.genre_id,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({ message: "successfully get list of book", data: books });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({
      message: "successfully get book with id " + req.params.id,
      data: book,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    const { author_name, genre_list, ...reqBook } = req.body;
    const book = await prisma.book.create({
      data: {
        author: {
          connectOrCreate: {
            where: {
              name: author_name,
            },
            create: {
              name: author_name,
            },
          },
        },
        genres: {
          connectOrCreate: genre_list.map((genre: any) => ({
            where: {
              name: genre,
            },
            create: {
              name: genre,
            },
          })),
        },
        ...reqBook,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({
      message: "successfully create book with id " + book.id,
      data: book,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message, req: req.body });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { author_name, genre_list, ...reqBook } = req.body;
    const book = await prisma.book.update({
      where: {
        id: req.params.id,
      },
      data: {
        author: author_name && {
          connectOrCreate: {
            where: {
              name: author_name,
            },
            create: {
              name: author_name,
            },
          },
        },
        genres: {
          connectOrCreate:
            genre_list &&
            genre_list.map((genre: any) => ({
              where: {
                name: genre,
              },
              create: {
                name: genre,
              },
            })),
          update: genre_list.map((genre: any) => ({})),
        },
        ...reqBook,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        genres: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json({
      message: "successfully update book with id : " + req.params.id,
      data: book,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "successfully delete book with id : " + req.params.id,
      data: book,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
