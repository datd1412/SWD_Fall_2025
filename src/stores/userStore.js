import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set) => ({
      user: localStorage.getItem('token') || null,
      token: null,

      // Đăng nhập: lưu thông tin user + token
      login: (userData, token) => set({ user: userData, token }),

      // Đăng xuất: xoá user + token
      logout: () => set({ user: null, token: null }),

      // Cập nhật thông tin user
      updateUser: (newData) =>
        set((state) => ({ user: { ...state.user, ...newData } })),
    }),
    {
      name: "user-storage", // tên key trong localStorage
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);