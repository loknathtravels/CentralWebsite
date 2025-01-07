import "../CSS/statusBar.css"

function StatusBar(props) {

    return (
    <div className='container-fluid'>
        <div className="body">
            <h4>Booking Status - {props.bookingStatus}</h4>
            <h4>Booking ID - {props.bookingId}</h4>
        </div>
    </div>
    );
}

export default StatusBar;