import { Injectable } from '@angular/core';

import { generateClient, SelectionSet } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';

import { UsuarioService } from './usuario.service';


type ToDo = Schema['ToDo']['type'];

const client = generateClient<Schema>();

const toDoSelectionSet = ['id', 'name', 'description','isDone', 'doneDate', 'carroId'] as const;
type ToDoSelectionSet = SelectionSet<Schema['ToDo']['type'], typeof toDoSelectionSet>;

type ToDoType = 'jpg' | 'pdf';


@Injectable({
  providedIn: 'root'
})
export class ToDosService {


  constructor(
    private usuarioSrv: UsuarioService
  ) { }

  async getToDoById(toDoId: string): Promise<ToDoSelectionSet | null> {
    const { data: toDo, errors } = await client.models.ToDo.get({ id: toDoId }, { selectionSet: toDoSelectionSet });
    console.log('ToDosToDo::getToDoById', toDo, errors);
    return toDo;
  }

  async listToDos(): Promise<ToDoSelectionSet[]> {
    const { data: toDos, errors } = await client.models.ToDo.list({ selectionSet: toDoSelectionSet });
    console.log('ToDosToDo::listToDos', toDos, errors);
    return toDos;
  }


  async createToDo(toDoData:
    {
      carroId: string,
      name: string
      description: string,
      // isDone: boolean,
      // doneDate: string
    }
  ): Promise<any> {
    const { data: createdToDo, errors } = await client.models.ToDo.create(
      toDoData );
    console.log('ToDosToDo::createToDo', createdToDo, errors);
    return createdToDo
  }

  
  async updateToDo(toDoData:
    {
      id: string,
      issueDate: string,
      expirationDate: string,
      cost: number,
    }
  ): Promise<any> {
    // const usuario = this.usuarioSrv.usuarioId
    // const createdAt = new Date().toISOString()
    // const currentLocation = await this.locationSrv.getCurrentLocation()
    const { data: createdToDo, errors } = await client.models.ToDo.update(
      toDoData );
    console.log('ToDosToDo::createToDo', createdToDo, errors);
    return createdToDo
  }

  async deleteToDo(toDoId: string): Promise<void> {
    console.log('ToDosToDo::deleteToDo');

    const { data: deletedToDo, errors } = await client.models.ToDo.delete({ id: toDoId });

    console.log('ToDosToDo::deleteToDo', deletedToDo);
  }
}
