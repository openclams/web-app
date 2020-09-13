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

export abstract class Config {

  static readonly CELL_TYPE_PROPERTY = 'cellType';
  static readonly RELIABILITY_PROPERTY = 'reliability';
  static readonly SERVICE_NAME_PROPERTY = 'serviceName';
  static readonly VERTEX_PROPERTY = 'vertex';
  static readonly CHILDREN_PROPERTY = 'children';

  static readonly GRAPH_SIZE_X = 1024;
  static readonly GRAPH_SIZE_Y = 1024;
  static readonly UCD = 'UCD';
  static readonly SQD = 'SQD';
  static readonly new_SQD = 'New SQD';
  static readonly new_UCD = 'New UCD';
  static readonly empty_node = 'Empty node';

  static readonly BLUE_LIGHT = '#00beff';
  static readonly BLUE_DARK = '#004191';
  static readonly WARN_RED = '#f44336';
  static readonly WHITE = '#ffffff';
  static readonly BLACK = '#000000';
  static readonly NEON_GREEN = '#39FF14';
  static readonly NONE = 'none';
  static readonly X_LIMITATION = 0;

  static readonly SELECTION_STROKEWIDTH = 3;
}
