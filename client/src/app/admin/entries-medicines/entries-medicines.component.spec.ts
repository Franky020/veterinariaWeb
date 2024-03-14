import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntriesMedicinesComponent } from './entries-medicines.component';

describe('EntriesMedicinesComponent', () => {
  let component: EntriesMedicinesComponent;
  let fixture: ComponentFixture<EntriesMedicinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntriesMedicinesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntriesMedicinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
