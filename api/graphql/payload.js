const userPayload = username => ({
  query: `
        query($username: String!)
        {
          user(login: $username) {
            ...userData
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
        
        fragment userData on User {
          id
          login
          name
          bio
          location
          createdAt
          avatarUrl
          url
          email
          websiteUrl
          followers {
            totalCount
          }
          following {
            totalCount
          }
          issues( first:0 ){
            totalCount
          }
          gists {
            totalCount
          }
          itemShowcase {
            items(first: 6) {
              nodes {
                ... on Repository {
                  isFork
                     forkCount
                     nameWithOwner
                     name
                     stargazers {
                           totalCount
                      }
                     languages(first: 5, orderBy: {field: SIZE, direction: DESC
                      }) {
                           nodes {
                             color
                         name
                          }
                      }
                     defaultBranchRef {
                           name
                       target {
                             ... on Commit {
                               history(first: 0) {
                                 totalCount
                                  }
                              }
                          }
                      }
                  }
              }
          }
      }
          repositories(first: 0, privacy: PUBLIC) {
            totalCount
          }
          isBountyHunter
          isCampusExpert
          isDeveloperProgramMember
          isEmployee
          isHireable
          isSiteAdmin
          isViewer
        }
      `,
  variables: `
        {
          "username": "${username}"
        }
      `,
});

const reposPayload = (username, id, endCursor = null) => ({
  query: `
        query($username: String!, $id: ID!, $afterCursor: String)
        {
          user(login: $username) {
            login
            id
            repositories(first: 100, privacy: PUBLIC, after: $afterCursor, orderBy: {field: NAME,direction: ASC}) {
              ...repoData
            }
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
  
        fragment repoStats on Repository {
          nameWithOwner
          name
          url
          owner {
            login
          }
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
          forks {
            totalCount
          }
          languages(first: 10, orderBy: {field: SIZE,direction: DESC}){
            nodes{
              name
              color
            }
            edges {
              size
              node {
                color
                name
              }
            }
            totalSize
          }
          contributions: defaultBranchRef {
            target {
              ... on Commit {
                userCommits: history(first: 0, author: {id: $id}) {
                  totalCount
                }
              }
            }
          }
        }
  
        fragment repoData on RepositoryConnection {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            ... on Repository {
              isFork
              ...repoStats
            }
          }
        }
      `,
  variables: `
        {
          "username": "${username}",
          "id": "${id}",
          "afterCursor": ${endCursor !== null ? `"${endCursor}"` : `null`}
        }
      `,
});

const cursorPayload = (username, endCursor = null) => ({
  query: `
        query($username: String!, $afterCursor: String)
        {
          user(login: $username) {
            repositories(first: 20, privacy: PUBLIC, after: $afterCursor, orderBy: {field: NAME,direction: ASC}) {
              ...repoData
            }
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
        fragment repoData on RepositoryConnection {
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      `,
  variables: `
        {
          "username": "${username}",
          "afterCursor": ${endCursor !== null ? `"${endCursor}"` : `null`}
        }
      `,
});

const reposBasicPayload = (username, endCursor = null) => ({
  query: `
        query($username: String!, $afterCursor: String)
        {
          user(login: $username) {
            login
            id
            repositories(first: 100, privacy: PUBLIC, after: $afterCursor, orderBy: {field: NAME,direction: ASC}) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                isFork
                name
                parent {
                  owner {
                    login
                  }
                }
              }          
            }
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
      `,
  variables: `
        {
          "username": "${username}",
          "afterCursor": ${endCursor !== null ? `"${endCursor}"` : `null`}
        }
      `,
});

const repoPayload = (owner, name, id) => ({
  query: `
        query($owner: String!, $name: String! $id: ID!)
        {
          repository(owner: $owner, name: $name) {
            url
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            forks {
              totalCount 
            }
            languages(first: 10, orderBy: {field: SIZE,direction: DESC}){
              nodes{
                name
                color
              }
              totalSize
            }
            contributions: defaultBranchRef {
              target {
                ... on Commit {
                  userCommits: history(first: 0, author: {id: $id}) {
                    totalCount
                  }
                }
              }
            }
          }
          
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
      `,
  variables: {
    owner,
    name,
    id
  },
});

const pullRequestsPayload = (username, endCursor) => ({
  query: `
        query($username: String!, $afterCursor: String)
        {
          user(login: $username) {
            pullRequests(first: 100, after: $afterCursor) {
              pageInfo {
                hasNextPage
                endCursor
              }
              nodes {
                title
                openedAt: createdAt
                        closed
                        commits{
                  totalCount
                }
                merged
                mergedAt
                repository {
                  id
                  name
                            owner {
                    login
                  }
                }
              }          
            }
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
      `,
  variables: `
        {
          "username": "${username}",
          "afterCursor": ${endCursor !== null ? `"${endCursor}"` : `null`}
        }
      `,
});

const pinnedPayload = (username) => ({
  query: `
        query($username: String!)
        {
          user(login: $username) {
            login
            id
            itemShowcase {
              items(first: 6) {
                nodes {
                  ... on Repository {
                    isFork
                       forkCount
                       nameWithOwner
                       name
                       stargazers {
                             totalCount
                        }
                       languages(first: 5, orderBy: {field: SIZE, direction: DESC
                        }) {
                             nodes {
                               color
                           name
                            }
                        }
                       defaultBranchRef {
                             name
                         target {
                               ... on Commit {
                                 history(first: 0) {
                                   totalCount
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
          }
        }
        
        
      `,
  variables: `
        {
          "username": "${username}"
        }
      `,
});


const rateLimit = () => ({
  query: `
    query
    {
      rateLimit(dryRun: true) {
        limit
        cost
        remaining
        resetAt
      }
    }
  `,

});
module.exports = {
  userPayload,
  reposPayload,
  cursorPayload,
  reposBasicPayload,
  repoPayload,
  pullRequestsPayload,
  pinnedPayload,
  rateLimit
};