import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext'
import AlertContext from '../../context/alert/AlertContext'

function Search() {
    const githubContext = useContext(GithubContext)
    const [text, setText] = useState('')
    const alertContext = useContext(AlertContext)


    //if there are multiple inputs then multiple name. 
    //hence use e.target.name

    function handleChange(e) {
        setText(e.target.value)
    }

    function onSubmit(e) {
        e.preventDefault()
        if (text === "") {
            console.log("lol")
            alertContext.setAlert('Please Enter Something', 'light')
        }
        else {
            //console.log(this.state.text)
            githubContext.onSearch(text)
            setText('')
        }
    }


    return (
        <div>
            <form onSubmit={onSubmit} className="form">
                <input type="text" name="text"
                    placeholder="Search users..."
                    value={text}
                    onChange={handleChange}
                />

                <input
                    type="submit"
                    value="Search"
                    className="btn-dark btn-block" />


            </form>
            {githubContext.users.length > 0 && <button
                onClick={githubContext.clearUsers}
                className="btn-danger btn-block">
                Clear
                    </button>}

        </div>
    )

}




export default Search