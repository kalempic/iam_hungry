import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JeloDetailPage } from './jelo-detail.page';

describe('JeloDetailPage', () => {
  let component: JeloDetailPage;
  let fixture: ComponentFixture<JeloDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeloDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JeloDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
