import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChirstmasTree } from './chirstmas-tree';

describe('ChirstmasTree', () => {
  let component: ChirstmasTree;
  let fixture: ComponentFixture<ChirstmasTree>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChirstmasTree]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChirstmasTree);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
