import React from 'react'
import { Component, PropTypes } from 'react'
import merge from 'lodash.merge'
import MapboxGl from 'mapbox-gl/dist/mapbox-gl.js'
import _ from 'underscore';

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

        let features2 = _.filter(features, (f) => {
            return f.layer.id === 'sourceID-fill-layer';
        });

        if (features2.length === 0) {
            return null;
        }

        const renderFeature = (feature, i) => {
                let ward = feature.properties.WARD_PRECI.slice(0,2);
                let precinct = feature.properties.PRECINCT;
            return (`<div key=${i}> \
                  <p className='mr3'> \
                    <strong>Ward:</strong> ${ward}\
                  </p> \
                  <p className='mr3'> \
                    <strong>Precinct:</strong>${precinct} \
                  </p> \
                  <p className='mr3'> \
                    <strong>Turnout:</strong>${feature.properties.turnout}% \
                  </p> \
                </div> \
            `);
        };

        let toRender = (`<div> \
                ${features2.map(renderFeature)}
                        </div>`);

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
