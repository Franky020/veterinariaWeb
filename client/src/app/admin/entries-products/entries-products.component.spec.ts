import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesProductsComponent } from './entries-products.component';

describe('EntriesProductsComponent', () => {
  let component: EntriesProductsComponent;
  let fixture: ComponentFixture<EntriesProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesProductsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntriesProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
