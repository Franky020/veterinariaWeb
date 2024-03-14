import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesServicesComponent } from './entries-services.component';

describe('EntriesServicesComponent', () => {
  let component: EntriesServicesComponent;
  let fixture: ComponentFixture<EntriesServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntriesServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
