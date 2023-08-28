import React, { Fragment, useEffect, useState }from "react"

const EditTodo = ({todo}) => {

    const [description, setDescription] = useState(todo.description)

    // edit description Function
    const updateDescription = async (e) => {
        e.preventDefault()
        try{
            const body = { description }
            const response = await fetch(`http://localhost:5000/todos/${todo.todoid}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch(err){
            console.error(err.message)
        }
    }

    return(
        <Fragment>
            {/*  Button to Open the Modal  */}
            <button 
                type="button" 
                className="btn btn-warning" 
                data-bs-toggle="modal" 
                data-bs-target={`#id${todo.todoid}`}>
                Edit
            </button>

            {/*  The Modal  */}
            <div className="modal" id={`id${todo.todoid}`} 
                onClick={() => setDescription(todo.description)}>
                <div className="modal-dialog">
                    <div className="modal-content">

                    {/*  Modal Header  */}
                    <div className="modal-header">
                        <h4 className="modal-title">Edit Todo</h4>
                        <button type="button" 
                            className="btn-close" 
                            data-bs-dismiss="modal"
                            onClick={() => setDescription(todo.description)}>
                        </button>
                    </div>

                    {/*  Modal body  */}
                    <div className="modal-body">
                        <input type="text" className="form-control" value={description}
                            onChange={e => setDescription(e.target.value)}/>
                    </div>

                    {/*  Modal footer  */}
                    <div className="modal-footer">
                        <button type="button" 
                            className="btn btn-warning" 
                            data-bs-dismiss="modal"
                            onClick={e => updateDescription(e)}>
                            Save
                        </button>
                        <button type="button" 
                                className="btn btn-danger" 
                                data-bs-dismiss="modal"
                                onClick={() => setDescription(todo.description)}
                                >Close</button>
                    </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditTodo