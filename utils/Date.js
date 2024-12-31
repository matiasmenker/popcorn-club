const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const getYear = (dateString) => dateString.substring(0, 4);

export { getYear, formatDate };
