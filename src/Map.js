import React, { Component, PropTypes } from 'react'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

class Map extends Component {

    static childContextTypes = {
        map: PropTypes.object
    }

    state = {
        map: null
    }

    getChildContext = () => ({
        map: this.state.map
    })

    componentDidMount() {
        MapboxGl.accessToken = 'pk.eyJ1IjoiYWxscnlkZXIiLCJhIjoidWs5cUFfRSJ9.t8kxvO3nIhCaAl07-4lkNw'

        const map = new MapboxGl.Map({
            container: this.container,
            style: 'mapbox://styles/mapbox/light-v9'
        })

        map.flyTo({ center: [-71.05, 42.36], zoom: 11 })

        map.on('load', (...args) => {
            this.setState({ map })
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        return (
            nextProps.children !== this.props.children ||
                nextState.map !== this.state.map
        )
    }

    // render () {
    //     return ()<Map
    //     container={this.container}
    //     containerStyle={{height: "30vh",
    //                      width: "80vw"}}
    //     style='mapbox://styles/mapbox/light-v9'>
    //         </Map>
    // }
    render() {
        const { children } = this.props
        const { map } = this.state
        return (
            <div className='Map' ref={(x) => { this.container = x }}>
              { map && children }
            </div>
        );
    }
}

export default Map
