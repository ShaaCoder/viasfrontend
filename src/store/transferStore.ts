import { create } from 'zustand';
import { nanoid } from 'nanoid';
import type { TransferStore, FileTransfer } from '../types';

export const useTransferStore = create<TransferStore>((set) => ({
  transfers: [],
  addTransfer: (transfer) => {
    set((state) => ({
      transfers: [
        ...state.transfers,
        {
          ...transfer,
          id: nanoid(),
          createdAt: new Date(),
        },
      ],
    }));
  },
  updateTransfer: (id, updates) => {
    set((state) => ({
      transfers: state.transfers.map((transfer) =>
        transfer.id === id ? { ...transfer, ...updates } : transfer
      ),
    }));
  },
  removeTransfer: (id) => {
    set((state) => ({
      transfers: state.transfers.filter((transfer) => transfer.id !== id),
    }));
  },
}));