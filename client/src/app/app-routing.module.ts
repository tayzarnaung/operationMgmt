import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { YangonComponent } from './work-order-create/yangon/yangon.component';
import { MandalayComponent } from './work-order-create/mandalay/mandalay.component';
import { BiComponent } from './work-order-create/bi/bi.component';
import { OpiComponent } from './work-order-create/opi/opi.component';
import { OverviewComponent } from './overview/overview.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path:'', redirectTo:'/overview', pathMatch:'full' },
  {path:'overview', component:OverviewComponent},
  {path:'list', component:ListComponent, runGuardsAndResolvers: 'always'},

  {path:'yangon', component:YangonComponent, runGuardsAndResolvers: 'always' },
  {path:'mandalay', component:MandalayComponent },
  {path:'bi', component:BiComponent },
  {path:'opi', component:OpiComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routesComponent = [
  YangonComponent, MandalayComponent, BiComponent, OpiComponent, OverviewComponent, ListComponent
]
