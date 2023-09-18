// JavaScript:

// Additional Functions: //

function filterCountries(obj, lang) {
    let countries = []
    
    if (lang.toLowerCase() == "english") {
        obj.map(record => (
            countries.includes(record.CHLOCCT) == false ? countries.push(record.CHLOCCT) : null
        ))
    } else if (lang.toLowerCase() == "hebrew") {
        obj.map((record) => (
            countries.includes(record.CHLOC1CH) == false ? countries.push(record.CHLOC1CH) : null
        ))
    }

    return countries
}

function sortTime(str) {
    return str.slice(str.search("T") + 1, -3);
}

function sortNames(str) {
    return str.split(" ").map( (word) => {
        let firstLetter = word.charAt(0).toUpperCase();
        let rest = word.slice(1).toLowerCase();
        return firstLetter + rest + " ";
    } )
}



// Components: //

function AutoReload(props) {
    const [counter, setCounter] = React.useState(props.time * 60);

    React.useEffect( () => {
        setInterval( () => {
            setCounter((counter) => counter == 0 ? location.reload() : counter - 1);
        }, 1000)
    }, [])
}

function ShowFlights(props) {
    const tableheaders = () => (
        <div className="headRow container">
            <div className="divCell">Flight Id</div>
            <div className="divCell">Airplane's Airline</div>
            <div className="divCell">Destination</div>
            <div className="divCell">Departure</div>
            <div className="divCell">Terminal</div>
            <div className="divCell">Status</div>
        </div>
    )

    const tableData = (record) => (
        <div className="divRow container">
            <div className="divCell">{record.CHFLTN}</div> {/* FlightID */}
            <div className="divCell">{sortNames(record.CHOPERD)}</div> {/* Airline */}
            <div className="divCell">{sortNames(record.CHLOCCT)} - {sortNames(record.CHLOC1T)}</div> {/* Destination */}
            <div className="divCell">{sortTime(record.CHSTOL)}</div> {/* Departure */}
            <div className="divCell">{record.CHTERM}</div> {/* Terminal */}
            <div className="divCell bold">{sortNames(record.CHRMINE)}</div> {/* Status */}
        </div>
    )

    if (props.country != null && props.country != undefined && props.country != "default" ) {
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



// Main Component: //

function ShowPage(props) {
    const [records, setRecords] = React.useState([]);
    const [countrySelected, setCountrySelected] = React.useState(null);

    React.useEffect( () => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=10').then( (response) => {
            setRecords(response.data.result.records)
        })
    } )

    return (
        <div>

            <AutoReload time={props.reloadTime}/>

            <div className="background"></div>
            <div className="headers">
                <div className="bigHeader">Ben Gurion Airport</div>
            </div>

            {/* Filter / Search: */}
            <div className="section">
                <div className="inputBorder">
                    <select name="country" id="countrySelect" className="reInput" onChange={() => setCountrySelected(countrySelect.value)}>
                        <option value={"default"}>All Countries</option>
                        {filterCountries(records, "english").map( (country) =>
                            <option value={country}>{sortNames(country)}</option>
                        )}
                    </select>
                </div>
            </div>

            <ShowFlights records={records} country={countrySelected}/>

        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ShowPage reloadTime={15}/>)






