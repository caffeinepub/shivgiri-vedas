import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Int "mo:core/Int";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Order "mo:core/Order";

actor {
  // Initialize authorization system
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  type ContactSubmission = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  module ContactSubmission {
    public func compareByTimestamp(a : ContactSubmission, b : ContactSubmission) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  type Order = {
    id : Text;
    customerName : Text;
    customerPhone : Text;
    customerEmail : Text;
    customerAddress : Text;
    productName : Text;
    productSize : Text;
    productPrice : Float;
    quantity : Nat;
    status : Text;
    timestamp : Time.Time;
  };

  module MyOrder {
    public func compareByTimestamp(a : Order, b : Order) : Order.Order {
      Int.compare(a.timestamp, b.timestamp);
    };
  };

  let contactSubmissions = Map.empty<Text, ContactSubmission>();
  let newsletterSubscribers = Set.empty<Text>();
  let orders = Map.empty<Text, Order>();

  // Allows any authenticated (non-anonymous) user to claim admin role.
  // This is intentional for a single-owner admin panel.
  public shared ({ caller }) func assignFirstAdmin() : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };
    accessControlState.userRoles.add(caller, #admin);
    accessControlState.adminAssigned := true;
    true;
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, phone : Text, message : Text) : async () {
    let timestamp = Time.now();
    let submission : ContactSubmission = {
      name;
      email;
      phone;
      message;
      timestamp;
    };
    contactSubmissions.add(timestamp.toText(), submission);
  };

  public shared ({ caller }) func subscribeToNewsletter(email : Text) : async () {
    if (newsletterSubscribers.contains(email)) {
      Runtime.trap("Email is already subscribed");
    } else {
      newsletterSubscribers.add(email);
    };
  };

  public query ({ caller }) func getAllContactSubmissions() : async [ContactSubmission] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view contact submissions");
    };
    contactSubmissions.values().toArray().sort(ContactSubmission.compareByTimestamp);
  };

  public query ({ caller }) func getAllNewsletterSubscribers() : async [Text] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view newsletter subscribers");
    };
    newsletterSubscribers.values().toArray().sort();
  };

  public shared ({ caller }) func placeOrder(
    customerName : Text,
    customerPhone : Text,
    customerEmail : Text,
    customerAddress : Text,
    productName : Text,
    productSize : Text,
    productPrice : Float,
    quantity : Nat,
  ) : async Text {
    let orderId = Time.now().toText();
    let timestamp = Time.now();
    let order : Order = {
      id = orderId;
      customerName;
      customerPhone;
      customerEmail;
      customerAddress;
      productName;
      productSize;
      productPrice;
      quantity;
      status = "pending";
      timestamp;
    };
    orders.add(orderId, order);
    orderId;
  };

  public query ({ caller }) func getAllOrders() : async [Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view orders");
    };
    orders.values().toArray().sort(MyOrder.compareByTimestamp);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Text, newStatus : Text) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    switch (orders.get(orderId)) {
      case (null) {
        Runtime.trap("Order not found for ID: " # orderId);
      };
      case (?existingOrder) {
        let updatedOrder = { existingOrder with status = newStatus };
        orders.add(orderId, updatedOrder);
      };
    };
  };
};
