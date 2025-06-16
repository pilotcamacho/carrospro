import { Injectable } from '@angular/core';

import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { LocationService } from './location.service';
import { UsuarioService } from './usuario.service';

type Service = Schema['Service']['type'];

const client = generateClient<Schema>();

const serviceSelectionSet = ['id', 'type', 'description', 'price', 'km', 'dateTime', 'location.*', 'carroId'] as const;
type ServiceSelectionSet = SelectionSet<Schema['Service']['type'], typeof serviceSelectionSet>;

type ServiceType = 'Gasolina' | 'CambioAceite' | 'Lavado' | 'AguaVidrios' | 'AguaMotor' | 'Llantas' | 'Taller' | 'Parking' | 'Other';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {


  constructor(
    private locationSrv: LocationService,
    private usuarioSrv: UsuarioService
  ) { }

  async getServiceById(serviceId: string): Promise<ServiceSelectionSet | null> {
    const { data: service, errors } = await client.models.Service.get({ id: serviceId }, { selectionSet: serviceSelectionSet });
    console.log('ServicesService::getServiceById', service, errors);
    return service;
  }

  async listServices(): Promise<ServiceSelectionSet[]> {
    const { data: services, errors } = await client.models.Service.list({ selectionSet: serviceSelectionSet });
    console.log('ServicesService::listServices', services, errors);
    return services;
  }

  async listServicesByCarroId(carroId: string): Promise<ServiceSelectionSet[]> {
    const { data: services, errors } = await client.models.Service.listServiceByCarroIdAndDateTime(
      { carroId: carroId },
      { selectionSet: serviceSelectionSet, sortDirection: 'DESC' });
    console.log('ServicesService::listServices', services, errors);
    return services;
  }


  async createService(serviceData:
    {
      carroId: string,
      name: string,
      type: ServiceType,
      description: string,
      price: number,
      km: number,
      dateTime: string
    }
  ): Promise<any> {
    // const usuario = this.usuarioSrv.usuarioId
    // const createdAt = new Date().toISOString()
    const currentLocation = await this.locationSrv.getCurrentLocation()
    const { data: createdService, errors } = await client.models.Service.create(
      { ...serviceData, location: currentLocation });
    console.log('ServicesService::createService', createdService, errors);
    return createdService
  }


  async updateService(serviceData:
    {
      id: string,
      name: string,
      brand: string,
      model: string,
      year: number,
      plate: string,
      color: string
    }
  ): Promise<any> {
    // const usuario = this.usuarioSrv.usuarioId
    // const createdAt = new Date().toISOString()
    // const currentLocation = await this.locationSrv.getCurrentLocation()
    const { data: createdService, errors } = await client.models.Service.update(
      serviceData);
    console.log('ServicesService::createService', createdService, errors);
    return createdService
  }

  async deleteService(serviceId: string): Promise<void> {
    console.log('ServicesService::deleteService');

    const { data: deletedService, errors } = await client.models.Service.delete({ id: serviceId });

    console.log('ServicesService::deleteService', deletedService);
  }
}
