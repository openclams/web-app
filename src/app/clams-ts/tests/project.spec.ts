// tslint:disable: no-unused-expression
import Project from '../model/project';
import ProjectFactory from '../factories/project-factory';
import { expect } from 'chai';
import JsonProject from '../json-model/json-project';

describe('Projects', () => {

  it('Should transform to JSON from empty', () => {
      const project = new Project();

      const jsonProject = ProjectFactory.toJSON(project);

      expect(jsonProject.graphs).to.be.empty;
      expect(jsonProject.components).to.be.empty;
      expect(jsonProject.cloudProviders).to.be.empty;
      expect(jsonProject.lastId).to.be.equal(0);
  });

  it('Should transform to Project from empty JSON', () => {
    const jsonProject = {graphs: [],
                        components: [],
                        cloudProviders: [],
                        lastId: 0};

    const project = ProjectFactory.fromJSON(jsonProject);

    expect(project.graphs).to.be.empty;
    expect(project.components).to.be.empty;
    expect(project.cloudProviders).to.be.empty;
    expect(jsonProject.lastId).to.be.equal(0);
});

  const testProject: JsonProject = {
    'lastId': 5,
    'graphs': [{
      'id': 'graph_1',
      'name': 'Graph One',
      'type': 'SequenceDiagram',
      'nodes': [{
        'type': 'Instance',
        'id': 'graph_1_1',
        'geometry': {
          'x': 30,
          'y': 20,
          'h': 30,
          'w': 30,
        },
        'component': 'Mongo Instance',
        }, {
          'type': 'Instance',
          'id': 'graph_1_2',
          'geometry': {
            'x': 30,
            'y': 20,
            'h': 30,
            'w': 30,
          },
          'component': 'Spring Instance',
          }],
        'edges': [{
          'type': 'Message',
          'from': 'graph_1_1',
          'to': 'graph_1_2',
          'edgeType': {
            'id': 'edge_type_1',
            'name': 'Edge Type 1',
            'attributes': [],
          },
          'position': 20
        }],
        'lastId': 5
        }],
    'components': [
      {
        'type': 'Service',
        'id': 'service_1',
        'name': 'Spring Boot',
        'img': 'imgurl1',
        'attributes': [{
          'id': 'name',
          'name': 'Name',
          'type': 'string',
          'value': 'Spring Instance'
        }],
        'targetCloud': 'Azure',
        'regions' : [
          {
            'id' : 'any',
            'name': 'allof the availible regions'
        }
        ]
      },
      {
        'type': 'Service',
        'id': 'service_2',
        'name': 'Mongo DB',
        'img': 'imgurl2',
        'attributes': [{
          'id': 'name',
          'name': 'Name',
          'type': 'string',
          'value': 'Mongo Instance'
        }],
        'targetCloud': 'Azure',
        'regions' : [
          {
            'id' : 'any',
            'name': 'allof the availible regions'
        }
        ]
      }
    ],
    'cloudProviders': [{
      'target': 'Azure',
      'title': 'Microsoft Azure',
      'company': 'Microsoft',
      'basePath': '/azure/',
      'costLookupFile' : 'cost-lookup.json',
      'catalogFile': 'service-catalog.json',
      'image': 'microsoft-azure.png',
      'regions' : [{
              'id' : 'any',
              'name': 'allof the availible regions'
          }]
    }]
  };


  it('Should transform real example from JSON ', () => {
    const newProject = ProjectFactory.fromJSON(testProject);
    const jsonProject = ProjectFactory.toJSON(newProject);
    Object.keys(testProject).forEach( (prop, idx) => {
      expect(testProject[prop]).to.deep.equal(jsonProject[prop]);
    });
  });


});
