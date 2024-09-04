import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { Button } from "./ui/button";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "Full Stack Developer",
];

const CategoryCarousel = () => {
  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent className="flex justify-between space-x-4">
            {
                category.map((cat, index) =>(
                    <CarouselItem className="md:basis-1/3 lg-basis-1/4">
                        <Button varient="outline" className="rounded-full">{cat}</Button>
                    </CarouselItem>

                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>

      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
