// tslint:disable: no-unused-expression
import { expect } from 'chai';
import Region from '../model/service-catalog/region';
import RegionFactory from '../factories/service-catalogs/region-factory';
import CloudProvider from '../model/service-catalog/cloud-provider';

describe('Regions', () => {

  it('Should transform to JSON', () => {
    const region = new Region('test-region-eu', 'Test region in EU');

    const jsonRegion = RegionFactory.toJSON(region);

    expect(jsonRegion).to.deep.equal({id: 'test-region-eu', name: 'Test region in EU'});
  });

  it('Should transform from JSON', () => {
    const jsonRegion = {id: 'test-region-eu', name: 'Test region in EU'};

    const region = RegionFactory.fromJSON(jsonRegion);

    expect(region.id).to.be.equal('test-region-eu');
    expect(region.name).to.be.equal('Test region in EU');
    expect(region.cloudProvider).to.be.null;
    expect(region.services).to.be.empty;
  });

  it('Should transform from JSON considering cloud provider', () => {
    const jsonRegion = {id: 'test-region-eu', name: 'Test region in EU'};
    const cloudProvider = new CloudProvider();

    const region = RegionFactory.fromJSON.call(cloudProvider, jsonRegion);

    expect(region.id).to.be.equal('test-region-eu');
    expect(region.name).to.be.equal('Test region in EU');
    expect(region.cloudProvider).to.be.equal(cloudProvider);
  });



});
