import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JeloComponent } from './jelo.component';

describe('JeloComponent', () => {
  let component: JeloComponent;
  let fixture: ComponentFixture<JeloComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeloComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
