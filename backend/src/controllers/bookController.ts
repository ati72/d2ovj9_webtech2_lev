const Book = require('../model/Books');
import express, { Request, Response } from 'express';

export class BookController {
  getAllBooks = async (req: Request, res: Response) => {
    const books = await Book.find();
    if (books.length <= 0) {
      return res.status(404).json('No books found');
    }
    res.json(books);
  };

  getBook = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Book id required');
    }

    try {
      const book = await Book.findOne({ _id: req.params.id }).exec();
      if (!book) {
        return res.status(404).json('No book found with id: ' + req.params.id);
      }
      res.json(book);
    } catch (error) {
      console.error(error);
      res.status(404).json('No book found with id: ' + req.params.id);
    }
  };

  createNewBook = async (req: Request, res: Response) => {
    if (!req?.body?.author || !req?.body?.title || !req?.body?.released) {
      return res.status(400).json({
        message: 'Author, title, release year  are required',
      });
    }

    try {
      const result = await Book.create({
        author: req.body.author,
        title: req.body.title,
        released: req.body.released,
      });
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json('Something went wrong while creating new book.');
    }
  };

  updateBook = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Book id required');
    }

    try {
      const book = await Book.findOne({ _id: req.params.id }).exec();
      if (!book) {
        return res.status(404).json('No book found with id: ' + req.params.id);
      }
      if (req.body?.author) book.author = req.body.author;
      if (req.body?.title) book.title = req.body.title;
      if (req.body?.released) book.released = req.body.released;

      const result = await book.save();
      res.json(result);
    } catch (error) {
      console.log(error);
      res.status(404).json('No book found with id: ' + req.params.id);
    }
  };

  deleteBook = async (req: Request, res: Response) => {
    if (!req?.params?.id) {
      return res.status(400).json('Book id required');
    }
    try {
      const book = await Book.findOne({ _id: req.params.id }).exec();
      if (!book) {
        return res.status(404).json('No book found with id: ' + req.params.id);
      }
      const result = book.deleteOne();
      res.json('Book deleted.');
    } catch (error) {
      console.log(error);
      res.status(404).json('No book found with id: ' + req.params.id);
    }
  };
}
