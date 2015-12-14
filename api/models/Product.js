/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

  	ProductId : { type:'integer', primaryKey:true, autoIncrement: true},
  	ProductName : {type:'string'},
  	ProductImage: {type:'string'},
  	Price : {type:'integer'}

  }
};

