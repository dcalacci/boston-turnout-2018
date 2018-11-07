import { Component, PropTypes } from 'react'

export default class Source extends Component {

  static contextTypes = {
    map: PropTypes.object
  }

  componentWillReceiveProps(nextProps) {
    const { map } = this.context
    const { isLayerChecked } = this.props

    return null
  }

  render() {
    return null
  }
}
