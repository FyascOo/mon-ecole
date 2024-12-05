import { ChangeDetectionStrategy, Component, effect, inject, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from 'ol/geom.js';
import { Feature, Map, View } from 'ol/index.js';
import { defaults } from 'ol/interaction/defaults';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { AnnuaireStore } from './annuaire.store';

@Pipe({
  name: 'phone',
  standalone: true,
  pure: true,
})
export class PhonePipe implements PipeTransform {
  transform(phone: string | null) {
    if (phone) {
      phone = phone.trim();
      const one = phone.slice(0, 2);
      const two = phone.slice(2, 4);
      const three = phone.slice(4, 6);
      const four = phone.slice(6, 8);
      const five = phone.slice(8, 10);
      return `${one} ${two} ${three} ${four} ${five}`;
    }
    return 'Non renseigné';
  }
}
@Component({
  selector: 'lib-ecole',
  standalone: true,
  imports: [PhonePipe],
  template: `
    <div class="mb-2 flex flex-col items-center">
      <h1>{{ store.ecole().nomCommune }}</h1>
      <h2>{{ store.ecole().nomEtablissement }}</h2>
      <div class="divider"></div>
      <span>{{ store.ecole().nomCirconscription ?? 'Circonscription non renseignée' }}</span>
      <div class="divider"></div>
      <div class="flex flex-col sm:grid sm:grid-cols-3  gap-4">
        <p class="flex flex-col">
          <span class="text-slate-400 text-xs">Adresse</span>
          <span>{{ store.ecole().adresse1 }}</span>
        </p>
        <p class="flex flex-col ">
          <span class="text-slate-400 text-xs">Code postal</span>
          <span>{{ store.ecole().codePostal }}</span>
        </p>
        <p class="flex flex-col">
          <span class="text-slate-400 text-xs">Ville</span>
          <span>{{ store.ecole().nomCommune }}</span>
        </p>
        <p class="flex flex-col">
          <span class="text-slate-400 text-xs">Adresse mail</span>
          <a class="flex items-center" [href]="'mailto:' + store.ecole().mail">
            <span class="hover:text-blue-800">{{ store.ecole().mail ?? 'Non renseigné' }}</span>
            <span class="ml-4 material-symbols-outlined text-blue-800 border border-blue-800 rounded-full p-1">
              mail
            </span>
          </a>
        </p>
        <p class="flex flex-col">
          <span class="text-slate-400 text-xs">Téléphone</span>
          <a class="flex items-center" href="tel:{{ store.ecole().telephone }}">
            <span class="hover:text-green-800">{{ store.ecole().telephone | phone }}</span>
            <span class="ml-4 material-symbols-outlined text-green-800 border border-green-800 rounded-full p-1">
              call
            </span>
          </a>
        </p>
      </div>
    </div>

    <div id="ol-map" (click)="openMaps()" class="grow h-80 cursor-pointer"></div>

    <div class="flex flex-col mt-2">
      <h2 class="mb-3">Horaires</h2>
      <span class="flex justify-between">
        Lundi
        <span class="text-slate-400 text-sm flex items-center">{{ store.ecole().lundi ?? 'Non renseigné' }}</span>
      </span>
      <div class="divider"></div>
      <span class="flex justify-between">
        Mardi
        <span class="text-slate-400 text-sm flex items-center">{{ store.ecole().mardi ?? 'Non renseigné' }}</span>
      </span>
      <div class="divider"></div>
      <span class="flex justify-between">
        Mercredi
        <span class="text-slate-400 text-sm flex items-center">{{ store.ecole().mercredi ?? 'Non renseigné' }}</span>
      </span>
      <div class="divider"></div>
      <span class="flex justify-between">
        Jeudi
        <span class="text-slate-400 text-sm flex items-center">{{ store.ecole().jeudi ?? 'Non renseigné' }}</span>
      </span>
      <div class="divider"></div>
      <span class="flex justify-between">
        Vendredi
        <span class="text-slate-400 text-sm flex items-center">{{ store.ecole().vendredi ?? 'Non renseigné' }}</span>
      </span>
      <div class="divider"></div>
    </div>

    <p class="flex flex-col mt-2 items-center ">
      <span class="text-slate-400 text-xs">Vous constatez une erreur ?</span>
      <a class="flex items-center" href="mailto:admin@classeadeux.fr">
        <span class="hover:text-blue-800">Merci de nous contacter en cliquant ici.</span>
        <span class="ml-4 material-symbols-outlined text-blue-800 border border-blue-800 rounded-full p-1">mail</span>
      </a>
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class EcoleComponent {
  store = inject(AnnuaireStore);
  router = inject(Router);
  map: Map;
  view: View;
  constructor() {
    effect(() => {
      if (this.store.ecole()) {
        const positions = fromLonLat([this.store.ecole().longitude, this.store.ecole().latitude]);
        const point = new Point(positions);
        this.view = new View({
          center: positions,
          zoom: 15,
        });
        if (!this.map) {
          this.map = new Map({
            view: this.view,
            layers: [
              new TileLayer({
                source: new OSM(),
              }),
              new VectorLayer({
                source: new VectorSource({
                  features: [new Feature(point)],
                }),
                style: {
                  'circle-radius': 6,
                  'circle-fill-color': 'red',
                },
              }),
            ],
            target: 'ol-map',
            interactions: defaults({
              doubleClickZoom: false,
              mouseWheelZoom: false,
              pinchZoom: false,
              pinchRotate: false,
              dragPan: false,
              shiftDragZoom: false,
              keyboard: false,
              onFocusOnly: false,
            }),
            controls: [],
          });
        }
        this.map.setView(this.view);
        this.map.setLayers([
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [new Feature(point)],
            }),
            style: {
              'circle-radius': 6,
              'circle-fill-color': 'red',
            },
          }),
        ]);
      }
    });
  }

  openMaps() {
    window.open(`https://maps.google.com/?q=${this.store.ecole().latitude},${this.store.ecole().longitude}`, '_blank');
  }
}
