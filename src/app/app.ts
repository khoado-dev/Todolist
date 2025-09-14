import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html'
})
export class App {
  filter = signal<'all' | 'active' | 'completed'>('all');
  newTitle = '';

  constructor(public todos: TodoService) {}

  addTodo() {
    if (this.newTitle.trim()) {
      this.todos.add(this.newTitle.trim());
      this.newTitle = '';
    }
  }

  get list() {
    switch (this.filter()) {
      case 'active': return this.todos.active();
      case 'completed': return this.todos.completed();
      default: return this.todos.items();
    }
  }
}
