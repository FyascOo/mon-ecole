import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'ui-about',
  standalone: true,
  imports: [],
  template: `
    <dialog #modal class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">À propos</h3>
        <p class="py-2">
          Application developpée par
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://alan.choufa.fr"
            target="_blank"
            rel="noopener">
            Alan Choufa
          </a>
          et proposée par
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://classeadeux.fr/"
            target="_blank"
            rel="noopener">
            Classeadeux
          </a>
          . Son code source est disponible sur
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://forge.apps.education.fr/classeadeux/annuaire-scolaire"
            target="_blank"
            rel="noopener">
            la Forge des communs numérique éducatifs
          </a>
          .
        </p>
        <h3 class="text-lg font-bold">Source des données</h3>
        <p class="py-2">
          Nous utilisons
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://openlayers.org/"
            target="_blank"
            rel="noopener">
            OpenLayers
          </a>
          pour afficher la carte sous licence
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://github.com/openlayers/openlayers/blob/main/LICENSE.md"
            target="_blank"
            rel="noopener">
            BSD 2-Clause
          </a>
          .
        </p>
        <p class="py-2">
          Lors de la création de l'application, ses données étaient issues de la base
          <a
            class="text-blue-800 underline underline-offset-2"
            href="https://data.education.gouv.fr/"
            target="_blank"
            rel="noopener">
            ministérielle
          </a>
          . Depuis, des collègues nous ont signalé des erreurs que nous avons corrigées (seulement dans le 21 car le
          passage à l'échelle nationale est tout récent). Contactez-nous dès que vous croisez une coquille. Merci de
          votre aide ! 😉
        </p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  memoized?: string;
  modal = viewChild.required<ElementRef>('modal');
  openModal = input();
  openModalChanges = effect(() => {
    this.openModal();
    if (this.memoized) {
      this.modal().nativeElement.showModal();
    } else {
      this.memoized = 'init';
    }
  });
}
