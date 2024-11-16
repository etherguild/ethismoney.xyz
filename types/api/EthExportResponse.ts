export interface EthExportResponse {
    data: {
        metric_id: string;
        metric_name: string;
        entities: EntityData
        chart: ChartData
    }
}


export interface EntityData {
    [key: string]: {
        name: string;
        chains: string[];
        type: string;
        uoa: string;
        purpose: string;
        ethereum : {
            [key: string]: [{[key: string]: string}]
        }
    }
}

export interface ChartData {
    [key: string]: { 
        changes: Changes;
        daily: Daily;
    }
}


export interface Changes {
    types: string[];
    "1d": [number, number];
    "7d": [number, number];
    "30d": [number, number];
    "90d": [number, number];
    "180d": [number, number];
    "365d": [number, number];

}

export interface Daily {
    types: string[];
    data: [number, number, number][];
}