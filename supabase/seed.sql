-- Add supabase_products seed data
INSERT INTO
    products ("name", "sort")
VALUES
    ('Database', 0),
    ('Auth', 1),
    ('Storage', 2),
    ('Edge', 3),
    ('Realtime', 4),
    ('Vector', 5);

-- Add availability_types seed data
INSERT INTO
    availabilities ("name", "sort")
VALUES
    ('Full Time', 0),
    ('Part Time', 1),
    ('Contract', 2),
    ('MVP', 3),
    ('Consulting', 4),
    ('Task', 5);

INSERT INTO
    roles ("name", "sort")
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

-- from https://gist.github.com/khattaksd/4e8f4c89f4e928a2ecaad56d4a17ecd1
-- create test users
INSERT INTO
    auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        recovery_sent_at,
        last_sign_in_at,
        raw_app_meta_data,
        raw_user_meta_data,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    ) (
        select
            '00000000-0000-0000-0000-000000000000',
            uuid_generate_v4 (),
            'authenticated',
            'authenticated',
            'user' || (ROW_NUMBER() OVER ()) || '@example.com',
            crypt ('password123', gen_salt ('bf')),
            current_timestamp,
            current_timestamp,
            current_timestamp,
            '{"provider":"email","providers":["email"]}',
            '{}',
            current_timestamp,
            current_timestamp,
            '',
            '',
            '',
            ''
        FROM
            generate_series(1, 10)
    );

-- test user email identities
INSERT INTO
    auth.identities (
        id,
        user_id,
        provider_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    ) (
        select
            uuid_generate_v4 (),
            id,
            id,
            format('{"sub":"%s","email":"%s"}', id::text, email)::jsonb,
            'email',
            current_timestamp,
            current_timestamp,
            current_timestamp
        from
            auth.users
    );

-- -- Seed data for profiles
WITH user_data AS (
    SELECT
        id,
        'John Doe' AS display_name,
        'johndoe' AS username,
        email,
        'JavaScript, React, Node.js' AS skills,
        'Passionate developer with expertise in building web applications.' AS bio,
        'johndoe' AS twitter_username,
        'johndoe' AS github_username,
        'https://johndoe.com' AS website_url,
        'https://linkedin.com/in/johndoe' AS linkedin_url,
        'New York' AS location,
        'UTC-05:00' AS timezone,
        'https://avatars.githubusercontent.com/u/420' AS pfp_url
    FROM
        auth.users
    WHERE
        email = 'user1@example.com'

    UNION ALL

    SELECT
        id,
        'Jane Smith' AS display_name,
        'janesmith' AS username,
        email,
        'Python, Django, Flask' AS skills,
        'Experienced backend developer specializing in Python web frameworks.' AS bio,
        'janesmith' AS twitter_username,
        'janesmith' AS github_username,
        'https://janesmith.com' AS website_url,
        'https://linkedin.com/in/janesmith' AS linkedin_url,
        'San Francisco' AS location,
        'UTC-08:00' AS timezone,
        'https://avatars.githubusercontent.com/u/69' AS pfp_url
    FROM
        auth.users
    WHERE
        email = 'user2@example.com'
)
UPDATE profiles AS p
SET
    display_name = u.display_name,
    username = u.username,
    email = u.email,
    skills = u.skills,
    bio = u.bio,
    twitter_username = u.twitter_username,
    github_username = u.github_username,
    website_url = u.website_url,
    linkedin_url = u.linkedin_url,
    location = u.location,
    timezone = u.timezone,
    pfp_url = u.pfp_url
FROM user_data AS u
WHERE p.id = u.id;



-- Seed data for projects
INSERT INTO
    projects (
        profile_id,
        project_name,
        project_url,
        repository_url,
        description
    )
VALUES
    (
        (SELECT id FROM profiles WHERE username = 'johndoe'),
        'React App',
        'https://example.com/react-app',
        'https://github.com/johndoe/react-app',
        'A simple React application for demonstration.'
    ),
    (
        (SELECT id FROM profiles WHERE username = 'janesmith'),
        'Django Project',
        'https://example.com/django-project',
        'https://github.com/janesmith/django-project',
        'A Django web application showcasing various features.'
    );

-- Seed data for projects_stacks (associating projects with stacks)
INSERT INTO
    projects_stacks (project_id, stack_id)
VALUES
    (
        (SELECT id FROM projects WHERE project_name = 'React App'),
        (SELECT id FROM stacks WHERE name = 'React')
    ),
    (
        (SELECT id FROM projects WHERE project_name = 'Django Project'),
        (SELECT id FROM stacks WHERE name = 'Django') 
    );

INSERT INTO
    endorsements (endorsement_to, endorsed_by)
VALUES
    (
        (SELECT id FROM profiles WHERE username = 'johndoe'),
        (SELECT id FROM profiles WHERE username = 'janesmith')
    );

INSERT INTO
    profiles_availabilities (profile_id, availability_id)
VALUES
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 1),
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 2),
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 3),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 1),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 4),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 6),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 5);

INSERT INTO
    profiles_roles (profile_id, role_id)
VALUES
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 1),
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 2),
    ((SELECT id FROM profiles WHERE username = 'johndoe'), 4),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 2),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 3),
    ((SELECT id FROM profiles WHERE username = 'janesmith'), 5);

INSERT INTO
    projects_products (project_id, product_id)
VALUES
    ((SELECT id FROM projects WHERE project_name = 'React App'), 1),
    ((SELECT id FROM projects WHERE project_name = 'React App'), 2),
    ((SELECT id FROM projects WHERE project_name = 'React App'), 3),
    ((SELECT id FROM projects WHERE project_name = 'React App'), 5),
    ((SELECT id FROM projects WHERE project_name = 'Django Project'), 4),
    ((SELECT id FROM projects WHERE project_name = 'Django Project'), 5),
    ((SELECT id FROM projects WHERE project_name = 'Django Project'), 6);

INSERT INTO
    languages (name)
VALUES
    ('JavaScript'),
    ('Python'),
    ('Java'),
    ('C#'),
    ('C++'),
    ('TypeScript'),
    ('Ruby'),
    ('Swift'),
    ('Go'),
    ('PHP'),
    ('HTML'),
    ('CSS'),
    ('SQL'),
    ('Kotlin'),
    ('Rust'),
    ('Perl'),
    ('Objective-C'),
    ('Scala'),
    ('Shell'),
    ('Lua'),
    ('Dart'),
    ('Assembly'),
    ('R'),
    ('Groovy'),
    ('Haskell'),
    ('Matlab'),
    ('Scheme'),
    ('VBA'),
    ('Clojure'),
    ('F#'),
    ('Ada'),
    ('COBOL'),
    ('Fortran'),
    ('Delphi'),
    ('Erlang'),
    ('Lisp'),
    ('Prolog'),
    ('ABAP'),
    ('Apex'),
    ('PowerShell'),
    ('PL/SQL'),
    ('T-SQL'),
    ('VBScript'),
    ('Transact-SQL'),
    ('XQuery'),
    ('XSLT'),
    ('Racket'),
    ('Bash');

INSERT INTO
    projects_languages (project_id, language_id)
VALUES
    ((SELECT id FROM projects WHERE project_name = 'React App'), 1),
    ((SELECT id FROM projects WHERE project_name = 'Django Project'), 3),
    ((SELECT id FROM projects WHERE project_name = 'Django Project'), 25);