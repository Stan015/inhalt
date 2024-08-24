<script setup lang="ts">
import { useUserStore } from "~~/store/userStore";
import { Notyf } from "notyf";
import "notyf/notyf.min.css";

const props = defineProps({
  articleId: Number,
  title: String,
  authorUsername: String,
});

let notyf: Notyf | null;

onMounted(() => {
  notyf = new Notyf({
    duration: 3000,
    position: {
      x: "right",
      y: "top",
    },
  });
});

const domain = ref<string | null>(null);

const showShareOptions = ref(false);

const userStore = useUserStore();

const shareToSocialMedia = (platform: string) => {
  const url = `${domain.value}/${props.authorUsername}/articles/${
    props.articleId
  }--${props.title!.replace(/\s+/g, "-").toLowerCase()}`;

  let shareUrl = "";

  switch (platform) {
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}`;
      break;
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}`;
      break;
    case "linkedin":
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(props.title!)}&summary=&source=`;
      break;
    default:
      throw new Error("platform not supported");
  }

  window.open(shareUrl, "_blank");
  handleShare();
};

const copyLink = () => {
  const url = `${domain.value}/${props.authorUsername}/articles/${
    props.articleId
  }--${props.title!.replace(/\s+/g, "-").toLowerCase()}`;

  navigator.clipboard.writeText(url).then(() => {
    notyf?.success("Link copied to clipboard");
    handleShare();
  });
};

const handleShare = async () => {
  const response = await useFetch("/api/articles/update-share-count", {
    method: "POST",
    body: JSON.stringify({
      articleId: props.articleId,
      sharedBy: userStore.userCredentials.username,
    }),
  });

  if (!response.data.value) {
    console.error("Error updating share count");
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    domain.value = window.location.host;
  }
});
</script>

<template>
  <button
    @click="showShareOptions = !showShareOptions"
    type="button"
    aria-labelledby="share"
    class="relative flex flex-col items-center"
  >
    <Icon name="uil:share" />
  </button>
  <div
    v-if="showShareOptions"
    class="absolute bottom-[2.5rem] p-2 bg-white border-2 border-accent rounded-2xl text-sm transition-all"
  >
    <div class="flex gap-1 mb-1">
      <p>Share to:</p>
      <button class="h-max w-max p-1" @click="shareToSocialMedia('linkedin')">
        <Icon name="mdi:linkedin" />
      </button>
      <button class="h-max w-max p-1" @click="shareToSocialMedia('twitter')">
        <Icon name="prime:twitter" />
      </button>
      <button class="h-max w-max p-1" @click="shareToSocialMedia('facebook')">
        <Icon name="raphael:facebook" />
      </button>
    </div>
    <button class="flex items-center gap-1" @click="copyLink">
      Copy Link: <Icon name="solar:copy-bold" />
    </button>
  </div>
</template>
