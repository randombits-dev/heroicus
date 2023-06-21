// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'hērōicus docs',
  tagline: '',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.heroicus.xyz',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'nienow', // Usually your GitHub org/user name.
  projectName: 'heroicus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'hērōicus',
      logo: {
        alt: 'My Site Logo',
        src: 'img/heroicus.png',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {
          href: 'https://heroicus.xyz',
          label: 'Homepage',
          position: 'left',
        },
        {
          href: 'https://github.com/nienow/heroicus',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://discord.gg/MjU37A2J2H',
          label: 'Discord',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: 'Random Bits',
          href: 'https://randombits.dev',
        },
        {
          label: 'Discord',
          href: 'https://discord.gg/MjU37A2J2H',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/RandomBitsDev',
        },
        {
          label: 'GitHub',
          href: 'https://github.com/nienow/heroicus',
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Random Bits`,
    },
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
      respectPrefersColorScheme: false,
    }
  },
};

module.exports = config;
