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

import { Config } from './config';

export class UseCaseConfig extends Config {
  static readonly UCD = 'UCD';

  static readonly INITIAL_EDGE_LABEL = '0';
  static readonly STANDALONE_EDGE_WIDTH = 100;
  static readonly EDGE_LABEL_BACKGROUND_COLOR = '#fff';
  static readonly EDGE_FONT_SIZE = 16;
  static readonly EDGE_WEIGHT_STYLE = 1;
  static readonly EDGE_COLOR = '#000';

  static readonly ACTIVITY_WIDTH = 110;
  static readonly ACTIVITY_HEIGHT = 40;
  static readonly ACTIVITY_FILL_COLOR = '#fff';
  static readonly ACTIVITY_STROKE_COLOR = '#000';
  static readonly ACTIVITY_STYLE_EDITABLE = 0;


  static readonly ACTIVITY_STROKE_WIDTH = 3;
  static readonly ACTIVITY_FONT_COLOR = '#000';
  static readonly ACTIVITY_FONT_SIZE = 12;

  static readonly ACTIVITY_START_POINT_FILL_COLOR = '#000';
  static readonly ACTIVITY_START_POINT_X = 300;
  static readonly ACTIVITY_START_POINT_Y = 200;
  static readonly ACTIVITY_START_POINT_RADIUS = 20;
  static readonly ACTIVITY_START_POINT_SHAPE = 'doubleEllipse';
  static readonly ACTIVITY_START_POINT_STYLE =
    'fillColor=' + UseCaseConfig.ACTIVITY_START_POINT_FILL_COLOR + ';' +
    'shape=' + UseCaseConfig.ACTIVITY_START_POINT_SHAPE + ';' +
    'strokeColor=' + UseCaseConfig.ACTIVITY_STROKE_COLOR + ';' +
    'strokeWidth=' + UseCaseConfig.ACTIVITY_STROKE_WIDTH + ';';


  static readonly INITIAL_VERTEX_X = 250;
  static readonly INITIAL_VERTEX_Y = 150;

  static readonly MARGIN_BETWEEN_VERTICES = 16;
}
