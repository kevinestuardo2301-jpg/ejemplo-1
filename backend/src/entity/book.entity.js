"use strict";
import { EntitySchema } from "typeorm";

const BookSchema = new EntitySchema({
  name: "Book",
  tableName: "books",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    titulo: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    autor: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    isbn: {
      type: "varchar",
      length: 20,
      nullable: false,
      unique: true,
    },
    genero: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    anioPublicacion: {
      type: "int",
      nullable: false,
    },
    cantidad: {
      type: "int",
      nullable: false,
      default: 1,
    },
    createdAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      nullable: false,
    },
    updatedAt: {
      type: "timestamp with time zone",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
      nullable: false,
    },
  },
  indices: [
    {
      name: "IDX_BOOK_ISBN",
      columns: ["isbn"],
      unique: true,
    },
  ],
});

export default BookSchema;
