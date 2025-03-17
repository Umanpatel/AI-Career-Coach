'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { useEffect, useRef } from "react"

const HeroSection = () => {
    const imageRef = useRef(null);
    //
    useEffect(() => {
        const imageElement = imageRef.current;

        const handleScroll = () => {
            const scrollPosition = window.scrollY // where are we currently in our window screen
            const scrollThreshold = 100; // After this limit crossed, we want ot tilt image back
            
            if(scrollPosition>scrollThreshold){
                imageElement.classList.add("scrolled")
            }else {
                imageElement.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll",handleScroll)
        return () => window.removeEventListener("scroll",handleScroll)
    }, []);

  return (
    <section className="w-auto pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
            <h1 className="gradient-title font-bold text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
                Accelerate Your Career with
                <br/>
                AI-Powered Coaching
            </h1>
            <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Advanced your career with personalized guidance, interview prep, and 
                AI-driven tools to achieve job success.
            </p>
        </div>
        <div className="flex justify-center">
            <Link href='/dashboard'>
                <Button size="lg" className="px-8">
                    Get Started
                </Button>
            </Link>
        </div>
        <div className="hero-image-wrapper mt-5 -mb-6 md:mt-0 ">
            <div ref={imageRef} className="hero-image">
                <Image 
                    src={"/aiResume1.webp"} 
                    width={1400} 
                    height={720} 
                    alt="Banner ai-career-coach" 
                    className="rounded-lg shadow-2xl border mx-auto w-auto"
                    priority
                />
            </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
