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

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LicenseText } from './licenses-text';
import { Router } from '@angular/router';

export interface ProjectContributor {
  library: string;
  liblink: string;
  linktext: string;
  licenseName: string;
  license: string;
}


const ELEMENT_DATA_FE: ProjectContributor[] = [
  {
    library: 'mxGraph', liblink: 'https://github.com/jgraph/mxgraph', linktext: 'GitHub',
    licenseName: 'Apache v2', license: LicenseText.apachev2License
  },
  {
    library: 'Angular', liblink: 'https://github.com/angular/angular', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Angular CDK', liblink: 'https://github.com/angular/cdk-builds', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Angular Material', liblink: 'https://github.com/angular/material2', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Angular Draggable Droppable', liblink: 'https://github.com/mattlewis92/angular-draggable-droppable',
    linktext: 'GitHub', licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Angular Split Pane', liblink: 'https://github.com/wannabegeek/ng2-split-pane',
    linktext: 'GitHub', licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Core JS', liblink: 'https://github.com/zloirock/core-js#readme', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'Hammer JS', liblink: 'https://github.com/hammerjs/hammer.js', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'RxJS', liblink: 'https://github.com/ReactiveX/RxJS', linktext: 'GitHub',
    licenseName: 'Apache v2', license: LicenseText.apachev2License
  },
  {
    library: 'RxJS Compat', liblink: 'https://www.npmjs.com/package/rxjs-compat',
    linktext: 'NPMJS', licenseName: 'Apache v2', license: LicenseText.apachev2License
  },
  {
    library: 'ngx toastr', liblink: 'https://github.com/scttcper/ngx-toastr', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'jszip', liblink: 'https://stuk.github.io/jszip/', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'FileSaver', liblink: 'https://github.com/eligrey/FileSaver.js/', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'ng2-file-upload', liblink: 'https://github.com/valor-software/ng2-file-upload',
    linktext: 'GitHub', licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'decimal.js', liblink: 'https://github.com/MikeMcl/decimal.js/', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
  {
    library: 'TypedJSON', liblink: 'https://github.com/JohnWeisz/TypedJSON', linktext: 'GitHub',
    licenseName: 'MIT', license: LicenseText.mitLicense
  },
];

const ELEMENT_DATA_RESSOURCES: ProjectContributor[] = [
    {
        library: 'Cloud Computing Pattern Icons', liblink: 'http://www.cloudcomputingpatterns.org/resources/',
        linktext: 'Cloud Computing Patterns',
        licenseName: 'Creative Commons Attribution 4.0 International (CC BY 4.0)', license: LicenseText.cc4License
    },
    {
        library: 'Angular Icon', liblink: 'https://angular.io/presskit',
        linktext: 'Angular', licenseName: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        license: LicenseText.cc4License
    },
    {
        library: 'Azure Icons', liblink: 'https://github.com/amido/azure-vector-icons',
        linktext: 'Microsoft Azure', licenseName: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
        license: LicenseText.cc4License
    },
];

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css']
})
export class LicensesComponent implements OnInit {
  displayedColumns: string[] = ['library', 'liblink', 'license'];
  dataSourceLicenseFrontend = ELEMENT_DATA_FE;
  dataSourceLicenseRessources = ELEMENT_DATA_RESSOURCES;

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
  
  }

  closePage(){
    this.location.back();
  }
}
