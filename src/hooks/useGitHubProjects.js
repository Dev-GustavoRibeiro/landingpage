"use client";

import { useState, useEffect, useCallback } from "react";

const VALID_STATUSES = ["active", "production", "development"];
const REFRESH_INTERVAL = 300000; // 5 minutos

export function useGitHubProjects(username = "Dev-GustavoRibeiro") {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchGitHubData = useCallback(async (repoName) => {
    // Verifique se o token está realmente disponível
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    
    if (!token) {
      console.warn("Token do GitHub não encontrado. As requisições podem ser limitadas.");
    }
    
    const url = `https://api.github.com/repos/${username}/${repoName}`;

    try {
      const headers = {
        'Accept': 'application/vnd.github.v3+json'
      };
      
      // Adicione o token apenas se estiver disponível
      if (token) {
        headers['Authorization'] = `token ${token}`;
      }
      
      const response = await fetch(url, {
        headers,
        cache: 'no-store'
      });

      if (response.status === 403) {
        console.error(`⚠️ Limite de requisições excedido ou acesso negado: ${url}`);
        // Retorne um objeto mínimo para continuar o fluxo
        return { 
          name: repoName,
          default_branch: 'main',
          stargazers_count: 0,
          forks_count: 0,
          html_url: `https://github.com/${username}/${repoName}`
        };
      }
      
      if (!response.ok) {
        console.warn(`⚠️ Não foi possível acessar: ${url} (Status: ${response.status})`);
        return null;
      }

      return await response.json();
    } catch (err) {
      console.error(`❌ Erro ao buscar repositório "${repoName}":`, err.message);
      return null;
    }
  }, [username]);

  const enhanceProjectWithGitHubData = useCallback(async (project) => {
    const baseProject = {
      ...project,
      techs: Array.isArray(project.techs) ? project.techs : [],
      previewImages: project.previewImages || []
    };

    // Se não tiver repoName ou status inválido, retorna o básico
    if (!project.repoName || !VALID_STATUSES.includes(project.status)) {
      return baseProject;
    }

    // Tente obter dados do GitHub, mas continue mesmo se falhar
    const githubData = await fetchGitHubData(project.repoName);

    // Fallback para preview image
    const previewFallback = "/images/project-fallback.jpg";
    
    // Use a branch padrão ou 'main' como fallback
    const defaultBranch = githubData?.default_branch || 'main';
    
    // Construa a URL da imagem diretamente, sem depender da API do GitHub
    // Adicione um timestamp para evitar cache
    const timestamp = new Date().getTime();
    const previewUrl = `https://raw.githubusercontent.com/${username}/${project.repoName}/${defaultBranch}/preview.jpg?v=${timestamp}`;

    return {
      ...baseProject,
      stars: githubData?.stargazers_count || 0,
      forks: githubData?.forks_count || 0,
      lastUpdated: githubData?.updated_at || project.createdAt,
      repoUrl: githubData?.html_url || `https://github.com/${username}/${project.repoName}`,
      previewImages: [previewUrl, previewFallback], // Inclua o fallback como segunda opção
      liveUrl: project.liveUrl || githubData?.homepage || null
    };
  }, [fetchGitHubData, username]);

  const loadProjects = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Importação dinâmica dos projetos locais
      const localProjects = await import("@/data/projects");
      const basicProjects = localProjects.default || localProjects.projects || [];

      if (!Array.isArray(basicProjects)) {
        throw new Error("Formato inválido para projetos");
      }

      const enhancedProjects = await Promise.all(
        basicProjects.map(enhanceProjectWithGitHubData)
      );

      setProjects(enhancedProjects.filter(Boolean));
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Erro ao carregar projetos:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [enhanceProjectWithGitHubData]);

  useEffect(() => {
    loadProjects();

    const interval = setInterval(() => {
      loadProjects();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [loadProjects]);

  return { 
    projects, 
    isLoading, 
    error,
    lastUpdated,
    refresh: loadProjects
  };
}

export default useGitHubProjects;