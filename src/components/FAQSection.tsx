
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    question: "What areas of law do you cover?",
    answer: "We provide assistance in various legal areas including family law, criminal defense, personal injury, business law, immigration, real estate, and more. Our network of legal professionals covers a wide range of specializations."
  },
  {
    question: "How does the legal chat service work?",
    answer: "Our legal chat service asks you a series of questions about your specific situation. Based on your answers, we collect relevant information to understand your needs and connect you with the appropriate legal help."
  },
  {
    question: "Is my information kept confidential?",
    answer: "Yes, all information shared through our platform is strictly confidential. We follow industry-standard security practices to protect your data and personal information."
  },
  {
    question: "How quickly will I receive a response from a legal professional?",
    answer: "After completing the chat questionnaire, we typically connect you with a legal professional within 24-48 hours, depending on the complexity and urgency of your matter."
  },
  {
    question: "Do I need to pay for initial consultation?",
    answer: "Our initial assessment through the chat service is free. Any fees for further legal services will be clearly communicated before you decide to proceed with a particular legal professional."
  },
  {
    question: "Can I use this service for emergency legal situations?",
    answer: "While we strive to connect you with legal help as quickly as possible, our service is not designed for immediate emergency situations. For legal emergencies, please contact local authorities or emergency legal services directly."
  },
  {
    question: "Do you provide document preparation services?",
    answer: "Yes, depending on your needs, we can connect you with legal professionals who offer document preparation services for various legal matters."
  },
  {
    question: "How do I know if I need a lawyer or if I can handle the issue myself?",
    answer: "Our chat system helps assess the complexity of your situation and provides guidance on whether professional legal assistance is recommended. We aim to empower you with information to make the best decision for your circumstances."
  }
];

const FAQSection: React.FC = () => {
  return (
    <section id="faqs" className="py-16 bg-legal-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our legal assistance services and how we can help you.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-legal-100">
                <AccordionTrigger className="text-left font-medium py-4 hover:text-legal-700 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
