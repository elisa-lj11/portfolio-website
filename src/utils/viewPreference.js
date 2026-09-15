// src/utils/viewPreference.js
// Remembers whether the visitor chose the 3D galaxy or the simple view, so that
// opting out of WebGL sticks instead of having to be repeated on every page.
//
// Every access is wrapped: localStorage throws in Safari private mode and when
// site data is blocked, and a portfolio should not be a blank page because of it.

const STORAGE_KEY = 'elisa-portfolio-view-preference';

export const SIMPLE_VIEW = 'simple';
export const SPACE_VIEW = 'space';

export const getViewPreference = () => {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null; // Storage unavailable; fall back to the default 3D view
  }
};

export const setViewPreference = (preference) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, preference);
  } catch (e) {
    // Preference simply won't persist; navigation still works for this session
  }
};

export const prefersSimpleView = () => getViewPreference() === SIMPLE_VIEW;

// Feature-detect WebGL before constructing a renderer. THREE.WebGLRenderer
// throws on unsupported devices, which would take the whole page down.
export const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
};
