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
        return ecoles()?.find(ecole => ecole.identifiantDeLEtablissement === selectedEcoleId())!;
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
      localStorage.setItem('selectedEcoleId', selectedEcoleId);
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
            annuaireService.getEcoles(
              store.selectedEcoleId(),
              store.selectedDepartement(),
              store.selectedCirconscription()
            ),
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
        filter((search: string | null) => !!search),
        tap(() => patchState(store, { isLoading: true })),
        switchMap((search: string) => {
          return annuaireService.search(search, store.selectedDepartement(), store.selectedCirconscription()).pipe(
            tapResponse({
              next: (ecoles: Annuaire[]) => patchState(store, { ecoles, isLoading: false }),
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
      pipe(
        tap((selectedDepartement: Departement) => patchState(store, { selectedDepartement })),
        tap((selectedDepartement: Departement) => {
          localStorage.setItem('selectedDepartement', JSON.stringify(selectedDepartement));
        })
      )
    ),
    circonscriptionChanges: rxMethod<Circonscription>(
      pipe(
        tap((selectedCirconscription: Circonscription) => patchState(store, { selectedCirconscription })),
        tap((selectedCirconscription: Circonscription) =>
          localStorage.setItem('selectedCirconscription', JSON.stringify(selectedCirconscription))
        )
      )
    ),
    syncDepartement: () => {
      const selectedDepartement = localStorage.getItem('selectedDepartement');
      if (selectedDepartement) patchState(store, { selectedDepartement: JSON.parse(selectedDepartement) });
    },
    syncCirconscription: () => {
      const selectedCirconscription = localStorage.getItem('selectedCirconscription');
      if (selectedCirconscription) patchState(store, { selectedCirconscription: JSON.parse(selectedCirconscription) });
    },
    syncSelectedEcoleId: () => {
      const selectedEcoleId = localStorage.getItem('selectedEcoleId');
      if (selectedEcoleId) patchState(store, { selectedEcoleId });
    },
  })),
  withHooks({
    onInit: store => {
      store.syncSelectedEcoleId();
      store.syncDepartement();
      store.syncCirconscription();
      store.initialLoad();
    },
  })
);
