import React, {Component, PropTypes} from 'react'
import geolib from 'geolib'
import _ from 'lodash'
import { NEARBY_SCHOOL } from '../constants'

// React component for visualizing fiber locations on a map
export default class FiberCostTable extends Component {

  render(){
    const { fibers } = this.props

    // implement the table header
    const rowHeaders = <thead><tr><th>ID</th><th>Cost($)</th><th>Distance</th></tr></thead> 
    //

    const rowElements = _.map(fibers, (fiber, i) => {


      // add logic here to highlight the selected fibers (rows)
      // hint: check the flag: fiber.isSelected
      // hint: (1) add "backgroundColor" in style={}, or
      // (2) add a color word, like className="row yellow"

      let className = 'row'// !fiber.isSelected ? 'row' : 'row yellow'

      // get coordinates of schools, package into array of coords
      const schoolObj = store.reqSchools.elements
      var schoolArr = []

      _.forEach(schoolObj, function(val, key) {
        schoolArr.push({'latitude': val.lat, 'longitude': val.lon})
      })

      var schoolDist = geolib.orderByDistance(store.selectedPosition, schoolArr)[0].distance

      if (fiber.isSelected == true) {
        if (schoolDist <= NEARBY_SCHOOL) {
          className = 'row orange lighten-2'
        }
        else {
          className = 'row yellow lighten-2'
        }
      }

      return <tbody key={i} className={className} style={{marginBottom:0}}>
        <tr> 
          <td>{i}</td>
          <td>{fiber.cost.toFixed(0)}</td>
          <td>{fiber.distance}</td> 
        </tr>
      </tbody>

    })

    return <table>
      { rowHeaders }
      { rowElements }
    </table>

  }

}