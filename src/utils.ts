export function uuidv4() {
  const truc = eval("[1e7] + -1e3");
  return (truc + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export function getTimeSince(date: Date) {
  date = new Date(date);
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " a";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " m";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " j";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " h";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " m";
  }
  return Math.floor(seconds) + " s";
}
