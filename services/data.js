export const getSections = () => [
  {
    title: "Popular Movies",
    data: [
      getMovie("1", "Avatar"),
      getMovie("2", "Titanic"),
      getMovie("3", "Star Wars"),
      getMovie("4", "Spider-Man")
    ],
  },
  {
    title: "Top 10 Movies",
    data: [
      getMovie("5", "Forrest Gump"),
      getMovie("6", "The Godfather"),
      getMovie("7", "Shawshank Redemption"),
      getMovie("8", "Schindler's List")
    ],
  },
  {
    title: "Drama Movies",
    data: [
      getMovie("9", "Gladiator"),
      getMovie("10", "Braveheart"),
      getMovie("11", "12 Years a Slave"),
      getMovie("12", "Apollo 13")
    ],
  },
];

export const getMovies = () => ([
  getMovie("1", "Avatar"),
  getMovie("2", "Titanic"),
  getMovie("3", "Star Wars"),
  getMovie("4", "Spider-Man"),
  getMovie("5", "Forrest Gump"),
  getMovie("6", "The Godfather"),
  getMovie("7", "Shawshank Redemption"),
  getMovie("8", "Schindler's List"),
  getMovie("9", "Gladiator"),
  getMovie("10", "Braveheart"),
  getMovie("11", "12 Years a Slave"),
  getMovie("12", "Apollo 13")
]);

export const getMovie = (id, title) => ({
  id,
  title,
  genres: [{ id: 1, name: "Action" }, { id: 2, name: "Sci-Fi" }],
  overview:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  popularity: "123.423",
  vote: "8.2",
  image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=3259&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  releaseDate: "2010-07-16",
})
