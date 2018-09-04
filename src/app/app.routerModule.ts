
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AssetComponent } from './asset/asset.component';
import { StaffComponent } from './staff/staff.component';
import { ContractComponent } from './contract/contract.component';
import { UserComponent } from './user/user.component';
import { SettingComponent } from './setting/setting.component';
import  { GroupTab} from './grouptab/group.tab';
import { AddgroupComponent } from './addgroup/addgroup.component';
import { UsergroupComponent} from './usergroup/usergroup.component';
import { AssigngroupComponent } from './assigngroup/assigngroup.component';
import { EditusergroupComponent} from './editusergroup/editusergroup.component';
import { ViewusergroupComponent } from './viewusergroup/viewusergroup.component';

// Navigation 
const routes:Routes = [
    //{path:'', pathMatch:'full', redirectTo:'login'},
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
   // {path:'login', component:LoginpageComponent},
    {path:'dashboard', component:DashboardComponent},
    {path:'asset', component:AssetComponent},
    {path:'staff',component:StaffComponent},
    {path:'contract', component:ContractComponent},
    {path:'user',component:GroupTab},
    {path:'setting', component:SettingComponent},
    //{path:'addgroup', component:AddgroupComponent},
    {pathMatch:'full', path:'addgroup/add', component:AddgroupComponent},
    {pathMatch:'full', path:'addgroup/edit:id', component:AddgroupComponent},
    {path:'assignGroup', component: AssigngroupComponent},
    {path:'usergroupactive', component: GroupTab},
    //{path:'usergroup/add', component: EditusergroupComponent},
    {path:'usergroupEdit', component: EditusergroupComponent},
    //{path:'usergroupEdit/:id', component: EditusergroupComponent},
     {path:'viewgroup/:id', component: ViewusergroupComponent}
    
    //{path:'**', component:PageNotFoundComponent}
]


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]

})

export class AppRoutingModule {

}

export const RoutingComponent = [
    //LoginpageComponent,
    DashboardComponent,
    AssetComponent,
    StaffComponent,
    AddgroupComponent,
    GroupTab,
    ContractComponent,
    AssigngroupComponent,
    EditusergroupComponent,
    ViewusergroupComponent,
    SettingComponent
    ]