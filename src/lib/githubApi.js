const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

export async function fetchGitHubRepos(username) {
  try {
    // Verifica se o token existe
    if (!GITHUB_TOKEN) {
      console.warn("Token do GitHub não encontrado!");
    }

    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }) // Usa token apenas se existir
      },
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Resposta da API do GitHub:", {
        status: res.status,
        statusText: res.statusText,
        error: errorData
      });
      throw new Error(`Erro ao buscar repositórios do GitHub: ${res.status} ${res.statusText}`);
    }

    const repos = await res.json();

    // Verifica se retornou dados
    if (!Array.isArray(repos) || repos.length === 0) {
      console.warn(`Nenhum repositório encontrado para o usuário ${username}`);
      return [];
    }

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw new Error("Falha ao conectar com a API do GitHub. Verifique sua conexão e o token de acesso.");
  }
}

export async function getProjectDetails(repo) {
  try {
    // Busca o conteúdo do repositório e README em paralelo
    const [contentsRes, readmeRes] = await Promise.all([
      fetch(`https://api.github.com/repos/Dev-GustavoRibeiro/${repo.name}/contents/`, {
        headers: { Authorization: `token ${GITHUB_TOKEN}` },
        cache: "no-store",
      }),
      fetch(`https://api.github.com/repos/Dev-GustavoRibeiro/${repo.name}/readme`, {
        headers: { 
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3.raw'
        },
        cache: "no-store",
      })
    ]);

    // Verifica preview e processa README
    let hasPreview = false;
    let readme = null;

    if (contentsRes.ok) {
      const contents = await contentsRes.json();
      hasPreview = contents.some(file => 
        ['preview.jpg', 'preview.png', 'preview.PNG'].includes(file.name.toLowerCase())
      );
    }

    if (readmeRes.ok) {
      readme = await readmeRes.text();
    }

    // Processa os tópicos do repositório para categorizar tecnologias
    const topics = repo.topics || [];
    const techs = {
      frontend: topics.filter(t => ['react', 'vue', 'angular', 'javascript', 'html', 'css', 'tailwind'].includes(t)),
      backend: topics.filter(t => ['nodejs', 'php', 'python', 'java', 'express'].includes(t)),
      tools: topics.filter(t => ['docker', 'kubernetes', 'aws', 'typescript'].includes(t))
    };

    return {
      id: repo.id,
      name: repo.name.toUpperCase(),
      description: repo.description,
      shortDescription: repo.description?.split('.')[0],
      html_url: repo.html_url,
      homepage: repo.homepage,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      techs,
      readme,
      hasPreview,
      previewUrl: hasPreview 
        ? `https://raw.githubusercontent.com/Dev-GustavoRibeiro/${repo.name}/main/preview.${hasPreview.includes('png') ? 'png' : 'jpg'}`
        : null,
      status: repo.archived ? 'archived' : 'active'
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes para ${repo.name}:`, error)
    return null
  }
}