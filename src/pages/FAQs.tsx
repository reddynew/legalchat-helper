
import React from 'react';
import Navbar from '@/components/Navbar';
import FAQSection from '@/components/FAQSection';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { useChat } from '@/context/ChatContext';

const FAQs = () => {
  const { startChat } = useChat();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24">
        {/* Header */}
        <section className="bg-legal-50/50 py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Find answers to common questions about our legal services and how we can help with your specific needs.
            </p>
            <Button 
              className="bg-legal-700 hover:bg-legal-800 text-white"
              onClick={startChat}
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask a Question
            </Button>
          </div>
        </section>
        
        {/* FAQ Content */}
        <FAQSection />
        
        {/* Additional Questions Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              If you couldn't find the answer you're looking for, our legal team is ready to help with your specific concerns.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                className="bg-legal-700 hover:bg-legal-800 text-white"
                onClick={startChat}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Legal Chat
              </Button>
              
              <Button variant="outline" asChild>
                <a href="mailto:support@legalassist.com" className="border-legal-200 text-legal-700 hover:bg-legal-50">
                  Email Support
                </a>
              </Button>
            </div>
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
    </div>
  );
};

export default FAQs;
