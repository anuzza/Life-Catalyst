import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';
import { LoggedInGuard } from '../guards/logged-in.guard';
import { QuotesPage } from '../pages/quotes/quotes.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule),
      },
      {
        path: 'quotes',
        loadChildren: () => import('../pages/quotes/quotes.module').then( m => m.QuotesPageModule)
      },
      {
        path: 'quotes/:id',
        loadChildren: () => import('../pages/quotes/quotes.module').then( m => m.QuotesPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../pages/videos/videos.module').then( m => m.VideosPageModule)
      },
      {
        path: 'videos/:id',
        loadChildren: () => import('../pages/videos/videos.module').then( m => m.VideosPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then( m => m.ProfilePageModule)

      },
      {
        path: 'resources',
        loadChildren: () => import('../pages/resources/resources.module').then( m => m.ResourcesPageModule)
      },
      {
        path: '',
        redirectTo:"home",
        pathMatch:'full'
      },
      {
        path: '**',
        redirectTo:"home",
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
