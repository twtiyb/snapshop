import { Module } from 'vuex';
import { IRootState } from '.';
import { useDisk } from '../plugins/Disk';

export enum ColorMode {
    dec = '十进制',
    hex = '十六进制',
    hexWith0x = '0x前缀十六进制',
    hexWithPound = '#前缀十六进制',
    rgb = 'RGB',
}

export enum LoadCaptureMode {
    fromLink = '从链接加载',
    fromHttpApi = '从HttpAPI加载',
}

export interface IConfigurationState {
    loadCaptureMode: LoadCaptureMode;
    link: string;
    httpApi: string;
    colorMode: ColorMode;
    showSameCoordinate: boolean;
}

export const defaultConfiguration: IConfigurationState = {
    loadCaptureMode: LoadCaptureMode.fromLink,
    link: '',
    httpApi: '',
    colorMode: ColorMode.hexWith0x,
    showSameCoordinate: false,
};

const Configuration: Module<IConfigurationState, IRootState> = {
    state: () => {
        const defaultConfigurationCopy = Object.assign({}, defaultConfiguration);
        const state = useDisk().useStorage('configuration', defaultConfigurationCopy);
        Object.assign(defaultConfigurationCopy, state.value);
        Object.assign(state.value, defaultConfigurationCopy);
        return state.value;
    },
    mutations: {
        setConfiguration: <T extends keyof IConfigurationState>(state: IConfigurationState, { key, value }: { key: T; value: IConfigurationState[T] }) => {
            state[key] = value;
        },
        resetConfiguration: state => {
            Object.assign(state, defaultConfiguration);
        },
    },
};

export default Configuration;
