const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

books = Object.values(books);

//? task 1 : Get the book list available in the shop.
public_users.get("/", (req, res) =>
	res.status(300).json(JSON.stringify(books))
);

//? task 2 : Get book details based on ISBN.
public_users.get("/isbn/:isbn", function (req, res) {
	books = books.filter((B) => B.isbn === req.params.isbn);
	return res.status(300).json(JSON.stringify(books));
});

//? task 3 : Get book details based on author.
public_users.get("/author/:author", function (req, res) {
	books = books.filter((B) => B.author === req.params.author);
	return res.status(300).json(JSON.stringify(books));
});

//? task 4 : Get all books based on title.
public_users.get("/title/:title", function (req, res) {
	books = books.filter((B) => B.title === req.params.title);
	return res.status(300).json(JSON.stringify(books));
});

//? task 5 : Get book review.
public_users.get("/review/:isbn", function (req, res) {
	books = books.filter((B) => B.isbn === req.params.isbn);
	return res.status(300).json(JSON.stringify(books.reviews));
});

//? task 6 :
public_users.post("/register", (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if (username && password) {
		if (!isValid(username)) {
			users.push({ username: username, password: password });
			return res
				.status(200)
				.json({ message: `User ${username} registered` });
		} else {
			return res
				.status(400)
				.json({ message: `User ${username} already registered` });
		}
	} else {
		return res
			.status(404)
			.json({ message: "Must provide username and password" });
	}
});

//? task 10 : get boks using Promise
const getBooks = () =>
	new Promise((resolve, reject) => {
		resolve(books);
		reject({ mess: "This book not found" });
	});

public_users.get("/booksUsingPromise", (req, res) =>
	getBooks().then((bks) => res.send(JSON.stringify(bks)))
);

//? task 11 : get book by ISBN using Promise
const getByISBN = (isbn) =>
	new Promise((resolve, reject) => {
		if (books[isbn]) {
			resolve(books[isbn]);
		} else {
			reject({ status: 404, message: `ISBN ${isbn} not found` });
		}
	});
public_users.get("/isbnUsingPromise/:isbn", function (req, res) {
	getByISBN(req.params.isbn).then(
		(result) => res.send(result)
	).catch((err) => res.status(err.status).json(err) )
});

//? task 12 : Get book details based on author using promise
public_users.get('/authorUsingPromise/:author',function (req, res) {
    const author = req.params.author;
    getBooks()
    .then((books) => books.filter((book) => book.author === author))
    .then((filteredBooks) => res.send(filteredBooks));
});

//? task 13 :  Get all books based on title using Promise
public_users.get('/titleUsingPromise/:title',function (req, res) {
    const title = req.params.title;
    getBooks()
    .then((books) => books.filter((book) => book.title === title))
    .then((filteredBooks) => res.send(filteredBooks));
});

module.exports.general = public_users;
