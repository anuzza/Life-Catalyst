import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
      },
      {
        path: 'quotes',
        loadChildren: () => import('../quotes/quotes.module').then( m => m.QuotesPageModule)
      },
      {
        path: 'videos',
        loadChildren: () => import('../videos/videos.module').then( m => m.VideosPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)

      },
      {
        path: 'resources',
        loadChildren: () => import('../resources/resources.module').then( m => m.ResourcesPageModule)
      },
      {
        path: '',
        redirectTo:"home",
        pathMatch:'full'
      }

    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
