# Boston Turnout 2018

Using mapbox.gl and react


## building etc

run 
```
yarn build
```

to build.


run 
```
yarn start
```

to start locally in dev mode. Haven't been able to get hot module reloading to
work, so when you make a change, ctrl+c and run `yarn start` again. 

## To add another layer

either add a new `<Source/>` component under `<Map/>`, and use that source ID in
a layer component, or add the data to the data used in the source component
that's there using the code that adds turnout data:

```
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
```

the game is just to match the object and add `feature.properties.MyProperty` to each feature.
