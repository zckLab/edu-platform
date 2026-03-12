/// <reference types="vite/client" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        loading?: 'lazy' | 'eager' | 'auto';
        preload?: 'auto' | 'metadata' | 'none';
        'power-preference'?: 'default' | 'high-performance' | 'low-power';
        'orbit-events'?: 'none';
        hint?: 'performance' | 'false';
        'events-target'?: 'global';
        cursor?: 'false';
        'touch-action'?: 'none';
      };
    }
  }
}

export {};
