import React, { useEffect } from 'react'
import '../CSS/LandingPage.css'
import { HiOutlineBars3CenterLeft } from 'react-icons/hi2'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from 'react';
import ScrollArea from 'react-scrollbar';

const LandingPage = () => {

    const [input, setInput] = useState("");
    let [todoList, setTodoList] = useState([]);
    const [completedTaskCount, setCompletedTaskCount] = useState(0);

    const handleClick = () => {
        const id = todoList.length + 1;
        setTodoList((prev) => [
            ...prev,
            {
                id: id,
                task: input,
                complete: false,
            },
        ]);
        setInput("");
    };

    const handleComplete = (id) => {
        let list = todoList.map((task) => {
            let item = {};
            if (task.id === id) {
                if (!task.complete) {
                    //Task is pending, modifying it to complete and increment the count
                    setCompletedTaskCount(completedTaskCount + 1);
                }
                else {
                    //Task is complete, modifying it back to pending, decrement Complete count
                    setCompletedTaskCount(completedTaskCount - 1);
                }
                item = { ...task, complete: !task.complete };
            } else item = { ...task };
            return item;
        });
        setTodoList(list);
    };

    const [currentdate, setCurrentDate] = useState();

    useEffect(() => {
        const fetchCurrentDate = () => {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            setCurrentDate(currentDate);
        };
        fetchCurrentDate();
    }, [])

    const [taskdone, setTaskDone] = useState(100);

    useEffect(() => {
        const percentTaskDone = () => {
            const totalTask = completedTaskCount + (todoList.length - completedTaskCount)
            setTaskDone(Math.floor((completedTaskCount / totalTask) * 100));
        }
        percentTaskDone();
    })

    return (
        <div className='mainContainer'>
            <div className="subContainer">
                <div className="backgroundBannerContent">
                    <div className="bannerSection1">
                        <HiOutlineBars3CenterLeft className='hamburger' />
                        <h2 className='bannerSection1Your'>Your Things</h2>
                        <p className='date'>{currentdate}</p>
                    </div>
                    <div className="bannerSection2">
                        <div className="countSection">
                            <div className="personal">
                                <p className='thingsCount'>24</p>
                                <p>Perosnal</p>
                            </div>
                            <div className="personal">
                                <p className='thingsCount'>24</p>
                                <p>Business</p>
                            </div>
                        </div>
                        <h5 className='percentCount'>{taskdone}% done</h5>
                    </div>
                </div>
                <div className="taskInput">
                    <InputGroup className="mb-3 inputSection">
                        <Form.Control
                            placeholder="Add your new task"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={input}
                            onInput={(e) => setInput(e.target.value)}
                            style={{ fontWeight: 600 }}
                            className='inputArea'
                        />
                        <Button variant="outline-secondary" id="button-addon2" className='inputBtn' style={{ color: "white", borderColor: "white" }} onClick={() => handleClick()}>
                            Add Task
                        </Button>
                    </InputGroup>
                </div>
                <div className="taskCountContainer" style={{ display: "flex", justifyContent: "space-between", fontSize: "20px", paddingLeft: "30px", paddingRight: "30px", color: "white", fontFamily: "Quicksand" }}>
                    <p>Completed Task: {completedTaskCount}</p>
                    <p>Pending Task: {todoList.length - completedTaskCount}</p>
                </div>
                <div className="taskcontainer">
                    <h2 className='inbox'>My Tasks</h2>
                    <ol className='orderList'>
                        {/* List items consisting of tasks will be listed here */}
                        {todoList.map((todo) => {
                            return (
                                    <li
                                        complete={todo.complete}
                                        id={todo.id}
                                        onClick={() => handleComplete(todo.id)}
                                        style={{
                                            listStyle: "none",
                                            width: "25rem",
                                            textAlign: "center",
                                            borderRadius: "8px",
                                            backgroundColor: "#fefefe",
                                            padding: "7px 1.5rem 7px 1.5rem",
                                            marginBottom: "10px",
                                            textDecoration: todo.complete && "line-through",
                                            color: "black",
                                            fontWeight: "600"
                                        }}
                                    >
                                        {todo.task}
                                    </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
