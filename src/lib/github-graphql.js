const GITHUB_API = "https://api.github.com/graphql"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

export async function fetchGraphQLProjects(username) {
  const query = `
    query {
      user(login: "${username}") {
        repositories(first: 10, orderBy: {field: STARGAZERS, direction: DESC}, privacy: PUBLIC, isFork: false) {
          nodes {
            id
            name
            description
            url
            homepageUrl
            createdAt
            stargazerCount
            forkCount
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  `

  const res = await fetch(GITHUB_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({ query }),
    cache: "no-store", // desativa cache para garantir dados atualizados
  })

  const data = await res.json()

  if (!res.ok || !data?.data?.user) {
    throw new Error("Erro ao buscar dados via GraphQL")
  }

  return data.data.user.repositories.nodes
}
