import React from 'react'
import { Component, PropTypes } from 'react'
import merge from 'lodash.merge'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'

export default class PopUp extends Component {

    state = {
        features: [],
        lng: 0,
        lat: 0
    }

    static contextTypes = {
        map: PropTypes.object,
    }

    onMouseMove = (event) => {
        const { map } = this.context;
        const features = map.queryRenderedFeatures(event.point);
        console.log("features:", features);
        console.log("event:", event);
        this.setState({features: features});
        this.setState({lng: event.lngLat[0],
                       lat: event.lngLat[1]});
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';

        this.tooltip.setLngLat(event.lngLat)
            .setHTML(this.renderToolTip())
            .addTo(map);
    }

    componentWillMount() {
        const { map } = this.context;
        map.on('click', this.onMouseMove);
    }

    componentDidMount() {
        this.tooltip = new MapboxGl.Popup({
            closeButton: false,
            closeOnClick: false
        });
    };

    renderToolTip() {
        const features = this.state.features;

        const renderFeature = (feature, i) => {
            return (
                <div key={i}>
                  <strong className='mr3'>
                    {feature.PRECINCT}
                  </strong>
                  <strong className='mr3'>
                    {feature.turnout}%
                  </strong>
                </div>
            );
        };

        let toRender = (<div>
                {features.map(renderFeature)}
                        </div>);

        console.log(toRender);
        return toRender;
    };

    // render() {
    //     return (
    //         <Popup
    //           coordinates={[this.state.lng, this.state.lat]}
    //           offset={{'bottom-left': [-120,0]}}>
    //           {this.renderTooltip()}
    //         </Popup>
    //     );
    // }

    render() {
        return null;
    }
}
