"use client";

import { useState, useEffect } from "react";


export function useGitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar dados do repositório no GitHub
  const fetchGitHubData = async (repoName) => {
    try {
      const response = await fetch(`https://api.github.com/repos/Dev-GustavoRibeiro/${repoName}`);
      if (!response.ok) throw new Error('Repositório não encontrado');
      return await response.json();
    } catch (err) {
      console.error(`Erro ao buscar repositório ${repoName}:`, err);
      return null;
    }
  };

  // Função para buscar informações adicionais (stars, última atualização, etc.)
  const enhanceProjectWithGitHubData = async (project) => {
    const githubData = await fetchGitHubData(project.repoName);
    
    return {
      ...project,
      stars: githubData?.stargazers_count || 0,
      lastUpdated: githubData?.updated_at || project.createdAt,
      repoUrl: githubData?.html_url || `https://github.com/Dev-GustavoRibeiro/${project.repoName}`,
      previewImages: [
        `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${project.repoName}/main/preview.jpg`,
        ...(project.previewImages || [])
      ]
    };
  };

  // Carregar e enriquecer os projetos com dados do GitHub
  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        
        // Aqui você pode substituir por sua fonte de dados local
        const localProjects = await import("../data/projects");
        const basicProjects = localProjects.default || localProjects.projects;
        
        // Enriquecer cada projeto com dados do GitHub
        const enhancedProjects = await Promise.all(
          basicProjects.map(enhanceProjectWithGitHubData)
        );
        
        setProjects(enhancedProjects);
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Pré-carregar imagens dos projetos
  useEffect(() => {
    if (projects.length) {
      projects.forEach((project) => {
        const img = new Image();
        img.src = project.previewImages[0];
      });
    }
  }, [projects]);

  return { projects, isLoading, error };
}