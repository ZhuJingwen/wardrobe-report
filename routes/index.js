var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// our db model
var Wardrobe = require("../models/model.js");

/**
 * GET '/'
 * Default home route. Just relays a success message back.
 * @param  {Object} req
 * @return {Object} json
 */
router.get('/', function(req, res, next) {
  
  var jsonData = {
  	'name': 'wardrobe-report',
  	'api-status':'OK'
  }

  // respond with json data
  res.json(jsonData)
});


router.get('/wardrobe', function(req, res){
  res.render('wardrobe.html');
});
/**
 * POST '/api/create'
 * Receives a POST request of the new user and location, saves to db, responds back
 * @param  {Object} req. An object containing the different attributes of the Person
 * @return {Object} JSON
 */

router.post('/api/create', function(req, res, next){

    console.log(req.body);

    // pull out the information from the req.body
    var name = req.body.name;
    var category = req.body.category;
    var brand = req.body.brand;
    var pattern = req.body.pattern;
    var color = req.body.color.split(",");
    var material = req.body.material.split(","); // split string into array
    var style = req.body.style;
    var season = req.body.season;
    var year = req.body.year;
    var location = req.body.location;
    var url = req.body.url;

    // hold all this data in an object
    // this object should be structured the same way as your db model
    var wardrobeObj = {
      name: name,
      category: category,
      brand: brand,
      pattern: pattern,
      color: color,
      material: material,
      style: style,
      purchaseTime: {
        season: season,
        year: year
      },
      location: location,
      url: url
    };

    // create a new wardrobe model instance, passing in the object
    var wardrobe = new Wardrobe(wardrobeObj);

    // now, save that wardrobe instance to the database
    // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model-save    
    wardrobe.save(function(err,data){
      // if err saving, respond back with error
      if (err){
        var error = {status:'ERROR', message: 'Error saving clothes'};
        return res.json(error);
      }

      console.log('saved a new cloth!');
      console.log(data);

      // now return the json data of the new clothes
      var jsonData = {
        status: 'OK',
        wardrobe: data
      }

      return res.json(jsonData);

    })  
});

// /**
//  * GET '/api/get/:id'
//  * Receives a GET request specifying the wardrobe to get
//  * @param  {String} req.param('id'). The wardrobeId
//  * @return {Object} JSON
//  */

router.get('/api/get/:id', function(req, res, next){

  var requestedId = req.param('id');

  // mongoose method, see http://mongoosejs.com/docs/api.html#model_Model.findById
  Wardrobe.findById(requestedId, function(err,data){

    // if err or no user found, respond with error 
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that clothes'};
       return res.json(error);
    }

    // otherwise respond with JSON data of the clothes
    var jsonData = {
      status: 'OK',
      wardrobe: data
    }

    return res.json(jsonData);
  
  })
})

router.get('wardrobe', function(req, res){
res.render('wardrobe.html')
});

// /**
//  * GET '/api/get'
//  * Receives a GET request to get all clothes details
//  * @return {Object} JSON
//  */

router.get('/api/get', function(req, res, next){

  // mongoose method to find all, see http://mongoosejs.com/docs/api.html#model_Model.find
  Wardrobe.find(function(err, data){
    // if err or no clothes found, respond with error 
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find clothes'};
      return res.json(error);
    }

    // otherwise, respond with the data 

    var jsonData = {
      status: 'OK',
      wardrobe: data
    } 

    res.json(jsonData);

  })

})

// /**
//  * POST '/api/update/:id'
//  * Receives a POST request with data of the wardrobe to update, updates db, responds back
//  * @param  {String} req.param('id'). The wardrobeId to update
//  * @param  {Object} req. An object containing the different attributes of the Wardrobe
//  * @return {Object} JSON
//  */

router.post('/api/update/:id', function(req, res, next){

   var requestedId = req.param('id');

   var dataToUpdate = {}; // a blank object of data to update

    // pull out the information from the req.body and add it to the object to update
    var name, category, brand, pattern, color, season, year, location, url; 

    // we only want to update any field if it actually is contained within the req.body
    // otherwise, leave it alone.
    if(req.body.name) {
      name = req.body.name;
      // add to object that holds updated data
      dataToUpdate['name'] = name;
    }
    if(req.body.category) {
      category = req.body.category;
      // add to object that holds updated data
      dataToUpdate['category'] = category;
    }
    if(req.body.brand) {
      brand = req.body.brand;
      // add to object that holds updated data
      dataToUpdate['brand'] = brand;
    }
    if(req.body.pattern) {
      pattern = req.body.pattern;
      // add to object that holds updated data
      dataToUpdate['pattern'] = pattern;
    }
    if(req.body.season) {
      season = req.body.season;
      // add to object that holds updated data
      dataToUpdate['purchaseTime'] = {};
      dataToUpdate['purchaseTime']['season'] = season;
    }
    if(req.body.year) {
      year = req.body.year;
      // add to object that holds updated data
      if(!dataToUpdate['purchaseTime']) dataToUpdate['purchaseTime'] = {};
      dataToUpdate['purchaseTime']['year'] = year;
    }
    if(req.body.location) {
      location = req.body.location;
      // add to object that holds updated data
      dataToUpdate['location'] = location;
    }
    if(req.body.url) {
      url = req.body.url;
      // add to object that holds updated data
      dataToUpdate['url'] = url;
    }

    var material = []; // blank array to hold tags
    if(req.body.material){
      material = req.body.material.split(","); // split string into array
      // add to object that holds updated data
      dataToUpdate['material'] = material;
    }

    var style = []; // blank array to hold tags
    if(req.body.style){
      style = req.body.style.split(","); // split string into array
      // add to object that holds updated data
      dataToUpdate['style'] = style;
    }

    var color = []; // blank array to hold tags
    if(req.body.color){
      color = req.body.color.split(","); // split string into array
      // add to object that holds updated data
      dataToUpdate['color'] = color;
    }


    console.log('the data to update is ' + JSON.stringify(dataToUpdate));

    // now, update that clothes
    // mongoose method findByIdAndUpdate, see http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate  
    Wardrobe.findByIdAndUpdate(requestedId, dataToUpdate, function(err,data){
      // if err saving, respond back with error
      if (err){
        var error = {status:'ERROR', message: 'Error updating wardrobe'};
        return res.json(error);
      }

      console.log('updated the wardrobe!');
      console.log(data);

      // now return the json data of the new person
      var jsonData = {
        status: 'OK',
        wardrobe: data
      }

      return res.json(jsonData);

    })

})

/**
 * GET '/api/delete/:id'
 * Receives a GET request specifying the wardrobe to delete
 * @param  {String} req.param('id'). The wardrobeId
 * @return {Object} JSON
 */

router.get('/api/delete/:id', function(req, res, next){

  var requestedId = req.param('id');

  // Mongoose method to remove, http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  Wardrobe.findByIdAndRemove(requestedId,function(err, data){
    if(err || data == null){
      var error = {status:'ERROR', message: 'Could not find that clothes to delete'};
      return res.json(error);
    }

    // otherwise, respond back with success
    var jsonData = {
      status: 'OK',
      message: 'Successfully deleted id ' + requestedId
    }

    res.json(jsonData);

  })

})

module.exports = router;