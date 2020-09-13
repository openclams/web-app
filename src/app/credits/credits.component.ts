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
import { Router } from '@angular/router';
import {Location} from '@angular/common';

export interface ProjectContributor {
  name: string;
  team: string;
  github: string;
}

const ELEMENT_DATA: ProjectContributor[] = [
  {name: 'Roman Bitz', team: 'Backend', github: 'Roman-787'},
  {name: 'Mirac Coskuner', team: 'Backend', github: 'MCoskuner'},
  {name: 'Heiko Geppert', team: 'Scrum-Master', github: 'GepperHo'},
  {name: 'Jonathan Goeggel', team: 'Frontend', github: 'Jojogoe'},
  {name: 'Dominik Lekar', team: 'Maths', github: 'Lekardk'},
  {name: 'Tobias Linn', team: 'Frontend', github: 'Tobias-linn'},
  {name: 'Simon Matejetz', team: 'Frontend', github: 'Matejetz'},
  {name: 'Tobias Mathony', team: 'Frontend', github: 'Mathonto'},
  {name: 'Peter Muschick', team: 'Frontend', github: 'Asdf11x'},
  {name: 'Gabriel Tuma', team: 'Maths', github: 'Ipuma'},
  {name: 'Max Weisser', team: 'Maths', github: 'Weissermax'},
  {name: 'Adrian Wersching', team: 'Frontend', github: 'Awersching'},
];

@Component({
  selector: 'app-credits',
  templateUrl: './credits.component.html',
  styleUrls: ['./credits.component.css']
})
export class CreditsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'team', 'github'];
  dataSource = ELEMENT_DATA;

  constructor(private router: Router, private location: Location) {
  }

  ngOnInit() {
  
  }

  closePage(){
    this.location.back();
  }
}
