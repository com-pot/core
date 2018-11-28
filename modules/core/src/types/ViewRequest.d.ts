declare namespace Express {
    export interface Request extends FlashRequest {

    }
}

interface FlashRequest {
    flash: (group: string, message: any) => void;
    requiredResources: ReadonlyArray<string>;
}



