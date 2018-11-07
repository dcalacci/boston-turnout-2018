const csv=require('csvtojson')
const _ = require('underscore')
const fs = require('fs');


csv()
    .fromFile('./3pm-turnout.csv')
    .then((jsonObj)=>{

        // remove first two elements
        jsonObj.shift();
        jsonObj.shift();

        let data = []

        _.each(jsonObj, function (row) {
            let wardNo = _.values(row)[0].split(" ")[1]

            if (wardNo) {
                _.each(_.pairs(row), function (p, i) {
                    if (p[1] != '' && i != 0 && i != 24) {
                        data.push({
                            ward: Number(wardNo),
                            precinct: Number(i),
                            turnout: p[1],
                            turnoutNo: Number(p[1].split("%")[0])
                        });
                    }
                });
            }
        });
        //        console.log(data);
        let strData = JSON.stringify(data);
        fs.writeFile('turnout.json', strData, 'utf8', function () {
            console.log("Wrote file to disk!")
            console.log("Example row:")
            console.log(data[0])
        });
    });
