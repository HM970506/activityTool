import { PayloadAction } from "@reduxjs/toolkit";
export declare const categoryActions: import("@reduxjs/toolkit").CaseReducerActions<{
    reset: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    optionChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<boolean>) => void;
    categoryChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<string>) => void;
    templateChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<number>) => void;
    stampChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<number>) => void;
    tapeChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<number>) => void;
    stampColorChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<string>) => void;
    tapeColorChange: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<string>) => void;
    templateOn: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    templateOff: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    stampOn: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    stampOff: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    tapeOn: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    tapeOff: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>) => void;
    setView: (state: import("immer/dist/internal").WritableDraft<{
        category: string;
        view: boolean;
        option: boolean;
        subcategory: {
            template: {
                index: number;
                state: boolean;
            };
            stamp: {
                index: number;
                state: boolean;
                color: string;
            };
            tape: {
                index: number;
                state: boolean;
                color: string;
            };
        };
    }>, action: PayloadAction<boolean>) => void;
}, "categoryReducer">;
declare const _default: import("redux").Reducer<{
    category: string;
    view: boolean;
    option: boolean;
    subcategory: {
        template: {
            index: number;
            state: boolean;
        };
        stamp: {
            index: number;
            state: boolean;
            color: string;
        };
        tape: {
            index: number;
            state: boolean;
            color: string;
        };
    };
}, import("redux").AnyAction>;
export default _default;
