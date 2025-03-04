
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatContext';
import { staggerAnimation } from '@/utils/animations';

const Hero: React.FC = () => {
  const { startChat, isActive } = useChat();
  const elementsRef = useRef<HTMLElement[]>([]);
  
  useEffect(() => {
    // Animate elements on mount
    const elements = elementsRef.current.filter(Boolean);
    if (elements.length > 0) {
      staggerAnimation(elements, 100);
    }
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-legal-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-60"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-legal-100/30 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 opacity-50"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 md:px-6">
          <div className="opacity-0" ref={addToRefs}>
            <span className="inline-block px-3 py-1 mb-6 text-xs font-medium rounded-full bg-legal-100 text-legal-700">
              Professional Legal Support
            </span>
          </div>
          
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight md:leading-tight lg:leading-tight mb-6 opacity-0" 
            ref={addToRefs}
          >
            Get Expert Legal Assistance <span className="text-legal-700">Without the Complexity</span>
          </h1>
          
          <p 
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto opacity-0" 
            ref={addToRefs}
          >
            Answer a few simple questions about your situation and get connected with legal professionals who can help resolve your case effectively.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0" ref={addToRefs}>
            <Button 
              size="lg" 
              className="bg-legal-700 hover:bg-legal-800 text-white group"
              onClick={startChat}
              disabled={isActive}
            >
              <span>Start Legal Chat</span>
              <MessageSquare className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button variant="outline" size="lg" asChild>
              <a href="#features" className="group border-legal-200 text-legal-700 hover:bg-legal-50">
                <span>Learn More</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
        
        <div className="mt-16 md:mt-24 max-w-5xl mx-auto opacity-0" ref={addToRefs}>
          <div className="relative bg-white rounded-2xl shadow-soft p-4 border border-gray-100">
            <div className="aspect-w-16 aspect-h-9 bg-legal-50 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-8">
                  <MessageSquare className="h-12 w-12 text-legal-500 mb-4 mx-auto" />
                  <h3 className="text-xl font-medium mb-2">Interactive Legal Chat</h3>
                  <p className="text-muted-foreground">Our guided chat will help identify your legal needs and connect you with expert advice.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
