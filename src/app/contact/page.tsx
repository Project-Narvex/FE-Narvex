import React from 'react';
import ContactClient from '@/components/pages/contact/contact-client';
import {
  mainService,
  defaultContactInfo,
  defaultContactPageContent,
} from '@/data/contact';

// This is now a Server Component
export default function ContactPage() {
  // Pre-compute data on the server
  const contactInfo = defaultContactInfo;
  const pageContent = defaultContactPageContent;

  return (
    <ContactClient
      mainService={mainService}
      contactInfo={contactInfo}
      pageContent={pageContent}
    />
  );
}