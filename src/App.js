import React, { Component } from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Popup from './Popup';
import Map from './Map'
import Source from './Source'
import Layer from './Layer'
import Basemap from './Basemap'
import OpacitySlider from './OpacitySlider'
import Checkbox from 'material-ui/Checkbox'
import _ from 'underscore';

import Precincts from './Precincts_2017.json';
import turnout from './turnout.json';

_.each(Precincts.features, function (feature, i) {
    var ward = feature.properties.WARD_PRECI.slice(0,2);
    var precinct = feature.properties.PRECINCT;
    console.log("precinct/ward:", Number(precinct), Number(ward));
    var turnoutObj = _.find(turnout, function (t) {
        return (Number(t.precinct) == Number(precinct) && Number(t.ward) == Number(ward))
    });

    if (turnoutObj) {
        console.log("found:", turnoutObj, "using turnout", turnoutObj.turnoutNo);
        feature.properties.turnout = Number(turnoutObj.turnoutNo);
    } else {
        feature.properties.turnout = 0;
    }
});

class App extends Component {
    state = {
        sliderValue: 0.5,
        precinct: {
            isLayerChecked: true
        },
        turnout: {
            isLayerChecked: false
        },
        orange: {
            isLayerChecked: false
        }
    }

    handleSlider = (event, value) => {
        this.setState({sliderValue: value});
    }

    handleCheckbox = (event, isInputChecked) => {
        this.setState({
            [event.target.value]: {
                isLayerChecked: isInputChecked
            }
        });
    }

    render() {
        return (
            <MuiThemeProvider>
              <div className='App'>
                <div className='App-header'>
                  <h2>Boston 2018 Midterm Turnout (updated 3pm)</h2>
                </div>
                <Map>
                  <Source
                    id='sourceID'
                    data={Precincts}
                    type='geojson'
                    layer='precinct-data'
                    >
                    <Popup/>
                    <Layer
                      id='line-layer'
                      type='line'
                      paint={{
                          'line-color': '#34495e'
                      }}
                      sliderValue={this.state.sliderValue}
                      isLayerChecked={this.state.precinct.isLayerChecked}
                      />
                    <Layer
                      id='fill-layer'
                      type='fill'
                      paint={{
                          'fill-color': {
                              property: 'turnout',
                              stops: [[10, "#AA4639"],
                                      [20, '#AA6D39'],
                                      [30, '#AA9D39'],
                                      [40, '#064918']]
                          }
                      }}
                      sliderValue={this.state.sliderValue}
                      isLayerChecked={this.state.turnout.isLayerChecked}
                      />
                  </Source>
                  <Basemap
                    isLayerChecked={this.state.orange.isLayerChecked}
                    />
                </Map>
                <OpacitySlider
                  handleSlider={this.handleSlider}
                  sliderValue={this.state.sliderValue}
                  />
                <div>
                  <Checkbox
                    label='Show Precinct and Ward outlines'
                    onCheck={this.handleCheckbox}
                    checked={this.state.precinct.isLayerChecked}
                    value='precinct'
                    />
                  <Checkbox
                    label='Show Voter Turnout'
                    onCheck={this.handleCheckbox}
                    checked={this.state.turnout.isLayerChecked}
                    value='turnout'
                    />
                  <Checkbox
                    label='Paint water orange'
                    onCheck={this.handleCheckbox}
                    checked={this.state.orange.isLayerChecked}
                    value='orange'
                    />
                </div>
              </div>
            </MuiThemeProvider>
        )
    }
}

export default App
