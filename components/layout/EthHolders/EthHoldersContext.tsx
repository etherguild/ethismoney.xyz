"use client"
import React, { createContext, useContext, ReactNode, useState, useCallback, useMemo } from "react";
import { EthHoldersResponse } from "@/types/api/EthHoldersResponse";
import { EthHomepageURLs } from "@/lib/urls";
import useSWR from "swr";

type Row = {
    name: string;
    type: string;
    tracking_type: string;
    code: string;
    source: string;
    eth: number;
    usd: number;
};

type EthHoldersContextType = {
    // data: EthHoldersResponse | null;
    types: string[];
    sortedFilteredData: Row[];
    holderFilter: string;
    holderTypes: string[];
    holderTypeLabels: string[];
    setHolderFilter: (holder: string) => void;
    sort: {
        metric: string;
        sortOrder: string;
    };
    setSort: (sort: { metric: string; sortOrder: string }) => void;
};

const EthHoldersContext = createContext<EthHoldersContextType | undefined>(undefined);

export const EthHoldersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data } = useSWR<EthHoldersResponse>(EthHomepageURLs.eth_holders, {
        revalidateOnFocus: false,
    });

    // 
    const holderTypeKey = "type";

    const [sort, setSort] = useState({ metric: "eth_equivalent_balance_eth", sortOrder: "desc" });

    // array of types
    const types = useMemo(() => data ? data.data.types : [], [data]);

    // array of data rows
    const rows = useMemo(() => data ? data.data.data : null, [data]);

    const holderTypeLabelsMap = {
        "": "All",
        "Government": "Governments",
        "DAO": "DAOs",
        "Individual": "People",
    }

    const holderTypes = ["", "Government", "DAO", "Individual"];

    const holderTypeLabels = holderTypes.map((holderType) => holderTypeLabelsMap[holderType]);

    // const holderList = useMemo(() => {
    //     if (!rows) return [];
    //     return [...new Set(rows.map((row) => row[types.indexOf(holderTypeKey)]))] as string[];
    // }, [rows, types, holderTypeKey]);

    // const [selectedEntity, setSelectedEntity] = useState<string>("arbitrum");
    const [holderFilter, setHolderFilter] = useState<string>("");


    const sortedFilteredData = useMemo(() => {
        if (!data) return [] as Row[];

        let sortedData = data.data.data;

        if (holderFilter) {
            sortedData = sortedData.filter((row) => row[types.indexOf(holderTypeKey)] === holderFilter);
        }

        // sort data
        const sortIndex = types.indexOf(sort.metric as string);
        sortedData.sort((a, b) => {
            if (types[sortIndex].includes("balance")) {
                if (a[sortIndex] < b[sortIndex]) return sort.sortOrder === "asc" ? -1 : 1;
                if (a[sortIndex] > b[sortIndex]) return sort.sortOrder === "asc" ? 1 : -1;
                return 0;
            } else {
                // assume string and do localeCompare
                if (a[sortIndex] < b[sortIndex]) return sort.sortOrder === "asc" ? -1 : 1;
                if (a[sortIndex] > b[sortIndex]) return sort.sortOrder === "asc" ? 1 : -1;
                return 0;

            }
        });

        return sortedData.map((row) => {
            return {
                name: row[types.indexOf("name")],
                type: row[types.indexOf("type")],
                tracking_type: row[types.indexOf("tracking_type")],
                code: "",
                source: "",
                eth: row[types.indexOf("eth_equivalent_balance_eth")],
                usd: row[types.indexOf("eth_equivalent_balance_usd")],
            } as Row;
        });

    }, [data, holderFilter, sort.metric, sort.sortOrder, types]);

    const contextValue: EthHoldersContextType = {
        // data: data || null,
        types: types,
        sortedFilteredData: sortedFilteredData,
        sort: sort,
        setSort: setSort,
        holderTypes: holderTypes,
        holderTypeLabels: holderTypeLabels,
        holderFilter: holderFilter,
        setHolderFilter: setHolderFilter,
    };

    return (
        <EthHoldersContext.Provider value={contextValue}>
            {children}
        </EthHoldersContext.Provider>
    );
};

export const useEthHolders = () => {
    const context = useContext(EthHoldersContext);
    if (context === undefined) {
        throw new Error("useEthExport must be used within an EthExportProvider");
    }
    return context;
};
