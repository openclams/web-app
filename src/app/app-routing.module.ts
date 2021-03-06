/*
 * Copyright 2018-2019 Institute of Parallel and Distributed Systems (IPVS), University of Stuttgart
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * “License”); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectDashboardComponent } from './project-dashboard/project-dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProjectBoardComponent } from './project-board/project-board.component';
import { CreditsComponent } from './credits/credits.component';
import { LicensesComponent } from './licenses/licenses.component';

const appRoutes: Routes = [
  {
    path: 'project',
    children: [
      {
        path: ':id',
        component: ProjectBoardComponent
      }
    ]
  },
  {
    path: 'credits',
    component: CreditsComponent
  },
  {
    path: 'license',
    component: LicensesComponent
  },
  {
    path: '',
    component: ProjectDashboardComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: []
})

export class AppRoutingModule {
}
