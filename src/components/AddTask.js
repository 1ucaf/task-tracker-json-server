import { useState } from 'react'

const AddTask = ({onAdd}) => {
    const [text, setText] = useState('');
    const [day, setDay] = useState('');
    const [reminder, setReminder] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();
        if(!text){
            alert("you need to fill the text field");
            return;
        }
        if(!day){
            alert("you need to fill the day field");
            return;
        }
        onAdd({text, day, reminder});

        setText('');
        setDay('');
        setReminder(false);
    }
    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className="form-control">
                <label>Task</label>
                <input
                    type="text"
                    placeholder="Add Task Description"
                    value={text}
                    onChange={(e)=> setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label>Day & Time</label>
                <input
                    type="text"
                    placeholder="Add Task Date"
                    value={day}
                    onChange={(e)=> setDay(e.target.value)}
                />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="reminder" >Reminder</label>
                <input
                    id="reminder"
                    type="checkbox"
                    checked = {reminder} //don't know what is this for :/ I think is unnecessary but the guy in the tutorial put it so I will do the same to avoid future possible errors xd
                    placeholder="Task Description"
                    value={reminder}
                    onChange={(e)=> setReminder(e.currentTarget.checked)}
                />
            </div>
            <input className="btn btn-block" value="Save Task" type="submit"/>
        </form>
    )
}

export default AddTask
