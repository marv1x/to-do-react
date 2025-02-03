import { useState, useEffect, useRef } from 'react';
import './App.css';
import BitcoinPrice from "./components/BitcoinPrice";

// Типизация для задачи
type Task = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
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

  // Добавление новой задачи
  const handleAddTask = () => {
    if (inputText.current) {
      const taskText = inputText.current.value;
      if (taskText.trim() !== '') {
        const newTask: Task = { id: Date.now(), text: taskText, completed: false }; // Уникальный id для каждой задачи
        setTasks([...tasks, newTask]); // Добавляем задачу в список
        inputText.current.value = ''; // Очищаем поле ввода
      } else {
        alert('Введите текст');
      }
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
    <div className='bitcoinPrice'>
      <BitcoinPrice />
    </div>
    </header>
      <div className="main">
        <h3>✔️To-do list</h3>
        <div className="input-group">
          <input type="text" ref={inputText} placeholder="Add new task" />
          <button className="button-style" onClick={handleAddTask}>Save</button>
        </div>
        <div className="list-group">
          <ul id="currentTask">
            {tasks.map((task) => (
              <div key={task.id} className={task.completed ? 'completed SelectedStyleTask' : 'SelectedStyleTask'}>
                {task.text}
                <div className='buttonClasses'>
                <button className='Complete-button'  onClick={() => toggleTaskCompletion(task.id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button className="Delete-button" onClick={() => deleteTask(task.id)}>x</button>
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
