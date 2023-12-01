import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ProfessionalDetailsPage } from './professional-details.page';

describe('ProfessionalDetailsPage', () => {
  let component: ProfessionalDetailsPage;
  let fixture: ComponentFixture<ProfessionalDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfessionalDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
