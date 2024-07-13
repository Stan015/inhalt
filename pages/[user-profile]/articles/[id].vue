<script setup lang="ts"></script>

<template>
  <div class="w-full min-h-main flex gap-4 py-6 px-[12%]">
    <!-- <div class="flex flex-col gap-4 justify-between w-full h-full">
        <nav class="flex flex-col gap-4 w-full h-max">
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="icon-park-outline:data-all" /> All</NuxtLink
          >
          <NuxtLink
            to="/articles"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="gravity-ui:square-article" /> Articles</NuxtLink
          >
          <NuxtLink
            to="/"
            class="flex flex-shrink-0 items-center gap-3 w-[90%] bg-white px-4 py-[1.5px] rounded-l-lg relative after:content-[' '] after:w-2 after:h-full after:absolute after:right-[-10%] after:rounded-l-2xl after:bg-white after:pointer-events-none"
            ><Icon name="lets-icons:video-fill" /> Video inhalt</NuxtLink
          >
        </nav>
        <section class="w-full h-max bg-white rounded-2xl p-4">
          <h2>News</h2>
          <div class="w-full h-[20rem]"></div>
        </section>
      </div> -->
    <main class="flex flex-col gap-6 w-[90%] h-full pb-6">
      <article
        class="w-full h-max rounded-2xl border border-white relative overflow-hidden"
      >
        <NuxtImg src="/img1.png" alt="cover photo" class="w-full h-11/12" />
        <div class="w-full h-max bg-white p-4">
          <h2 class="w-full text-center font-bold text-[1.5rem]">
            Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS Marketing
            Managers
          </h2>
          <div class="flex items-end justify-between gap-6">
            <div class="text-[0.7rem]">
              <span>Jul 9</span> .
              <span>10 min read</span>
            </div>

            <div class="flex gap-4 cursor-default">
              <button type="button" aria-labelledby="likes">
                <Icon name="mdi:heart-outline" />
              </button>
              <button type="button" aria-labelledby="comments">
                <Icon name="uil:comment" />
              </button>
              <button type="button" aria-labelledby="bookmark">
                <Icon name="material-symbols:bookmark-outline" />
              </button>
              <button type="button" aria-labelledby="share">
                <Icon name="uil:share" />
              </button>
            </div>

            <ProfileCard
              user-profile-link="/stan015"
              name="Stanley Azi"
              occupation="Frontend Developer"
              profile-photo-src="/img2.png"
              class-name="items-end"
            />
          </div>
        </div>
        <div class="flex flex-col gap-2 p-4">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Repudiandae, autem laboriosam facere perferendis earum asperiores
            doloremque sunt accusamus officiis rerum, iste eum quibusdam
            perspiciatis explicabo magni aspernatur quaerat nemo dolorum? Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Ipsam deserunt
            ipsum modi pariatur obcaecati quaerat quas dolor asperiores beatae
            consequuntur vel sequi illum maxime nisi a amet quod, eveniet
            facere!
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            finibus tempor metus, at accumsan orci mattis vel. In interdum eu
            risus a faucibus. Sed in lectus non sem sollicitudin euismod.
            Vestibulum lacinia elit non finibus ultricies. Ut ultricies justo
            sit amet sapien tristique, eu commodo ligula aliquet. Morbi nibh
            metus, sagittis id efficitur a, varius a turpis. Morbi lobortis
            pellentesque sem vitae suscipit. Nullam euismod sed felis et
            accumsan. Vestibulum mattis quam sit amet interdum accumsan. In at
            nisl ipsum. Phasellus interdum fermentum nisi. Fusce posuere, turpis
            eu viverra pulvinar, risus ligula consectetur ligula, at vestibulum
            metus eros id nibh. Praesent tincidunt justo ac justo dignissim, nec
            ornare erat malesuada.
          </p>
          <p>
            Curabitur consectetur purus et ipsum tempus, non euismod massa
            euismod. Donec convallis sodales mi nec tincidunt. Nunc porta, nulla
            in mattis viverra, sem magna aliquet ligula, eu pulvinar mauris quam
            in eros. Fusce felis mauris, viverra in elementum ut, suscipit
            laoreet augue. Nunc aliquam libero eu sollicitudin ultricies. Sed
            scelerisque ut odio eget tempor. Nulla suscipit congue est, non
            feugiat eros egestas tincidunt. Cras efficitur tellus sit amet metus
            scelerisque, in laoreet metus suscipit. Morbi sed bibendum odio.
            Vestibulum viverra dui at lorem tristique, mattis bibendum sem
            elementum. Quisque vel placerat neque. Vestibulum porta ante velit,
            et tincidunt metus vehicula at.
          </p>
          <p>
            Aenean eget rhoncus metus. Sed ac sodales nibh, convallis maximus
            augue. Proin viverra arcu arcu, ac imperdiet diam eleifend nec.
            Morbi ac interdum lorem. Curabitur purus ex, imperdiet mollis nisi
            a, pharetra malesuada diam. Aliquam id viverra felis. Vivamus
            fringilla elit eget venenatis varius. Cras aliquam massa ac ante
            rutrum congue. Aenean dignissim felis metus, et dictum turpis
            lacinia at. Sed porta dictum nunc, quis facilisis arcu maximus in.
            Morbi a nisl pretium, efficitur libero vel, pulvinar odio. Morbi
            eleifend ligula vitae diam vestibulum, nec posuere dolor
            pellentesque. Etiam finibus urna diam. Nam arcu quam, facilisis eu
            ex at, interdum elementum quam. Morbi convallis pretium consequat.
          </p>
        </div>
        <div
          class="flex items-end p-4 border-t border-white justify-between gap-6"
        >
          <ProfileCard
            user-profile-link="/stan015"
            :authorTag="true"
            name="Stanley Azi"
            occupation="Frontend Developer"
            profilePhotoSrc="/img2.png"
          />

          <div class="flex gap-4 cursor-default">
            <button type="button" aria-labelledby="likes">
              <Icon name="mdi:heart-outline" />
            </button>
            <button type="button" aria-labelledby="comments">
              <Icon name="uil:comment" />
            </button>
            <button type="button" aria-labelledby="bookmark">
              <Icon name="material-symbols:bookmark-outline" />
            </button>
            <button type="button" aria-labelledby="share">
              <Icon name="uil:share" />
            </button>
          </div>
          <div class="text-[0.7rem]"><span>Jul 9 2023 .</span> 10:02AM</div>
        </div>
      </article>
      <section>
        <div class="w-full h-max rounded-2xl border p-4 border-white">
          <ProfileCard
            user-profile-link="/stan015"
            name="Stanley Azi"
            occupation="Frontend Developer"
            profile-photo-src="/img2.png"
          />
          <p>You wrote a fantastic article right here!!! 🔥</p>
          <div class="flex gap-4 cursor-default">
            <button type="button" aria-labelledby="likes">
              <Icon name="mdi:heart-outline" />
            </button>
            <button type="button" aria-labelledby="comments">
              <Icon name="uil:comment" />
            </button>
          </div>
        </div>
      </section>
      <section>
        <h2 class="font-bold text-md">Related inhalts</h2>
        <article
          class="w-full h-max flex rounded-2xl border border-white relative overflow-hidden"
        >
          <NuxtLink
            to="username/title"
            class="w-[8rem] h-[7rem] overflow-hidden"
          >
            <NuxtImg src="/img1.png" alt="cover photo" class="w-full h-full" />
          </NuxtLink>
          <div class="w-full h-max bg-white p-4">
            <NuxtLink to="username/title" class="w-20 h-20 overflow-hidden">
              <h2 class="w-full text-center font-bold text-[1rem]">
                Mastering ChatGPT Blog Creation: Dos and Don'ts for SaaS
                Marketing Managers
              </h2>
            </NuxtLink>
            <div class="flex items-end justify-between gap-6">
              <div class="text-[0.7rem]">
                <span>Jul 9</span> .
                <span>10 min read</span>
              </div>

              <div class="flex gap-4 cursor-default">
                <button type="button" aria-labelledby="likes">
                  <Icon name="mdi:heart-outline" />
                </button>
                <button type="button" aria-labelledby="comments">
                  <Icon name="uil:comment" />
                </button>
                <button type="button" aria-labelledby="bookmark">
                  <Icon name="material-symbols:bookmark-outline" />
                </button>
                <button type="button" aria-labelledby="share">
                  <Icon name="uil:share" />
                </button>
              </div>

              <ProfileCard
                user-profile-link="/stan015"
                name="Stanley Azi"
                occupation="Frontend Developer"
                profile-photo-src="/img2.png"
                class-name="items-end"
              />
            </div>
          </div>
        </article>
      </section>
    </main>
    <aside class="flex flex-col gap-6 w-[30rem] h-full">
      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Promotion</h2>
        <div class="w-full h-[20rem]"></div>
      </section>

      <section class="w-full h-max bg-white rounded-2xl p-4">
        <h2>Hot Trends <Icon name="fluent-emoji-flat:fire" /></h2>
        <div class="w-full h-[25rem]">
          <h3>Rendering images the good way</h3>
          <h3>18 tools to master Nuxt</h3>
          <h3>Vue is getting super fun!</h3>
          <h3>Iconify + Nuxt</h3>
          <h3>Next vs Nuxt</h3>
        </div>
      </section>
    </aside>
  </div>
  <NuxtPage />
</template>
