export class Owner {

  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  companyName: string;
  vatNumber: string;

  constructor(data = {}) {
    Object.assign(this, data);
  }

}
