import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, filter, forkJoin, pipe, switchMap, tap } from 'rxjs';
import { Annuaire } from '../../../shared/model/annuaire';
import { AnnuaireService } from './annuaire.service';

type AnnuaireState = {
  ecoles: Annuaire[];
  departements: Pick<Annuaire, 'codeDepartement' | 'libelleDepartement'>[];
  circonscriptions: Pick<Annuaire, 'codeCirconscription' | 'nomCirconscription' | 'codeDepartement'>[];
  selectedEcoleId: string | null;
  isLoading: boolean;
  open: boolean;
};

const initialState: AnnuaireState = {
  ecoles: [],
  departements: [],
  circonscriptions: [],
  selectedEcoleId: null,
  isLoading: false,
  open: false,
};

export const AnnuaireStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ ecoles, selectedEcoleId }) => ({
    ecole: computed(() => {
      return ecoles().find(ecole => ecole.identifiantDeLEtablissement === selectedEcoleId())!;
    }),
  })),
  withMethods((store, annuaireService = inject(AnnuaireService)) => ({
    setSelectedEcoleId: (selectedEcoleId: string) => {
      patchState(store, state => ({ selectedEcoleId }));
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
        tap(() => patchState(store, { isLoading: true })),
        tap(search => console.log(search)),
        filter(search => !!search),
        switchMap(search => {
          return annuaireService.search(search!).pipe(
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
  })),
  withHooks({
    onInit: store => store.initialLoad(),
  })
);
