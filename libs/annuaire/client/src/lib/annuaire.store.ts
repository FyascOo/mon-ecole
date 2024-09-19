import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, forkJoin, pipe, switchMap, tap } from 'rxjs';
import { Annuaire } from '../../../shared/model/annuaire';
import { AnnuaireService } from './annuaire.service';
export type Departement = Pick<Annuaire, 'codeDepartement' | 'libelleDepartement'>;
export type Circonscription = Pick<Annuaire, 'codeCirconscription' | 'nomCirconscription' | 'codeDepartement'>;
type AnnuaireState = {
  ecoles: Annuaire[];
  departements: Departement[];
  selectedDepartement: Departement | null;
  circonscriptions: Circonscription[];
  selectedCirconscription: Circonscription | null;
  selectedEcoleId: string | null;
  isLoading: boolean;
  open: boolean;
};

const initialState: AnnuaireState = {
  ecoles: [],
  departements: [],
  selectedDepartement: null,
  circonscriptions: [],
  selectedCirconscription: null,
  selectedEcoleId: null,
  isLoading: false,
  open: false,
};

export const AnnuaireStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(
    ({ ecoles, selectedEcoleId, departements, selectedDepartement, circonscriptions, selectedCirconscription }) => ({
      ecole: computed(() => {
        return ecoles().find(ecole => ecole.identifiantDeLEtablissement === selectedEcoleId())!;
      }),
      filterDepartements: computed(() => {
        return selectedCirconscription()
          ? departements().filter(d => d.codeDepartement === selectedCirconscription()?.codeDepartement)
          : departements();
      }),
      filterCirconscriptions: computed(() => {
        return selectedDepartement()
          ? circonscriptions().filter(c => c.codeDepartement === selectedDepartement()?.codeDepartement)
          : circonscriptions();
      }),
    })
  ),
  withMethods((store, annuaireService = inject(AnnuaireService)) => ({
    setSelectedEcoleId: (selectedEcoleId: string) => {
      patchState(store, () => ({ selectedEcoleId }));
    },
    openChanges: () => {
      patchState(store, state => ({ open: !state.open }));
    },
    initialLoad: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return forkJoin([
            annuaireService.getEcoles(),
            annuaireService.departements(),
            annuaireService.circonscriptions(),
          ]).pipe(
            tapResponse({
              next: ([ecoles, departements, circonscriptions]) =>
                patchState(store, { ecoles, departements, circonscriptions, isLoading: false }),
              error: err => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    loadBySearch: rxMethod<string | null>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        filter(search => !!search),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(search => {
          return annuaireService.search(search!, store.selectedDepartement(), store.selectedCirconscription()).pipe(
            tapResponse({
              next: ecoles => patchState(store, { ecoles, isLoading: false }),
              error: err => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
    departementChanges: rxMethod<Departement>(
      pipe(tap(selectedDepartement => patchState(store, { selectedDepartement })))
    ),
    circonscriptionChanges: rxMethod<Circonscription>(
      pipe(tap(selectedCirconscription => patchState(store, { selectedCirconscription })))
    ),
  })),
  withHooks({
    onInit: store => store.initialLoad(),
  })
);
