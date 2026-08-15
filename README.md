# Muhammad Naveed Ishaque — Business Solutions Website

A production-ready static website positioning Muhammad Naveed Ishaque around practical business outcomes across data, cloud, analytics, automation, and applied AI. The site also connects his personal identity naturally with the wider DeTLeng ecosystem.

The implementation uses semantic HTML5, modern CSS, and a small amount of vanilla JavaScript. It has no backend, framework, package installation, or build step.

## File structure

```text
.
├── index.html   # Content, structure, SEO, and social metadata
├── style.css    # Responsive visual system and motion preferences
├── script.js    # Navigation, scroll state, reveal behavior, and menu controls
├── CNAME        # GitHub Pages custom domain
└── README.md    # Project and deployment notes
```

## Local preview

The site can be opened directly by double-clicking `index.html`. For the most representative preview, run a simple local server from the project directory:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deploy with GitHub Pages

1. Create a GitHub repository and add all five files at its root.
2. Commit and push the files to the repository's default branch.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the default branch, choose the root (`/`) folder, and save.
6. GitHub Pages will publish the static website without a build workflow.

All asset references are relative, so the project works both at a custom domain and under a standard GitHub Pages repository URL.

## Custom domain: naveed.detleng.com

The included `CNAME` file contains:

```text
naveed.detleng.com
```

In the DNS settings for `detleng.com`, create a CNAME record:

- Host/name: `naveed`
- Target/value: `<your-github-username>.github.io`

Replace the placeholder target with the GitHub Pages hostname for the account or organization that owns the repository. Do not point the CNAME record to a repository path. DNS changes may take time to propagate.

After DNS is configured:

1. Return to **Settings → Pages** in GitHub.
2. Confirm `naveed.detleng.com` as the custom domain.
3. Enable **Enforce HTTPS** once GitHub makes the option available.

Keep the `CNAME` file in the published branch; removing it can disconnect the custom domain on a later deployment.

## Maintenance

- Edit content in `index.html`.
- Update colors, spacing, or responsive behavior in `style.css`.
- Update interaction behavior in `script.js`.
- Test keyboard navigation, the mobile menu, internal section links, external DeTLeng links, and the pre-filled email CTA before each deployment.

© 2026 Muhammad Naveed Ishaque. All rights reserved.
