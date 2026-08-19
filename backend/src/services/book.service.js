"use strict";
import Book from "../entity/book.entity.js";
import { AppDataSource } from "../config/configDb.js";

export async function getBooksService() {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const books = await bookRepository.find({ order: { titulo: "ASC" } });

    return [books, null];
  } catch (error) {
    console.error("Error al obtener los libros:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function createBookService(bookData) {
  try {
    const bookRepository = AppDataSource.getRepository(Book);
    const existingBook = await bookRepository.findOneBy({ isbn: bookData.isbn });

    if (existingBook) return [null, "Ya existe un libro con ese ISBN"];

    const newBook = bookRepository.create(bookData);
    const savedBook = await bookRepository.save(newBook);

    return [savedBook, null];
  } catch (error) {
    console.error("Error al registrar el libro:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function updateBookService(query, body) {
  try {
    const bookId = Number(query.id);
    const bookRepository = AppDataSource.getRepository(Book);
    const bookFound = await bookRepository.findOneBy({ id: bookId });

    if (!bookFound) return [null, "Libro no encontrado"];

    if (body.isbn && body.isbn !== bookFound.isbn) {
      const existingBook = await bookRepository.findOneBy({ isbn: body.isbn });

      if (existingBook && existingBook.id !== bookId) {
        return [null, "Ya existe un libro con ese ISBN"];
      }
    }

    await bookRepository.update(
      { id: bookId },
      { ...body, updatedAt: new Date() },
    );

    const updatedBook = await bookRepository.findOneBy({ id: bookId });

    return [updatedBook, null];
  } catch (error) {
    console.error("Error al modificar el libro:", error);
    return [null, "Error interno del servidor"];
  }
}

export async function deleteBookService(query) {
  try {
    const bookId = Number(query.id);
    const bookRepository = AppDataSource.getRepository(Book);
    const bookFound = await bookRepository.findOneBy({ id: bookId });

    if (!bookFound) return [null, "Libro no encontrado"];

    const deletedBook = await bookRepository.remove(bookFound);

    return [deletedBook, null];
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    return [null, "Error interno del servidor"];
  }
}
