'use strict';

var offerTitles = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var offerCheckIns = ['12:00', '13:00', '14:00'];
var offerFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var offerFotos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

/**
 * Getting a random integer between two values
 * @param {number} min The minimum is inclusive
 * @param {number} max The maximum is exclusive
 * @return {*} A random integer between the specified values
 */
function getRandomInt(min, max) {
  // min = Math.ceil(min);
  // max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomArrayValue(arr) {
  if (!arr || arr.length === 0) {
    throw Error('not array');
  }
  return arr[getRandomInt(0, arr.length)];
}

function Offer(i) {
  this.author = {avatar: 'img/avatars/user0' + i + '.png'};
  this.offer = {
    title: offerTitles[i],
    address: getRandomInt(0, 601).toString() + ', ' + getRandomInt(0, 601).toString(),
    price: getRandomInt(100, 1000001),
    type: getRandomArrayValue(offerTypes),
    rooms: getRandomInt(1, 6),
    guests: getRandomInt(1, 6),
    checkin: getRandomArrayValue(offerCheckIns),
    checkout: getRandomArrayValue(offerCheckIns),
    features: getRandomArrayValue(offerFeatures), // TODO more complex
    description: '',
    photos: getRandomArrayValue(offerFotos) // TODO more complex
  };
}

var offers = [];
var i = 0;
for (; i < 8; i++) {
  offers.push(new Offer(i));
}
// console.log(offers);
document.querySelector('.map').classList.remove('map--faded');
var fragmentMapCard = document.querySelector('template').content;

/**
 * .map__pin creating
 * @param {Offer} offer
 * @param {Node} tMapPin template
 * @return {Node}
 */
function createMapPin(offer, tMapPin) {
  var SHIFT_X = -33;
  var SHIFT_Y = -55;
  var mapPin = tMapPin.cloneNode(true);
  var location = offer.offer.address.split(',');
  mapPin.style.left = (parseInt(location[0], 10) + SHIFT_X).toString() + 'px';
  mapPin.style.top = (parseInt(location[1], 10) + SHIFT_Y).toString() + 'px';
  var img = mapPin.querySelector('img');
  img.src = offer.author.avatar;
  img.alt = offer.offer.title;
  return mapPin;
}

var tMapPin = fragmentMapCard.querySelector('.map__pin');
var mapPinsFragment = document.createDocumentFragment();
for (i = 0; i < offers.length; i++) {
  mapPinsFragment.appendChild(createMapPin(offers[i], tMapPin)); // adding pins
}
var mapPinsBlock = document.querySelector('.map__pins');
mapPinsBlock.appendChild(mapPinsFragment); // render pins

