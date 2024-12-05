"use client"
import React, { createContext, useContext, ReactNode, useState, useMemo } from "react";
import { EthExportResponse } from "@/types/api/EthExportResponse";
import { EthHomepageURLs } from "@/lib/urls";
import useSWR from "swr";
import { useLocalStorage } from "usehooks-ts";

type Row = {
    name: string;
    entity: string;
    uoa: string;
    type: string;
    purpose: string;
    value: number;
};

type EthExportContextType = {
    data?: EthExportResponse;
    sortedFilteredTableData: Row[];
    selectedEntity: string;
    setSelectedEntity: (entity: string) => void;
    hoveredEventIndex: string | null;
    setHoveredEventIndex: (event: string | null) => void;
    activeEventIndex: string | null;
    setActiveEventIndex: (event: string | null) => void;
    sort: {
        metric: string;
        sortOrder: string;
    };
    setSort: (sort: { metric: string; sortOrder: string }) => void;
};

const EthExportContext = createContext<EthExportContextType | undefined>(undefined);

export const EthExportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [showUsd, setShowUsd] = useLocalStorage("showUsd", false);
    const { data } = useSWR<EthExportResponse>(EthHomepageURLs.eth_exported, {
        revalidateOnFocus: false,
    });

    const [selectedEntity, setSelectedEntity] = useState<string>("total");
    const [hoveredEventIndex, setHoveredEventIndex] = useState<string | null>(null);
    const [activeEventIndex, setActiveEventIndex] = useState<string | null>(null);

    const [sort, setSort] = useState({ metric: "value", sortOrder: "desc" });

    const sortedFilteredTableData = useMemo(() => {
        if (!data) {
            return [];
        }



        const rows = Object.keys(data.data.entities).reduce((acc, key) => {
            const entity = key;
            const entityData = data.data.entities[key];
            const dataKey = data.data.chart[entity].daily.types.indexOf(showUsd ? "usd" : "eth");
            const value = data.data.chart[entity].daily.data[data.data.chart[entity].daily.data.length - 1][dataKey];
            return [...acc, { name: entityData.name, entity: key, uoa: entityData.uoa, type: entityData.type, purpose: entityData.purpose, value }];
        }, [] as Row[]).sort((a, b) => {
            if (sort.metric === "value") {
                if (a.value < b.value) return sort.sortOrder === "asc" ? -1 : 1;
                if (a.value > b.value) return sort.sortOrder === "asc" ? 1 : -1;
                return 0;
            } else {
                // assume string and do localeCompare
                if (a[sort.metric] < b[sort.metric]) return sort.sortOrder === "asc" ? -1 : 1;
                if (a[sort.metric] > b[sort.metric]) return sort.sortOrder === "asc" ? 1 : -1;
                return 0;

            }
        });

        return rows;

    }, [data, selectedEntity, showUsd, sort]);


    const contextValue: EthExportContextType = {
        data: data,
        sortedFilteredTableData: sortedFilteredTableData,
        sort: sort,
        setSort: setSort,
        selectedEntity: selectedEntity,
        setSelectedEntity: setSelectedEntity,
        hoveredEventIndex: hoveredEventIndex,
        setHoveredEventIndex: setHoveredEventIndex,
        activeEventIndex: activeEventIndex,
        setActiveEventIndex: setActiveEventIndex
    };

    return (
        <EthExportContext.Provider value={contextValue}>
            {children}
        </EthExportContext.Provider>
    );
};

export const useEthExport = () => {
    const context = useContext(EthExportContext);
    if (context === undefined) {
        throw new Error("useEthExport must be used within an EthExportProvider");
    }
    return context;
};
