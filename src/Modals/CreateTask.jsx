import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//  so we can use the toast feature
import { toast } from "react-toastify";

const CreateTask = ({ modal, toogle, save }) => {
    // console.log("we are in the create task");

    const [taskName, setTaskName] = useState("");
    const [description, setDescription] = useState("");

    function handleChange(event) {
        // const Name = event.target.name;
        // const value = event.target.value;
        // altername to the above two line is 
        const { name, value } = event.target;
        if (name === "taskName") setTaskName(value.charAt(0).toUpperCase() + value.slice(1));
        else if (name === "description") setDescription(value.charAt(0).toUpperCase() + value.slice(1));

    }

    function saveHandler() {
        let NewtaskName = taskName.trim();
        let Newdescription = description.trim();
        try {
            if (NewtaskName === '' || Newdescription === "") throw ("No Section can be Empty");
            let taskObj = {};
            taskObj["Name"] = NewtaskName;
            taskObj["Description"] = Newdescription;
            let result = save(taskObj);
            if (result) {
                setTaskName("");
                setDescription("");
            }
        }
        catch (error) {
            toast.warning(error);
        };
    }

    return (
        // isOpen attirube confrim it open when modal is true
        <Modal isOpen={modal} toogle={toogle}>
            <ModalHeader toogle={toogle}>Create Task</ModalHeader>
            <ModalBody>
                <form>
                    <div className="form-group">
                        <label>Task Name</label>
                        {/* with this value attribute we need to pass the onchange so that we can update the filed  */}
                        {/* also name attribute is imp to pass as on submit this name value is passed  */}
                        <input type="text" className="form-control" placeholder='TASK TITLE' value={taskName} onChange={handleChange} maxLength="10" name="taskName" />
                    </div>
                    <div className="form-group mt-4 " >
                        <label > Description</label>
                        <textarea placeholder='TASK DESCRIPTION...' rows='5' className="form-control" value={description} onChange={handleChange} name="description"></textarea>
                    </div>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={saveHandler}>
                    Create
                </Button>
                <Button color="secondary" onClick={toogle}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreateTask