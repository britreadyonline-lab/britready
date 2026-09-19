(() => {
  const config = window.BRITREADY_SITE_CONFIG || {};
  const stream = config.stream || {};
  const next = config.nextSpotting || {};
  const social = config.social || {};

  const track = (eventName, details = {}) => {
    const payload = { event: eventName, ...details };
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(payload);
    window.dispatchEvent(new CustomEvent('britready:analytics', { detail: payload }));
  };

  const $ = (id) => document.getElementById(id);
  const stateElement = $('stream-state');
  const locationElement = $('stream-location');
  const timeElement = $('stream-time');
  const countdownElement = $('hero-countdown');
  const primaryCta = $('primary-live-cta');
  const primaryCtaText = primaryCta.querySelector('span');

  const date = stream.startsAt ? new Date(stream.startsAt) : null;
  const hasValidDate = date && !Number.isNaN(date.getTime());
  const isToday = hasValidDate && date.toDateString() === new Date().toDateString();
  const state = stream.state || 'upcoming';
  const formatTime = (value) => new Intl.DateTimeFormat('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZoneName: 'short'
  }).format(value).replace(/\b(am|pm)\b/i, (period) => period.toUpperCase());

  const stateLabels = {
    upcoming: isToday ? 'Live today' : 'Upcoming',
    live_today: 'Live today',
    live_now: 'Live now',
    stream_ended: 'Stream ended'
  };

  document.body.dataset.streamState = state;
  stateElement.lastChild.textContent = ` ${stateLabels[state] || 'Upcoming'}`;
  locationElement.textContent = stream.shortAirport || stream.airport || 'Location coming soon';
  timeElement.textContent = hasValidDate ? formatTime(date) : 'Time coming soon';
  timeElement.dateTime = stream.startsAt || '';

  primaryCta.href = stream.youtubeUrl || social.youtubeChannelUrl || '#';
  if (state === 'live_now') primaryCtaText.textContent = 'Watch live now';
  if (state === 'stream_ended') primaryCtaText.textContent = 'Watch the replay';
  if (!stream.youtubeUrl) primaryCtaText.textContent = 'Visit our YouTube channel';

  const updateCountdown = () => {
    if (!hasValidDate || !['upcoming', 'live_today'].includes(state)) return;
    const remaining = date.getTime() - Date.now();
    if (remaining <= 0) {
      countdownElement.hidden = true;
      return;
    }
    const total = Math.floor(remaining / 1000);
    const days = Math.floor(total / 86400);
    const hours = Math.floor((total % 86400) / 3600);
    const minutes = Math.floor((total % 3600) / 60);
    const seconds = total % 60;
    countdownElement.textContent = `Starts in ${days ? `${days}d ` : ''}${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;
    countdownElement.hidden = false;
    window.setTimeout(updateCountdown, 1000);
  };
  updateCountdown();

  const player = $('player-preview');
  $('player-play').addEventListener('click', () => {
    if (!stream.youtubeEmbedUrl) return;
    const iframe = document.createElement('iframe');
    iframe.src = stream.youtubeEmbedUrl;
    iframe.title = 'BritReady Aviation plane spotting stream';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    iframe.allowFullscreen = true;
    player.replaceChildren(iframe);
    player.classList.add('is-playing');
    track('embedded_live_play');
  }, { once: true });

  const nextDate = next.startsAt ? new Date(next.startsAt) : null;
  const hasNext = next.airport && nextDate && !Number.isNaN(nextDate.getTime());
  const nextCta = $('next-spotting-cta');
  if (hasNext) {
    $('next-airport').textContent = next.airport;
    $('next-date').textContent = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(nextDate);
    $('next-time').textContent = formatTime(nextDate);
    $('next-status').textContent = next.status || 'Scheduled';
    nextCta.href = next.youtubeUrl || social.youtubeChannelUrl || '#';
  } else {
    $('next-empty-message').hidden = false;
    $('next-date').closest('div').hidden = true;
    $('next-time').closest('div').hidden = true;
    $('next-status').closest('div').hidden = true;
    nextCta.textContent = 'Follow BritReady Aviation';
    nextCta.href = social.youtubeSubscribeUrl || social.youtubeChannelUrl || '#';
  }

  document.querySelectorAll('[data-youtube-subscribe]').forEach((link) => {
    link.href = social.youtubeSubscribeUrl || social.youtubeChannelUrl || '#';
  });

  const tiktok = $('tiktok-link');
  if (social.tiktokUrl) {
    tiktok.href = social.tiktokUrl;
    tiktok.hidden = false;
  }

  document.querySelectorAll('[data-event]').forEach((link) => {
    link.addEventListener('click', () => track(link.dataset.event, { destination: link.href }));
  });

  track('page_view', { referrer: document.referrer || 'direct' });
})();
