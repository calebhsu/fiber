import React, {Component, PropTypes} from 'react'

import _ from 'lodash'

// React component for visualizing fiber locations on a map
export default class FiberCostTable extends Component {

  render(){
    const { fibers } = this.props

    // implement the table header
    const rowHeaders = <thead><th>ID</th><th>Cost($)</th><th>Distance</th></thead>

    const rowElements = _.map(fibers, (fiber, i) => {

      // add logic here to highlight the selected fibers (rows)
      // hint: check the flag: fiber.isSelected
      // hint: (1) add "backgroundColor" in style={}, or
      // (2) add a color word, like className="row yellow"

      let className = 'row'//!fiber.isSelected ? 'row' : 'row yellow'

      if (fiber.isSelected == true) {
        className = 'row yellow'
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