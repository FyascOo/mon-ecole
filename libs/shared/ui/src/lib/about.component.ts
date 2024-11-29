import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'ui-about',
  standalone: true,
  imports: [],
  template: `
    <dialog #modal class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-2">
          Application proposée par un de vos collègue PE du 21 qui aurait bien aimé l'avoir lorsqu'il était lui-même
          remplaçant !
        </p>
        <p class="sm:flex py-2 gap-2">
          Pour en savoir encore plus :
          <a
            class="flex items-center text-blue-800"
            target="_blank"
            href="https://classeadeux.fr/annuaire-d-ecoles-glideapps/">
            classeadeux.fr
          </a>
        </p>
        <h3 class="text-lg font-bold">Source des données</h3>
        <p class="py-2">
          Lors de la création de l'application, ses données étaient issues de la base ministérielle (
          <a
            class="flex items-center text-blue-800"
            href="https://data.education.gouv.fr"
            target="_blank"
            rel="noopener">
            https://data.education.gouv.fr
          </a>
          )
        </p>
        <p class="py-2">
          Depuis, des collègues m'ont signalé des erreurs que j'ai pu corriger. Continuez à le faire dès que vous
          croisez une coquille. Merci de votre aide ! 😉
        </p>
        <a class="flex items-center text-blue-800" href="mailto:admin@classeadeux.fr">
          <span>Merci de nous contacter en cliquant ici.</span>
          <span class="ml-4 material-symbols-outlined">mail</span>
        </a>
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
