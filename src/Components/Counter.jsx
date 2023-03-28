import React from 'react'

function Counter({ taskList }) {
    return (
        <div className='m-2 text-bg-info rounded-2 text-center'style={{height : "40px" , paddingTop:"10px" , paddingLeft :"10px"}}>
            <label>Task Count</label>
            <input value={taskList.length} className="rounded-2 mx-2" style={{width : "30px" , background:"none" , border : "none"}}></input>
        </div>
    )
}

export default Counter
