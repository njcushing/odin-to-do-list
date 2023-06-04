import "./styles.css";
import toDoProject from "./project-modules/to-do-project.js";

const test = toDoProject();
console.log(test);

let newItem = test.addToDoItem();
console.log(newItem);
