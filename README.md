# Personal portfolio

## Install & run

Make sure you have nodejs `18.0.0` or higher and npm `8.6.0` or higher installed. Install dependencies with:

```bash
npm install
```

Once it's done start up a local server with:

```bash
npm run dev
```

To view the components storybook:

```bash
npm run storybook
```

To create a production build:

```bash
npm run build
```

## Deployment

I've set up the site using AWS for hosting and serverless functions. You'll need an AWS account and the AWS CLI installed in order to deploy.

Deploy the site to s3:

```bash
npm run deploy
```

Deploy serverless functions:

```bash
cd functions
```

```bash
npm run deploy:api
```

## Permissions

Inspired by https://github.com/HamishMW/portfolio
