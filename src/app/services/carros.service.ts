import { Injectable } from '@angular/core';

import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { LocationService } from './location.service';
import { UsuarioService } from './usuario.service';

type Carro = Schema['Carro']['type'];

const client = generateClient<Schema>();

const carroSelectionSet = ['id', 'name', 'brand', 'model', 'year', 'plate', 'color', 'documents.*', 'services.*', 'propietarios.*'] as const;
type CarroSelectionSet = SelectionSet<Schema['Carro']['type'], typeof carroSelectionSet>;

@Injectable({
  providedIn: 'root'
})
export class CarrosService {


  constructor(
    private locationSrv: LocationService,
    private usuarioSrv: UsuarioService
  ) { }

  async getCarroById(carroId: string): Promise<CarroSelectionSet | null> {
    const { data: carro, errors } = await client.models.Carro.get({ id: carroId }, { selectionSet: carroSelectionSet });
    console.log('CarrosService::getCarroById', carro, errors);
    return carro;
  }

  async listCarros(): Promise<CarroSelectionSet[]> {
    const { data: carros, errors } = await client.models.Carro.list({ selectionSet: carroSelectionSet });
    console.log('CarrosService::listCarros', carros, errors);
    return carros;
  }

  async createCarro(carroData:
    {
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
    const { data: createdCarro, errors } = await client.models.Carro.create(
      carroData );
    console.log('CarrosService::createCarro', createdCarro, errors);
    return createdCarro
  }

  
  async updateCarro(carroData:
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
    const { data: createdCarro, errors } = await client.models.Carro.update(
      carroData );
    console.log('CarrosService::createCarro', createdCarro, errors);
    return createdCarro
  }

  async deleteCarro(carroId: string): Promise<void> {
    console.log('CarrosService::deleteCarro');

    const { data: deletedCarro, errors } = await client.models.Carro.delete({ id: carroId });

    console.log('CarrosService::deleteCarro', deletedCarro);
  }
}
