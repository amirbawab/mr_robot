import {Routes, RouterModule} from "@angular/router";
import {MapViewComponent} from "./views/map-view/map-view.component";
import {MainTemplateComponent} from "./views/templates/main/main-template.component";
import {NavTemplateComponent} from "./views/templates/nav/nav-template.component";
import {AppsViewComponent} from "./views/apps-view/apps-view.component";

const APP_ROUTES : Routes = [
  { path: '', redirectTo: 'view/home', pathMatch: 'full'},
  { path: 'view', component: MainTemplateComponent, children: [
    { path: 'home', component: AppsViewComponent}
  ]},
  { path: 'open', component: NavTemplateComponent, children: [
    { path: 'map', component: MapViewComponent}
  ]}
];

export const MR_Routing = RouterModule.forRoot(APP_ROUTES);