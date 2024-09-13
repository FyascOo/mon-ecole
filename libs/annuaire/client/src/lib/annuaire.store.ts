import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { Annuaire } from '../../../shared/model/annuaire';
import { AnnuaireService } from './annuaire.service';

type AnnuaireState = {
  ecoles: Annuaire[];
  selectedEcoleId: string | null;
  isLoading: boolean;
  open: boolean;
};

const initialState: AnnuaireState = {
  ecoles: [],
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
          return annuaireService.getEcoles().pipe(
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
    loadBySearch: rxMethod<string>(
      pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(search => {
          return annuaireService.search(search).pipe(
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
