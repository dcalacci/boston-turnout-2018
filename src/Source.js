import React, { Component, PropTypes } from 'react'

export default class Source extends Component {

    static propTypes = {
        id: PropTypes.string,
        url: PropTypes.string,
        data: PropTypes.object,
        type: PropTypes.string,
        layer: PropTypes.string,
        children: PropTypes.node
    }

    static contextTypes = {
        map: PropTypes.object
    }

    componentWillMount() {
        const { map } = this.context
        const {
            id,
            url,
            data,
            type
        } = this.props;

        if (type == 'url') {
            map.addSource(id, { type, url });
        } else if (type == 'geojson') {
            map.addSource(id, {type, data});
        }
    }

    componentWillUnmount() {
        const { map } = this.context
        const { id } = this.props
        map.removeSource(id)
    }

    render() {
        console.log("id and layer:", this.props.id, this.props.layer);
        return (
            <div>
              {this.props.children &&
                  React.Children.map(this.props.children, child => (
                      React.cloneElement(child, {
                          sourceId: this.props.id,
                          sourceLayer: this.props.layer
                      })
                  ))
              }
            </div>
        )
    }
}
