// userService.ts

export const getUserService = async (): Promise<{ id: number; name: string }> => {
    // Business logic for fetching user data
    const user = { id: 1, name: 'John Doe' };
    return user;
  };
