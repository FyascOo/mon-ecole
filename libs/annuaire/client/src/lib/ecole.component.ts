import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Point } from 'ol/geom.js';
import { Feature, Map, View } from 'ol/index.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { AnnuaireStore } from './annuaire.store';

@Component({
  selector: 'lib-ecole',
  standalone: true,
  imports: [],
  template: `
    <h1>{{ ecole.nomCommune }}</h1>
    <h2>{{ ecole.nomEtablissement }}</h2>
    ---
    <span>{{ ecole.nomCirconscription }}</span>
    ---
    <p>Adresse: {{ ecole.adresse1 }}</p>
    <p>Code postal: {{ ecole.codePostal }}</p>
    <p>Ville: {{ ecole.nomCommune }}</p>
    <p>Adresse mail: {{ ecole.mail }}</p>
    <p>Téléphone: {{ ecole.telephone }}</p>

    <div id="ol-map" (click)="openMaps()" class="grow h-80 cursor-pointer"></div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'flex flex-col',
  },
})
export class EcoleComponent implements OnInit {
  ecole = inject(AnnuaireStore).ecole();
  positions = fromLonLat([this.ecole.longitude, this.ecole.latitude]);

  map: Map;
  point = new Point(this.positions);

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: this.positions,
        zoom: 15,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: [new Feature(this.point)],
          }),
          style: {
            'circle-radius': 6,
            'circle-fill-color': 'red',
          },
        }),
      ],
      target: 'ol-map',
    });
  }

  openMaps() {
    window.open(`https://maps.google.com/?q=${this.ecole.latitude},${this.ecole.longitude}`, '_blank');
  }
}
