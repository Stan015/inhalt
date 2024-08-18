export function useArticleReadTracker(articleId: number) {
  const scrollDepth = useState("scrollDepth", () => 0);
  const timeSpent = useState("timeSpent", () => 0);
  const isReading = useState("isReading", () => false);

  let scrollTimer: ReturnType<typeof setTimeout>;
  let timeInterval: ReturnType<typeof setInterval>;

  const updateReadMetrics = async () => {
    if (scrollDepth.value >= 50 && timeSpent.value >= 40) {
      await $fetch('/api/articles/update-article-reads', {
        method: 'POST',
        body: {
          articleId,
          scrollDepth: scrollDepth.value,
          timeSpent: timeSpent.value,
        },
      });
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    scrollDepth.value = (scrollTop / scrollHeight) * 100;

    if (scrollDepth.value >= 50 && !isReading.value) {
      isReading.value = true;
      updateReadMetrics();
    }
  };

  const handleTimeSpent = () => {
    timeSpent.value += 1;
  };

  onMounted(() => {
    window.addEventListener('scroll', handleScroll);

    timeInterval = setInterval(handleTimeSpent, 1000);

    scrollTimer = setTimeout(() => {
      if (timeSpent.value >= 40) {
        isReading.value = true;
        updateReadMetrics();
      }
    }, 40000);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
    clearInterval(timeInterval);
    clearTimeout(scrollTimer);
  });

  return {
    scrollDepth,
    timeSpent,
  };
}
