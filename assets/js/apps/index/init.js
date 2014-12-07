/**
 * Created by wushuyi on 2014/12/7.
 */
define(function (require) {
    'use strict';

    require('css!styles/starsbg');
    var domReady = require('domReady');
    var domready = function (dom){
        console.log(dom);
    };
    domReady(domready);
});