import { defineStore } from "pinia";

type UserRole = 1 | 2 | 3;

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      role: 3 as UserRole, // 1,2,3
    },
  }),
  actions: {
    setRole(props: UserRole) {
      this.user.role = props;
    },
    disableFunction(props?: string) {
      console.log("props", props);
      const role = this.user.role;
      if (role === 3) {
        if (props?.toLowerCase() === "logout") return false;
        return true;
      }
      return false;
    },
  },
});
