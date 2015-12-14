/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    Create: function(req, res) {

        var product = req.params.all();
        product.ProductName = product.PName;
        product.Price = product.PPrice;
        var uploadFile = req.file('PImage')
            //console.log(uploadFile);
        uploadFile.upload({
            saveAs: function(file, cb) {
                cb(null, file.filename);
            },
            dirname: '../../assets/images/',
            // dirname :require('path').resolve(sails.config.appPath, '/assets/images'),
            maxBytes: 100000000
        }, function(err, files) {
            if (err)
                return res.serverError(err);
            else {
                if (files.length > 0) {
                    product.ProductImage = "/images/" + files[0].filename;
                }
                else{
                    product.ProductImage = "";
                }
              
                Product.create(product).exec(function(err, data) {

                    return res.json({
                        message: files.length + ' file(s) uploaded successfully!',
                        files: files,
                        data: data


                    });


                });
            }


        });


    },

    Update: function(req, res) {
        var product = req.params.all();
        product.ProductName = product.PName;

        product.Price = product.PPrice;
        product.ProductImage = product.PImagePath;
        var productId = product.PId;
        var uploadFile = req.file('PImage')
            //console.log(uploadFile);
        uploadFile.upload({
            saveAs: function(file, cb) {
                cb(null, file.filename);
            },
            dirname: '../../assets/images/',
            // dirname :require('path').resolve(sails.config.appPath, '/assets/images'),
            maxBytes: 100000000
        }, function(err, files) {
            if (err)
                return res.serverError(err);
            else {

                if (files.length > 0) {
                    product.ProductImage = "/images/" + files[0].filename;
                }


                Product.update(productId, product).exec(function(err, data) {

                    return res.json({
                        message: ' file(s) uploaded successfully!',

                        data: data

                    });


                });
            }


        });


    }

};


/* req.file('avatar')
   .upload({

     // You can apply a file upload limit (in bytes)
     maxBytes: 1000000

   }, function whenDone(err, uploadedFiles) {
     if (err) return res.serverError(err);
     else return res.json({
       files: uploadedFiles,
       textParams: req.params.all()
     });
   });*/