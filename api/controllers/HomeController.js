/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	index : function (req, res) {

	console.log("home");
 	res.view('home');
		// body...
	}
	
};

