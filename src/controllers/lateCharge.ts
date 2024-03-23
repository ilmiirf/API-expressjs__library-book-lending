import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getLateCharges = async (req: Request, res: Response) => {
  try {
    const lateCharges = await prisma.late_charge.findMany();
    res.json({ message: "successfully get late charges", data: lateCharges });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getLateCharge = async (req: Request, res: Response) => {
  try {
    const lateCharge = await prisma.late_charge.findUnique({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "successfully get late charge with id" + req.params.id,
      data: lateCharge,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createLateCharge = async (req: Request, res: Response) => {
  try {
    const lateCharge = await prisma.late_charge.create({
      data: {
        ...req.body,
      },
    });
    res.json({
      message: "successfully create late charge with id" + lateCharge.id,
      data: lateCharge,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateLateCharge = async (req: Request, res: Response) => {
  try {
    const lateCharge = await prisma.late_charge.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });
    res.json({
      message: "successfully update late charge with id " + req.params.id,
      data: lateCharge,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const deleteLateCharge = async (req: Request, res: Response) => {
  try {
    const lateCharge = await prisma.late_charge.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "successfully delete late charge with id " + req.params.id,
      data: lateCharge,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
