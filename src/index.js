import "./styles.css";
import toDoItem from "./to-do-item-modules/to-do-item.js";

const test = toDoItem();
test.addChecklistItem("checklist_item_1", true);
test.addChecklistItem("checklist_item_2", false);
test.addChecklistItem("checklist_item_3", false);
test.addChecklistItem("checklist_item_4", true);
test.addChecklistItem("checklist_item_5", true);
test.setPriority(3);
console.log(test.getPriority());
