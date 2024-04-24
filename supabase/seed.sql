-- Add supabase_products seed data
INSERT INTO
    "supabase_products" ("name", "sort")
VALUES
    ('Database', 0),
    ('Auth', 1),
    ('Storage', 2),
    ('Edge', 3),
    ('Realtime', 4),
    ('Vector', 5);

-- Add availability_types seed data
INSERT INTO
    "availability_types" ("name", "sort")
VALUES
    ('Full Time', 0),
    ('Part Time', 1),
    ('Contract', 2),
    ('MVP', 3),
    ('Consulting', 4),
    ('Task', 5);

INSERT INTO
    "roles" ("name", "sort")
VALUES
    ('Front-end', 0),
    ('Back-end', 1),
    ('Full-stack', 2),
    ('Design', 3),
    ('Security', 4);

INSERT INTO
    stacks ("name", "url", "slug")
VALUES
    ('Clerk', 'https://clerk.com/', 'clerk'),
    ('Kinde', 'https://kinde.com/', 'kinde'),
    ('Auth0', 'https://auth0.com/', 'auth0'),
    ('WorkOS', 'https://workos.com/', 'workos'),
    ('Unkey', 'https://unkey.dev/', 'unkey'),
    ('Hanko', 'https://hanko.io/', 'hanko'),
    (
        'Supabase Auth',
        'https://supabase.com/docs/guides/auth',
        'supabase-auth'
    ),
    (
        'Firebase Authentication',
        'https://firebase.google.com/docs/auth',
        'firebase-authentication'
    ),
    ('Lucia', 'https://lucia-auth.com/', 'lucia'),
    (
        'HTML',
        'https://en.wikipedia.org/wiki/HTML',
        'html'
    ),
    ('CSS', 'https://en.wikipedia.org/wiki/CSS', 'css'),
    (
        'JavaScript',
        'https://en.wikipedia.org/wiki/JavaScript',
        'javascript'
    ),
    (
        'TypeScript',
        'https://en.wikipedia.org/wiki/TypeScript',
        'typescript'
    ),
    ('React', 'https://react.dev/', 'react'),
    ('SolidJS', 'https://solidjs.com/', 'solidjs'),
    ('htmx', 'https://htmx.org/', 'htmx'),
    ('jQuery', 'https://jquery.com/', 'jquery'),
    ('Angular', 'https://angular.io/', 'angular'),
    ('Svelte', 'https://svelte.dev/', 'svelte'),
    ('Vue', 'https://vuejs.org/', 'vue'),
    (
        'Material UI',
        'https://mui.com/material-ui/',
        'material-ui'
    ),
    ('Ant Design', 'https://ant.design/', 'ant-design'),
    ('Chakra', 'https://chakra-ui.com/', 'chakra'),
    (
        'Aceternity UI',
        'https://ui.aceternity.com/',
        'aceternity-ui'
    ),
    ('daisyUI', 'https://daisyui.com/', 'daisyui'),
    ('NextUI', 'https://nextui.org/', 'nextui'),
    (
        'React Aria Components',
        'https://react-spectrum.adobe.com/react-aria/components.html',
        'react-aria-components'
    ),
    (
        'Mantine UI',
        'https://ui.mantine.dev/',
        'mantine-ui'
    ),
    ('tremor', 'https://tremor.so/', 'tremor'),
    ('shadcn/ui', 'https://ui.shadcn.com/', 'shadcnui'),
    ('Radix', 'https://radix-ui.com/', 'radix'),
    (
        'TailwindUI',
        'https://tailwindui.com/',
        'tailwindui'
    ),
    ('syntaxUI', 'https://syntaxui.com/', 'syntaxui'),
    (
        'Tailwind CSS',
        'https://tailwindcss.com/',
        'tailwind-css'
    ),
    ('Bulma', 'https://bulma.io/', 'bulma'),
    (
        'Lightning CSS',
        'https://lightningcss.dev/',
        'lightning-css'
    ),
    ('Stylex', 'https://stylexjs.com/', 'stylex'),
    (
        'Styled Components',
        'https://styled-components.com/',
        'styled-components'
    ),
    ('Stitches', 'https://stitches.dev/', 'stitches'),
    (
        'Java',
        'https://en.wikipedia.org/wiki/Java_(programming_language)',
        'java'
    ),
    ('PHP', 'https://php.net/', 'php'),
    ('Ruby', 'https://ruby-lang.org/en/', 'ruby'),
    ('Go', 'https://go.dev/', 'go'),
    ('Python', 'https://python.org/', 'python'),
    ('Laravel', 'https://laravel.com/', 'laravel'),
    (
        'Ruby on Rails',
        'https://rubyonrails.org/',
        'ruby-on-rails'
    ),
    ('Django', 'https://djangoproject.com/', 'django'),
    (
        'Flask',
        'https://flask.palletsprojects.com/en/3.0.x/',
        'flask'
    ),
    ('NestJS', 'https://nestjs.com/', 'nestjs'),
    (
        'FastAPI',
        'https://fastapi.tiangolo.com/',
        'fastapi'
    ),
    (
        'Phoenix Framework',
        'https://www.phoenixframework.org/',
        'phoenix-framework'
    ),
    ('Supabase', 'https://supabase.com/', 'supabase'),
    (
        'Firebase',
        'https://firebase.google.com/',
        'firebase'
    ),
    ('Convex', 'https://convex.dev/', 'convex'),
    (
        'App Backend',
        'https://appbackend.io/',
        'app-backend'
    ),
    ('Next.js', 'https://nextjs.org/', 'nextjs'),
    ('Astro', 'https://astro.build/', 'astro'),
    (
        'SvelteKit',
        'https://kit.svelte.dev/',
        'sveltekit'
    ),
    ('Nuxt', 'https://nuxt.com/', 'nuxt'),
    ('Remix', 'https://remix.run/', 'remix'),
    (
        'RedwoodJS',
        'https://redwoodjs.com/',
        'redwoodjs'
    ),
    ('Remult', 'https://remult.dev/', 'remult'),
    ('Wasp', 'https://wasp-lang.dev/', 'wasp'),
    ('AdonisJS', 'https://adonisjs.com/', 'adonisjs'),
    ('Primate', 'https://primatejs.com/', 'primate'),
    (
        'Drizzle ORM',
        'https://orm.drizzle.team/',
        'drizzle-orm'
    ),
    ('Prisma', 'https://prisma.io/', 'prisma'),
    ('TypeOrm', 'https://typeorm.io/', 'typeorm'),
    ('Valibot', 'https://valibot.dev/', 'valibot'),
    ('MikroORM', 'https://mikro-orm.io/', 'mikroorm'),
    (
        'WatermelonDB',
        'https://watermelondb.dev/docs',
        'watermelondb'
    ),
    ('Turso', 'https://turso.tech/', 'turso'),
    ('Neon', 'https://neon.tech/', 'neon'),
    (
        'PlanetScale',
        'https://planetscale.com/',
        'planetscale'
    ),
    ('Astro DB', 'https://astro.build/db/', 'astro-db'),
    ('Tinybird', 'https://tinybird.co/', 'tinybird'),
    (
        'SurrealDB',
        'https://surrealdb.com/',
        'surrealdb'
    ),
    ('Railway', 'https://railway.app/', 'railway'),
    ('MongoDB', 'https://mongodb.com/', 'mongodb'),
    ('Upstash', 'https://upstash.com/', 'upstash'),
    ('appwrite', 'https://appwrite.io/', 'appwrite'),
    ('Xata', 'https://xata.io/', 'xata'),
    ('Redux', 'https://redux.js.org/', 'redux'),
    ('Jotai', 'https://jotai.org/', 'jotai'),
    ('MobX', 'https://mobx.js.org/README.html', 'mobx'),
    ('Recoil', 'https://recoiljs.org/', 'recoil'),
    (
        'Cloudinary',
        'https://cloudinary.com/',
        'cloudinary'
    ),
    (
        'UploadThing',
        'https://uploadthing.com/',
        'uploadthing'
    ),
    (
        'Edge Store',
        'https://edgestore.dev/',
        'edge-store'
    ),
    (
        'WordPress',
        'https://wordpress.com/',
        'wordpress'
    ),
    ('Sanity', 'https://sanity.io/', 'sanity'),
    (
        'Contentful',
        'https://contentful.com/',
        'contentful'
    ),
    ('directus', 'https://directus.io/', 'directus'),
    ('Sitecore', 'https://sitecore.com/', 'sitecore'),
    (
        'Storyblok',
        'https://storyblok.com/',
        'storyblok'
    ),
    ('Prismic', 'https://prismic.io/', 'prismic'),
    ('Mux', 'https://mux.com/', 'mux'),
    ('Builder.io', 'https://builder.io/', 'builderio'),
    ('Notion', 'https://notion.so/', 'notion'),
    ('Agility', 'https://agilitycms.com/', 'agility'),
    (
        'ButterCMS',
        'https://buttercms.com/',
        'buttercms'
    ),
    ('Strapi', 'https://strapi.io/', 'strapi'),
    (
        'Keystatic',
        'https://keystatic.com/',
        'keystatic'
    ),
    ('Payload', 'https://payloadcms.com/', 'payload'),
    ('MODX', 'https://modx.com/', 'modx'),
    ('Stripe', 'https://stripe.com/', 'stripe'),
    ('Paddle', 'https://paddle.com/', 'paddle'),
    (
        'Lemon Squeezy',
        'https://lemonsqueezy.com/',
        'lemon-squeezy'
    ),
    ('SST', 'https://sst.dev/', 'sst'),
    ('Vercel', 'https://vercel.com/', 'vercel'),
    ('Heroku', 'https://heroku.com/', 'heroku'),
    ('Netlify', 'https://netlify.com/', 'netlify'),
    ('Koyeb', 'https://koyeb.com/', 'koyeb'),
    (
        'Cloudflare Pages',
        'https://pages.cloudflare.com/',
        'cloudflare-pages'
    ),
    ('Render', 'https://render.com/', 'render'),
    (
        'Playwright',
        'https://playwright.dev/',
        'playwright'
    ),
    ('Cypress', 'https://cypress.io/', 'cypress'),
    ('Vitest', 'https://vitest.dev/', 'vitest'),
    ('Jest', 'https://jestjs.io/', 'jest'),
    ('TestCafe', 'https://testcafe.io/', 'testcafe'),
    ('PostHog', 'https://posthog.com/', 'posthog'),
    ('Plausible', 'https://plausible.io/', 'plausible'),
    (
        'Google Analytics',
        'https://analytics.withgoogle.com/',
        'google-analytics'
    ),
    (
        'Beam Analytics',
        'https://beamanalytics.io/',
        'beam-analytics'
    ),
    (
        'Docusaurus',
        'https://docusaurus.io',
        'docusaurus'
    ),
    ('docsify', 'https://docsify.js.org/', 'docsify'),
    ('Sphinx', 'https://sphinx-doc.org/', 'sphinx'),
    (
        'starlight',
        'https://starlight.astro.build/',
        'starlight'
    ),
    ('Mintlify', 'https://mintlify.com/', 'mintlify'),
    (
        'VuePress',
        'https://vuepress.vuejs.org/',
        'vuepress'
    ),
    ('GitBook', 'https://gitbook.com/', 'gitbook'),
    ('Canny', 'https://canny.io/', 'canny'),
    (
        'Testimonial',
        'https://testimonial.to/',
        'testimonial'
    ),
    ('Senja', 'https://senja.io/', 'senja'),
    ('Shoutout', 'https://shoutout.io/', 'shoutout');

-- Seed data for profiles
INSERT INTO
    "profiles" (
        "id",
        "display_name",
        "skills",
        "bio",
        "twitter_username",
        "github_username",
        "website_url",
        "linkedin_url",
        "location",
        "timezone",
        "availibility",
        "pfp_url"
    )
VALUES
    (
        'c1e426ee-3b77-4a20-bff3-9079d0c362f2',
        'John Doe',
        'JavaScript, React, Node.js',
        'Passionate developer with expertise in building web applications.',
        'johndoe',
        'johndoe',
        'https://johndoe.com',
        'https://linkedin.com/in/johndoe',
        'New York',
        'UTC-05:00',
        'Full Time',
        'https://avatars.githubusercontent.com/u/420'
    ),
    (
        'a2e716ed-7d3d-4f1b-b6d7-7a9d8c2f5031',
        'Jane Smith',
        'Python, Django, Flask',
        'Experienced backend developer specializing in Python web frameworks.',
        'janesmith',
        'janesmith',
        'https://janesmith.com',
        'https://linkedin.com/in/janesmith',
        'San Francisco',
        'UTC-08:00',
        'Part Time',
        'https://avatars.githubusercontent.com/u/69'
    );

-- Seed data for projects
INSERT INTO
    "projects" (
        "id",
        "profile_id",
        "project_name",
        "project_url",
        "repository_url",
        "description"
    )
VALUES
    (
        '335cf024-9347-4b94-86bb-63a787a4e109',
        'c1e426ee-3b77-4a20-bff3-9079d0c362f2',
        'React App',
        'https://example.com/react-app',
        'https://github.com/johndoe/react-app',
        'A simple React application for demonstration.'
    ),
    (
        '9a99e786-c1bb-45a9-a43d-014ef2185a68',
        'a2e716ed-7d3d-4f1b-b6d7-7a9d8c2f5031',
        'Django Project',
        'https://example.com/django-project',
        'https://github.com/janesmith/django-project',
        'A Django web application showcasing various features.'
    );

-- Seed data for stacks
INSERT INTO
    "stacks" ("id", "name", "url", "slug")
VALUES
    (
        '39903377-ff4d-4f94-a0bb-2a9a9e78a336',
        'React',
        'https://react.dev/',
        'react'
    ),
    (
        'd12d629e-f52e-4b1b-9a88-1d77c13b59e2',
        'Django',
        'https://djangoproject.com/',
        'django'
    );

-- Seed data for projects_stacks (associating projects with stacks)
INSERT INTO
    "projects_stacks" ("id", "project_id", "stack_id")
VALUES
    (
        'a9c1e6a3-1213-45ef-964e-2532418f8be0',
        '335cf024-9347-4b94-86bb-63a787a4e109',
        '39903377-ff4d-4f94-a0bb-2a9a9e78a336'
    ),
    (
        'bb6a83fc-3f12-4b90-9f11-9ab163c13d61',
        '9a99e786-c1bb-45a9-a43d-014ef2185a68',
        'd12d629e-f52e-4b1b-9a88-1d77c13b59e2'
    );

INSERT INTO
    "endorsements" ("endorsement_to", "endorsed_by")
VALUES
    (
        'c1e426ee-3b77-4a20-bff3-9079d0c362f2',
        'a2e716ed-7d3d-4f1b-b6d7-7a9d8c2f5031'
    );