export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMins = Math.floor(diffInMs / (1000 * 60));

  // Show "X mins ago" if edited within the last hour
  if (diffInMins < 60 && diffInMins >= 0) {
    if (diffInMins < 1) return "just now";
    return `${diffInMins} min${diffInMins === 1 ? "" : "s"} ago`;
  }

  const isToday = date.toDateString() === now.toDateString();

  // Show time if edited today
  if (isToday) {
    return `at ${date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  // Show date if not today
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};