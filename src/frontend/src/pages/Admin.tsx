import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQueryClient } from "@tanstack/react-query";
import {
  Leaf,
  Loader2,
  LogOut,
  Mail,
  Package,
  RefreshCw,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAssignAdminRole,
  useGetAllContactSubmissions,
  useGetAllNewsletterSubscribers,
  useGetAllOrders,
  useIsAdmin,
  useUpdateOrderStatus,
} from "../hooks/useQueries";

function formatDate(ts: bigint) {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    confirmed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    delivered: "bg-green-500/20 text-green-400 border-green-500/30",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
        colors[status] ?? "bg-white/10 text-white/70 border-white/10"
      }`}
    >
      {status}
    </span>
  );
}

function StatsCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  accent?: string;
}) {
  return (
    <div
      className="brand-card p-5 flex items-center gap-4"
      data-ocid="admin.card"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: accent ?? "rgba(46,125,50,0.2)" }}
      >
        {icon}
      </div>
      <div>
        <p className="text-[#8B95AD] text-xs mb-0.5">{label}</p>
        <p className="text-white text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function OrdersTab() {
  const { data: orders = [], isLoading, refetch } = useGetAllOrders();
  const updateStatus = useUpdateOrderStatus();
  const queryClient = useQueryClient();

  const sorted = [...orders].sort((a, b) => Number(b.timestamp - a.timestamp));

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await updateStatus.mutateAsync({ orderId, newStatus });
    queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  if (isLoading) {
    return (
      <div
        className="text-center py-16 text-[#8B95AD]"
        data-ocid="admin.loading_state"
      >
        Loading orders...
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div
        className="brand-card p-12 text-center"
        data-ocid="admin.orders.empty_state"
      >
        <Package className="w-12 h-12 text-[#8B95AD] mx-auto mb-3" />
        <p className="text-[#8B95AD]">No orders yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#B7C0D6] text-sm">{sorted.length} total orders</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-[#8B95AD] hover:text-white transition-colors"
          data-ocid="admin.secondary_button"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
      <div className="overflow-x-auto" data-ocid="admin.orders.table">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              {[
                "#",
                "Customer",
                "Phone",
                "Product",
                "Size",
                "Qty",
                "Price",
                "Address",
                "Status",
                "Date",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-3 px-3 text-[#8B95AD] text-xs font-medium whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((order, i) => (
              <tr
                key={order.id}
                className="border-b border-white/5 hover:bg-white/2 transition-colors"
                data-ocid={`admin.orders.row.${i + 1}`}
              >
                <td className="py-3 px-3 text-[#8B95AD] text-xs">{i + 1}</td>
                <td className="py-3 px-3 text-white font-medium whitespace-nowrap">
                  {order.customerName}
                </td>
                <td className="py-3 px-3 text-[#B7C0D6] whitespace-nowrap">
                  {order.customerPhone}
                </td>
                <td className="py-3 px-3 text-[#B7C0D6] whitespace-nowrap">
                  {order.productName}
                </td>
                <td className="py-3 px-3 text-[#B7C0D6]">
                  {order.productSize}
                </td>
                <td className="py-3 px-3 text-[#B7C0D6]">
                  {order.quantity.toString()}
                </td>
                <td className="py-3 px-3 text-green-400 font-semibold whitespace-nowrap">
                  ₹{order.productPrice}
                </td>
                <td className="py-3 px-3 text-[#B7C0D6] max-w-[160px]">
                  <span className="block truncate text-xs">
                    {order.customerAddress}
                  </span>
                </td>
                <td className="py-3 px-3">
                  <div className="flex flex-col gap-1.5">
                    <StatusBadge status={order.status} />
                    <Select
                      value={order.status}
                      onValueChange={(val) => handleStatusChange(order.id, val)}
                    >
                      <SelectTrigger
                        className="h-6 text-xs w-[110px] bg-white/5 border-white/10 text-[#B7C0D6]"
                        data-ocid={`admin.orders.select.${i + 1}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          background: "#0F172A",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }}
                      >
                        <SelectItem value="pending" className="text-yellow-400">
                          pending
                        </SelectItem>
                        <SelectItem value="confirmed" className="text-blue-400">
                          confirmed
                        </SelectItem>
                        <SelectItem
                          value="delivered"
                          className="text-green-400"
                        >
                          delivered
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </td>
                <td className="py-3 px-3 text-[#8B95AD] text-xs whitespace-nowrap">
                  {formatDate(order.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MessagesTab() {
  const { data: messages = [], isLoading } = useGetAllContactSubmissions();

  const sorted = [...messages].sort((a, b) =>
    Number(b.timestamp - a.timestamp),
  );

  if (isLoading) {
    return (
      <div
        className="text-center py-16 text-[#8B95AD]"
        data-ocid="admin.loading_state"
      >
        Loading messages...
      </div>
    );
  }

  if (sorted.length === 0) {
    return (
      <div
        className="brand-card p-12 text-center"
        data-ocid="admin.messages.empty_state"
      >
        <Mail className="w-12 h-12 text-[#8B95AD] mx-auto mb-3" />
        <p className="text-[#8B95AD]">No messages yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3" data-ocid="admin.messages.list">
      {sorted.map((msg, i) => (
        <div
          key={`${msg.email}-${msg.timestamp}`}
          className="brand-card p-5"
          data-ocid={`admin.messages.item.${i + 1}`}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <p className="text-white font-semibold">{msg.name}</p>
              <p className="text-green-400 text-sm">{msg.email}</p>
              {msg.phone && (
                <p className="text-[#8B95AD] text-xs">{msg.phone}</p>
              )}
            </div>
            <span className="text-[#8B95AD] text-xs">
              {formatDate(msg.timestamp)}
            </span>
          </div>
          <p className="text-[#B7C0D6] text-sm leading-relaxed border-t border-white/5 pt-3">
            {msg.message}
          </p>
        </div>
      ))}
    </div>
  );
}

function SubscribersTab() {
  const { data: subscribers = [], isLoading } =
    useGetAllNewsletterSubscribers();

  if (isLoading) {
    return (
      <div
        className="text-center py-16 text-[#8B95AD]"
        data-ocid="admin.loading_state"
      >
        Loading subscribers...
      </div>
    );
  }

  if (subscribers.length === 0) {
    return (
      <div
        className="brand-card p-12 text-center"
        data-ocid="admin.subscribers.empty_state"
      >
        <Users className="w-12 h-12 text-[#8B95AD] mx-auto mb-3" />
        <p className="text-[#8B95AD]">No subscribers yet</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[#B7C0D6] text-sm mb-4">
        {subscribers.length} subscribers
      </p>
      <div className="brand-card" data-ocid="admin.subscribers.list">
        {subscribers.map((email, i) => (
          <div
            key={email}
            className="flex items-center gap-3 px-5 py-3 border-b border-white/5 last:border-0"
            data-ocid={`admin.subscribers.item.${i + 1}`}
          >
            <span className="text-[#8B95AD] text-xs w-6">{i + 1}</span>
            <Mail className="w-3.5 h-3.5 text-green-400 shrink-0" />
            <span className="text-[#B7C0D6] text-sm">{email}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const { identity, login, clear, isInitializing, isLoggingIn } =
    useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: isAdmin, isLoading: adminLoading } = useIsAdmin();
  const { data: orders = [] } = useGetAllOrders();
  const { data: messages = [] } = useGetAllContactSubmissions();
  const { data: subscribers = [] } = useGetAllNewsletterSubscribers();
  const assignAdminRole = useAssignAdminRole();
  const queryClient = useQueryClient();

  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  const handleAssignAdmin = async () => {
    if (!identity) return;
    try {
      await assignAdminRole.mutateAsync(identity.getPrincipal());
      queryClient.invalidateQueries({ queryKey: ["isAdmin"] });
    } catch (_err) {
      // error shown via assignAdminRole.error
    }
  };

  // Always show login page when not authenticated — never get stuck on a blank spinner
  if (!isAuthenticated) {
    const isButtonBusy = isInitializing || isLoggingIn;
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0F172A" }}
      >
        <div
          className="brand-card p-10 max-w-sm w-full text-center"
          data-ocid="admin.panel"
        >
          {/* Logo */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-900/40">
            <Leaf className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-white text-3xl font-bold mb-2 tracking-tight">
            Admin Login
          </h1>
          <p className="text-[#66BB6A] text-sm font-medium mb-1">
            Shivgiri Vedas
          </p>
          <p className="text-[#8B95AD] text-sm mb-8">
            Authorized access only. Please login to continue.
          </p>

          <Button
            onClick={login}
            disabled={isButtonBusy}
            className="w-full py-6 text-base font-semibold rounded-xl bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white shadow-lg shadow-green-900/40 transition-all duration-200 disabled:opacity-70"
            data-ocid="admin.primary_button"
          >
            {isButtonBusy ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {isInitializing ? "Loading..." : "Logging in..."}
              </>
            ) : (
              <>
                <Leaf className="w-5 h-5 mr-2" />
                Login with Internet Identity
              </>
            )}
          </Button>

          {isInitializing && (
            <p className="text-[#8B95AD] text-xs mt-4">
              Checking your session, please wait...
            </p>
          )}
        </div>
      </div>
    );
  }

  if (adminLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0F172A" }}
        data-ocid="admin.loading_state"
      >
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-green-400 border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-[#B7C0D6]">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ background: "#0F172A" }}
      >
        <div
          className="brand-card p-10 max-w-sm w-full text-center"
          data-ocid="admin.error_state"
        >
          <div className="text-5xl mb-4">🚫</div>
          <h2 className="text-white text-xl font-bold mb-2">Access Denied</h2>
          <p className="text-[#8B95AD] text-sm mb-2">
            You are not authorized as admin.
          </p>
          <p className="text-[#8B95AD] text-xs mb-6">
            If you are the website owner, click below to assign yourself the
            admin role.
          </p>

          {/* Assign Admin Role button */}
          <Button
            onClick={handleAssignAdmin}
            disabled={assignAdminRole.isPending}
            className="w-full py-5 text-sm font-semibold rounded-xl bg-gradient-to-r from-green-700 to-green-500 hover:from-green-600 hover:to-green-400 text-white shadow-lg shadow-green-900/40 transition-all duration-200 disabled:opacity-70 mb-3"
            data-ocid="admin.primary_button"
          >
            {assignAdminRole.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Assigning...
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 mr-2" />
                Assign Admin Role
              </>
            )}
          </Button>

          {assignAdminRole.isError && (
            <p
              className="text-red-400 text-xs mb-3"
              data-ocid="admin.error_state"
            >
              Failed to assign admin role. Please try again.
            </p>
          )}

          <Button
            onClick={clear}
            variant="outline"
            className="border-white/10 text-[#B7C0D6] hover:bg-white/5 w-full"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4 mr-2" /> Logout
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ background: "#0B1220" }}>
      {/* Header */}
      <header
        className="sticky top-16 z-30 border-b border-white/5"
        style={{
          background: "rgba(11,18,32,0.95)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-none">
                Shivgiri Vedas Admin
              </h1>
              <p className="text-[#8B95AD] text-xs">
                {identity?.getPrincipal().toString().slice(0, 20)}...
              </p>
            </div>
          </div>
          <Button
            onClick={clear}
            variant="outline"
            size="sm"
            className="border-white/10 text-[#B7C0D6] hover:bg-white/5 hover:text-white"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-4 h-4 mr-1.5" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            label="Total Orders"
            value={orders.length}
            icon={<Package className="w-6 h-6 text-green-400" />}
          />
          <StatsCard
            label="Pending Orders"
            value={pendingOrders}
            icon={<Package className="w-6 h-6 text-yellow-400" />}
            accent="rgba(234,179,8,0.15)"
          />
          <StatsCard
            label="Total Messages"
            value={messages.length}
            icon={<Mail className="w-6 h-6 text-blue-400" />}
            accent="rgba(59,130,246,0.15)"
          />
          <StatsCard
            label="Subscribers"
            value={subscribers.length}
            icon={<Users className="w-6 h-6 text-purple-400" />}
            accent="rgba(168,85,247,0.15)"
          />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="orders" data-ocid="admin.tab">
          <TabsList
            className="mb-6 h-10"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-300 text-[#B7C0D6]"
              data-ocid="admin.orders.tab"
            >
              Orders
              {orders.length > 0 && (
                <Badge className="ml-2 text-xs bg-green-600/40 text-green-300 border-0">
                  {orders.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="messages"
              className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-300 text-[#B7C0D6]"
              data-ocid="admin.messages.tab"
            >
              Messages
              {messages.length > 0 && (
                <Badge className="ml-2 text-xs bg-blue-600/40 text-blue-300 border-0">
                  {messages.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-300 text-[#B7C0D6]"
              data-ocid="admin.subscribers.tab"
            >
              Subscribers
              {subscribers.length > 0 && (
                <Badge className="ml-2 text-xs bg-purple-600/40 text-purple-300 border-0">
                  {subscribers.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          <TabsContent value="messages">
            <MessagesTab />
          </TabsContent>
          <TabsContent value="subscribers">
            <SubscribersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
