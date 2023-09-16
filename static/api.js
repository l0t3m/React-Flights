// JavaScript:

function showCountries(obj, lang) {
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



const root = ReactDOM.createRoot(document.getElementById("root"));

function ShowFlights(props) {
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


            <div className="section">
                <div className="header paddingBottom">Filter / Search:</div>

                {/* Filter / Search: */}

                <form action="/filter/country" method="get">
                    <select name="country" id="countrySelect" className="reInput">
                        <option value="n/a"></option>
                        {showCountries(records, "english").map( (country) =>
                            <option value={country}>{country}</option>
                        )}
                    </select>

                    <input type="submit" value="Search" className="reInput reSearch"/>
                </form>
            </div>



            <div className="divTable">
                {/* Table headers: */}
                <div className="headRow container">
                    <div className="divCell">Flight Id</div>
                    <div className="divCell">Departure</div>
                    <div className="divCell">Airplane's Airline</div>
                    <div className="divCell">Terminal</div>
                    <div className="divCell">Destination</div>
                    <div className="divCell">Status</div>
                </div>

                {/* Table data: */}
                {records.map( (record) => 
                    <div className="divRow container">
                        <div className="divCell"> {record.CHFLTN}</div>
                        <div className="divCell">{record.CHSTOL}</div>
                        <div className="divCell">{record.CHOPERD}</div>
                        <div className="divCell">{record.CHTERM}</div>
                        <div className="divCell">{record.CHLOCCT} {record.CHLOC1T} / {record.CHLOC1TH} {record.CHLOC1CH}</div>
                        <div className="divCell">{record.CHRMINE} / {record.CHRMINH}</div>
                    </div>
                )}
            </div>

        </div>
    )
}

root.render(<ShowFlights/>)






