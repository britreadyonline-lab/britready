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
    startsAt: "2026-09-20T17:00:00+01:00",
    endsAt: "",
    youtubeUrl: "https://youtube.com/live/_kFT2eaQhkY?feature=share",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/_kFT2eaQhkY?rel=0&autoplay=1"
  },
  nextSpotting: {
    airport: "London Heathrow Airport",
    startsAt: "2026-09-20T17:00:00+01:00",
    endsAt: "",
    status: "Scheduled",
    youtubeUrl: "https://youtube.com/live/_kFT2eaQhkY?feature=share"
  },
  social: {
    youtubeChannelUrl: "https://www.youtube.com/@BritReadyAviation",
    youtubeSubscribeUrl: "https://www.youtube.com/channel/UCkuswSuAl1epdL6mLs6LgBw?sub_confirmation=1",
    tiktokUrl: ""
  }
};
