export type ContextProps = {
  user: ExistingUserProps;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<ExistingUserProps>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export type NewUserProps = {
  name: string;
  email: string;
  password: string;
};

export type ExistingUserProps = {
  id: string;
  name: string;
  email: string;
  imageUrl: string;
};

// export type NavLinkProps = {
//   imgURL: string;
//   route: string;
//   label: string;
// };

export type NewPostProps = {
  userId: string;
  name: string;
  description: string;
  file: File[];
  location: string;
  date: string;
};

export type UpdatePostProps = {
  postId: string;
  name: string;
  description: string;
  imageId: string;
  imageUrl: URL;
  file: File[];
  location: string;
  date: Date;
};
