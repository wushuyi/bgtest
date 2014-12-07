/**
 * A simple API hosted under localhost:8080/books
 */
(function () {
    'use strict';
    var express = require('express');
    var app = express();
    var bookId = 100;
    var books = [
        {
            id: 98,
            author: 'Stephen King',
            title: 'The Shining',
            year: 1997
        },
        {
            id: 99,
            author: 'George Orwell',
            title: 'aaa',
            year: 1949
        }
    ];



    function findBook(id) {
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                return books[i];
            }
        }
        return null;
    }

    function removeBook(id) {
        var bookIndex = 0;
        for (var i = 0; i < books.length; i++) {
            if (books[i].id === id) {
                bookIndex = i;
            }
            books.splice(bookIndex, 1);
        }
    }

    app.configure(function () {
        app.use(express.bodyParser());
    });

    var allowCrossDomain = function (request, response, next) {
        response.header('Access-Control-Allow-Origin', '*');
        response.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
        response.header('Access-Control-Allow-Headers', 'Content-Type');
        response.removeHeader('X-Powered-By');

        if ('OPTIONS' === request.method) {
            response.send(200);
        } else {
            next();
        }
    };

    app.configure(function () {
        app.use(allowCrossDomain);
    });

    app.get('/books', function (request, response) {
        console.log('In GET function ');
        response.json(books);
    });

    app.get('/books/:id', function (request, response) {
        console.log('Getting a book with id ' + request.params.id);
        var book = findBook(parseInt(request.params.id));
        if (book === null) {
            response.send(404);
        } else {
            response.json(book);
        }
    });

    app.post('/books/', function (request, response) {
        var book = request.body;
        console.log('Saving book with the following structure ' + JSON.stringify(book));
        book.id = bookId++;
        books.push(book);
        response.send(book);
    });

    app.put('/books/:id', function (request, response) {
        var book = request.body;
        console.log('Updating Book ' + JSON.stringify(book));
        var currentBook = findBook(parseInt.params.id, 10);
        if (currentBook === null) {
            response.send(404);
        } else {
            currentBook.title = book.title;
            currentBook.year = book.year;
            currentBook.author = book.author;
            response.send(book);
        }
    });

    app.delete('/books/:id', function (request, response) {
        console.log('calling delete');
        var book = findBook(parseInt(request.params.id, 10));
        if (book === null) {
            console.log('Could not find book');
            response.send(404);
        } else {
            console.log('Deleting ' + request.params.id);
            removeBook(parseInt(request.params.id), 10);
            response.send(200);
        }
        response.send(200);
    });

    app.get('/hello', function (request, response) {
        var user = {
            name: 'wushuyi'
        };
        response.json(user);
    });

    app.get('/test', function (request, response) {
        var user = {
            name: 'balabala'
        };
        response.json(user);
    });

    app.listen(3000);
})();