"use strict";
import {
  createBookService,
  deleteBookService,
  getBooksService,
  updateBookService,
} from "../services/book.service.js";
import {
  bookBodyValidation,
  bookQueryValidation,
  bookUpdateValidation,
} from "../validations/book.validation.js";
import {
  handleErrorClient,
  handleErrorServer,
  handleSuccess,
} from "../handlers/responseHandlers.js";

export async function getBooks(req, res) {
  try {
    const [books, errorBooks] = await getBooksService();

    if (errorBooks) return handleErrorClient(res, 404, errorBooks);

    handleSuccess(res, 200, "Libros encontrados", books);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function createBook(req, res) {
  try {
    const { error } = bookBodyValidation.validate(req.body);

    if (error) {
      return handleErrorClient(res, 400, "Error de validación", error.message);
    }

    const [book, errorBook] = await createBookService(req.body);

    if (errorBook) {
      return handleErrorClient(res, 400, "Error registrando el libro", errorBook);
    }

    handleSuccess(res, 201, "Libro registrado con éxito", book);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function updateBook(req, res) {
  try {
    const { id } = req.query;
    const { body } = req;

    const { error: queryError } = bookQueryValidation.validate({ id });

    if (queryError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en la consulta",
        queryError.message,
      );
    }

    const { error: bodyError } = bookUpdateValidation.validate(body);

    if (bodyError) {
      return handleErrorClient(
        res,
        400,
        "Error de validación en los datos enviados",
        bodyError.message,
      );
    }

    const [book, errorBook] = await updateBookService({ id }, body);

    if (errorBook) {
      return handleErrorClient(res, 400, "Error modificando el libro", errorBook);
    }

    handleSuccess(res, 200, "Libro modificado correctamente", book);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}

export async function deleteBook(req, res) {
  try {
    const { id } = req.query;

    const { error } = bookQueryValidation.validate({ id });

    if (error) {
      return handleErrorClient(res, 400, "Error de validación en la consulta", error.message);
    }

    const [book, errorBook] = await deleteBookService({ id });

    if (errorBook) {
      return handleErrorClient(res, 404, "Error eliminando el libro", errorBook);
    }

    handleSuccess(res, 200, "Libro eliminado correctamente", book);
  } catch (error) {
    handleErrorServer(res, 500, error.message);
  }
}
