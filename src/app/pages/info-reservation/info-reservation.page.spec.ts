import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoReservationPage } from './info-reservation.page';

describe('InfoReservationPage', () => {
  let component: InfoReservationPage;
  let fixture: ComponentFixture<InfoReservationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InfoReservationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
