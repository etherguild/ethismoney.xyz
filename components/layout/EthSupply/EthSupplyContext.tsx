"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";
import { EthSupplyResponse } from "@/types/api/EthSupplyResponse";
import { EthHomepageURLs } from "@/lib/urls";
import useSWR from "swr";

type EthSupplyContextType = {
    data: EthSupplyResponse | null;
    // selectedEntity: string;
    // setSelectedEntity?: (entity: string) => void;
    hoveredEventIndex: string | null;
    setHoveredEventIndex: (event: string | null) => void;
    activeEventIndex: string | null;
    setActiveEventIndex: (event: string | null) => void;
    chartTitle: string;
    setChartTitle: (title: string) => void;
};

const EthSupplyContext = createContext<EthSupplyContextType | undefined>(undefined);

export const EthSupplyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data } = useSWR<EthSupplyResponse>(EthHomepageURLs.eth_supply, {
        revalidateOnFocus: false,
    });

    // const [selectedEntity, setSelectedEntity] = useState<string>("arbitrum");
    const [hoveredEventIndex, setHoveredEventIndex] = useState<string | null>(null);
    const [activeEventIndex, setActiveEventIndex] = useState<string | null>(null);
    const [chartTitle, setChartTitle] = useState<string>("ETH Issuance Rate");

    const contextValue: EthSupplyContextType = {
        data: data || null,
        // selectedEntity: selectedEntity,
        // setSelectedEntity: setSelectedEntity,
        hoveredEventIndex: hoveredEventIndex,
        setHoveredEventIndex: setHoveredEventIndex,
        activeEventIndex: activeEventIndex,
        setActiveEventIndex: setActiveEventIndex,
        chartTitle: chartTitle,
        setChartTitle: setChartTitle,
    };

    return (
        <EthSupplyContext.Provider value={contextValue}>
            {children}
        </EthSupplyContext.Provider>
    );
};

export const useEthSupply = () => {
    const context = useContext(EthSupplyContext);
    if (context === undefined) {
        throw new Error("useEthExport must be used within an EthExportProvider");
    }
    return context;
};
