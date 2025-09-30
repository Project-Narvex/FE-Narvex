'use client';

import React from 'react';
import { Project } from '@/data/projects';

interface PortfolioClientProps {
  initialProjects: Project[];
  portfolioCategories: Array<{ id: string; name: string }>;
  availableYears: number[];
  availableClients: string[];
  statusOptions: Array<{ id: string; name: string }>;
}

export default function PortofolioClientTest({
  initialProjects,
  portfolioCategories,
  availableYears,
  availableClients,
  statusOptions
}: PortfolioClientProps) {
  console.log('PortofolioClientTest - initialProjects:', initialProjects);
  console.log('PortofolioClientTest - portfolioCategories:', portfolioCategories);
  console.log('PortofolioClientTest - availableYears:', availableYears);
  console.log('PortofolioClientTest - availableClients:', availableClients);
  console.log('PortofolioClientTest - statusOptions:', statusOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Portfolio Test</h1>
        <div className="grid gap-4">
          <div>Projects: {initialProjects?.length || 0}</div>
          <div>Categories: {portfolioCategories?.length || 0}</div>
          <div>Years: {availableYears?.length || 0}</div>
          <div>Clients: {availableClients?.length || 0}</div>
          <div>Status Options: {statusOptions?.length || 0}</div>
        </div>
        
        {initialProjects && initialProjects.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Projects:</h2>
            <div className="grid gap-4">
              {initialProjects.slice(0, 3).map((project) => (
                <div key={project.id} className="bg-white p-4 rounded-lg shadow">
                  <h3 className="font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                  <p className="text-sm text-gray-500">Services: {project.services?.length || 0}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}