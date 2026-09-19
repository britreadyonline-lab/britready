/*
 * Update this object before each spotting session. Keep unknown URLs empty.
 * Stream states: "upcoming", "live_today", "live_now", "stream_ended".
 * Leave nextSpotting.airport or startsAt empty to show the "Coming soon" state.
 */
window.BRITREADY_SITE_CONFIG = {
  stream: {
    state: "upcoming",
    airport: "London Heathrow Airport",
    shortAirport: "London Heathrow",
    startsAt: "2026-09-19T16:20:00+01:00",
    youtubeUrl: "https://www.youtube.com/live/Skh2h1wsQPk",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/Skh2h1wsQPk?rel=0&autoplay=1"
  },
  nextSpotting: {
    airport: "London Heathrow Airport",
    startsAt: "2026-09-19T16:20:00+01:00",
    status: "Scheduled",
    youtubeUrl: "https://www.youtube.com/live/Skh2h1wsQPk"
  },
  social: {
    youtubeChannelUrl: "https://www.youtube.com/@BritReadyAviation",
    youtubeSubscribeUrl: "https://www.youtube.com/channel/UCkuswSuAl1epdL6mLs6LgBw?sub_confirmation=1",
    tiktokUrl: ""
  }
};
