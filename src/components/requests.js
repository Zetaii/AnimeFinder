const requests = {
  fetchTrending: `/top/anime?&filter=airing&sfw=true`,
  fetchTopRated: `/top/anime?&filter=favorite&sfw=true`,
  fetchActionAnime: `/genre/1/anime`,
  fetchComedyAnime: `/genre/4/anime`,
  fetchHorrorAnime: `/genre/14/anime`,
  fetchRomanceAnime: `/genre/22/anime`,
  fetchMysteryAnime: `/genre/7/anime`,
  fetchSciFiAnime: `/genre/24/anime`,
}

export default requests
