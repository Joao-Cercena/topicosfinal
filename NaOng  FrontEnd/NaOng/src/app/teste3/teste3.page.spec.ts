import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Teste3Page } from './teste3.page';

describe('Teste3Page', () => {
  let component: Teste3Page;
  let fixture: ComponentFixture<Teste3Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Teste3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
