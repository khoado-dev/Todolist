import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  private key = 'todos';

  get<T>(): T | null {
    const raw = localStorage.getItem(this.key);
    return raw ? JSON.parse(raw) : null;
  }

  set<T>(data: T): void {
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
