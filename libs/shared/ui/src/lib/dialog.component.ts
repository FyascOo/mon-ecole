import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnnuaireStore, Departement } from '@mon-ecole/annuaire';

@Component({
  selector: 'ui-dialog',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <dialog #dialog class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Séléctionne un département avant de commencer</p>
        <div class="modal-actio">
          <select
            [formControl]="departementFC"
            [compareWith]="compareDepartement"
            class="select select-bordered w-full">
            <option selected [ngValue]="null">Département</option>
            @for (departement of annuaireStore.filterDepartements(); track $index) {
            <option [ngValue]="departement">
              {{ departement.codeDepartement }} - {{ departement.libelleDepartement }}
            </option>
            }
          </select>
        </div>
      </div>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent implements AfterViewInit {
  departementFC = new FormControl();
  dialog = viewChild.required<ElementRef>('dialog');
  annuaireStore = inject(AnnuaireStore);

  constructor() {
    this.annuaireStore.departementChanges(this.departementFC.valueChanges);

    effect(() => {
      this.departementFC.setValue(this.annuaireStore.selectedDepartement());
    });
  }
  ngAfterViewInit(): void {
    this.dialog().nativeElement.showModal();
  }
  compareDepartement(a: Departement | null, b: Departement | null) {
    return a?.codeDepartement === b?.codeDepartement;
  }
}
