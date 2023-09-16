// JavaScript:



/////////////////////////////////////////////////////////////////////////////



// General Functions: //

function filterCountries(obj, lang) {
    var countries = []
    
    if (lang.toLowerCase() == "english") {
        obj.map(record => (
            countries.includes(record.CHLOC1T) == false ? countries.push(record.CHLOC1T) : null
        ))
    } else if (lang.toLowerCase() == "hebrew") {
        obj.map((record) => (
            countries.includes(record.CHLOC1CH) == false ? countries.push(record.CHLOC1CH) : null
        ))
    }

    return countries
}



/////////////////////////////////////////////////////////////////////////////



// Components: //

function ShowFlights(props) {
    const tableheaders = () => (
        <div className="headRow container">
            <div className="divCell">Flight Id</div>
            <div className="divCell">Departure</div>
            <div className="divCell">Airplane's Airline</div>
            <div className="divCell">Terminal</div>
            <div className="divCell">Destination</div>
            <div className="divCell">Status</div>
        </div>
    )

    const tableData = (record) => (
        <div className="divRow container">
            <div className="divCell">{record.CHFLTN}</div>
            <div className="divCell">{record.CHSTOL}</div>
            <div className="divCell">{record.CHOPERD}</div>
            <div className="divCell">{record.CHTERM}</div>
            <div className="divCell">{record.CHLOCCT} {record.CHLOC1T} / {record.CHLOC1TH} {record.CHLOC1CH}</div>
            <div className="divCell">{record.CHRMINE} / {record.CHRMINH}</div>
        </div>
    )

    if (props.country != null && props.country != undefined ) {
        return (
            <div className="divTable">
                {tableheaders()}
                {props.records.map( (record) => record.CHLOCCT == props.country ? tableData(record) : null) }
            </div>
        )

    } else {
        return (
            <div className="divTable">
                {tableheaders()}
                {props.records.map ( (record) => tableData(record))}
            </div>
        )
    }
}




function ShowPage(props) {
    const [records, setRecords] = React.useState([]);

    React.useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=10').then( (response) => {
            setRecords(response.data.result.records)
        })
    })

    return (
        <div>
            <div className="headers">
                <div className="bigHeader">Ben Gurion Airport</div>
                <div className="header">Departing Flights:</div>
            </div>


            {/* Filter / Search: */}
            <div className="section">
                <div className="header paddingBottom">Filter / Search:</div>

                <select name="country" id="countrySelect" className="reInput">
                    <option value="n/a"></option>
                    {filterCountries(records, "english").map( (country) =>
                        <option value={country}>{country}</option>
                    )}
                </select>

                <input type="submit" value="Search" className="reInput reSearch"/>
            </div>


            <ShowFlights records={records}/>
            {/* <ShowFlights records={records} country="ITALY"/> */}

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ShowPage/>)






