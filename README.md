This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

It is a dynamic questionnaire built with Typescript, Next.js and Redux-toolkit.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Second, create `.env.local` (you can copy the example) with: 
- `NODE_ENV` - either production or development environment
- `DATA_STORAGE_PATH` - path to the questions config from the project root

Then, to start the development server:

```bash
npm run dev
```

To create and run the production build:

```bash
npm run build && npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Edit questionnaire

Documentation on questionnaire configuration can be found in the [Questions config](./QUESTIONS_CONFIG.md).
