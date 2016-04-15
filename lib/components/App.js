import React, {Component, PropTypes} from 'react'

import FiberMap from './FiberMap'
import FiberCostTable from './FiberCostTable'

export default class App extends Component {

  render(){
    const { fibers } = this.props    
    return <div>
      <nav className="nav-wrapper orange darken-2">
        <a href="#" className="brand-logo center">Fiber Costs</a>
      </nav>
      <div className="row">
        <div className="col s4">
          <FiberCostTable {...this.props}/>
        </div>
        <div className="col s8">
          <FiberMap {...this.props}/>
          <div className="card">
            <div className="card-content">
              <span className="card-title">Key</span>
              <p><i className="material-icons circle yellow lighten-2">_</i> Standard Pricing<br/>
              <i className="material-icons circle orange lighten-2">_</i> Increased Pricing (Schools Nearby)<br/>
              <i className="material-icons circle red lighten-2">_</i> High Pricing (Multiple Hazards)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
