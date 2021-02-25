function askQuestions() {

    document.body.innerHTML = "";
    options.forEach(element => {
        let btn = document.createElement('button');
        btn.innerHTML = element.name;
        btn.addEventListener(
            'click',
            () => {
                generateInputFields(element.key);
            }
        );
        console.log(element);
        document.body.appendChild(btn);
    });
}

function generateInputFields(key) {
    let count = 4;
    // alert(key);  
    let column = document.createElement('div');
    column.setAttribute('id', 'Datum-Plotting');

    // calc_area
    let calc_area_label = document.createElement('label');
    calc_area_label.setAttribute('for', 'calc_area');
    calc_area_label.innerHTML = "Area";

    let calc_area = document.createElement('input');
    calc_area.setAttribute('type', 'checkbox');
    calc_area.setAttribute('id', 'calc_area');
    calc_area.checked = true;

    // calc_lengths
    let calc_lengths_label = document.createElement('label');
    calc_lengths_label.setAttribute('for', 'calc_lengths');
    calc_lengths_label.innerHTML = "Lengths";

    let calc_lengths = document.createElement('input');
    calc_lengths.setAttribute('type', 'checkbox');
    calc_lengths.setAttribute('id', 'calc_lengths');
    calc_lengths.checked = true;

    // calc_bearing
    let calc_bearing_label = document.createElement('label');
    calc_bearing_label.setAttribute('for', 'calc_bearing');
    calc_bearing_label.innerHTML = "Lengths";

    let calc_bearing = document.createElement('input');
    calc_bearing.setAttribute('type', 'checkbox');
    calc_bearing.setAttribute('id', 'calc_bearing');
    calc_bearing.checked = true;

    // Add them to column    
    column.appendChild(calc_area_label);
    column.appendChild(calc_area);

    column.appendChild(calc_lengths_label);
    column.appendChild(calc_lengths);

    column.appendChild(calc_bearing_label);
    column.appendChild(calc_bearing);

    for (let index = 0; index < count; index++) {

        let row = document.createElement('div');
        column.setAttribute('id', 'row-' + count);

        // calc_bearing
        let station_point_label = document.createElement('label');
        station_point_label.setAttribute('for', 'station_point-' + index);
        station_point_label.innerHTML = "PB";

        let station_point = document.createElement('input');
        station_point.setAttribute('type', 'text');
        station_point.setAttribute('id', 'station_point-' + index);

        // calc_bearing
        let northing_label = document.createElement('label');
        northing_label.setAttribute('for', 'northing-' + index);
        northing_label.innerHTML = "N";

        let northing = document.createElement('input');
        northing.setAttribute('type', 'number');
        northing.setAttribute('id', 'northing-' + index);

        // calc_bearing
        let easting_label = document.createElement('label');
        easting_label.setAttribute('for', 'easting-' + index);
        easting_label.innerHTML = "E";

        let easting = document.createElement('input');
        easting.setAttribute('type', 'number');
        easting.setAttribute('id', 'easting-' + index);

        //     <input type="text" name="station_point" id="station_point">
        row.appendChild(station_point_label);
        row.appendChild(station_point);

        row.appendChild(northing_label);
        row.appendChild(northing);

        row.appendChild(easting_label);
        row.appendChild(easting);

        column.appendChild(row);
    }

    let start_botton = document.createElement('button');
    start_botton.setAttribute('type', 'number');
    start_botton.innerHTML = "Process";
    start_botton.addEventListener(
        'click',
        () => {
            processDatumnData(count);
        }
    );
    column.appendChild(start_botton);

    document.body.innerHTML = "";
    document.body.appendChild(column);

    // <div id="Datum-Plotting">
    //     <input type="checkbox" name="calc_area" id="calc_area" checked>
    //     <br>
    //     <input type="checkbox" name="calc_lengths" id="calc_lengths" checked>
    //     <br>
    //     <input type="checkbox" name="calc_bearing" id="calc_bearing" checked>
    //     <br>
    //     <br>
    //     <input type="number" name="station_northing" id="station_northing">
    //     <br>
    //     <input type="number" name="station_easting" id="station_easting">
    // </div>

}

function processDatumnData(count) {
    let datas = [];
    let finalData = [];

    // datas = [
    //     {
    //         PB: "A",
    //         E: 171259,
    //         N: 1000269
    //     },
    //     {
    //         PB: "B",
    //         E: 171307,
    //         N: 1000226
    //     },
    //     {
    //         PB: "C",
    //         E: 171251,
    //         N: 1000161
    //     },
    //     {
    //         PB: "D",
    //         E: 171201,
    //         N: 1000214
    //     }
    // ];

    for (let index = 0; index < count; index++) {
        const PBvalue = document.getElementById('station_point-' + index);
        const Evalue = document.getElementById('easting-' + index);
        const Nvalue = document.getElementById('northing-' + index);
        datas[index] = {
            PB:PBvalue.value,
            E:Number(Evalue.value),
            N:Number(Nvalue.value),            
        }
    }

    for (let i = 0; i < datas.length; i++) {
        datumEasting = datas[i].E - ((i - 1) < 0 ? datas[datas.length - 1].E : datas[i - 1].E);
        datumNorthing = datas[i].N - ((i - 1) < 0 ? datas[datas.length - 1].N : datas[i - 1].N);

        finalData[i] = {
            PB: datas[i].PB,
            E: datas[i].E,
            N: datas[i].N,
            DE: datumEasting,
            DN: datumNorthing,
        };

        console.log(datumNorthing);
        console.log(datumEasting);
    }

    for (let x = 0; x < datas.length; x++) {
        // console.log(tanInverse(0.5));        
        finalData[x].Distance = Math.sqrt(Math.pow(finalData[x].DE, 2) + Math.pow(finalData[x].DN, 2));
        finalData[x].Bearing = tanInverse((finalData[x].DE / finalData[x].DN)) + addDegrees(finalData[x].DE, finalData[x].DN);
        finalData[x].SexBearing = convertDecimalToSexagesimal(finalData[x].Bearing);
    }

    document.body.innerHTML = "";
    document.body.appendChild(tabulateElements(finalData));

    // console.log(calculateArea(finalData,"double-datumn"));
    console.log(finalData);
}

function addDegrees(DE, DN) {
    signs = {
        SE: (DE > 0 ? "+" : "-"),
        SN: (DN > 0 ? "+" : "-")
    }
    // console.log(signs); 

    if (signs.SE === "+" && signs.SN === "+") {
        return 0;
    }
    if (signs.SE === "-" && signs.SN === "+") {
        return 360;
    }
    if (signs.SE === "+" && signs.SN === "-") {
        return 180;
    }
    if (signs.SE === "-" && signs.SN === "-") {
        return 180;
    }

    return 0;
}

function tanInverse(value) {
    let degree = Math.atan(value) * (180 / Math.PI);
    console.log(degree);
    return degree;
}

function convertDecimalToSexagesimal(decimal) {
    let decimalSeconds = Math.round(decimal * 60 * 60);
    let seconds = decimalSeconds % 60;
    let minutes = (decimalSeconds / 60) % 60;
    let degrees = (decimalSeconds / 60) / 60;
    return Math.floor(degrees) + "ᴼ " + Math.floor(minutes) + "' " + seconds + '"';
}

function calculateArea(data, method = "double-datumn") {
    let currentValue = 0;
    let doubleArea = 0;
    if (method === "double-datumn") {
        for (let k = 0; k < data.length; k++) {
            currentValue += data[k].DN
            doubleArea += currentValue * data[k].DE;
            currentValue += data[k].DN
        }
        finalArea = doubleArea / 2;
        return finalArea;
    }
}

function tabulateElements(data) {
    let all = document.createElement("div");
    let table = document.createElement("table");
    let caption = document.createElement("caption");
    let headers = document.createElement("tr");

    caption.innerHTML = "Area For Given Plot : " + calculateArea(data);
    table.appendChild(caption);

    tableHeaders.forEach(headerTilte => {
        let hder = document.createElement("th");
        hder.innerHTML = headerTilte;
        headers.appendChild(hder);
    });
    table.appendChild(headers);

    let Lasting;

    for (let l = 0; l < data.length; l++) {
        pb = data[l];
        if (l == 0) {
            let row = document.createElement("tr");
            let pbName = "<td>" + pb.PB + "</td>";
            let n = "<td> </td>";
            let e = "<td> </td>";
            let dn = "<td> </td>";
            let de = "<td> </td>";
            let d = "<td> </td>";
            let b = "<td> </td>";
            let sb = "<td> </td>";
            row.innerHTML = pbName + n + e + dn + de + d + b + sb;
            table.appendChild(row);

            row = document.createElement("tr");
            pbName = "<td>" + pb.PB + "</td>";
            n = "<td>" + pb.N + "</td>";
            e = "<td>" + pb.E + "</td>";
            dn = "<td>" + pb.DN + "</td>";
            de = "<td>" + pb.DE + "</td>";
            d = "<td>" + pb.Distance + "</td>";
            b = "<td>" + pb.Bearing + "</td>";
            sb = "<td>" + pb.SexBearing + "</td>";
            row.innerHTML = pbName + n + e + dn + de + d + b + sb;
            Lasting = row;
        }else{
            let row = document.createElement("tr");
            let pbName = "<td>" + pb.PB + "</td>";
            let n = "<td>" + pb.N + "</td>";
            let e = "<td>" + pb.E + "</td>";
            let dn = "<td>" + pb.DN + "</td>";
            let de = "<td>" + pb.DE + "</td>";
            let d = "<td>" + pb.Distance + "</td>";
            let b = "<td>" + pb.Bearing + "</td>";
            let sb = "<td>" + pb.SexBearing + "</td>";
            row.innerHTML = pbName + n + e + dn + de + d + b + sb;
            table.appendChild(row);
        }
        
    }
    table.appendChild(Lasting);
    table.className = "resultTable";

    all.appendChild(table);

    return all;
}

window.onload = function () {
    askQuestions();
}

tableHeaders = [
    "Station Point",
    "Northing",
    "Easting",
    "Datumn Northing",
    "Datumn Easting",
    "Distance",
    "Bearing Decimal",
    "Bearing Sexagecimal"
]

options = [
    {
        name: "Datum Plotting",
        key: "dp"
    },
    {
        name: "Irregular Area",
        key: "ia"
    }
]