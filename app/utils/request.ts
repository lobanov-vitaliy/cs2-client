export const request = (input: RequestInfo | URL, init?: RequestInit) => {
  return fetch(input, {
    ...(init || {}),
    headers: {
      ...(init?.headers || {}),
      "x-time-zone": Intl.DateTimeFormat().resolvedOptions().timeZone,
    },
  });
};
