import { Injectable, signal, computed } from '@angular/core';
import { Todo } from '../models/todo.model';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class TodoService {
  private todos = signal<Todo[]>([]);

  constructor(private storage: StorageService) {
    const saved = this.storage.get<Todo[]>() || [];
    this.todos.set(saved);
  }

  readonly items = computed(() => this.todos());
  readonly active = computed(() => this.todos().filter((t) => !t.completed));
  readonly completed = computed(() => this.todos().filter((t) => t.completed));

  private persist() {
    this.storage.set(this.todos());
  }

  add(title: string) {
    const todo: Todo = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      createdAt: Date.now(),
    };
    this.todos.update((list) => [...list, todo]);
    this.persist();
  }

  toggle(id: string) {
    this.todos.update((list) =>
      list.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.persist();
  }

  update(id: string, title: string) {
    this.todos.update((list) => list.map((t) => (t.id === id ? { ...t, title } : t)));
    this.persist();
  }

  remove(id: string) {
    this.todos.update((list) => list.filter((t) => t.id !== id));
    this.persist();
  }

  clearCompleted() {
    this.todos.update((list) => list.filter((t) => !t.completed));
    this.persist();
  }
}
