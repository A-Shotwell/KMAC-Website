const React = require('react')

const ShowUploadView = (props) => {
    return (
        <>
            <h1 style={{color: "red"}}>SHOW UPLOAD VIEW</h1>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="text" name="fieldone" />
                <input type="text" name="fieldtwo" />
                <input type="text" name="fieldthree" />
                <input type="file" name="file" id="file" />
                <input type="submit" value="Submit" />
            </form>
        </>
    )
}

module.exports = ShowUploadView