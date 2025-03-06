import { daysBetween } from '@/lib/utils';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";
import useOutEatingDaysStore from './useOutEatingDaysStore';
import usePointsStore from './usePointsStore';

export default function useStorageHook() {
    const [storage_points, setStoragePoints] = useState(0);
    const [loading, setLoading] = useState(true);
    const pointStorage = usePointsStore();
    const lastDate = useAsyncStorage('lastDate');
    const gymDays = useAsyncStorage('gymDays');
    const outEatingDays = useOutEatingDaysStore();

    useEffect(() => {
        _init();
    }, [storage_points])

    const _init = async () => {
        const t = await AsyncStorage.getAllKeys();
        console.log(t)
        const points = await pointStorage.getItem();
        await _syncPointsBasedOnDaysPassed();
        if (!points) {
            console.log("POINTS DNE")
            pointStorage.setItem("0");
        }
        console.log("POINTS", points);
        setStoragePoints(Number(points));
        setLoading(false);
    }
    const _syncPointsBasedOnDaysPassed = async () => {
        const currentDate = new Date();
        const lastDateValue = await lastDate.getItem() as string;
        const diff = daysBetween(new Date(lastDateValue), currentDate);
        const currentStoredPoints = await pointStorage.getItem() as string;
        let totalPoints = 0;
        console.log(currentStoredPoints);
        if (diff > 0) {
            totalPoints = Number(currentStoredPoints) + diff;
            pointStorage.setItem(totalPoints.toString());
        }
        console.log("SYNCING POINTS", totalPoints);
    }
    const addMiscPoints = async (points: number) => {
        const currentStoredPoints = await pointStorage.getItem() as string;
        const totalPoints = Number(currentStoredPoints) + points;
        pointStorage.setItem(totalPoints.toString());
        setStoragePoints(totalPoints);
        console.log("ADDING MISC POINTS", totalPoints);
    }
    const removeMiscPoints = async (points: number) => {
        const currentStoredPoints = await pointStorage.getItem() as string;
        const totalPoints = Number(currentStoredPoints) - points;
        pointStorage.setItem(totalPoints.toString());
        setStoragePoints(totalPoints);
        console.log("REMOVING MISC POINTS", totalPoints);
    }
    const addGymPoints = async (points: number) => {
        const _rawGymDaysValue = await gymDays.getItem() as string;
        const gymDaysValue: string[] = JSON.parse(_rawGymDaysValue);
        if (gymDaysValue.length == 0) {
            gymDaysValue.push(new Date().toString());
            gymDays.setItem(JSON.stringify(gymDaysValue));
        } else {
            const lastGymDay = gymDaysValue[gymDaysValue.length - 1];
            const currentDate = new Date();
            const diff = daysBetween(new Date(lastGymDay), currentDate);
            if (diff == 0) return;
            if (gymDaysValue.length > 7) {
                gymDaysValue.shift();
                gymDaysValue.push(currentDate.toString());
                gymDays.setItem(JSON.stringify(gymDaysValue));
            }
        }
        await addMiscPoints(points);
        console.log("ADDING GYM POINTS", points);
    }
    const removeEatOutPoints = async (points: number) => {
        const _rawOutEatingDaysValue = await outEatingDays.getItem() as string;
        const outEatingDaysValue: string[] = JSON.parse(_rawOutEatingDaysValue);
        outEatingDaysValue.push(new Date().toString());
        outEatingDays.setItem(JSON.stringify(outEatingDaysValue));
        removeMiscPoints(points);
        console.log("REMOVING EAT OUT POINTS", points);
    }
    return {
        storage_points,
        addGymPoints,
        removeEatOutPoints,
        addMiscPoints,
        removeMiscPoints,
        setStoragePoints,
        loading,
    }
}