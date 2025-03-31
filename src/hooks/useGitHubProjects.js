"use client";

import { useState, useEffect } from "react";

const VALID_STATUSES = ["active", "production", "development"];

export function useGitHubProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGitHubData = async (repoName) => {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    const url = `https://api.github.com/repos/Dev-GustavoRibeiro/${repoName}`;

    try {
      const response = await fetch(url, {
        headers: token
          ? { Authorization: `Bearer ${token}` }
          : {}
      });

      if (!response.ok) {
        console.warn(
          `⚠️ Não foi possível acessar: ${url} (Status: ${response.status})`
        );
        throw new Error("Repositório não encontrado");
      }

      return await response.json();
    } catch (err) {
      console.error(`❌ Erro ao buscar repositório "${repoName}":`, err.message);
      return null;
    }
  };

  const enhanceProjectWithGitHubData = async (project) => {
    // Garante que techs seja sempre um array e define previewImages como vazia se não existir
    const baseProject = {
      ...project,
      techs: Array.isArray(project.techs) ? project.techs : [],
      previewImages: project.previewImages || []
    };

    if (
      !project.repoName ||
      !VALID_STATUSES.includes(project.status) ||
      project.ignoreGitHub
    ) {
      return baseProject;
    }

    const githubData = await fetchGitHubData(project.repoName);

    return {
      ...baseProject,
      stars: githubData?.stargazers_count || 0,
      forks: githubData?.forks_count || 0,
      lastUpdated: githubData?.updated_at || project.createdAt,
      repoUrl: githubData?.html_url || `https://github.com/Dev-GustavoRibeiro/${project.repoName}`,
      // Retorna somente a imagem de preview
      previewImages: [
        `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${project.repoName}/main/preview.jpg`
      ]
    };
  };

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Importa projetos locais (do arquivo ../data/projects)
        let localProjects;
        try {
          localProjects = await import("../data/projects");
        } catch (importError) {
          console.error("Erro ao importar projetos locais:", importError);
          throw new Error("Não foi possível carregar os projetos");
        }

        const basicProjects = localProjects.default || localProjects.projects || [];
        if (!Array.isArray(basicProjects)) {
          throw new Error("Formato inválido para projetos");
        }

        const enhancedProjects = await Promise.all(
          basicProjects.map(enhanceProjectWithGitHubData)
        );

        setProjects(enhancedProjects.filter(Boolean)); // Remove possíveis projetos nulos
      } catch (err) {
        console.error("Erro ao carregar projetos:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Pré-carregamento das imagens de preview
  useEffect(() => {
    if (projects.length) {
      projects.forEach((project) => {
        if (project.previewImages?.length) {
          project.previewImages.forEach((imgUrl) => {
            if (imgUrl) {
              const img = new Image();
              img.src = imgUrl;
            }
          });
        }
      });
    }
  }, [projects]);

  return { 
    projects, 
    isLoading, 
    error,
    refresh: () => {
      // Se desejar implementar uma função de refresh, basta reexecutar loadProjects aqui.
      // Por exemplo: setProjects([]) e disparar um novo loadProjects();
    }
}
} // Fim do hook useGitHubProjects
export default useGitHubProjects;