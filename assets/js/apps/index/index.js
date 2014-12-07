define(function (require) {
    'use strict';

    var domReady = require('domReady'),
        Backbone = require('Backbone');

    domReady(function () {
        var Book = Backbone.Model.extend({
            urlRoot: 'http://localhost:8080/books/',
            parse: function(response, xhr){
                response.bookType = 'ebook';
                return response;
            },
            initialize: function () {
                console.log('a new book');
                this.on('change', function () {
                    console.log('Model Changed');
                    console.log(this.changed);
                    if (this.hasChanged('name')) {
                        console.log('The name has changed from ' + this.previous('name') + ' to ' + this.get('name'));
                    }
                });
                this.on('change:name', function () {
                    console.log('The name attribus has changed');
                });
                this.on('invalid', function (model, error) {
                    console.log('**Validation Error', +error + "**");
                });
            },
            defaults: {
                name: 'Book Title',
                author: 'No One'
            },
            printDetails: function () {
                console.log(this.get('name') + ' by ' + this.get('author'));
            },
            validate: function (attrs) {
                //console.log(arguments);
                if (attrs.year < 2000) {
                    return 'Year must be after 2000';
                }
                if (!attrs.name) {
                    return 'A name must be provided';
                }
            }
        });


        var thisBook = new Book();

        thisBook.printDetails();

        //thisBook.save(thisBook.attribute, {
        //    success: function(model, response, options){
        //        console.log('Model saved');
        //        console.log('Id: ' + thisBook.get('id'));
        //        console.log(arguments);
        //    },
        //    error: function(model, xhr, options){
        //        console.log('Failed to save model');
        //        console.log(arguments);
        //    }
        //});
        //
        //thisBook.fetch({
        //   success: function(model, response, options){
        //       console.log('Fetch success');
        //   },
        //    error: function(model, response, options){
        //        console.log('Fetch error');
        //    }
        //});
        //
        //thisBook.destroy({
        //    success: function(model, response, options){
        //        console.log('Destroy success');
        //    },
        //    error: function(model, response, options){
        //        console.log('Destory error');
        //    },
        //    wait: true
        //});

        var Ebook = Book.extend({
            getWebLink: function(){
                return 'http://www.apress.com/' + this.get(name);
            },
            printDetails: function(){
                console.log('An ebook');
                Book.prototype.printDetails.call(this);
            }
        });

        var Library = Backbone.Collection.extend({
            initialize: function(){
                console.log('Creating a new library collection');
            }
        });


        var bookOne = new Book({name: 'Beginning Backbone', author: 'James Sugrue'});
        var bookTwo = new Book({name: 'Pro Javascript Design Patterns', author: 'Dustin Diaz, Ross Harmes'});

        var myLibrary = new Library([bookOne, bookTwo]);
        console.log('Library contains ' + myLibrary.length + ' books');

        var bookThree = new Book({name: 'Pro Node.js for Developers', author: 'Colin J.Ihrig'});
        myLibrary.add(bookThree);
        console.log('Library contains ' + myLibrary.length + ' books');

        var bookFour = new Book({name: 'Pro jQuery', author: 'Adam Freeman'});
        var bookFive = new Book({name: 'Pro Javascript Performance', author: 'Tom Barker'});

        myLibrary.add([bookFour, bookFive]);
        console.log('Library contains ' + myLibrary.length + ' books');

        myLibrary.add(bookOne, {merage: true});
        console.log('Library contains ' + myLibrary.length + ' books');

        myLibrary.push(bookFive);
        console.log('Library contains ' + myLibrary.length + ' books');

        //myLibrary.unshift(bookFive);
        //console.log('Library contains ' + myLibrary.length + ' books');
        window.myLibrary = myLibrary;
    });
});