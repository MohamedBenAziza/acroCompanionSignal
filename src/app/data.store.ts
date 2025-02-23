import { computed, effect } from "@angular/core";
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from "@ngrx/signals";

enum storageEnum {
  dataMap = "dataMap",
}

interface IState {
  boxes: number[];
  areKeysShown: boolean;
  selectedBoxIndex: number;
  dataMap: Map<
    number,
    { key: string; value: number; keyValue: `${string}${number}` }
  >;
}

const initialState: IState = {
  boxes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  areKeysShown: false,
  selectedBoxIndex: -1,
  dataMap: new Map<
    number,
    { key: string; value: number; keyValue: `${string}${number}` }
  >([]),
};

export const DataStore = signalStore(
  { providedIn: "root" },
  withState(initialState),
  withComputed(({ dataMap }) => ({
    totalScore: computed(() =>
      parseFloat(
        Array.from(dataMap().values())
          .reduce((acc, element) => acc + element.value, 0)
          .toFixed(2)
      )
    ),
  })),
  withMethods((store) => ({
    setAreKeysShown(value: boolean): void {
      patchState(store, () => ({ areKeysShown: value }));
    },
    setSelectedBoxIndex(index: number): void {
      patchState(store, () => ({ selectedBoxIndex: index }));
    },
    setDataMap(
      key: number,
      value: { key: string; value: number; keyValue: `${string}${number}` }
    ): void {
      patchState(store, (state) => ({
        dataMap: new Map(state.dataMap.set(key, value)),
      }));
    },
    loadDataMap(
      newMap: Map<
        number,
        { key: string; value: number; keyValue: `${string}${number}` }
      >
    ): void {
      patchState(store, () => ({
        dataMap: new Map(newMap),
      }));
    },
    clearDataMap(): void {
      patchState(store, () => ({
        dataMap: new Map(),
      }));
    },
  })),
  withHooks({
    onInit(store) {
      const storedMap = localStorage.getItem(storageEnum.dataMap);
      if (storedMap) {
        const myMap = new Map<
          number,
          { key: string; value: number; keyValue: `${string}${number}` }
        >(JSON.parse(storedMap));

        store.loadDataMap(myMap);
      }

      effect(() => {
        localStorage.setItem(
          storageEnum.dataMap,
          JSON.stringify(Array.from(store.dataMap().entries()))
        );
      });
    },
  })
);
