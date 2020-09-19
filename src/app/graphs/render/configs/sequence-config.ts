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

export class SequenceConfig extends Config {

  static readonly VERTEX_TOP_MARGIN = 112;
  static readonly VERTEX_BOTTOM_MARGIN = 8;
  static readonly VERTEX_IMAGE_WIDTH_HEIGHT = 80;
  static readonly MARGIN_BETWEEN_VERTICES = 16;

  static readonly LIFELINE_WIDTH = 1;
  static readonly LIFELINE_HEIGHT = 2000;
  static readonly LIFELINE_FILL_COLOR = '#E6E6E6';
  static readonly LIFELINE_STROKE_COLOR = '#000000';
  static readonly LIFELINE_STROKE_WIDTH = 4;

  static readonly EDGE_COLOR = '#000000';
  static readonly INITIAL_EDGE_LABEL = '';
  static readonly EDGE_LABEL_BACKGROUND_COLOR = '#ffffff';
  static readonly EDGE_EDITABLE = 0;
  static readonly REL_EDGE_DIST = 0.01;
  static readonly REL_EDGE_DIST_TOP = SequenceConfig.REL_EDGE_DIST * 2;
  static readonly REL_EDGE_DIST_BOTTOM = SequenceConfig.REL_EDGE_DIST * 4;

  static readonly COMMENT_BOX_FILL_COLOR = '#ffffff';
  static readonly COMMENT_BOX_STROKE_COLOR = '#ffffff';
  static readonly COMMENT_MARGIN = 16;
  static readonly FONT_COLOR = '#000000';

  static readonly TEMPLATE_BOX_STROKE_WIDTH = 3;
  static readonly TEMPLATE_BOX_STROKE_DISTANCE = 5;

  static readonly INSTANCE_ID = 'instanceId';

  static readonly TYPE_EDGE = 'Edge';
  static readonly TYPE_NODE = 'Node';
  static readonly COMMENT_KEY = 'comment';
}
