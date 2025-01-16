import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteHotelComponent } from './carte-hotel.component';

describe('CarteHotelComponent', () => {
  let component: CarteHotelComponent;
  let fixture: ComponentFixture<CarteHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarteHotelComponent]
    });
    fixture = TestBed.createComponent(CarteHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
