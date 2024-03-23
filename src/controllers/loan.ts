import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { addDays } from "../helper/addDays";
import { dayDifference } from "../helper/dayDifference";
import { compareDates } from "../helper/compareDates";

const prisma = new PrismaClient();

export const getLoans = async (req: Request, res: Response) => {
  try {
    const loans = await prisma.loan.findMany();
    res.json({ message: "successfully get list of loans", data: loans });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getLoan = async (req: Request, res: Response) => {
  try {
    const loan = await prisma.loan.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        book: true,
        member: true,
        loan_status: true,
      },
    });
    res.json({
      message: "successfully get loan with id " + req.params.id,
      data: loan,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const createLoan = async (req: Request, res: Response) => {
  try {
    const reqLoan = req.body;
    const start_date = new Date();
    const due_date = addDays(start_date, 20);

    const loan = await prisma.loan.create({
      data: {
        ...reqLoan,
        status_id: "65fd4cccbb5355c26b8d7e4d",
        due_date,
      },
      include: {
        book: true,
        member: true,
        loan_status: true,
      },
    });
    res.json({
      message: "successfully create loan with id " + loan.id,
      data: loan,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const updateLoan = async (req: Request, res: Response) => {
  try {
    const reqUpdate = req.body;
    const isLate = compareDates(
      new Date(reqUpdate.return_date),
      new Date(reqUpdate.due_date)
    )
      ? undefined
      : reqUpdate;
    const status_id = compareDates(
      new Date(reqUpdate.return_date),
      new Date(reqUpdate.due_date)
    )
      ? "65fd4cccbb5355c26b8d7e4c"
      : "65fd4cccbb5355c26b8d7e4e";
    const totalDelay = dayDifference(new Date(), new Date(reqUpdate.due_date));
    const loan = await prisma.loan.update({
      where: {
        id: req.params.id,
      },
      data: {
        late_charge: isLate && {
          create: {
            total_delay: totalDelay,
            charge: totalDelay * 2000,
            is_paid: false,
          },
        },
        status_id,
        ...reqUpdate,
      },
      include: {
        book: true,
        member: true,
        loan_status: true,
        late_charge: true,
      },
    });
    res.json({
      message: "successfully update loan with id " + req.params.id,
      data: loan,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const deleteLoan = async (req: Request, res: Response) => {
  try {
    const loan = await prisma.loan.delete({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "successfully delete loan with id : " + req.params.id,
      data: loan,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};

export const getLoanStatuses = async (req: Request, res: Response) => {
  try {
    const status = await prisma.loan_status.findMany();
    res.json({ message: "successfully get list of status", data: status });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
