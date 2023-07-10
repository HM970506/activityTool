declare const rootReducer: import("redux").Reducer<import("redux").CombinedState<{
    nodeReducer: {
        canvas: null;
        isPanning: boolean;
        textareaContainer: null;
        dialogContainer: null;
        record: string;
        opacity: number;
        history: {
            undo: number;
            redo: number;
        };
    };
    categoryReducer: {
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
    };
    zoomReducer: {
        zoom: number;
        zoomView: number;
        scale: number;
    };
    photoEditorReducer: {
        isEditing: boolean;
        photo: null;
        photoCanvas: null;
        cropCanvas: null;
        isCroping: boolean;
    };
    drawReducer: {
        now: null;
        feltpen: null;
        crayon: null;
        backgroundBrush: null;
        highlighter: null;
        spray: null;
        eraser: null;
        ink: null;
    };
}>, import("redux").AnyAction>;
export default rootReducer;
