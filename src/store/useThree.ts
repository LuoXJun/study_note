import { defineStore } from 'pinia';

export const useThree = defineStore('useThree', {
  state: () => {
    return {
      scene: <THREE.Scene>{},
      renderer: <THREE.WebGLRenderer>{},
      camera: <THREE.Camera>{}
    };
  }
});
