export interface EthHoldersResponse {
    data: Data;
}

export interface Data {
    sort:  Sort;
    types: string[];
    data:  (string | number)[][];
}

export interface Sort {
    by: string;
    direction: string;
}
