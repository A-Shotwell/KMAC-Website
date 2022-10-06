const React = require('react')

const ShowUploadView = (props) => {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", 
            width: "100vw",
            overflow: "hidden",
            margin: "-1%",
            background: "black"
        }}>
            <h1 style={{color: "white", marginTop: "0%"}}>NEW SHOW</h1>
            <form style={{width: "100%", marginLeft: "20%"}} action="/uploadShow" method="POST" encType="multipart/form-data">
                <label style={{color: "white"}} htmlFor="eventTitle">Event Title: </label>
                <br />
                <input style={{width: "80%"}} type="text" name="eventTitle" />
                <br />
                <label style={{color: "white"}} htmlFor="location">Event Location: </label>
                <br />
                <input style={{width: "80%"}} type="text" name="location" />
                <br />
                <label style={{color: "white"}} htmlFor="date">Event Event Date: </label>
                <br />
                <input style={{width: "80%"}} type="date" name="date" />
                <br />
                <label style={{color: "white"}} htmlFor="time">Event Time: </label>
                <br />
                <input style={{width: "80%"}} type="time" name="time" />
                <br />
                <label style={{color: "white"}} htmlFor="ticket">Ticket Price: </label>
                <br />
                <input style={{width: "80%"}} type="text" name="ticket" />
                <br />
                <br />
                <textarea style={{width: "80%", resize: "none"}} name="desc" rows="10" placeholder="Enter event description..." />
                <br />
                <input type="file" name="file" id="file" />
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

module.exports = ShowUploadView