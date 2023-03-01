export type repository = {
  name: string;
  description: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  isPrivate: boolean;
};

export type repositories = {
  repositories: repository[];
};

export type node = {
  node: repository;
};

export type filteredRepo = { filteredRepo: node[] };

export type RepoData = {
  RepoDetails: detailedRepo;
};
export type detailedrepoProps = {
  props: detailedRepo;
};

export type repoProps = {
  repo: repository;
};

export type detailedRepo = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  pushedAt: string;
  isPrivate: boolean;
  url: string;
  primaryLanguage: {
    name: string;
  } | null;
  stargazers: {
    totalCount: number;
  };
  watchers: {
    totalCount: number;
  };
  forks: {
    totalCount: number;
  };
  licenseInfo: {
    name: string;
    nickname: string | null;
  } | null;
  owner: {
    login: string;
  };
};
