module.exports = {
  CloudSidebar: [
    {
      type: "category",
      label: "About",
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "doc",
          id: "about-whats-risingwave-cloud",
        },
        {
          type: "doc",
          id: "about-whats-new",
        },
        {
          type: "doc",
          id: "about-faq",
        },
      ],
    },
    {
      type: "category",
      label: "Get started",
      link: { type: "doc", id: "quickstart" },
      collapsible: false,
      collapsed: false,
      items: [
        {
          type: "category",
          label: "Quickstart",
          link: { type: "doc", id: "quickstart" },
          collapsible: true,
          collapsed: true,
          items: [
            {
              type: "doc",
              id: "quickstart",
              label: "Get started in 5 steps",
            },
            {
              type: "link",
              label: "1. Sign up and log in",
              href: "/cloud/quickstart/?step=1",
            },
            {
              type: "link",
              label: "2. Create a tenant",
              href: "/cloud/quickstart/?step=2",
            },
            {
              type: "link",
              label: "3. Connect to a tenant",
              href: "/cloud/quickstart/?step=3",
            },
            {
              type: "link",
              label: "4. Explore RisingWave with examples",
              href: "/cloud/quickstart/?step=4",
            },
            {
              type: "link",
              label: "5. Ingest, process, and deliver data",
              href: "/cloud/quickstart/?step=5",
            },
          ],
        },
      ],
    },
    {
      type: "category",
      label: "Tenant & database",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "tenant-overview" },
      items: [
        {
          type: "doc",
          id: "tenant-overview",
          label: "Overview",
        },
        {
          type: "category",
          label: "Manage tenants",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "tenant-manage-tenants" },
          items: [
            {
              type: "doc",
              id: "tenant-manage-tenants",
              label: "Overview",
            },
            {
              type: "doc",
              id: "tenant-choose-a-tenant-plan",
            },
            {
              type: "doc",
              id: "tenant-connect-to-a-tenant",
            },
            {
              type: "doc",
              id: "tenant-check-running-status",
              label: "Check running status",
            },
            {
              type: "doc",
              id: "tenant-stop-and-delete-tenants",
            },
            {
              type: "doc",
              id: "tenant-advanced-settings",
              label: "Advanced settings",
            },
          ],
        },
        {
          type: "category",
          label: "Manage database users",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "tenant-manage-database-users" },
          items: [
            {
              type: "doc",
              id: "tenant-manage-database-users",
              label: "Overview",
            },
            {
              type: "doc",
              id: "tenant-create-a-database-user",
              label: "Create a user",
            },
            {
              type: "doc",
              id: "tenant-change-database-user-password",
              label: "Change user password",
            },
            {
              type: "doc",
              id: "tenant-delete-a-database-user",
              label: "Delete a user",
            },
          ],
        },
        {
          type: "doc",
          id: "tenant-monitor-materialized-views",
        },
      ],
    },
    {
      type: "category",
      label: "Console",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "console-overview" },
      items: [
        {
          type: "doc",
          id: "console-overview",
          label: "Overview",
        },
      ],
    },
    {
      type: "category",
      label: "Account",
      collapsible: false,
      collapsed: false,
      link: { type: "doc", id: "develop-overview" },
      items: [
        {
          type: "doc",
          id: "account-overview",
          label: "Overview",
        },
        {
          type: "category",
          label: "Manage your account",
          collapsible: true,
          collapsed: true,
          link: { type: "doc", id: "account-manage-your-account" },
          items: [
            {
              type: "doc",
              id: "account-manage-your-account",
              label: "Overview",
            },
            {
              type: "link",
              label: "Update your profile",
              href: "/cloud/account-manage-your-account/?task=1",
            },
            {
              type: "link",
              label: "Change account password",
              href: "/cloud/account-manage-your-account/?task=2",
            },
            {
              type: "link",
              label: "Delete your account",
              href: "/cloud/account-manage-your-account/?task=3",
            },
            {
              type: "link",
              label: "Switch accounts",
              href: "/cloud/account-manage-your-account/?task=4",
            },
          ],
        },
        {
          type: "doc",
          id: "account-messages-and-alerts",
        },
        {
          type: "doc",
          id: "account-forgot-password",
        },
      ],
    },
  ],
};
