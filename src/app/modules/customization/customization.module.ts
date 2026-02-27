import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CustomizationComponent } from './components/customizationcomponent';
import { SharedModule } from '../shared/shared.module';
import { MealOptionsListComponent } from './components/options-list/options-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomizationComponent,
  },
];

@NgModule({
  declarations: [CustomizationComponent, MealOptionsListComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes), SharedModule],
})
export class CustomizationModule {}
