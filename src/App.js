import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.js'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask'
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const fethcTasks = async () =>{
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  }
  
  const fethcTask = async (id) =>{
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  }

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fethcTasks()
      setTasks(tasksFromServer);
    }

    getTasks();
  }, [])

  // ADD TASK WITHOUT JSON SERVER
  // const addTask = (task) => {
  //   const id = tasks[tasks.length - 1].id + 1;
  //   const newTask = { id, ...task };
  //   setTasks([...tasks, newTask]);
  // }
  
  const addTask = async (task) => {
    const id = tasks[tasks.length - 1].id + 1;
    const newTask = { id, ...task };
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newTask),
    })
    const data = await res.json();
    setTasks([...tasks, data]);
  }

  // DELETE WITHOUT JSON SERVER
  // const deleteTask = (id) => {
  //   setTasks(tasks.filter((task)=>task.id !== id))
  // }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE"
    })

    setTasks(tasks.filter((task)=>task.id !== id))
  }

  const toggleReminder = async (id) => {
    const taskToToggle = await fethcTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(updatedTask)
    });
    const data = await res.json();
    setTasks(
      tasks.map((task) => 
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const onButtonClick = () => {
    setShowAddTask(!showAddTask);
  }
  
  return (
    <Router>
      <div className="container">
        <Header
          nombreBoton={showAddTask ? "Close" : "Add"}
          color={showAddTask ? "red" : "green"}
          onButtonClick={onButtonClick}
        />
        <Route path="/" exact render={(props)=>(
          <>
            { showAddTask && //if "showAddTask" is set to true, the "AddTask" component will be shown, otherwise, not
              <AddTask 
                onAdd = {addTask}
              />
            }
            <Tasks
              tasks={tasks}
              onDelete = {deleteTask}
              onToggle = {toggleReminder}
            />
          </>
        )} />
        <Route path="/about" component={About}/>
        <Footer/>
      </div>
    </Router>
  );
}



export default App;
