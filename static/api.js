// JavaScript:

// https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=5

const root = ReactDOM.createRoot(document.getElementById("root"));

function ShowFlights(props) {
    const [records, setRecords] = React.useState([])

    React.useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=10').then( (response) => {
            setRecords(response.data.result.records)
        })
    })

    return (
        <div>
            <div className="headers">
                <div className="bigHeader">Ben Gurion Airport</div>
                <div className="header">Flights:</div>
            </div>

            <div className="divTable">
                <div className="headRow container">
                    <div className="divCell">Flight Id</div>
                    <div className="divCell">Departure</div>
                    <div className="divCell">Airplane's Airline</div>
                    <div className="divCell">Terminal</div>
                    <div className="divCell">Destination</div>
                </div>

                {records.map( (record) => 
                    <div className="divRow container">
                        <div className="divCell"> {record.CHFLTN}</div>
                        <div className="divCell">{record.CHSTOL}</div>
                        <div className="divCell">{record.CHOPERD}</div>
                        <div className="divCell">{record.CHTERM}</div>
                        <div className="divCell">{record.CHLOCCT} {record.CHLOC1T}</div>
                    </div>
                )}
            </div>
        </div>
    )
}

root.render(<ShowFlights/>)






