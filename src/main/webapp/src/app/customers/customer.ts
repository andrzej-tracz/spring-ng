import { DateModel } from 'ng2-datepicker';


export class Customer {

  id: number;
  name: string;
  surname: string;
  email: string;
  address: string;
  city: string;
  personalNumber: string;
  phone: string;
  companyName: string;
  vatNumber: string;
  isActive = false;
  isCompany = false;
  createdAt: Date = null;
  bornDatePicker: DateModel = null;
  bornDate: Date = null;
  drivingLicenseDatePicker: DateModel = null;
  drivingLicenseDate: Date = null;
  firstPoliceDatePicker: DateModel = null;
  firstPoliceDate: Date = null;

  constructor(data) {

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

  prepareToSave() {
    if (this.bornDatePicker) {
      this.bornDate = this.bornDatePicker.momentObj.toDate();
    }

    if (this.drivingLicenseDatePicker) {
      this.drivingLicenseDate = this.drivingLicenseDatePicker.momentObj.toDate();
    }

    if (this.firstPoliceDatePicker) {
      this.firstPoliceDate = this.firstPoliceDatePicker.momentObj.toDate();
    }
  }
}
