# 1 Dollar - Security Specification (TDD)

## 1. Data Invariants
- **Order Validity:** An order must have a valid `resellerId` which matches the authenticated user.
- **Payment Locking:** The `paymentLocked` field is IMMUTABLE by the client. Only the system (Cloud Functions/Admin) can release it.
- **Role Integrity:** Users cannot assign themselves the 'admin' or 'supplier' roles without verification.
- **Time Integrity:** `supplierDeadline` must be exactly 72 hours from acceptance.

## 2. The "Dirty Dozen" Payloads (Denial Expected)
1. **The Ghost Profit:** Reseller tries to set profit to a negative value.
2. **The Self-Release:** Reseller tries to set `paymentLocked: false` to steal money before delivery.
3. **The ID Spoof:** Reseller sets `resellerId` to another user's UID.
4. **The Price Manipulation:** Customer tries to buy for Rs 0.
5. **The Role Escalation:** User updates profile to `role: 'admin'`.
6. **The Phantom Order:** Creating an order for a product that doesn't exist.
7. **The Deadline Hack:** Supplier sets `supplierDeadline` to 1 minute to trigger auto-cancel logic for some exploit.
8. **The Withdrawal Steal:** User tries to update `availableBalance` directly.
9. **The PII Leak:** Unauthorized user reads private `paymentInfo` of another user.
10. **The Message Inlay:** Customer tries to delete messages from a Dispute.
11. **The Status Jump:** Reseller sets status to 'completed' when it is still 'placed'.
12. **The Large Payload:** Submitting 1MB strings in product descriptions.

## 3. Test Runner (Mock Tests)
- `expect(auth('user1').create('orders/o1', { resellerId: 'user2' })).toBeDenied()`
- `expect(auth('user1').update('orders/o1', { paymentLocked: false })).toBeDenied()`
- `expect(auth('user1').update('users/user1', { role: 'admin' })).toBeDenied()`
