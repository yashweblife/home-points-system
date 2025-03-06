import useStorageHook from "@/hooks/useStorageHook";
import { createContext, ReactNode, useEffect, useState } from "react";



export type HomeContextType = {
    eatOutModalOpen: boolean;
    totalPoints: number;
    openModal: () => void;
    closeModal: () => void;
    increasePoints: (points: number) => void;
    decreasePoints: (points: number) => void;
    handleModalSubmit: (points: number) => void;
    increaseGymPoints: (points: number) => void
}
export const HomeContext = createContext<HomeContextType>({
    eatOutModalOpen: false,
    handleModalSubmit: () => { },
    openModal: () => { },
    closeModal: () => { },
    totalPoints: 0,
    increasePoints: () => { },
    decreasePoints: () => { },
    increaseGymPoints: () => { }
});

export default function HomeProvider({ children }: { children: ReactNode }) {
    const [eatOutModalOpen, setEatOutModalOpen] = useState<boolean>(false)
    const [totalPoints, setTotalPoints] = useState<number>(0)
    const {storage_points, removeEatOutPoints, addGymPoints, addMiscPoints, removeMiscPoints} = useStorageHook();
    useEffect(()=>{
        setTotalPoints(storage_points);
    },[])
    const openModal = () => {
        setEatOutModalOpen(true);
    }
    const closeModal = () => {
        setEatOutModalOpen(false);
    }
    const increasePoints = (points: number) => {
        addMiscPoints(points);
        setTotalPoints(totalPoints + points)
    }
    const increaseGymPoints = (points: number) => {
        addGymPoints(points);
    }
    const decreasePoints = (points: number) => {
        removeEatOutPoints(points);
        setTotalPoints(totalPoints - points)
    }
    const handleModalSubmit = (points: number) => {
        decreasePoints(points)
        removeEatOutPoints(points);
    }
    const output = {
        eatOutModalOpen,
        handleModalSubmit,
        openModal,
        closeModal,
        totalPoints,
        increasePoints,
        decreasePoints,
        increaseGymPoints
    }
    return (
        <HomeContext.Provider value={output}>
            {children}
        </HomeContext.Provider>
    )
}