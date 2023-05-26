import { defineStore } from 'pinia';

export const useCesium = defineStore('useCesium', {
  state: () => {
    return {
      viewer: <Cesium.Viewer>{}
    };
  }
});
