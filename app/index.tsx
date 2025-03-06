import { BaseView } from "@/components/common";
import { EatOutModal, PointsInterface } from "@/components/homepage";
import HomeProvider from "@/store/homeProvider";
import React from "react";

export default function HomePage() {
    return (
        <HomeProvider>
            <BaseView name="Home">
                <PointsInterface/>
                <EatOutModal/>
            </BaseView>
        </HomeProvider>
    )
}