import HeroSection from "@/components/herosection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { faqs } from "@/data/faqs";
import { features } from "@/data/features";
import { howItWorks } from "@/data/howItWorks";
import { testimonial } from "@/data/testimonials";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <div className="grid-background" />
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
                      <h3 className="text-xl font-bold mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground p-4">
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 md:m-12 md:p-4 md:pr-4 lg:pr-12">
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">50+</h3>
                <p className="text-muted-foreground">Industry Covered</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">1000+</h3>
                <p className="text-muted-foreground">Interview Questions</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">95%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
              <div className="flex flex-col items-center justify-center space-y-2">
                <h3 className="text-4xl font-bold">24/7</h3>
                <p className="text-muted-foreground">AI Support</p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground">
                Four simple step to accelerate your career growth
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 m-8 md:m-12 md:p-4 md:pr-4 lg:pr-12">
              {howItWorks.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-xl">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-2">
              Feedback from Our Users
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 m-8 md:m-12 md:p-4 md:pr-4 lg:pr-12">
              {testimonial.map((testimonial, index) => (
                <Card key={index} className="bg-background">
                  <CardContent className="pt-2">
                    <div className="flex flex-col space-x-4">
                      <div className="flex items-center space-x-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <Image
                            width={40}
                            height={40}
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="rounded-full object-cover border-2 border-primary/20"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                          <p className="text-sm text-primary">
                            {testimonial.company}
                          </p>
                        </div>
                      </div>
                      <blockquote className="pt-7">
                        <p className="text-muted-foreground italic relative">
                          <span className="text-3xl text-primary absolute -top-4 -left-2">
                            &quot;
                          </span>
                          {testimonial.quote}
                          <span className="text-3xl text-primary absolute -bottom-4">
                            &quot;
                          </span>
                        </p>
                      </blockquote>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="relative w-full py-12 md:py-24 lg:py-32 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our platform
              </p>
            </div>
            <div className=" m-8 md:m-12 md:p-4 md:pr-4 lg:pr-12">
              <Accordion type="single" collapsible className="w-auto">
                {faqs.map((faq, index) => {
                  return (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger>{faq.question}</AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>

        <section className="w-full bg-gradient-to-r from-slate-950  via-slate-800 to-slate-950 rounded-xl shadow-lg">
          <div className="mx-auto py-24 text-center max-w-3xl space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-100 sm:text-5xl md:text-6xl">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-2xl text-gray-200/90 text-lg md:text-xl">
              Join thousands of professionals advancing their careers with
              AI-powered guidance.
            </p>
            <Link href="/dashboard" passHref>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-6 text-lg font-semibold text-neutral-900 bg-white rounded-full shadow-md hover:bg-gray-100 animate-bounce"
              >
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
