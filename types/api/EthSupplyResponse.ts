export interface EthSupplyResponse {
    data: Data;
}

export interface Data {
    chart:  Chart;
    events: Event[];
}

export interface Chart {
    eth_supply:        {daily: Daily}
    eth_issuance_rate: {daily: Daily}
}


export interface Daily {
    types: string[];
    data:  Array<number[]>;
}

export interface Event {
    date:        Date;
    title:       string;
    short_title: string;
    show_in_chart: boolean;
    description: string;
    source:      string;
}
