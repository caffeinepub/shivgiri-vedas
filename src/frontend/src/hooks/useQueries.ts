import type { Principal } from "@icp-sdk/core/principal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(
        data.name,
        data.email,
        data.phone,
        data.message,
      );
    },
  });
}

export function useSubscribeNewsletter() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Not connected");
      return actor.subscribeToNewsletter(email);
    },
  });
}

export function usePlaceOrder() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: {
      customerName: string;
      customerPhone: string;
      customerEmail: string;
      customerAddress: string;
      productName: string;
      productSize: string;
      productPrice: number;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.placeOrder(
        data.customerName,
        data.customerPhone,
        data.customerEmail,
        data.customerAddress,
        data.productName,
        data.productSize,
        data.productPrice,
        data.quantity,
      );
    },
  });
}

export function useGetAllOrders() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOrders();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllContactSubmissions() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["contactSubmissions"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllContactSubmissions();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllNewsletterSubscribers() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["newsletterSubscribers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllNewsletterSubscribers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (data: { orderId: string; newStatus: string }) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateOrderStatus(data.orderId, data.newStatus);
    },
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAssignAdminRole() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (_principal?: Principal) => {
      if (!actor) throw new Error("Not connected");
      // Use the special first-admin assignment function that doesn't require prior admin role
      const success = await actor.assignFirstAdmin();
      if (!success) {
        throw new Error("Admin already assigned or invalid caller");
      }
      return success;
    },
  });
}
