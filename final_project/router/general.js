const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

books = Object.values(books)

public_users.post("/register", (req, res) => {
	//Write your code here
	return res.status(300).json({ message: "Yet to be implemented" });
});

//? Get the book list available in the shop
public_users.get("/", (req, res) =>
	res.status(300).json(JSON.stringify(books))
);

//? Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
	books = books.filter((B) => B.isbn === req.params.isbn);
	return res.status(300).json(JSON.stringify(books));
});

//? Get book details based on author
public_users.get("/author/:author", function (req, res) {
	books = books.filter((B) => B.author === req.params.author);
	return res.status(300).json(JSON.stringify(books));
});

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
	books = books.filter((B) => B.title === req.params.title);
	return res.status(300).json(JSON.stringify(books));
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
	books = books.filter((B) => B.isbn === req.params.isbn);
	return res.status(300).json(JSON.stringify(books.reviews));
});

module.exports.general = public_users;
