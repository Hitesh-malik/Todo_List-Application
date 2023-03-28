import React from 'react'

function Search({ taskList, searchTaskList, setSearchTaskList}) {
    function changeHandler(event) {
        // console.log(taskList);
        // console.log(event.target.value);
        let searchTask = event.target.value.toLowerCase().trim();
        // console.log(searchTask.length);
        let tempList = [];
        taskList.forEach(object => {
            let string = object.Name.toLowerCase();
            if (string.includes(searchTask)) {
                tempList.push(object);
            }
        });
        setSearchTaskList(tempList);
    }
    return (
        <div className='position-relative'>
            <input type="text" className="mt-3 rounded-4 p-1 px-3 position-relative w-25" placeholder='Search bar' onChange={changeHandler}></input>
        </div>
    )
}

export default Search