export interface RAFirebaseOptions {
    rootRef?: string;
    app?: any;
    logging?: boolean;
    watch?: string[];
    dontwatch?: string[];
    overrideDefaultId?: boolean;
    disableMeta?: boolean;
    persistence?: 'session' | 'local' | 'none';
}
