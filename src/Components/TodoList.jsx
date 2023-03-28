import React, { useState, useEffect } from 'react';
import CreateTask from '../Modals/CreateTask';
import Cards from './Cards';
import img from '../assets/Empty.jpg'
import Search from './Search';
import Counter from './Counter';
//  so we can use the toast feature
import { toast } from "react-toastify";

function TodoList() {

    const [modal, setModal] = useState(false);
    // empty array to store the task list -> hold an obj with two properties taskanme and description
    const [container, setContainer] = useState(true);

    const [taskList, setTaskList] = useState([]);

    const [searchTaskList, setSearchTaskList] = useState([]);

    const [taskNameList, setTaskNameList] = useState([]);


    useEffect(() => {
        // way to retrieve the data from the local storage
        let array = localStorage.getItem("taskList");
        setContainer(true);
        console.log(array);
        // if array have data then only we can display the data
        if (array && array.length > 2) {
            let Arrobj = JSON.parse(array);
            // console.log(Arrobj);
            let arrayOfTaskName = [];
            Arrobj.forEach(object => {
                arrayOfTaskName.push(object.Name);
            });
            setTaskNameList(arrayOfTaskName);
            setContainer(false);
            setTaskList(Arrobj);
            setSearchTaskList(Arrobj)
        }
    }, [])

    const toogle = () => {
        setModal(!modal);
    }

    const saveTask = (taskObj) => {
        console.log(taskNameList);
        if (!taskNameList.includes(taskObj.Name)) {
            let tempList = taskList;
            tempList.push(taskObj);
            setContainer(false);

            // here we are using localStorage --> browser (object are save )
            localStorage.setItem("taskList", JSON.stringify(tempList));

            setModal(false);

            setTaskList(tempList);
            setSearchTaskList(tempList)

            let tempListName = [...taskNameList, taskObj.Name];
            setTaskNameList(tempListName);
            toast.success(`Task "${taskObj.Name}" is created`);
            return true;
        }

        toast.warning("Task exist / change the taskName");
        return false;

    }

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    }

    const deleteTask = (index) => {
        // console.log(index);
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    }
    const clickHandlerClearAll = () => {
        if (taskList.length !== 0) {
            if (window.confirm("Are you sure you want to delete all the task") === true) {
                if (taskList.length !== 0) toast.warning("All the data is cleared");
                let tempList = [];
                setTaskNameList(tempList);
                setTaskList(tempList);
                localStorage.setItem("taskList", JSON.stringify(tempList));
                setContainer(true);
            }
        } else {
            toast.info("No task to delete");
        }

    }

    return (
        <>
            <div className='header text-center position-relative'>
                <h1>
                    Todo List
                </h1>
                <div className='d-flex flex-row justify-content-center'>
                    <button className='btn btn-primary mt-2' onClick={() => setModal(true)}>Create Task</button>
                    <Counter taskList={taskList}/>
                </div>


                {/*search operation*/}
                <Search taskList={taskList} searchTaskList={searchTaskList} setSearchTaskList={setSearchTaskList} />

                <button className='btn bg-danger mt-2 position-absolute bottom-0 end-0 m-3 text-white' onClick={clickHandlerClearAll} > clear all</button>

            </div>
            {
                container ?
                    (
                        <div className='text-center '>
                            <img src={img}></img>
                        </div>
                    ) :
                    (
                        <div className='task-container'>
                            {
                                //key is send because of map method
                                searchTaskList.map((obj, index) => {
                                    return <Cards key={index} taskObj={obj} index={index} deleteTask={deleteTask}
                                        updateListArray={updateListArray}
                                    />
                                }
                                )
                            }
                        </div>
                    )
            }


            <CreateTask save={saveTask} toogle={toogle} modal={modal} />
        </>
    )
}

export default TodoList