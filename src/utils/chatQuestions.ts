
export interface ChatQuestion {
  id: string;
  text: string;
  options?: string[];
  nextQuestionId?: string;
  fieldName: string;
  isOpen?: boolean;
}

export interface ChatFlow {
  [key: string]: ChatQuestion;
}

export const legalChatFlow: ChatFlow = {
  "start": {
    id: "start",
    text: "Hello! I'm your legal assistant. To help you better, could you tell me what type of legal issue you're facing?",
    options: [
      "Family Law",
      "Criminal Defense",
      "Personal Injury",
      "Business Law",
      "Immigration",
      "Real Estate",
      "Other"
    ],
    fieldName: "legalIssueType",
    nextQuestionId: "duration"
  },
  "duration": {
    id: "duration",
    text: "How long have you been dealing with this issue?",
    options: [
      "Less than a week",
      "A few weeks",
      "1-3 months",
      "3-6 months",
      "6-12 months",
      "More than a year"
    ],
    fieldName: "issueDuration",
    nextQuestionId: "urgency"
  },
  "urgency": {
    id: "urgency",
    text: "Is this matter urgent? Do you have any upcoming deadlines or court dates?",
    options: [
      "Yes, within 24 hours",
      "Yes, within a week",
      "Yes, within a month",
      "No immediate urgency"
    ],
    fieldName: "urgencyLevel",
    nextQuestionId: "description"
  },
  "description": {
    id: "description",
    text: "Please briefly describe your situation in a few sentences.",
    isOpen: true,
    fieldName: "situationDescription",
    nextQuestionId: "previousAction"
  },
  "previousAction": {
    id: "previousAction",
    text: "Have you taken any steps to address this issue so far?",
    options: [
      "Consulted with another lawyer",
      "Filed documents myself",
      "Contacted relevant authorities",
      "Attempted to resolve directly",
      "No action taken yet",
      "Other"
    ],
    fieldName: "previousActions",
    nextQuestionId: "location"
  },
  "location": {
    id: "location",
    text: "What city and state are you located in? This helps us determine relevant jurisdiction.",
    isOpen: true,
    fieldName: "location",
    nextQuestionId: "contactPreference"
  },
  "contactPreference": {
    id: "contactPreference",
    text: "What's your preferred method of communication with a legal professional?",
    options: [
      "Phone call",
      "Email",
      "Video consultation",
      "In-person meeting",
      "Text message"
    ],
    fieldName: "contactPreference",
    nextQuestionId: "budget"
  },
  "budget": {
    id: "budget",
    text: "Do you have a budget in mind for legal services?",
    options: [
      "Under $500",
      "$500-$1,000",
      "$1,000-$3,000",
      "$3,000-$5,000",
      "$5,000+",
      "Seeking pro bono (free) assistance",
      "Not sure/need guidance"
    ],
    fieldName: "budget",
    nextQuestionId: "end"
  },
  "end": {
    id: "end",
    text: "Thank you for providing this information. Our team will review your case and a legal expert will contact you shortly. Is there anything else you'd like to add before we conclude?",
    isOpen: true,
    fieldName: "additionalInfo"
  }
};
