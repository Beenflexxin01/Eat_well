const express = require('express');
const uuid = require('uuid'); //install uuid

const resData = require('../util/browse-data');

const router = express.Router();

router.post('/share', function (req, res) {
    const restaurant = req.body;
    restaurant.id = uuid.v4();

    const restaurants = resData.getStoredRestaurants();

    restaurants.push(restaurant);

    resData.storeRestaurants(restaurants);

    res.redirect('/confirm')
});
router.get('/browse', function (req, res) {
    let order = req.query.order;
    let nextOrder = 'desc';

    if (order !== 'asc' && order !== 'desc') {
        order = 'asc';
    }

    if (order === 'desc') {
        nextOrder = 'asc';
    }

    const storedRestaurants = resData.getStoredRestaurants();

    storedRestaurants.sort(function (resA, resB) {
        if (
            (order === 'asc' && resA.name > resB.name) ||
            (order === 'desc' && resA.name > resB.name) 
         ) {
            return 1;
        }
        return -1
    });

    res.render('browse', {
        numberOfRestaurants: storedRestaurants.length,
        restaurants: storedRestaurants,
        nextOrder: nextOrder
    });
});

//To make a selected restaurant stand on its own.
router.get('/browse/:id', function (req, res) {
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

    for (const restaurant of storedRestaurants) {
        if (restaurant.id === restaurantId) {
            return res.render('restaurant-details', { restaurant: restaurant });
        }
    }

    res.status(404).render('404');
});

router.get('/share', function (req, res) {
    res.render('share');
});

router.get('/confirm', function (req, res) {
    res.render('confirm');
});


router.get('/index', function (req, res) {
    res.render('index');
});

module.exports = router

