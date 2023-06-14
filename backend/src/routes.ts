import express from 'express';
import { MemberController } from './controllers/memberController';
import { BookController } from './controllers/bookController';

export function getRoutes() {
  const router = express.Router();

  const memberController = new MemberController();
  const bookController = new BookController();

  router.get('/members', memberController.getAllMembers);
  router.get('/members/:id', memberController.getMember);
  router.post('/members', memberController.createNewMember);
  router.put('/members/:id', memberController.updateMember);
  router.delete('/members/:id', memberController.deleteMember);

  router.get('/books', bookController.getAllBooks);
  router.get('/books/:id', bookController.getBook);
  router.post('/books', bookController.createNewBook);
  router.put('/books/:id', bookController.updateBook);
  router.delete('/books/:id', bookController.deleteBook);

  return router;
}
