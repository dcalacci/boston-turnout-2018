import React from 'react'
import { Component, PropTypes } from 'react'
import { Popup } from "react-mapbox-gl";
import merge from 'lodash.merge'

export default class Layer extends Component {

    state = {
        features: [],
        lng: 0,
        lat: 0
    }

    static propTypes = {
        id: PropTypes.string,
        sourceId: PropTypes.string,
        closeButton: PropTypes.boolean,
        closeOnClick: PropTypes.boolean,
        before: PropTypes.string
    }

    static contextTypes = {
        map: PropTypes.object,
    }

    onMouseMove = (event) => {
        const { map } = this.context;
        const features = this.map.queryRenderedFeatures(event.point);
        console.log("features:", features);
        this.setState({features: features});
        this.setState({lng: event.lnglat[0],
                       lat: event.lnglat[1]});
        //this.tooltip.setLngLat(event.lngLat);
        map.getCanvas().style.cursor = features.length ? 'pointer' : '';
    }

    componentWillMount() {
        const { map } = this.context;
        const {
            id,
            closeButton,
            closeOnClick,
            before
        } = this.props;

        map.on('mousemove', this.onMouseMove);
    }

    componentWillReceiveProps(nextProps) {
        const { map } = this.context;
    }

    componentWillUnmount() {
        const { map } = this.context
        const { id, sourceId } = this.props
        const layerId = `${sourceId}-${id}`
        // map.removeLayer(layerId)
    }

    componentDidMount() {
        const { map } = this.context
    }

    renderTooltip() {
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



        return (
            <div className="flex-parent-inline flex-parent--center-cross flex-parent--column absolute bottom">
              <div className="flex-child px12 py12 bg-gray-dark color-white shadow-darken10 round txt-s w240 clip txt-truncate">
                {features.map(renderFeature)}
              </div>
              <span className="flex-child color-gray-dark triangle triangle--d"></span>
            </div>
        );
    };

    render() {
        return (
            <Popup
              coordinates={[this.state.lng, this.state.lat]}
              offset={{'bottom-left': [-120,0]}}>
              {this.renderFeature()}
            </Popup>
        );
    }
    
}
