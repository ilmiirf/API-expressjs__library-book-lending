import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    res.json({ message: "successfully get list of member", data: members });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getMember = async (req: Request, res: Response) => {
  try {
    const member = await prisma.member.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        loans: {
          select: {
            id: true,
            start_date: true,
            due_date: true,
            return_date: true,
            loan_status: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    res.json({
      message: "successfully get member with id " + req.params.id,
      data: member,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, username, password, confirm_password } =
      req.body;
    if (password !== confirm_password)
      return res.status(400).json({ message: "password not match" });

    //TODO: hash password

    const member = await prisma.member.create({
      data: {
        name,
        email,
        phone,
        user: {
          create: {
            username,
            password,
            role: "member",
          },
        },
      },
      include: {
        user: true,
      },
    });
    res.json({
      message: "successfully create member with id " + member.id,
      data: member,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const requestUpdate = req.body;
    const member = await prisma.member.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...requestUpdate,
        updatedAt: new Date(),
      },
    });
    res.json({
      message: "successfully update member with id " + req.params.id,
      data: member,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const member = await prisma.member.delete({
      where: {
        id: req.params.id,
      },
      include: {
        loans: true,
        user: true,
      },
    });
    res.json({
      message: "successfully delete member with id :" + req.params.id,
      data: null,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
