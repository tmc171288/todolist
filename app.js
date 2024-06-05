const TODOLIST_APP_UNITOP = "TODOLIST_APP_UNITOP";

let data = [
    {
        task: 'Run 2km',
        is_complete: true
    },
    //     {
    //         task: 'Learn JS Beginner unitop.vn',
    //         is_complete: false
    //     }
];

const saveData = (data) => {
    localStorage.setItem(TODOLIST_APP_UNITOP, JSON.stringify(data));

}
// saveData(data);

// xuat  data

const loadData = () => {
    let data;
    data = JSON.parse(localStorage.getItem(TODOLIST_APP_UNITOP));
    data = data ? data : [];
    return data;
}
// data = loadData();
// console.log(data);


// // add task
const addTask = (new_task) => {
    let data;
    data = loadData();
    data = [...data, new_task]
    saveData(data);
}

// 7 chuc nang creatTaskItem 

const createTaskItem = (task, is_complete, index) => {
    return `
    <li class="task-item" index=${index} is-complete=${is_complete}>
        <span class='task' onclick="markTaskComplete(${index})">${task}</span>
        <div class="task-action">
            <button onclick="pushEditTask(${index}) ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </button>
            <button onclick="deleteTask(this, ${index}) ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>

            </button>
        </div>
    </li>
    `;
};
//renderTask();

const renderTask = () => {
    let data, ulTaskHtml, ulTask, task_result, count_complete;
    task_result = document.querySelector('.task-result')
    ulTask = document.querySelector('ul.tasks');
    data = loadData();
    count_complete = 0;
    ulTaskHtml = data.map((element, index) => {
        if (element.is_complete == true) count_complete++;
        return createTaskItem(element.task, element.is_complete, index);
    });
    task_result.textContent = count_complete > 0 ? `Yeah, ${count_complete} task complete ` : "";
    ulTask.innerHTML = ulTaskHtml.join('');
}

const markTaskComplete = (index) => {
    let data;
    data = loadData();
    data[index].is_complete = data[index].is_complete == true ? false : true;
    saveData(data);
    console.log(data[index]);
    renderTask();
};
const deleteTask = (element, index) => {
    // console.log(element);
    // console.log(index);
    let data;
    let delete_confirm = confirm(' ban co muon that su xoa khong ');
    if (delete_confirm == false) return false;

    data = loadData();
    data.splice(index, 1);
    saveData(data);
    element.closest('.task-item').remove();
    // renderTask();
    // console.log(data);

};
const pushEditTask = (index) => {
    let data;
    data = loadData();
    const btn = document.querySelector('#add_task button');
    // console.log(btn);
    const task = document.querySelector('#task');
    task.value = data[index].task;
    task.setAttribute('index', index);
    btn.innerText = 'EDIT TAST';
    btn.style.backgroundColor = 'green';
    // console.log(data[index]);
};
const editTask = (task, index) => {
    const btn = document.querySelector('#add_task button');
    let data = loadData();
    data[index].task = task;
    btn.innerText = 'ADD TAST';
    btn.style.backgroundColor = '#ff2b2b';
    saveData(data);
};

const formAddTask = document.forms.add_task;
// console.log(formAddTask);
formAddTask.addEventListener('submit', (e) => {
    // console.log('submit');
    let new_task;
    const task = document.querySelector('#task');
    const index = task.getAttribute('index');
    // console.log(index);
    if (task.value.length < 2) {
        alert('enter Your Task !');
        return false;
    }
    if (index) {
        editTask(task.value, index);
        task.removeAttribute('index');
    } else {
        new_task = {
            task: task.value,
            is_complete: false
        };
        addTask(new_task);
    };
    renderTask();
    task.value = "";
    e.preventDefault();
});
const keyup = document.addEventListener('keyup', (e) => {
    // console.log(e.which);
    if (e.which == 27) {
        task.value = '';
        task.removeAttribute('index');
        const btn = document.querySelector('#add_task button');
        btn.innerText = 'ADD TAST';
        btn.style.backgroundColor = '#ff2b2b';
    }
});

renderTask();

