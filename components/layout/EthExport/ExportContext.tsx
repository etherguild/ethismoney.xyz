"use client"
import React, { createContext, useContext, ReactNode, useState } from "react";
import { EthExportResponse } from "@/types/api/EthExportResponse";
import { EthHomepageURLs } from "@/lib/urls";
import useSWR from "swr";

type EthExportContextType = {
    data?: EthExportResponse;
    selectedEntity: string;
    setSelectedEntity: (entity: string) => void;
    hoveredEventIndex: string | null;
    setHoveredEventIndex: (event: string | null) => void;
    activeEventIndex: string | null;
    setActiveEventIndex: (event: string | null) => void;
};

const EthExportContext = createContext<EthExportContextType | undefined>(undefined);

export const EthExportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { data } = useSWR<EthExportResponse>(EthHomepageURLs.eth_exported, {
        revalidateOnFocus: false,
    });

    const [selectedEntity, setSelectedEntity] = useState<string>("total");
    const [hoveredEventIndex, setHoveredEventIndex] = useState<string | null>(null);
    const [activeEventIndex, setActiveEventIndex] = useState<string | null>(null);

    const contextValue: EthExportContextType = {
        data: data,
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
