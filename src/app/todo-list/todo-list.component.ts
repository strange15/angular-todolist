import { Component, OnInit } from '@angular/core';
// Service
import { TodoListService } from './todo-list.service';

// Class
import { Todo } from './todo.model';
import { TodoStatusType } from './todo-status-type.enum';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  /**
   * 待辦事項狀態的列舉
   *
   * @memberof TodoListComponent
   */
  todoStatusType = TodoStatusType;

  /**
   * 目前狀態
   *
   * @private
   * @memberof TodoListComponent
   */
  private status = TodoStatusType.All;

  constructor(private todoListService: TodoListService) { }

  ngOnInit(): void {
  }

  /**
   * 新增代辦事項
   *
   * @param {Event} event - 輸入框的事件
   * @constant {HTMLInputElement} inputRef - 輸入框的元素實體
   * @memberof TodoListComponent
   */
  addTodo(event: Event): void {
    const inputRef = <HTMLInputElement>event.target;
    const todo = inputRef.value.trim();

    if (todo) {
      this.todoListService.add(todo);
      inputRef.value = '';
    }
  }

  /**
   * 取得待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getList(): Todo[] {
    return this.todoListService.getList();
  }

  /**
   * 移除待辦事項
   *
   * @param {number} index - 待辦事項的索引位置
   * @memberof TodoListComponent
   */
  remove(index: number): void {
    this.todoListService.remove(index);
  }

  /**
   * 開始編輯待辦事項
   *
   * @param {Todo} todo
   * @memberof TodoListComponent
   */
  edit(todo: Todo): void {
    todo.editable = true;
  }

  /**
   * 更新待辦事項
   *
   * @param {Todo} todo - 原本的待辦事項
   * @param {string} newTitle - 新的事項名稱
   * @memberof TodoListComponent
   */
  update(todo: Todo, newTitle: string): void {

    if (!todo.editing) {
      return;
    }

    const title = newTitle.trim();

    // 如果有輸入名稱則修改事項名稱
    if (title) {
      todo.setTitle(title);
      todo.editable = false;

    // 如果沒有名稱則刪除該項待辦事項
    } else {
      const index = this.getList().indexOf(todo);
      if (index !== -1) {
        this.remove(index);
      }
    }

  }

  /**
   * 取消編輯狀態
   *
   * @param {Todo} todo - 欲取消編輯狀態的待辦事項
   * @memberof TodoListComponent
   */
  cancelEditing(todo: Todo): void {
    todo.editable = false;
  }

  /**
   * 取得未完成的待辦事項清單
   *
   * @returns {Todo[]}
   * @memberof TodoListComponent
   */
  getRemainingList(): Todo[] {
    return this.todoListService.getWithCompleted(false);
  }


}
