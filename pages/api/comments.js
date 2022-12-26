import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI = 'https://api-eu-west-2.hygraph.com/v2/clc2a4cug2bba01um0dlo17aa/master'

export default async function comments(req, res) {  
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
      authorization: `Bearer ${'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NzIwMDk5NjAsImF1ZCI6WyJodHRwczovL2FwaS1ldS13ZXN0LTIuaHlncmFwaC5jb20vdjIvY2xjMmE0Y3VnMmJiYTAxdW0wZGxvMTdhYS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiMzBiZjlmZTMtNjM4ZC00NTIzLTg4MGItM2UyYmZjNjcwNmY4IiwianRpIjoiY2xjM3prNmloMnpybzAxdDVhbmxhY3k0OSJ9.iG8Tyb2YXcfXHJpUlclLoLWCNjgvAl3o9br0tChXGWO2GIJMxtWRk-1hPoS7GFxQS1mKyX7Ipk00UL46l9ZrmgwnBL-UYi4D-KFeGCM1yVtf6nCNmGK_2Mw2c-tPWQaJKawsPkMqkqYOwCtlHbc-LF5NcYhYRpdAG1uTpLAwMLexGg1ITXvkxZUD4iaVbTH-SDpLT_bX5lvVuUYXy9xidlCvCVUsPe19qXGiqxc5kkNypUBOQ1NoVmnSL90lrCpPd7NW6iVBErmYbuKe1hpDovcBPJPVR5LRwnZ5azvfWfUDUO5ZYMB0xB0gq1PFMnfti40BFs9Ff1iIvy8dr1sIoqZB7TpwodxmFqYS5aEOH74rjNpx-A7hcjRvuve4vx_ykN-GI9ON4-5fotUb1pShU5fGvy5zPF8cJlBev_W-0_aS59x1fJK5lkOIGnmn-5BB3Lk6ptUrFZI8qf7JnUUEoQcQY0poSHMAhvQGYoH4ZbWH6BnLyQ_vb3nPbdq43T6TA_xzLNQmC6-mnB7iVy6zxgyaQxR9eyGwP0lzQ4kj9csIdRT-R55lsXD6FJ-Ddm9ejBZA-96udTV38ejzZKoAh922Y_ZowcJAQB_jc4DwRhGmW0XBUYSveCiYEsut3eD7XbhEP_Y41yoSQmoaZXODPp1hDrJGjyWA8uTpKCiYCXc'}`}
  })

  const query = gql`
    mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){id}
    }
  `
  try{
    const result = await graphQLClient.request(query, req.body)
    return res.status(200).send(result)
  }
  catch (error){
    return res.status(500).send(error)
  }
  
}