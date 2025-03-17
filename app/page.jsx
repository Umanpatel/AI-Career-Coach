import HeroSection from "@/components/herosection";
import { Card, CardContent } from "@/components/ui/card";
import { features } from "@/data/features";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Ensure grid-background is fixed and covers the screen without overflowing */}
      <div className="grid-background fixed inset-0 -z-10" />
      <main className="min-h-screen">
        <HeroSection />
        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-2">
              Powerful Features for Your Career Growth
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 md:m-12 md:p-4 md:pr-4 lg:pr-12">
              {features.map((feature, index) => (
                <Card 
                  key={index} 
                  className="border-2 hover:border-blue-300 transition-colors duration-300"
                >
                  <CardContent className="flex flex-col text-center p-2 items-center">
                    <div className="flex flex-col items-center justify-center">
                      {feature.icon}
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground p-4">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
