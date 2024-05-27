import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Point } from 'ol/geom.js';
import { Feature, Map, View } from 'ol/index.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { fromLonLat } from 'ol/proj.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';

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
  ecole = {
    identifiantDeLEtablissement: '0491381K',
    nomEtablissement: 'Ecole primaire privée Notre-Dame',
    typeEtablissement: 'Ecole',
    statutPublicPrive: 'Privé',
    adresse1: "21 rue d'Anjou",
    adresse2: null,
    adresse3: '49125 TIERCE',
    codePostal: '49125',
    codeCommune: '49347',
    nomCommune: 'Tiercé',
    codeDepartement: '049',
    codeAcademie: '17',
    codeRegion: '52',
    ecoleMaternelle: 1,
    ecoleElementaire: 1,
    voieGenerale: null,
    voieTechnologique: null,
    voieProfessionnelle: null,
    telephone: '0241428273',
    fax: null,
    web: null,
    mail: 'ce.0491381K@ac-nantes.fr',
    restauration: 1,
    hebergement: 0,
    ulis: 0,
    apprentissage: null,
    segpa: null,
    sectionArts: null,
    sectionCinema: null,
    sectionTheatre: null,
    sectionSport: null,
    sectionInternationale: null,
    sectionEuropeenne: null,
    lyceeAgricole: null,
    lyceeMilitaire: null,
    lyceeDesMetiers: null,
    postBac: null,
    appartenanceEducationPrioritaire: null,
    greta: null,
    sirenSiret: '32102922500026',
    nombreDEleves: 186,
    ficheOnisep: null,
    position: '47.61596431366083, -0.46878057269476137',
    typeContratPrive: "CONTRAT D'ASSOCIATION TOUTES CLASSES",
    libelleDepartement: 'Maine-et-Loire',
    libelleAcademie: 'Nantes',
    libelleRegion: 'Pays de la Loire',
    coordxOrigine: 439509.1,
    coordyOrigine: 6729676,
    epsgOrigine: 'EPSG:2154',
    nomCirconscription: "Circonscription d'inspection du 1er degré de Durtal-Les Trois Rivieres",
    latitude: 47.615963,
    longitude: -0.46878058,
    precisionLocalisation: 'Numéro de rue',
    dateOuverture: '1967-04-13',
    dateMajLigne: '2024-05-21',
    etat: 'OUVERT',
    ministereTutelle: "MINISTERE DE L'EDUCATION NATIONALE",
    multiUai: 0,
    rpiConcentre: 0,
    rpiDisperse: null,
    codeNature: 151,
    libelleNature: 'ECOLE DE NIVEAU ELEMENTAIRE',
    codeTypeContratPrive: '30',
    pial: '0490867B',
    etablissementMere: null,
    typeRattachementEtablissementMere: null,
    codeCirconscription: '0491700G',
    codeZoneAnimationPedagogique: null,
    libelleZoneAnimationPedagogique: null,
    codeBassinFormation: '17009',
    libelleBassinFormation: 'ANGERS-SEGRE',
  };
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
