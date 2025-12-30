import {Card, CardContent, CardFooter, CardTitle} from "@/components/ui/card.tsx";
import {Star} from "lucide-react";
import React from "react";
import {Badge} from "@/components/ui/badge.tsx";
import {NavLink} from "react-router-dom";
import {DISH_NOT_FOUND} from "@/utils/constants/envBugs.ts";

interface DishCardProps extends Dish {
    children?: React.ReactNode;
}

const DishCard = ({ id, photos, name, price, rate, description, children }: DishCardProps) => (
    <Card data-id={id} className="w-[300px] h-[560px] min-h-[560px] flex flex-col overflow-hidden relative pt-0 dish-item-card">
        <CardContent className="p-0 flex-grow">
            <Badge className="absolute top-0 right-0">
                {`${price} ₽`}
            </Badge>
            <NavLink to={!DISH_NOT_FOUND ? `/dish/${id}` : '/dish/undefined'} className="cursor-pointer">
                <div className="h-[300px] overflow-hidden bg-gray-100">
                    <img
                        src={photos[0] || "https://cdn1.ozone.ru/s3/multimedia-d/6319443853.jpg"}
                        alt="dish photo"
                        className="w-full h-full object-cover object-center border-b"
                    />
                </div>
            </NavLink>
            <CardTitle className="text-center text-xl">
                {name}
            </CardTitle>
            <div className="w-full h-[40] py-2 flex items-center justify-center gap-2 border-y my-1">
                {[1, 2, 3, 4, 5].map((position) => {
                    const fillPercentage = Math.max(0, Math.min(1, rate - position + 1)) * 100;

                    return (
                        <div key={position} className="relative">
                            <Star size={20} className="text-gray-300 fill-gray-300"/>
                            <div className="absolute top-0 left-0 overflow-hidden"
                                 style={{width: `${fillPercentage}%`}}
                            >
                                <Star size={20} className="text-yellow-500 fill-yellow-500"/>
                            </div>
                        </div>
                    );
                })}
            </div>
            <p className="line-clamp-3 text-center break-words overflow-wrap-anywhere">
                {description}
            </p>
        </CardContent>
        <CardFooter>
            {children}
        </CardFooter>
    </Card>
)

export default DishCard