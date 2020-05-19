import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent 
    },
    { 
        path: 'customer/:action', 
        component: CustomerComponent 
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
