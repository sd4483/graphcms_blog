import {request, gql, GraphQLClient} from 'graphql-request'

const graphqlAPI = 'https://api-eu-west-2.hygraph.com/v2/clc2a4cug2bba01um0dlo17aa/master'

export const getPosts = async () => {

    // const graphQLClient = new GraphQLClient(
    //     'https://api-eu-west-2.hygraph.com/v2/clc2a4cug2bba01um0dlo17aa/master'
    // )

    const query = gql`
        query MyQuery {
            postsConnection {
            edges {
                node {
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                exerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                }
            }
            }
        }
    `

    // const result = await graphQLClient.request(query)
    // return result.PostsConnection
    const result = await request(graphqlAPI, query)
    return result.postsConnection.edges
}

export const getPostDetails = async (slug) => {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug}){
                author {
                    bio
                    name
                    id
                    photo {
                        url
                    }
                }
                createdAt
                slug
                title
                exerpt
                featuredImage {
                    url
                }
                categories {
                    name
                    slug
                }
                content{
                    raw
                }
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug})
    return result.post
}

export const getRecentPosts = async () => {
    const query = gql `
        query GetPostDetails() {
            posts(
                orderBy: createdAt_ASC
                last: 3
                ) {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    slug
                }
        }
    `
    const result = await request(graphqlAPI, query)
    return result.posts
}

export const getSimilarPosts = async (categories, slug) => {
    const query = gql `
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: {slug_in: $categories}}}
                last: 3
                ) {
                    title
                    featuredImage {
                        url
                    }
                    createdAt
                    slug
                }
        }
    `
    const result = await request(graphqlAPI, query, {categories, slug})
    return result.posts
}

export const getCategories = async () => {
    const query = gql `
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query)
    return result.categories
}

export const submitComment = async (obj) => {
    const result = await fetch('/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(obj)
    })

    return result.json()
}

export const getComments = async (slug) => {
    const query = gql `
        query GetComments($slug: String!) {
            comments(where: {post: {slug: $slug}}) {
                name
                createdAt
                comment
            }
        }
    `
    const result = await request(graphqlAPI, query, {slug})
    return result.comments
}

export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            exerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};

export const getFeaturedPosts = async () => {
    const query = gql`
      query GetCategoryPost() {
        posts(where: {featuredPost: true}) {
          author {
            name
            photo {
              url
            }
          }
          featuredImage {
            url
          }
          title
          slug
          createdAt
        }
      }   
    `;
  
    const result = await request(graphqlAPI, query);
  
    return result.posts;
  };