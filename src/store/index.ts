import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import Coordinate, { ICoordinateState } from './Coordinate';
import Capture, { ICaptureState } from './Capture';
import Record, { IRecordState } from './Record';
import Area, { IAreaState } from './Area';
import Configuration, { IConfigurationState } from './Configuration';
import Code, { ICodeState } from './Code';
import FontLab, { IFontLabState } from './FontLab';

export interface IRootState {
    coordinate: ICoordinateState;
    capture: ICaptureState;
    record: IRecordState;
    area: IAreaState;
    configuration: IConfigurationState;
    code: ICodeState;
    fontLab: IFontLabState;
}

export const key: InjectionKey<Store<IRootState>> = Symbol();

const mutationPlugin = (store: any) => {
    store.subscribe((mutation: any, state: any) => {
        console.log(mutation.type);
    });
};
const actionPlugin = (store: any) => {
    store.subscribeAction((action: any, state: any) => {
        console.log(action.type);
    });
};

export const store = createStore<IRootState>({
    modules: {
        coordinate: Coordinate,
        capture: Capture,
        record: Record,
        area: Area,
        configuration: Configuration,
        code: Code,
        fontLab: FontLab,
    },
});

export function useStore() {
    return baseUseStore(key);
}
