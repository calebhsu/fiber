import store from './store'
import refresh from './refresh'
import _ from 'lodash'
import geolib from 'geolib'
import $ from 'jquery'
import { NEARBY_METERS } from './constants'
var xhr = require('node-xhr');

//
// Action functions
//

// Action to load fiber data asynchrnously

var return_first = function () {

  var postData = 'data=\n[out:json][timeout:25];\n(\n\tnode["amenity"="school"](39.9440,-105.3994,40.1148,-105.0801);\n);\nout body;\n>;\nout skel qt;\n'
  var resp;
  var tmp = null;
  $.ajax({
      async: false,
      url: "https://overpass-api.de/api/interpreter",
      type: 'POST',
      data: postData,
      success: function (result) {
          if(result){
            tmp = result;
          }
      },
      error: function () {
          alert("error");
      }
  });
  store.reqSchools = tmp
  return tmp;
}();


export function loadDataAsync(){
  

  $.ajax('data/boulder.json').done(function(json) {
    store.geometries = json

    let fibers = {}

    store.fibers = _.map(json, (d) => {

      // hint: use geolib.getCenter()
      const center = geolib.getCenter(d.coordinates)

      return {
        geometry: d,
        center: center
      }
    })

    refresh()
  })
}

// Action to set a position selected by the user
export function setSelectedPosition(latlng) {
  store.selectedPosition = latlng

  _.forEach(store.fibers, forEachFiberSetIsSelected)

  _.forEach(store.fibers, forEachFiberSetCost)

  refresh()
}

//
// private helper function
//

// helper to set each fiber's 'isSelected' flag based on whether this fiber is
// nearby with respect to the position selected by the user
function forEachFiberSetIsSelected(fiber){

   // implement the logic to set fiber.isSelected if the fiber's geometry center
   // is within a certain distance from the selected position 'NEARBY_METERS'
   // hint: use geolib.getDistance()

    if (geolib.getDistance(store.selectedPosition, fiber.center) <= NEARBY_METERS) {
      fiber.isSelected = true
    }
    else { fiber.isSelected = false }
  
}

// helper to set the cost of connecting this fiber to the selected position
function forEachFiberSetCost(fiber){

  // implement the logic to calcualte the cost of connecting from the selected
  // position to this fiber, and the distance between them.
  
  fiber.distance = geolib.orderByDistance(store.selectedPosition, fiber.geometry.coordinates)[0].distance
  fiber.cost = 0

  for (var i = return_first.elements.length-1; i > 0; i--){

    var d  = geolib.orderByDistance({latitude: return_first.elements[i].lat, longitude: return_first.elements[i].lon}, fiber.geometry.coordinates)[0].distance
    
    if( d <= NEARBY_METERS){
      fiber.cost = fiber.distance * 20
      break;

    }
    else if(d > NEARBY_METERS)
    {
      fiber.cost =  fiber.distance *10
    }
  }
}

