// tslint:disable: no-unused-expression
import { expect } from 'chai';
import JsonCloudProvider from '../schema/service-catalog/json-cloud-provider';
import CloudProviderFactory from '../factories/service-catalogs/cloud-provider-factory';

describe('Cloud Providers', () => {

  const data: JsonCloudProvider[] = [{
    target: 'ibm',
    title: 'IBM Cloud',
    company: 'IBM',
    basePath: '/ibm/',
    costLookupFile: 'cost-lookup.json',
    catalogFile: 'service-catalog.json',
    image: 'ibm.png',
    regions: []
  },
  {
    target: 'Azure',
    title: 'Microsoft Azure',
    company: 'Microsoft',
    basePath: '/azure/',
    costLookupFile: 'cost-lookup.json',
    catalogFile: 'service-catalog.json',
    image: 'microsoft-azure.png',
    regions: [
      {
        id: 'europe-north',
        name: 'Europe (North)'
      },
      {
        id: 'europe-west',
        name: 'Europe (West)'
      },
      {
        id: 'france-central',
        name: 'France (Central)'
      }
    ]
  },
  {
    target: 'aws',
    title: 'Amazon Web Services',
    company: 'Amazon',
    basePath: '/aws/',
    costLookupFile: 'cost-lookup.json',
    catalogFile: 'service-catalog.json',
    image: '/cloud-type-icons/aws.png',
    regions: [
      {
        id: 'us-east-2',
        name: 'US East (Ohio)'
      },
      {
        id: 'us-east-1',
        name: 'US East (N. Virginia)'
      },
      {
        id: 'us-west-1',
        name: 'US West (N. California)'
      },
      {
        id: 'us-west-2',
        name: 'USA West (Oregon)'
      },
      {
        id: 'ap-east-1',
        name: 'Asien-Pazifik (Hongkong)'
      },
      {
        id: 'ap-south-1',
        name: 'Asia-pacific (Mumbai)'
      },
      {
        id: 'ap-northeast-3',
        name: 'Asien-Pazifik (Osaka-Lokal)'
      },
      {
        id: 'ap-northeast-1',
        name: 'Asien-Pazifik (Sydney)'
      },
      {
        id: 'ca-central-1',
        name: 'Kanada (Central)'
      },
      {
        id: 'eu-central-1',
        name: 'EU (Frankfurt)'
      }
    ]
  }];

  it('Should transform from JSON', () => {
    const jsonCloudProvider = data[0];

    const cloudProvider = CloudProviderFactory.fromJSON(jsonCloudProvider);

    Object.keys(cloudProvider).forEach( (prop) => {
        if (prop !== 'regions' && prop !== 'catalog') {
            expect(cloudProvider[prop]).to.be.equal(jsonCloudProvider[prop]);
        }
    });
  });

  it('Should transform from JSON array', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      cloudProviders.forEach((cloudProvider, idx) => {
          Object.keys(cloudProvider).forEach( (prop) => {
              if (prop !== 'regions' && prop !== 'catalog') {
                  expect(data[idx][prop]).to.be.equal(cloudProvider[prop], 'Property: ' + prop);
              }
          });
      });
  });

  it('Should transform to JSON array', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      const jsonCloudProviders = cloudProviders.map(provider => CloudProviderFactory.toJSON(provider));

      jsonCloudProviders.forEach((jsonCloudProvider, idx) => {
          Object.keys(jsonCloudProvider).forEach( (prop) => {
              if (prop !== 'regions' && prop !== 'catalog') {
                  expect(cloudProviders[idx][prop]).to.be.equal(jsonCloudProvider[prop]);
              }
          });
      });
  });

  it('Should transform also regions', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      cloudProviders.forEach((provider, idx) => {
          data[idx].regions.forEach((region, ridx) => {
              expect(region.id).to.be.equal(provider.regions[ridx].id);
              expect(region.name).to.be.equal(provider.regions[ridx].name);
          });
      });
  });

  it('Should have same number of regions after transformation from JSON', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      cloudProviders.forEach((provider, idx) => {
           expect(provider.regions.length).to.be.equal(data[idx].regions.length);
      });
  });

  it('Should have same number of regions after transformation to JSON', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      const jsonCloudProviders = cloudProviders.map(provider => CloudProviderFactory.toJSON(provider));

      jsonCloudProviders.forEach((provider, idx) => {
          expect(provider.regions.length).to.be.equal(data[idx].regions.length);
      });
  });

  it('Should also transform regions to JSON', () => {
      const cloudProviders = data.map(provider => CloudProviderFactory.fromJSON(provider));

      const jsonCloudProviders = cloudProviders.map(provider => CloudProviderFactory.toJSON(provider));

      jsonCloudProviders.forEach((jsonCloudProvider, idx) => {
          jsonCloudProvider.regions.forEach((jsonRegion, ridx) => {
              expect(jsonRegion.id).to.be.equal(data[idx].regions[ridx].id);
              expect(jsonRegion.name).to.be.equal(data[idx].regions[ridx].name);
          });
      });
  });

  it('Should bind service catalog', () => {

  });

});
