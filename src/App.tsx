import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import './App.css';
import BitcoinPrice from "./components/BitcoinPrice";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
/// MUI
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DoneIcon from '@mui/icons-material/Done';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';


// Типизация для задачи
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
// MUI
const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
//

  const [tasks, setTasks] = useState<Task[]>([]); // Состояние для задач
  const inputText = useRef<HTMLInputElement>(null); // Ссылка на input

  // Функция для загрузки данных из localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('Data');
    if (savedData) {
      setTasks(JSON.parse(savedData)); // Преобразуем строку в массив объектов
    }
  }, []);

  // Функция для сохранения данных в localStorage
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('Data', JSON.stringify(tasks)); // Сохраняем в localStorage
    }
  }, [tasks]);
  

  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      const newTask: Task = { id: Date.now(), text: taskText, completed: false };
      setTasks([...tasks, newTask]);
      setTaskText(''); // Очищаем поле ввода
    } else {
      alert('Введите текст');
    }
  };

  // Обработка клика по задаче (помечаем как выполненную)
  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Удаление задачи
  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id)); // Удаляем задачу по id
  };

  return (
    <>
    <header>
    {/* <div className='bitcoinPrice'>
      <BitcoinPrice />
    </div> */}
    
    <div className='bitcoinPrice'>
    <h3 className='productName'>✔️To-do list</h3>
      <div className='hoverButton'>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <img src="bitcoin.png" width="40" height = "40" />
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{ pointerEvents: 'none' }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}><BitcoinPrice /></Typography>
      </Popover>
      </div>
    </div>
    </header>
      <div className="main">
        <div className="input-group">
          {/* <input type="text" ref={inputText} placeholder="Add new task" /> */}
          <Box
            component="form"
            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
            noValidate
            autoComplete="off"
          >
            <TextField
              label="Add new task"
              variant="outlined"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
            />
          </Box>
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleAddTask}>Save</Button>
        </div>
        <div className="list-group">
          <ul id="currentTask">
            {tasks.map((task) => (
              <div key={task.id} className={task.completed ? 'completed SelectedStyleTask' : 'SelectedStyleTask'}>
                {task.text}
                <div className='buttonClasses'>
                <button   onClick={() => toggleTaskCompletion(task.id)}>
                <Tooltip title="Done">
                    <IconButton>
                      <DoneIcon />
                    </IconButton>
                  </Tooltip>
                </button>
                <button className="Delete-button" onClick={() => deleteTask(task.id)}>
                <Tooltip title="Delete">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
