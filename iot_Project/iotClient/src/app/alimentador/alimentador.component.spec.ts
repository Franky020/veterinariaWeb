import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlimentadorComponent } from './alimentador.component';

describe('AlimentadorComponent', () => {
  let component: AlimentadorComponent;
  let fixture: ComponentFixture<AlimentadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlimentadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlimentadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
