import * as React from 'react'

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'hana-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                url?: string;
                loading?: string;
                'events-target'?: string;
            };
            'spline-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                url?: string;
                loading?: string;
                'events-target'?: string;
                hint?: string;
            };
        }
    }
}

export { }
