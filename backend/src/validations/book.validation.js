"use strict";
import Joi from "joi";

const currentYear = new Date().getFullYear();

const bookFields = {
  titulo: Joi.string().trim().min(1).max(255).messages({
    "string.empty": "El título no puede estar vacío.",
    "string.base": "El título debe ser de tipo string.",
    "string.max": "El título debe tener como máximo 255 caracteres.",
  }),
  autor: Joi.string().trim().min(1).max(255).messages({
    "string.empty": "El autor no puede estar vacío.",
    "string.base": "El autor debe ser de tipo string.",
    "string.max": "El autor debe tener como máximo 255 caracteres.",
  }),
  isbn: Joi.string()
    .trim()
    .min(10)
    .max(20)
    .pattern(/^(?:97[89][\d-]{10,16}|[\d-]{10,20})$/)
    .messages({
      "string.empty": "El ISBN no puede estar vacío.",
      "string.base": "El ISBN debe ser de tipo string.",
      "string.min": "El ISBN debe tener como mínimo 10 caracteres.",
      "string.max": "El ISBN debe tener como máximo 20 caracteres.",
      "string.pattern.base": "El ISBN solo puede contener números y guiones.",
    }),
  genero: Joi.string().trim().min(1).max(100).messages({
    "string.empty": "El género no puede estar vacío.",
    "string.base": "El género debe ser de tipo string.",
    "string.max": "El género debe tener como máximo 100 caracteres.",
  }),
  anioPublicacion: Joi.number()
    .integer()
    .min(1)
    .max(currentYear)
    .messages({
      "number.base": "El año de publicación debe ser un número.",
      "number.integer": "El año de publicación debe ser un número entero.",
      "number.min": "El año de publicación debe ser mayor que 0.",
      "number.max": `El año de publicación no puede superar ${currentYear}.`,
    }),
  cantidad: Joi.number().integer().min(0).messages({
    "number.base": "La cantidad debe ser un número.",
    "number.integer": "La cantidad debe ser un número entero.",
    "number.min": "La cantidad no puede ser negativa.",
  }),
};

export const bookBodyValidation = Joi.object({
  titulo: bookFields.titulo.required(),
  autor: bookFields.autor.required(),
  isbn: bookFields.isbn.required(),
  genero: bookFields.genero.required(),
  anioPublicacion: bookFields.anioPublicacion.required(),
  cantidad: bookFields.cantidad.default(1),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });

export const bookUpdateValidation = Joi.object(bookFields)
  .min(1)
  .unknown(false)
  .messages({
    "object.min": "Debes proporcionar al menos un campo para actualizar.",
    "object.unknown": "No se permiten propiedades adicionales.",
  });

export const bookQueryValidation = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    "any.required": "El id del libro es obligatorio.",
    "number.base": "El id debe ser un número.",
    "number.integer": "El id debe ser un número entero.",
    "number.positive": "El id debe ser un número positivo.",
  }),
})
  .unknown(false)
  .messages({
    "object.unknown": "No se permiten propiedades adicionales.",
  });
