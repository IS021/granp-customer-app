import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { SerachPagePage } from './search-page.page';

describe('SerachPagePage', () => {
  let component: SerachPagePage;
  let fixture: ComponentFixture<SerachPagePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SerachPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
