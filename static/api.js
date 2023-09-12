// JavaScript:

// https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=5

const root = ReactDOM.createRoot(document.getElementById("root"));

function ShowFlights(props) {
    const [records, setRecords] = React.useState([])

    React.useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=5').then( (response) => {
            setRecords(response.data.result.records)
        })
    })

    return (
        <div>
            <div>records len: {records.length}</div>
            <div>typeof records: {typeof(records)}</div>

            <br/>
            
            <div className="table">
                <div className="row">
                    <div className='header'>Flight Id:</div>
                    {records.map( (record) => <div>{record._id} </div>)}
                </div>

                <div className="row">
                    <div className='header'>Time of taking off:</div>
                    {records.map( (record) => <div>{record.CHSTOL} </div>)}
                </div>

                <div className="row">
                    <div className='header'>Time of landing:</div>
                    {records.map( (record) => <div>{record.CHPTOL} </div>)}
                </div>

                <div className="row">
                    <div className='header'>Airplane's Airline:</div>
                    {records.map( (record) => <div>{record.CHOPERD} </div>)}
                </div>
            </div>

        </div>
    )
}

root.render(<ShowFlights/>)






