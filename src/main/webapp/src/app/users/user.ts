
export class User {

  id: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  createdAt: Date = null;
  isActive = false;

  constructor(data: any) {
    Object.assign(this, data);

    if (data) {
      this.createdAt = data.createdAt ? new Date(data.createdAt) : null;
    }

  }

  getFullName(): string {

    if (this.name && this.surname) {
      return `${this.name} ${this.surname}`;
    }

    return '-';
  }

  getStatus() {
    return this.isActive ? 'Aktywny' : 'Nieaktywny';
  }
}
