import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { StorageService } from './storage.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoService, StorageService]
    });
    service = TestBed.inject(TodoService);
    localStorage.clear();
  });

  it('should add todo', () => {
    service.add('test');
    expect(service.items().length).toBe(2);
  });

  it('should toggle todo', () => {
    service.add('x');
    const id = service.items()[0].id;
    service.toggle(id);
    expect(service.items()[0].completed).toBeTrue();
  });
});
