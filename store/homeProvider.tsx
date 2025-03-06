import { createContext, ReactNode, useState } from "react";



export type HomeContextType = {
    eatOutModalOpen: boolean;
    totalPoints: number;
    openModal: () => void;
    closeModal: () => void;
    increasePoints: (points: number) => void;
    decreasePoints: (points: number) => void;
    handleModalSubmit: (points: number) => void
}
export const HomeContext = createContext<HomeContextType>({
    eatOutModalOpen: false,
    handleModalSubmit: () => { },
    openModal: () => { },
    closeModal: () => { },
    totalPoints: 0,
    increasePoints: () => { },
    decreasePoints: () => { },
});

export default function HomeProvider({ children }: { children: ReactNode }) {
    const [eatOutModalOpen, setEatOutModalOpen] = useState<boolean>(false)
    const [totalPoints, setTotalPoints] = useState<number>(0)
    const openModal = () => {
        setEatOutModalOpen(true);
    }
    const closeModal = () => {
        setEatOutModalOpen(false);
    }
    const increasePoints = (points: number) => {
        setTotalPoints(totalPoints + points)
    }
    const decreasePoints = (points: number) => {
        setTotalPoints(totalPoints - points)
    }
    const handleModalSubmit = (points: number) => {
        decreasePoints(points)
    }
    const output = {
        eatOutModalOpen,
        handleModalSubmit,
        openModal,
        closeModal,
        totalPoints,
        increasePoints,
        decreasePoints
    }
    return (
        <HomeContext.Provider value={output}>
            {children}
        </HomeContext.Provider>
    )
}