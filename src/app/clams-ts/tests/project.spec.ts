// tslint:disable: no-unused-expression
import Model from '../model/model';
import ModelFactory from '../factories/model-factory';
import { expect } from 'chai';
import JsonModel from '../schema/json-model';

describe('Model', () => {

  it('Should transform to JSON from empty', () => {
      const model = new Model();

      const jsonModel = ModelFactory.toJSON(model);

      expect(jsonModel.graphs).to.be.empty;
      expect(jsonModel.components).to.be.empty;
      expect(jsonModel.cloudProviders).to.be.empty;
      expect(jsonModel.lastId).to.be.equal(0);
  });

  it('Should transform to Model from empty JSON', () => {
    const jsonModel = {graphs: [],
                        components: [],
                        cloudProviders: [],
                        lastId: 0};

    const model = ModelFactory.fromJSON(jsonModel);

    expect(model.graphs).to.be.empty;
    expect(model.components).to.be.empty;
    expect(model.cloudProviders).to.be.empty;
    expect(jsonModel.lastId).to.be.equal(0);
});

  const testmodel: JsonModel = {
    lastId: 5,
    graphs: [{
      id: 'graph_1',
      name: 'Graph One',
      type: 'SequenceDiagram',
      nodes: [{
        type: 'Instance',
        id: 'graph_1_1',
        geometry: {
          x: 30,
          y: 20,
          h: 30,
          w: 30,
        },
        component: 'Mongo Instance',
        }, {
          type: 'Instance',
          id: 'graph_1_2',
          geometry: {
            x: 30,
            y: 20,
            h: 30,
            w: 30,
          },
          component: 'Spring Instance',
          }],
        edges: [{
          type: 'Message',
          from: 'graph_1_1',
          to: 'graph_1_2',
          edgeType: {
            id: 'edge_type_1',
            name: 'Edge Type 1',
            attributes: [],
          },
          position: 20
        }],
        lastId: 5
        }],
    components: [
      {
        type: 'Service',
        id: 'service_1',
        name: 'Spring Boot',
        img: 'imgurl1',
        attributes: [{
          id: 'name',
          name: 'Name',
          type: 'string',
          value: 'Spring Instance'
        }],
        targetCloud: 'Azure',
        regions : [
          {
            id : 'any',
            name: 'allof the availible regions'
        }
        ]
      },
      {
        type: 'Service',
        id: 'service_2',
        name: 'Mongo DB',
        img: 'imgurl2',
        attributes: [{
          id: 'name',
          name: 'Name',
          type: 'string',
          value: 'Mongo Instance'
        }],
        targetCloud: 'Azure',
        regions : [
          {
            id : 'any',
            name: 'allof the availible regions'
        }
        ]
      }
    ],
    cloudProviders: [{
      target: 'Azure',
      title: 'Microsoft Azure',
      company: 'Microsoft',
      basePath: '/azure/',
      costLookupFile : 'cost-lookup.json',
      catalogFile: 'service-catalog.json',
      image: 'microsoft-azure.png',
      regions : [{
              id : 'any',
              name: 'allof the availible regions'
          }]
    }]
  };


  it('Should transform real example from JSON ', () => {
    const newmodel = ModelFactory.fromJSON(testmodel);
    const jsonModel = ModelFactory.toJSON(newmodel);
    Object.keys(testmodel).forEach( (prop, idx) => {
      expect(testmodel[prop]).to.deep.equal(jsonModel[prop]);
    });
  });


});
