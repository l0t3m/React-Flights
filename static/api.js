// JavaScript:

const root = ReactDOM.createRoot(document.getElementById("root"));

function ShowFlights(props) {
    const [records, setRecords] = React.useState([])

    React.useEffect(() => {
        axios.get('https://data.gov.il/api/3/action/datastore_search?resource_id=e83f763b-b7d7-479e-b172-ae981ddc6de5&limit=5').then( (response) => {
            setRecords(response.json.result.records)
        })
    })

    return (
        <div>
            <div>records len: {records.length}</div>
            <div>typeof records: {typeof(records)}</div>
            
            <div>
            {records.map( (record) => <div> {record._id} </div>)}
            </div>

        </div>
    )
}

root.render(<ShowFlights/>)






