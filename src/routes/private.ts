import express from "express";
import formidableMiddleware from "express-formidable";

import { getUsers, getUser, updateUser, deleteUser } from "../controllers/user";
import {
  getMembers,
  getMember,
  deleteMember,
  updateMember,
} from "../controllers/member";
import {
  createGenre,
  deleteGenre,
  getGenre,
  getGenres,
  updateGenre,
} from "../controllers/genre";
import {
  createAuthor,
  deleteAuthor,
  getAuthor,
  getAuthors,
  updateAuthor,
} from "../controllers/author";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book";
import {
  getLoans,
  getLoan,
  createLoan,
  deleteLoan,
  updateLoan,
  getLoanStatuses,
} from "../controllers/loan";
import {
  getLateCharges,
  getLateCharge,
  createLateCharge,
  updateLateCharge,
  deleteLateCharge,
} from "../controllers/lateCharge";

const privateRouter = express.Router();

// User API
privateRouter.get("/api/users", getUsers);
privateRouter.get("/api/users/:id", getUser);
privateRouter.patch("/api/users/:id", updateUser);
privateRouter.delete("/api/users/:id", deleteUser);

// Member API
privateRouter.get("/api/members", getMembers);
privateRouter.get("/api/members/:id", getMember);
privateRouter.patch("/api/members/:id", updateMember);
privateRouter.delete("/api/members/:id", deleteMember);

// Author API
privateRouter.get("/api/authors", getAuthors);
privateRouter.get("/api/authors/:id", getAuthor);
privateRouter.post("/api/authors", createAuthor);
privateRouter.patch("/api/authors/:id", updateAuthor);
privateRouter.delete("/api/authors/:id", deleteAuthor);

// Genre API
privateRouter.get("/api/genres", getGenres);
privateRouter.get("/api/genres/:id", getGenre);
privateRouter.post("/api/genres", createGenre);
privateRouter.patch("/api/genres/:id", updateGenre);
privateRouter.delete("/api/genres/:id", deleteGenre);

// Book API
privateRouter.post("/api/books-by-filter", formidableMiddleware(), getBooks);
privateRouter.get("/api/books/:id", getBook);
privateRouter.post("/api/books", createBook);
privateRouter.patch("/api/books/:id", updateBook);
privateRouter.put("/api/books/:id", updateBook);
privateRouter.delete("/api/books/:id", deleteBook);

// Loan API
privateRouter.get("/api/loans", getLoans);
privateRouter.get("/api/loans/:id", getLoan);
privateRouter.post("/api/loans", createLoan);
privateRouter.patch("/api/loans/:id", updateLoan);
privateRouter.delete("/api/loans/:id", deleteLoan);

privateRouter.get("/api/loan-status", getLoanStatuses);

// Late Charge API
privateRouter.get("/api/late-charges", getLateCharges);
privateRouter.get("/api/late-charges/:id", getLateCharge);
privateRouter.post("/api/late-charges", createLateCharge);
privateRouter.patch("/api/late-charges/:id", updateLateCharge);
privateRouter.delete("/api/late-charges/:id", deleteLateCharge);

export default privateRouter;
