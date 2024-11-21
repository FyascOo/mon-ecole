import { ChangeDetectionStrategy, Component, effect, inject, Pipe, PipeTransform } from '@angular/core';
import { Router } from '@angular/router';
import { Point } from 'ol/geom.js';
import { Feature, Map, View } from 'ol/index.js';
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
  imports: [],
  template: ``,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
