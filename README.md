This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Debian Setup on proxmox
Setup for local dashboard since i don't want to host
setup debian lxc to host locally nav to:
https://tteck.github.io/Proxmox/
Operating System > Debian LXC
Enter command in proxmox host, i had to do v11 debian since i'm on v7 of pve

Install Node.js on Debian:

Next.js requires Node.js. Install it using a package manager like apt:
bash
Copy code
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/yourusername/your-repository.git
cd your-repository

Create the .github/workflows Directory:

In your project's root directory (where your package.json is), execute the following commands:
bash
Copy code
mkdir -p .github/workflows
Add Your Workflow File:

Inside the .github/workflows directory, create a YAML file for your workflow. For example, node.js.yml.
You can use nano, vim, or any text editor to create and edit this file. For example:
bash
Copy code
nano .github/workflows/node.js.yml
Add your workflow configuration to this file.
Commit and Push:

After setting up your workflow, commit these changes and push them to your GitHub repository:
bash
Copy code
git add .github/workflows/node.js.yml
git commit -m "Add GitHub Actions workflow"
git push

go to repo settings > actions, runners, follow setup to add a runner
be sure to make a new user on debian called github-runner and set a pw for them:
as root: passwd github-runner

then as root:
npm install pm2 -g
pm2 start npm --name "nextjs-app" -- start
Access the application:

Now, you should be able to access the Next.js app from other devices on your network by navigating to http://192.168.4.214:3000.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
