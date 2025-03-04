
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ChatBot from '@/components/ChatBot';
import FAQSection from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Clock, MessageSquare, Scale } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">How We Can Help You</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform simplifies the process of getting legal help by connecting you with experts who understand your specific needs.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-elegant transition-all hover:shadow-soft hover:border-legal-100">
                <div className="w-12 h-12 bg-legal-50 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-legal-700" />
                </div>
                <h3 className="text-xl font-medium mb-2">Guided Consultation</h3>
                <p className="text-muted-foreground mb-4">Answer simple questions about your legal situation to get matched with the right expertise.</p>
                <Button variant="link" className="p-0 h-auto text-legal-700 hover:text-legal-800 group" asChild>
                  <a href="#" className="inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-elegant transition-all hover:shadow-soft hover:border-legal-100">
                <div className="w-12 h-12 bg-legal-50 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-legal-700" />
                </div>
                <h3 className="text-xl font-medium mb-2">Privacy Protected</h3>
                <p className="text-muted-foreground mb-4">Your information is secure and confidential, shared only with professionals you choose to work with.</p>
                <Button variant="link" className="p-0 h-auto text-legal-700 hover:text-legal-800 group" asChild>
                  <a href="#" className="inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-elegant transition-all hover:shadow-soft hover:border-legal-100">
                <div className="w-12 h-12 bg-legal-50 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="h-6 w-6 text-legal-700" />
                </div>
                <h3 className="text-xl font-medium mb-2">Expert Network</h3>
                <p className="text-muted-foreground mb-4">Access our network of qualified legal professionals specializing in various practice areas.</p>
                <Button variant="link" className="p-0 h-auto text-legal-700 hover:text-legal-800 group" asChild>
                  <a href="#" className="inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-elegant transition-all hover:shadow-soft hover:border-legal-100">
                <div className="w-12 h-12 bg-legal-50 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-legal-700" />
                </div>
                <h3 className="text-xl font-medium mb-2">Quick Response</h3>
                <p className="text-muted-foreground mb-4">Receive timely responses and solutions to your legal concerns without unnecessary delays.</p>
                <Button variant="link" className="p-0 h-auto text-legal-700 hover:text-legal-800 group" asChild>
                  <a href="#" className="inline-flex items-center">
                    Learn more <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FAQSection />
        
        {/* CTA Section */}
        <section className="py-16 bg-legal-700 text-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Ready to Get Legal Help?</h2>
            <p className="text-legal-100 max-w-2xl mx-auto mb-8">
              Start the conversation with our legal assistant and get connected with the right expertise for your situation.
            </p>
            <Button size="lg" className="bg-white text-legal-700 hover:bg-legal-50">
              Chat with Legal Assistant
            </Button>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-serif font-semibold text-legal-700">LegalAssist</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-legal-700 text-sm">Contact</a>
            </div>
          </div>
          <div className="mt-6 text-center md:text-left text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LegalAssist. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
