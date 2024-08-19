export function formatLastRead(lastRead: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - new Date(lastRead).getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 60) {
    return `${diffMinutes} min read`;
  } else {
    const diffHours = Math.floor(diffMinutes / 60);
    return `${diffHours} hr read`;
  }
}
