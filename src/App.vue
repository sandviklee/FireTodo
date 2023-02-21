<template>
  <div class="FireTodo">
    <div class="title has-text-centered">
      FireTodo
    </div>

    <form @submit.prevent="addTodo">
      <div class="fields">
          <div class="field has-addons mb-5 pt-5">
            <div class="control">
              <input
              v-model="newTodoContent" 
              class="input" type="text" placeholder="Add a todo">
            </div>
            <div class="control">
              <button
              :disabled="!newTodoContent || (todos.length > 5)"
              class="button is-info">
                Add
              </button>
            </div>
        </div>
      </div>
      
    </form>
      <div
      v-for="todo in todos" 
      class="card mb-5"
      :class="{ 'has-background-success-light' : todo.done}">
        <div class="card-content">
          <div class="content">

            <div class="columns is-mobile is-vcentered">
              <div class="column"
              :class="{ 'has-text-success line-through' : todo.done }">
                {{ todo.content }}
              </div>
              <div class="column is-5 has-text-right">
                <button 
                @click="completeTodo(todo.id)"
                class="button"
                :class="todo.done ? 'is-success' : 'is-light'">
                  &check;
                </button>
                <button
                @click="deleteTodo(todo.id)" 
                class="button is-danger ml-2">
                  &cross;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    <div class="wrapper">
      <footer class="has-text-centered">
      TodoList App using Firebase and Vue3
      </footer>
    </div>

  </div>

</template>

<script setup>

//Imports
import { ref, onMounted } from 'vue'
//import { v4 as uuidv4 } from 'uuid' Used if you dont have autogenerating id's from firebase.
import { collection, getDocs , onSnapshot, addDoc, deleteDoc, doc, updateDoc} from 'firebase/firestore';
import { db } from '@/firebase'

//Todos
const todos = ref([
  // {
  //   id: 'id1',
  //   content: 'Todo1',
  //   done: false
  // },

  // {
  //   id: 'id2',
  //   content: 'Todo2',
  //   done: true
  // }
])

//Get Todos
onMounted(async () => {
  //Documents added on reload
  // const querySnapshot = await getDocs(collection(db, 'todos'));
  // let todoList = []
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.id, " => ", doc.data());
  //   const todo = {
  //     id: doc.id,
  //     content: doc.data().content,
  //     done: doc.data().done
  //   }
  //   todoList.push(todo)
  // });
  // todos.value = todoList
  
  //Documents added in real-time
  onSnapshot(collection(db, 'todos'), (querySnapshot) => {
    const todoList = [];
    querySnapshot.forEach((doc) => {
      const todo = {
        id: doc.id,
        content: doc.data().content,
        done: doc.data().done
      }
      todoList.push(todo)
    });
    todos.value = todoList
  });
})

//Add Todo
const newTodoContent = ref('');

const addTodo = () => {
  addDoc(collection(db, 'todos'), {
    content: newTodoContent.value,
    done: false
  });
  newTodoContent.value = ''
}

//Adds todo without firebase connection
// const addTodo = () => {
//   const newTodo = {
//     id: uuidv4(),
//     content: newTodoContent.value,
//     done: false
//   }
  
//   todos.value.unshift(newTodo)
//   newTodoContent.value = ''
// }

const deleteTodo = async id => {
  await deleteDoc(doc(db, 'todos', id));
}

//This can be used locally without firebase
// const deleteTodo = id => {
//   //This means filtering out the ID you don't want
//   //todos.value = todos.value.filter(todo => todo.id !== id)

//   //This means deleting the chosen todo
//   const removeTodo = todos.value.find(todo => todo.id == id)
//   todos.value = todos.value.filter(todo => todo !== removeTodo)
// }

const completeTodo = async id => {
  const completed = todos.value.find(todo => todo.id == id)
  completed.done = true;

  await updateDoc(doc(db, 'todos', id), {
    done: true
  });
}

</script>

<style>
@import 'bulma/css/bulma.css';

.FireTodo {
  padding: 20px;
  margin: 0 auto;
}

.line-through {
  text-decoration: line-through;
}

.fields {
  width: 100%;
  padding-left: 43%;
}

footer {
  width: 100%;
  bottom: 5px;
  position: absolute;
  margin-bottom: 10px;
}

wrapper {
  text-align: center;
  position: relative;
}



</style>