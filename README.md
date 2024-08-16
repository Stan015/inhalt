# Inhalt | The contents app

Inhalt is a German word for 'content', this means that this is a platform where content writers and content creators have fun reading rich articles and watching video contents. It's purpose is to have all in one app that simply provides it all.

This project is in fulfilment of my AltSchool Africa final semester's Capstone project.

## Setup: to run this app in development

Install the dependencies:

```bash

# pnpm
pnpm install

```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

# pnpm
pnpm run dev

```

## Production

Build the application for production:

```bash

# pnpm
pnpm run build

```

Locally preview production build:

```bash

# pnpm
pnpm run preview

```

Run Unit Test:

```bash

# pnpm
pnpm run test

```

Run End-To-End Test:

```bash

# pnpm
pnpm exec playwright test --ui

```

## Technologies

- TypeScript
- NuxtJS
- Tailwindcss
- Supabase
- Vitest
- Playwrite
- Pinia store
- Toast-UI/Editor
- Markdown-it

## App features

Think of this app as an app for publishing rich contents, thus, it has all the interactive features of a social app (e.g, liking an inhalt, commenting, bookmarking, sharing, following a user, etc). The app aims at becoming the number one go-to app for but writers and video creators of all desciplines.

A list of some key features are:

- Ability to create markdown inhalts and publish
- Ability to Choose tags for inhalts for better reach (e.g, An inhalt article for Nuxt developers should have a tag of 'Nuxt', 'Software Developer', and so on)
- Authentication: Users can sign up with email and password and also sign up with a Provider (google or github)
- Newly signed up users or sign up with provider are redirected to a confirm page to confirm their access_token
- An error page exists to grab errors and request the user go back to previous page
- Non-authenticated users can still view contents on the app but they would be redirected to login/sign-up if they want to interact or publish
- Users can follow each other
- Their is a user profile page you can load/search users by entering their username in the browser searchbar
- During sign up with email, users can choose username
- If a user signs up with a Provider, the app generates a random user name (e.g, inhalt_user13453) which they can edit once
- Users can edit Bio, name, tags and lots more to update profile
- Users can see contents they likes, bookmarked, who they are following, who follows them and more
- Users can see other stats such as total comments, total likes, total bookmarks, rank etc
- The inhalt app has a nice looking UI that is Responsive
- User can toggle between light mode and dark mode
- Users can comment with markdown editor which makes super good for all creaters
- Users can add cover image or choose not to add when creating their inhalt articles
- Real time updates
- Both unit tests and End-To-End tests exists in the codebase
- Markdown contents are saved in the db and converted to HTML to render on the Frontend UI.

## Aims

This app is marked as super by the developer and it will gain priority as time goes on. This means that more and more features will unfold as days goes by.

## Appreciates

Many thanks to AltSchool Africa for the best training and knowledge they have passed down to me through their amazing instructor. A big shout out to Mr Oluwasetemi Ojo who made sure his frontend students are stars shining so bright.

## Open for dicussion

I am open to discuss the build process of this app and what is aimed at. Simply click on the main repo user profile to locate my communication means.
