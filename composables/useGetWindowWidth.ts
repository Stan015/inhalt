import { ref, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

export function useGetWindowWidth() {
  const isDashboardMenuOpen = ref(false);

  const { width } = useWindowSize();

  const updateMenuState = () => {
    if (width.value >= 768) {
      isDashboardMenuOpen.value = true;
    } else {
      isDashboardMenuOpen.value = false;
    }
  };

  watch(width, updateMenuState, { immediate: true });

  return {
    isDashboardMenuOpen,
  };
}
