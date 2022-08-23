import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ClientComponent } from './client/client.component';
import { ProductComponent } from './product/product.component';
import { StorageComponent } from './storage/storage.component';
import { ReceivingComponent } from './receiving/receiving.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'client', component: ClientComponent, data: { permission: 'Pages.Client' }, canActivate: [AppRouteGuard] },
                    { path: 'product', component: ProductComponent, data: { permission: 'Pages.Product' }, canActivate: [AppRouteGuard] },
                    { path: 'storage', component: StorageComponent, data: { permission: 'Pages.Storage' }, canActivate: [AppRouteGuard] },
                    { path: 'receiving', component: ReceivingComponent, data: { permission: 'Pages.Receiving' }, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
