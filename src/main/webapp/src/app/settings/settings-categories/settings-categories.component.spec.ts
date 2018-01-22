import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsCategoriesComponent } from './settings-categories.component';

describe('SettingsCategoriesComponent', () => {
  let component: SettingsCategoriesComponent;
  let fixture: ComponentFixture<SettingsCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
