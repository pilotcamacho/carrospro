import { Component } from '@angular/core';
import {
  IonMenu, IonApp, IonHeader, IonToolbar, IonTitle,
  IonContent, IonList, IonMenuToggle, IonIcon, IonItem, IonLabel,
  IonFooter, IonRouterOutlet,
  MenuController
} from '@ionic/angular/standalone';

import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';

// import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { addIcons } from "ionicons"
import { scanOutline, trophyOutline, shieldOutline, barChartOutline, exit, pencilOutline, mailOutline } from 'ionicons/icons'
import { UsuarioService } from './services/usuario.service';

Amplify.configure(outputs)

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    // IonicModule, 
    RouterModule, CommonModule,
    IonMenu, IonApp, IonHeader, IonToolbar, IonTitle,
    IonContent, IonList, IonMenuToggle, IonIcon, IonItem, IonLabel, IonFooter,
    IonRouterOutlet,
    AmplifyAuthenticatorModule,
  ],
})
export class AppComponent {
  constructor(
    public authenticator: AuthenticatorService,
    private menuCtrl: MenuController,
    private userSrv: UsuarioService
    // // aquí debería ir el UsuarioService para que cuando se autentique lo carque y actualice.... ahora está en retos.page.ts que es el punto de entreada ya autenticado

  ) {
    Amplify.configure(outputs);
    this.authenticator.subscribe((state) => {
      // console.log('AppComponent::constructor.subscribe::state: ', state);
      this.userSrv.updateUser(state.authStatus);
    })
    addIcons({
      scanOutline, trophyOutline, shieldOutline, barChartOutline, pencilOutline, exit, mailOutline
    })
  }

  ngOnInit() {
    this.menuCtrl.enable(true, 'main-menue'); // Ensure menu is enabled
  }

  signOut() {
    this.authenticator.signOut();
  }
}
