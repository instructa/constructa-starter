# Create Benefit
Source: https://polar.sh/docs/api-reference/benefits/create

post /v1/benefits/
Create a benefit.

**Scopes**: `benefits:write`



# Delete Benefit
Source: https://polar.sh/docs/api-reference/benefits/delete

delete /v1/benefits/{id}
Delete a benefit.

> [!WARNING]
> Every grants associated with the benefit will be revoked.
> Users will lose access to the benefit.

**Scopes**: `benefits:write`



# Get Benefit
Source: https://polar.sh/docs/api-reference/benefits/get

get /v1/benefits/{id}
Get a benefit by ID.

**Scopes**: `benefits:read` `benefits:write`



# List Benefits
Source: https://polar.sh/docs/api-reference/benefits/list

get /v1/benefits/
List benefits.

**Scopes**: `benefits:read` `benefits:write`



# List Benefit Grants
Source: https://polar.sh/docs/api-reference/benefits/list-grants

get /v1/benefits/{id}/grants
List the individual grants for a benefit.

It's especially useful to check if a user has been granted a benefit.

**Scopes**: `benefits:read` `benefits:write`



# Update Benefit
Source: https://polar.sh/docs/api-reference/benefits/update

patch /v1/benefits/{id}
Update a benefit.

**Scopes**: `benefits:write`



# Create Checkout Link
Source: https://polar.sh/docs/api-reference/checkout-links/create

post /v1/checkout-links/
Create a checkout link.

**Scopes**: `checkout_links:write`

<Warning>
  Looking to create a single use checkout session? Checkout Links are probably **not** what you're looking for.

  Checkout Links are shareable links that generate checkout sessions when opened. They are very handy to start a purchase from your website or social media.

  However, if you want to start a checkout for one of your user **inside** your product, you should use the [Checkout Sessions API](/api-reference/checkouts/create-session).
</Warning>


# Delete Checkout Link
Source: https://polar.sh/docs/api-reference/checkout-links/delete

delete /v1/checkout-links/{id}
Delete a checkout link.

**Scopes**: `checkout_links:write`



# Get Checkout Link
Source: https://polar.sh/docs/api-reference/checkout-links/get

get /v1/checkout-links/{id}
Get a checkout link by ID.

**Scopes**: `checkout_links:read` `checkout_links:write`



# List Checkout Links
Source: https://polar.sh/docs/api-reference/checkout-links/list

get /v1/checkout-links/
List checkout links.

**Scopes**: `checkout_links:read` `checkout_links:write`



# Update Checkout Link
Source: https://polar.sh/docs/api-reference/checkout-links/update

patch /v1/checkout-links/{id}
Update a checkout link.

**Scopes**: `checkout_links:write`



# Confirm Checkout Session from Client
Source: https://polar.sh/docs/api-reference/checkouts/confirm-session-from-client

post /v1/checkouts/client/{client_secret}/confirm
Confirm a checkout session by client secret.

Orders and subscriptions will be processed.



# Create Checkout Session
Source: https://polar.sh/docs/api-reference/checkouts/create-session

post /v1/checkouts/
Create a checkout session.

**Scopes**: `checkouts:write`



# Get Checkout Session
Source: https://polar.sh/docs/api-reference/checkouts/get-session

get /v1/checkouts/{id}
Get a checkout session by ID.

**Scopes**: `checkouts:read` `checkouts:write`



# Get Checkout Session from Client
Source: https://polar.sh/docs/api-reference/checkouts/get-session-from-client

get /v1/checkouts/client/{client_secret}
Get a checkout session by client secret.



# List Checkout Sessions
Source: https://polar.sh/docs/api-reference/checkouts/list-sessions

get /v1/checkouts/
List checkout sessions.

**Scopes**: `checkouts:read` `checkouts:write`



# Update Checkout Session
Source: https://polar.sh/docs/api-reference/checkouts/update-session

patch /v1/checkouts/{id}
Update a checkout session.

**Scopes**: `checkouts:write`



# Update Checkout Session from Client
Source: https://polar.sh/docs/api-reference/checkouts/update-session-from-client

patch /v1/checkouts/client/{client_secret}
Update a checkout session by client secret.



# Create Custom Field
Source: https://polar.sh/docs/api-reference/custom-fields/create

post /v1/custom-fields/
Create a custom field.

**Scopes**: `custom_fields:write`



# Delete Custom Field
Source: https://polar.sh/docs/api-reference/custom-fields/delete

delete /v1/custom-fields/{id}
Delete a custom field.

**Scopes**: `custom_fields:write`



# Get Custom Field
Source: https://polar.sh/docs/api-reference/custom-fields/get

get /v1/custom-fields/{id}
Get a custom field by ID.

**Scopes**: `custom_fields:read` `custom_fields:write`



# List Custom Fields
Source: https://polar.sh/docs/api-reference/custom-fields/list

get /v1/custom-fields/
List custom fields.

**Scopes**: `custom_fields:read` `custom_fields:write`



# Update Custom Field
Source: https://polar.sh/docs/api-reference/custom-fields/update

patch /v1/custom-fields/{id}
Update a custom field.

**Scopes**: `custom_fields:write`



# Get Customer Meter
Source: https://polar.sh/docs/api-reference/customer-meters/get

get /v1/customer-meters/{id}
Get a customer meter by ID.

**Scopes**: `customer_meters:read`



# List Customer Meters
Source: https://polar.sh/docs/api-reference/customer-meters/list

get /v1/customer-meters/
List customer meters.

**Scopes**: `customer_meters:read`



# null
Source: https://polar.sh/docs/api-reference/customer-portal/downloadables/get

get /v1/customer-portal/downloadables/{token}



# List Downloadables
Source: https://polar.sh/docs/api-reference/customer-portal/downloadables/list

get /v1/customer-portal/downloadables/
**Scopes**: `customer_portal:read` `customer_portal:write`



# Get Customer
Source: https://polar.sh/docs/api-reference/customer-portal/get-customer

get /v1/customer-portal/customers/me
Get authenticated customer.

**Scopes**: `customer_portal:read` `customer_portal:write`



# Get Organization
Source: https://polar.sh/docs/api-reference/customer-portal/get-organization

get /v1/customer-portal/organizations/{slug}
Get a customer portal's organization by slug.



# Activate License Key
Source: https://polar.sh/docs/api-reference/customer-portal/license-keys/activate

post /v1/customer-portal/license-keys/activate
Activate a license key instance.

> This endpoint doesn't require authentication and can be safely used on a public
> client, like a desktop application or a mobile app.
> If you plan to validate a license key on a server, use the `/v1/license-keys/activate`
> endpoint instead.

<Tip>
  You only need to use this endpoint if you have device **activations** enabled on the license key benefit. You then use this endpoint to reserve an allocation for a specific device. Storing the unique activation ID from the response on the device and using it as extra validation in the [/validate](/api-reference/customer-portal/license-keys/validate) endpoint.

  Not using **activations**? Just use the [/validate](/api-reference/customer-portal/license-keys/validate) endpoint directly instead.
</Tip>


# Deactivate License Key
Source: https://polar.sh/docs/api-reference/customer-portal/license-keys/deactivate

post /v1/customer-portal/license-keys/deactivate
Deactivate a license key instance.

> This endpoint doesn't require authentication and can be safely used on a public
> client, like a desktop application or a mobile app.
> If you plan to validate a license key on a server, use the `/v1/license-keys/deactivate`
> endpoint instead.



# Get License Key
Source: https://polar.sh/docs/api-reference/customer-portal/license-keys/get

get /v1/customer-portal/license-keys/{id}
Get a license key.

**Scopes**: `customer_portal:read` `customer_portal:write`



# List License Keys
Source: https://polar.sh/docs/api-reference/customer-portal/license-keys/list

get /v1/customer-portal/license-keys/
**Scopes**: `customer_portal:read` `customer_portal:write`



# Validate License Key
Source: https://polar.sh/docs/api-reference/customer-portal/license-keys/validate

post /v1/customer-portal/license-keys/validate
Validate a license key.

> This endpoint doesn't require authentication and can be safely used on a public
> client, like a desktop application or a mobile app.
> If you plan to validate a license key on a server, use the `/v1/license-keys/validate`
> endpoint instead.



# Get Order
Source: https://polar.sh/docs/api-reference/customer-portal/orders/get

get /v1/customer-portal/orders/{id}
Get an order by ID for the authenticated customer.

**Scopes**: `customer_portal:read` `customer_portal:write`



# Get Order Invoice
Source: https://polar.sh/docs/api-reference/customer-portal/orders/get-invoice

get /v1/customer-portal/orders/{id}/invoice
Get an order's invoice data.

**Scopes**: `customer_portal:read` `customer_portal:write`

<Note>
  The invoice must be generated first before it can be retrieved. You should call the [`POST /v1/customer-portal/orders/{id}/invoice`](/api-reference/customer-portal/orders/post-invoice) endpoint to generate the invoice.

  If the invoice is not generated, you will receive a `404` error.
</Note>


# List Orders
Source: https://polar.sh/docs/api-reference/customer-portal/orders/list

get /v1/customer-portal/orders/
List orders of the authenticated customer.

**Scopes**: `customer_portal:read` `customer_portal:write`



# Update Order
Source: https://polar.sh/docs/api-reference/customer-portal/orders/patch

patch /v1/customer-portal/orders/{id}
Update an order for the authenticated customer.

**Scopes**: `customer_portal:write`



# Generate Order Invoice
Source: https://polar.sh/docs/api-reference/customer-portal/orders/post-invoice

post /v1/customer-portal/orders/{id}/invoice
Trigger generation of an order's invoice.

**Scopes**: `customer_portal:read` `customer_portal:write`

<Warning>
  Once the invoice is generated, it's permanent and cannot be modified.

  Make sure the billing details (name and address) are correct before generating the invoice. You can update them before generating the invoice by calling the [`PATCH /v1/customer-portal/orders/{id}`](/api-reference/customer-portal/orders/patch) endpoint.
</Warning>

<Note>
  After successfully calling this endpoint, you get a `202` response, meaning
  the generation of the invoice has been scheduled. It usually only takes a few
  seconds before you can retrieve the invoice using the [`GET /v1/customer-portal/orders/{id}/invoice`](/api-reference/customer-portal/orders/get-invoice) endpoint.

  If you want a reliable notification when the invoice is ready, you can listen to the
  [`order.updated`](/api-reference/webhooks/order.updated) webhook and check the [`is_invoice_generated` field](/api-reference/webhooks/order.updated#schema-data-is-invoice-generated).
</Note>


# Create Customer Session
Source: https://polar.sh/docs/api-reference/customer-portal/sessions/create

post /v1/customer-sessions/
Create a customer session.

**Scopes**: `customer_sessions:write`



# Cancel Subscription
Source: https://polar.sh/docs/api-reference/customer-portal/subscriptions/cancel

delete /v1/customer-portal/subscriptions/{id}
Cancel a subscription of the authenticated customer.

**Scopes**: `customer_portal:write`



# Get Subscription
Source: https://polar.sh/docs/api-reference/customer-portal/subscriptions/get

get /v1/customer-portal/subscriptions/{id}
Get a subscription for the authenticated customer.

**Scopes**: `customer_portal:read` `customer_portal:write`



# List Subscriptions
Source: https://polar.sh/docs/api-reference/customer-portal/subscriptions/list

get /v1/customer-portal/subscriptions/
List subscriptions of the authenticated customer.

**Scopes**: `customer_portal:read` `customer_portal:write`



# Update Subscription
Source: https://polar.sh/docs/api-reference/customer-portal/subscriptions/update

patch /v1/customer-portal/subscriptions/{id}
Update a subscription of the authenticated customer.

**Scopes**: `customer_portal:write`



# Create Customer
Source: https://polar.sh/docs/api-reference/customers/create

post /v1/customers/
Create a customer.

**Scopes**: `customers:write`



# Delete Customer
Source: https://polar.sh/docs/api-reference/customers/delete

delete /v1/customers/{id}
Delete a customer.

This action cannot be undone and will immediately:
- Cancel any active subscriptions for the customer
- Revoke all their benefits
- Clear any `external_id`

Use it only in the context of deleting a user within your
own service. Otherwise, use more granular API endpoints to cancel
a specific subscription or revoke certain benefits.

Note: The customers information will nonetheless be retained for historic
orders and subscriptions.

**Scopes**: `customers:write`



# Delete Customer by External ID
Source: https://polar.sh/docs/api-reference/customers/delete-external

delete /v1/customers/external/{external_id}
Delete a customer by external ID.

Immediately cancels any active subscriptions and revokes any active benefits.

**Scopes**: `customers:write`



# Get Customer
Source: https://polar.sh/docs/api-reference/customers/get

get /v1/customers/{id}
Get a customer by ID.

**Scopes**: `customers:read` `customers:write`



# Get Customer by External ID
Source: https://polar.sh/docs/api-reference/customers/get-external

get /v1/customers/external/{external_id}
Get a customer by external ID.

**Scopes**: `customers:read` `customers:write`



# List Customers
Source: https://polar.sh/docs/api-reference/customers/list

get /v1/customers/
List customers.

**Scopes**: `customers:read` `customers:write`



# Get Customer State
Source: https://polar.sh/docs/api-reference/customers/state

get /v1/customers/{id}/state
Get a customer state by ID.

The customer state includes information about
the customer's active subscriptions and benefits.

It's the ideal endpoint to use when you need to get a full overview
of a customer's status.

**Scopes**: `customers:read` `customers:write`



# Get Customer State by External ID
Source: https://polar.sh/docs/api-reference/customers/state-external

get /v1/customers/external/{external_id}/state
Get a customer state by external ID.

The customer state includes information about
the customer's active subscriptions and benefits.

It's the ideal endpoint to use when you need to get a full overview
of a customer's status.

**Scopes**: `customers:read` `customers:write`



# Update Customer
Source: https://polar.sh/docs/api-reference/customers/update

patch /v1/customers/{id}
Update a customer.

**Scopes**: `customers:write`



# Update Customer by External ID
Source: https://polar.sh/docs/api-reference/customers/update-external

patch /v1/customers/external/{external_id}
Update a customer by external ID.

**Scopes**: `customers:write`



# Create Discount
Source: https://polar.sh/docs/api-reference/discounts/create

post /v1/discounts/
Create a discount.

**Scopes**: `discounts:write`



# Delete Discount
Source: https://polar.sh/docs/api-reference/discounts/delete

delete /v1/discounts/{id}
Delete a discount.

**Scopes**: `discounts:write`



# Get Discount
Source: https://polar.sh/docs/api-reference/discounts/get

get /v1/discounts/{id}
Get a discount by ID.

**Scopes**: `discounts:read` `discounts:write`



# List Discounts
Source: https://polar.sh/docs/api-reference/discounts/list

get /v1/discounts/
List discounts.

**Scopes**: `discounts:read` `discounts:write`



# Update Discount
Source: https://polar.sh/docs/api-reference/discounts/update

patch /v1/discounts/{id}
Update a discount.

**Scopes**: `discounts:write`



# Get Event
Source: https://polar.sh/docs/api-reference/events/get

get /v1/events/{id}
Get an event by ID.

**Scopes**: `events:read` `events:write`



# Ingest Events
Source: https://polar.sh/docs/api-reference/events/ingest

post /v1/events/ingest
Ingest batch of events.

**Scopes**: `events:write`



# List Events
Source: https://polar.sh/docs/api-reference/events/list

get /v1/events/
List events.

**Scopes**: `events:read` `events:write`



# Complete File Upload
Source: https://polar.sh/docs/api-reference/files/complete-upload

post /v1/files/{id}/uploaded
Complete a file upload.

**Scopes**: `files:write`



# Create File
Source: https://polar.sh/docs/api-reference/files/create

post /v1/files/
Create a file.

**Scopes**: `files:write`



# Delete File
Source: https://polar.sh/docs/api-reference/files/delete

delete /v1/files/{id}
Delete a file.

**Scopes**: `files:write`



# List Files
Source: https://polar.sh/docs/api-reference/files/list

get /v1/files/
List files.

**Scopes**: `files:read` `files:write`



# Update File
Source: https://polar.sh/docs/api-reference/files/update

patch /v1/files/{id}
Update a file.

**Scopes**: `files:write`



# API Overview
Source: https://polar.sh/docs/api-reference/introduction

Base URLs, authentication (OAT), and the difference between the Core API and the Customer Portal API

## TL;DR

<CardGroup cols={2}>
  <Card title="Production Base URL" icon="globe">
    `https://api.polar.sh/v1`
  </Card>

  <Card title="Sandbox Base URL" icon="flask">
    `https://sandbox-api.polar.sh/v1`
  </Card>

  <Card title="Auth (Organization)" icon="key" href="/integrate/oat">
    Use an **Organization Access Token (OAT)** in the `Authorization: Bearer`
    header
  </Card>

  <Card title="Auth (Customer Portal)" icon="user-lock" href="/api-reference/customer-portal/sessions/create">
    Use a **Customer Access Token** created via `/v1/customer-sessions/`
  </Card>
</CardGroup>

## Base URLs

| Environment | Base URL                          | Purpose                         |
| ----------- | --------------------------------- | ------------------------------- |
| Production  | `https://api.polar.sh/v1`         | Real customers & live payments  |
| Sandbox     | `https://sandbox-api.polar.sh/v1` | Safe testing & integration work |

<Info>
  The sandbox environment is fully isolated—data, users, tokens, and
  organizations created there do not affect production. Create separate tokens
  in each environment.
</Info>

Read more: [Sandbox Environment](/integrate/sandbox)

## Authentication

### Organization Access Tokens (OAT)

Use an **OAT** to act on behalf of your organization (manage products, prices, checkouts, orders, subscriptions, benefits, etc.).

```http
Authorization: Bearer polar_oat_xxxxxxxxxxxxxxxxx
```

<Tip>
  Create OATs in your organization settings. See: [Organization Access
  Tokens](/integrate/oat)
</Tip>

<Warning>
  Never expose an OAT in client-side code, public repos, or logs. If leaked, it
  will be revoked automatically by our secret scanning integrations.
</Warning>

### Customer Access Tokens

Do **not** use OATs in the browser. For customer-facing flows, [generate a **Customer Session**](/api-reference/customer-portal/sessions/create) server-side, then use the returned **customer access token** with the **Customer Portal API** to let a signed-in customer view their own orders, subscriptions, and benefits.

## Core API vs Customer Portal API

| Aspect               | Core API                                                                 | Customer Portal API                            |
| -------------------- | ------------------------------------------------------------------------ | ---------------------------------------------- |
| Audience             | Your server / backend                                                    | One of your customer                           |
| Auth Type            | Organization Access Token (OAT)                                          | Customer Access Token                          |
| Scope                | Full org resources (products, orders, subscriptions, benefits, checkout) | Only the authenticated customer’s data         |
| Typical Use          | Admin dashboards, internal tools, automation, provisioning               | Building a custom customer portal or gated app |
| Token Creation       | Via dashboard (manual)                                                   | Via `/v1/customer-sessions/` (server-side)     |
| Sensitive Operations | Yes (create/update products, issue refunds, etc.)                        | No (read/update only what the customer owns)   |

<Note>
  The Customer Portal API is a *restricted* surface designed for safe exposure
  in user-facing contexts (after exchanging a session). It cannot perform
  privileged org-level mutations like creating products or issuing refunds.
</Note>

## Quick Examples

<CodeGroup>
  ```bash curl (Production - Core API)
  curl https://api.polar.sh/v1/products/ \
    -H "Authorization: Bearer $POLAR_OAT" \
    -H "Accept: application/json"
  ```

  ```bash curl (Sandbox - Core API)
  curl https://sandbox-api.polar.sh/v1/products/ \
    -H "Authorization: Bearer $POLAR_OAT_SANDBOX" \
    -H "Accept: application/json"
  ```

  ```bash curl (Customer Portal API)
  curl https://api.polar.sh/v1/customer-portal/orders/ \
    -H "Authorization: Bearer $POLAR_CUSTOMER_TOKEN" \
    -H "Accept: application/json"
  ```
</CodeGroup>

## Using SDKs

All official SDKs accept a `server` parameter for sandbox usage:

<CodeGroup>
  ```ts TypeScript
  import { Polar } from "@polar-sh/sdk";

  const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox", // omit or use 'production' for live
  });

  ```

  ```py Python
  from polar import Polar

  client = Polar(
      access_token=os.environ["POLAR_ACCESS_TOKEN"],
      server="sandbox",
  )
  ```

  ```go Go
  s := polargo.New(
    polargo.WithServer("sandbox"),
    polargo.WithSecurity(os.Getenv("POLAR_ACCESS_TOKEN")),
  )
  ```

  ```php PHP
  $sdk = Polar\Polar::builder()
      ->setServer('sandbox')
      ->setSecurity(getenv('POLAR_ACCESS_TOKEN'))
      ->build();
  ```
</CodeGroup>

## Rate Limits

Polar API has rate limits to ensure fair usage and maintain performance. The limits are as follows:

* **300 requests per minute** per organization/customer or OAuth2 Client.
* **3 requests per second** for unauthenticated license key [validation](/api-reference/customer-portal/license-keys/validate), [activation](/api-reference/customer-portal/license-keys/activate), and [deactivation](/api-reference/customer-portal/license-keys/deactivate) endpoints.

If you exceed the rate limit, you will receive a `429 Too Many Requests` response. The response will include a `Retry-After` header indicating how long you should wait before making another request.

<Note>
  Organizations requiring higher rate limits for production workloads may
  contact our support team to discuss elevated limits.
</Note>


# Activate License Key
Source: https://polar.sh/docs/api-reference/license-keys/activate

post /v1/license-keys/activate
Activate a license key instance.

**Scopes**: `license_keys:write`



# Deactivate License Key
Source: https://polar.sh/docs/api-reference/license-keys/deactivate

post /v1/license-keys/deactivate
Deactivate a license key instance.

**Scopes**: `license_keys:write`



# Get License Key
Source: https://polar.sh/docs/api-reference/license-keys/get

get /v1/license-keys/{id}
Get a license key.

**Scopes**: `license_keys:read` `license_keys:write`



# Get Activation
Source: https://polar.sh/docs/api-reference/license-keys/get-activation

get /v1/license-keys/{id}/activations/{activation_id}
Get a license key activation.

**Scopes**: `license_keys:read` `license_keys:write`



# List License Keys
Source: https://polar.sh/docs/api-reference/license-keys/list

get /v1/license-keys/
Get license keys connected to the given organization & filters.

**Scopes**: `license_keys:read` `license_keys:write`



# Update License Key
Source: https://polar.sh/docs/api-reference/license-keys/update

patch /v1/license-keys/{id}
Update a license key.

**Scopes**: `license_keys:write`



# Validate License Key
Source: https://polar.sh/docs/api-reference/license-keys/validate

post /v1/license-keys/validate
Validate a license key.

**Scopes**: `license_keys:write`



# Create Meter
Source: https://polar.sh/docs/api-reference/meters/create

post /v1/meters/
Create a meter.

**Scopes**: `meters:write`



# Get Meter
Source: https://polar.sh/docs/api-reference/meters/get

get /v1/meters/{id}
Get a meter by ID.

**Scopes**: `meters:read` `meters:write`



# Get Meter Quantities
Source: https://polar.sh/docs/api-reference/meters/get-quantities

get /v1/meters/{id}/quantities
Get quantities of a meter over a time period.

**Scopes**: `meters:read` `meters:write`



# List Meters
Source: https://polar.sh/docs/api-reference/meters/list

get /v1/meters/
List meters.

**Scopes**: `meters:read` `meters:write`



# Update Meter
Source: https://polar.sh/docs/api-reference/meters/update

patch /v1/meters/{id}
Update a meter.

**Scopes**: `meters:write`



# Get Metrics
Source: https://polar.sh/docs/api-reference/metrics/get

get /v1/metrics/
Get metrics about your orders and subscriptions.

Currency values are output in cents.

**Scopes**: `metrics:read`



# Get Metrics Limits
Source: https://polar.sh/docs/api-reference/metrics/get-limits

get /v1/metrics/limits
Get the interval limits for the metrics endpoint.

**Scopes**: `metrics:read`



# Authorize
Source: https://polar.sh/docs/api-reference/oauth2/connect/authorize

get /v1/oauth2/authorize



# Get User Info
Source: https://polar.sh/docs/api-reference/oauth2/connect/get-user-info

get /v1/oauth2/userinfo
Get information about the authenticated user.



# Introspect Token
Source: https://polar.sh/docs/api-reference/oauth2/connect/introspect-token

post /v1/oauth2/introspect
Get information about an access token.



# Request Token
Source: https://polar.sh/docs/api-reference/oauth2/connect/request-token

post /v1/oauth2/token
Request an access token using a valid grant.



# Revoke Token
Source: https://polar.sh/docs/api-reference/oauth2/connect/revoke-token

post /v1/oauth2/revoke
Revoke an access token or a refresh token.



# Get Order
Source: https://polar.sh/docs/api-reference/orders/get

get /v1/orders/{id}
Get an order by ID.

**Scopes**: `orders:read`



# Get Order Invoice
Source: https://polar.sh/docs/api-reference/orders/get-invoice

get /v1/orders/{id}/invoice
Get an order's invoice data.

**Scopes**: `orders:read`

<Note>
  The invoice must be generated first before it can be retrieved. You should call the [`POST /v1/orders/{id}/invoice`](/api-reference/orders/post-invoice) endpoint to generate the invoice.

  If the invoice is not generated, you will receive a `404` error.
</Note>


# List Orders
Source: https://polar.sh/docs/api-reference/orders/list

get /v1/orders/
List orders.

**Scopes**: `orders:read`



# Update Order
Source: https://polar.sh/docs/api-reference/orders/patch

patch /v1/orders/{id}
Update an order.

**Scopes**: `orders:write`



# Generate Order Invoice
Source: https://polar.sh/docs/api-reference/orders/post-invoice

post /v1/orders/{id}/invoice
Trigger generation of an order's invoice.

**Scopes**: `orders:read`

<Warning>
  Once the invoice is generated, it's permanent and cannot be modified.

  Make sure the billing details (name and address) are correct before generating the invoice. You can update them before generating the invoice by calling the [`PATCH /v1/orders/{id}`](/api-reference/orders/patch) endpoint.
</Warning>

<Note>
  After successfully calling this endpoint, you get a `202` response, meaning
  the generation of the invoice has been scheduled. It usually only takes a few
  seconds before you can retrieve the invoice using the [`GET /v1/orders/{id}
    /invoice`](/api-reference/orders/get-invoice) endpoint.

  If you want a reliable notification when the invoice is ready, you can listen to the
  [`order.updated`](/api-reference/webhooks/order.updated) webhook and check the [`is_invoice_generated` field](/api-reference/webhooks/order.updated#schema-data-is-invoice-generated).
</Note>


# Create Organization
Source: https://polar.sh/docs/api-reference/organizations/create

post /v1/organizations/
Create an organization.

**Scopes**: `organizations:write`



# Get Organization
Source: https://polar.sh/docs/api-reference/organizations/get

GET /v1/organizations/{id}
Get an organization by ID.

**Scopes**: `organizations:read` `organizations:write`

Hello there. Just testing a custom intro.

| Property | Description                           |
| -------- | ------------------------------------- |
| Name     | Full name of user                     |
| Age      | Reported age                          |
| Joined   | Whether the user joined the community |

Continuing here.

<Update label="2024-10-12" description="v0.1.1">
  Some update to the endpoint here
</Update>


# List Organizations
Source: https://polar.sh/docs/api-reference/organizations/list

get /v1/organizations/
List organizations.

**Scopes**: `organizations:read` `organizations:write`



# Update Organization
Source: https://polar.sh/docs/api-reference/organizations/update

patch /v1/organizations/{id}
Update an organization.

**Scopes**: `organizations:write`



# Create Product
Source: https://polar.sh/docs/api-reference/products/create

post /v1/products/
Create a product.

**Scopes**: `products:write`



# Get Product
Source: https://polar.sh/docs/api-reference/products/get

get /v1/products/{id}
Get a product by ID.

**Scopes**: `products:read` `products:write`



# List Products
Source: https://polar.sh/docs/api-reference/products/list

get /v1/products/
List products.

**Scopes**: `products:read` `products:write`



# Update Product
Source: https://polar.sh/docs/api-reference/products/update

patch /v1/products/{id}
Update a product.

**Scopes**: `products:write`



# Update Product Benefits
Source: https://polar.sh/docs/api-reference/products/update-benefits

post /v1/products/{id}/benefits
Update benefits granted by a product.

**Scopes**: `products:write`



# Create Refund
Source: https://polar.sh/docs/api-reference/refunds/create

post /v1/refunds/
Create a refund.

**Scopes**: `refunds:write`



# List Refunds
Source: https://polar.sh/docs/api-reference/refunds/list

get /v1/refunds/
List products.

**Scopes**: `refunds:read` `refunds:write`



# Get Subscription
Source: https://polar.sh/docs/api-reference/subscriptions/get

get /v1/subscriptions/{id}
Get a subscription by ID.

**Scopes**: `subscriptions:read` `subscriptions:write`



# List Subscriptions
Source: https://polar.sh/docs/api-reference/subscriptions/list

get /v1/subscriptions/
List subscriptions.

**Scopes**: `subscriptions:read` `subscriptions:write`



# Revoke Subscription
Source: https://polar.sh/docs/api-reference/subscriptions/revoke

delete /v1/subscriptions/{id}
Revoke a subscription, i.e cancel immediately.

**Scopes**: `subscriptions:write`



# Update Subscription
Source: https://polar.sh/docs/api-reference/subscriptions/update

patch /v1/subscriptions/{id}
Update a subscription.

**Scopes**: `subscriptions:write`



# benefit.created
Source: https://polar.sh/docs/api-reference/webhooks/benefit.created





# benefit.updated
Source: https://polar.sh/docs/api-reference/webhooks/benefit.updated





# benefit_grant.created
Source: https://polar.sh/docs/api-reference/webhooks/benefit_grant.created





# benefit_grant.cycled
Source: https://polar.sh/docs/api-reference/webhooks/benefit_grant.cycled





# benefit_grant.revoked
Source: https://polar.sh/docs/api-reference/webhooks/benefit_grant.revoked





# benefit_grant.updated
Source: https://polar.sh/docs/api-reference/webhooks/benefit_grant.updated





# checkout.created
Source: https://polar.sh/docs/api-reference/webhooks/checkout.created





# checkout.updated
Source: https://polar.sh/docs/api-reference/webhooks/checkout.updated





# customer.created
Source: https://polar.sh/docs/api-reference/webhooks/customer.created





# customer.deleted
Source: https://polar.sh/docs/api-reference/webhooks/customer.deleted





# customer.state_changed
Source: https://polar.sh/docs/api-reference/webhooks/customer.state_changed





# customer.updated
Source: https://polar.sh/docs/api-reference/webhooks/customer.updated





# Create Webhook Endpoint
Source: https://polar.sh/docs/api-reference/webhooks/endpoints/create

post /v1/webhooks/endpoints
Create a webhook endpoint.

**Scopes**: `webhooks:write`



# Delete Webhook Endpoint
Source: https://polar.sh/docs/api-reference/webhooks/endpoints/delete

delete /v1/webhooks/endpoints/{id}
Delete a webhook endpoint.

**Scopes**: `webhooks:write`



# Get Webhook Endpoint
Source: https://polar.sh/docs/api-reference/webhooks/endpoints/get

get /v1/webhooks/endpoints/{id}
Get a webhook endpoint by ID.

**Scopes**: `webhooks:read` `webhooks:write`



# List Webhook Endpoints
Source: https://polar.sh/docs/api-reference/webhooks/endpoints/list

get /v1/webhooks/endpoints
List webhook endpoints.

**Scopes**: `webhooks:read` `webhooks:write`



# Update Webhook Endpoint
Source: https://polar.sh/docs/api-reference/webhooks/endpoints/update

patch /v1/webhooks/endpoints/{id}
Update a webhook endpoint.

**Scopes**: `webhooks:write`



# order.created
Source: https://polar.sh/docs/api-reference/webhooks/order.created





# order.paid
Source: https://polar.sh/docs/api-reference/webhooks/order.paid





# order.refunded
Source: https://polar.sh/docs/api-reference/webhooks/order.refunded





# order.updated
Source: https://polar.sh/docs/api-reference/webhooks/order.updated





# organization.updated
Source: https://polar.sh/docs/api-reference/webhooks/organization.updated





# product.created
Source: https://polar.sh/docs/api-reference/webhooks/product.created





# product.updated
Source: https://polar.sh/docs/api-reference/webhooks/product.updated





# refund.created
Source: https://polar.sh/docs/api-reference/webhooks/refund.created





# refund.updated
Source: https://polar.sh/docs/api-reference/webhooks/refund.updated





# subscription.active
Source: https://polar.sh/docs/api-reference/webhooks/subscription.active





# subscription.canceled
Source: https://polar.sh/docs/api-reference/webhooks/subscription.canceled





# subscription.created
Source: https://polar.sh/docs/api-reference/webhooks/subscription.created





# subscription.revoked
Source: https://polar.sh/docs/api-reference/webhooks/subscription.revoked





# subscription.uncanceled
Source: https://polar.sh/docs/api-reference/webhooks/subscription.uncanceled





# subscription.updated
Source: https://polar.sh/docs/api-reference/webhooks/subscription.updated





# API Changelog
Source: https://polar.sh/docs/changelog/api

Stay up to date with the latest changes, improvements and deprecations to the Polar API.

<Update label="2025-06-18">
  ## Checkout API and Customer Session API changes

  To be more consistent across our API, we've renamed `customer_external_id` field to `external_customer_id` in the Checkout API and Customer Session API.

  * <Icon icon="circle-exclamation" size={16} color="orange" /> **Deprecated**:
    `customer_external_id` field in the Checkout API and Customer Session API. Use
    `external_customer_id` instead.

  ## Benefit metadata in Customer State

  The customer state now includes the [benefit metadata](/api-reference/customers/state#response-benefit-metadata) in the `granted_benefits` list.
</Update>

<Update label="2025-06-17">
  ## Webhook API endpoints are now documented

  The API endpoints for managing webhooks are now documented in the API reference, and fully supported in our SDK.

  [Read more](/api-reference/webhooks/endpoints/create)
</Update>

<Update label="2025-06-05">
  ## Rate limits

  To ensure fair usage and maintain performance, we've introduced rate limits for the API. The limits are as follows:

  * **100 requests per second** per IP address.
</Update>

<Update label="2025-06-02">
  ## Order invoice generation and retrieval

  Until now, the invoice was generated automatically when the order was created, allowing you to call [`GET /v1/orders/{id}/invoice`](/api-reference/orders/get-invoice) and [`GET /v1/customer-portal/orders/{id}/invoice`](/api-reference/customer-portal/orders/get-invoice) endpoints without any prior action.

  We now require you to explicitly generate the invoice by calling the [`POST /v1/orders/{id}/invoice`](/api-reference/orders/post-invoice) or [`POST /v1/customer-portal/orders/{id}/invoice`](/api-reference/customer-portal/orders/post-invoice) endpoints.

  This change allows us to better handle the invoice generation process, and to allow the customer to change the billing details (name and address) before generating the invoice. This can be done through the [`PATCH /v1/orders/{id}`](/api-reference/orders/patch) or [`PATCH /v1/customer-portal/orders/{id}`](/api-reference/customer-portal/orders/patch) endpoints.
</Update>

<Update label="2025-04-16">
  ## Benefit metadata support and floating point numbers in metadata

  * <Icon icon="check" size={16} color="green" /> **Added**: Benefits now support
    [metadata](/api-reference/benefits/create#body-metadata).
  * <Icon icon="check" size={16} color="green" /> **Added**: Metadata values now
    support floating-point numbers. Before, only strings, integers and booleans
    were supported.
</Update>

<Update label="2025-03-25">
  ## Checkout amount fields changes and depreciations

  To be more consistent with the [Order schema changes](#2025-03-14), we've made some changes to the field related to amounts in the Checkout schema.

  * <Icon icon="check" size={16} color="green" /> **Added**:
    [`checkout.discount_amount`](/api-reference/checkouts/get-session#response-discount-amount).
  * <Icon icon="check" size={16} color="green" /> **Added**:
    [`checkout.net_amount`](/api-reference/checkouts/get-session#response-net-amount).
  * <Icon icon="circle-exclamation" size={16} color="orange" /> **Deprecated**:
    `checkout.subtotal_amount`, use
    [`checkout.net_amount`](/api-reference/checkouts/get-session#response-net-amount)
    instead.
</Update>

<Update label="2025-03-20">
  ## New order status and webhooks

  Until now, Polar only kept track of fully processed, **paid** orders. To help you keep track of the order lifecycle, we've added a new status `pending`, which is a transitive state meaning the order is created but not paid yet. In most cases, the order will transition from `pending` to `paid` in a short time.

  * <Icon icon="circle-exclamation" size={16} color="orange" /> When receiving
    `order.created` event, the order status might not be `paid`.
  * <Icon icon="check" size={16} color="green" /> **Added**:
    [`order.updated`](/api-reference/webhooks/order.updated) webhook, sent when
    the order status changes or when it's partially or fully refunded.
  * <Icon icon="check" size={16} color="green" /> **Added**:
    [`order.paid`](/api-reference/webhooks/order.paid) webhook, sent when the
    order is fully processed and paid.
  * <Icon icon="check" size={16} color="green" /> **Added**:
    [`Order.paid`](/api-reference/orders/get#response-paid) property to the order
    schema.

  <Info>
    If you were relying on the `order.created` webhook to keep track of succesful
    orders, we recommend you to switch to `order.paid`.
  </Info>
</Update>

<Update label="2025-03-14">
  ## Subscriptions and Orders schema changes

  To prepare our next move to support usage-based billing, we've made some changes to the [`Subscription`](/api-reference/subscriptions/get) and [`Order`](/api-reference/orders/get) schemas. The main reason behind those is that we need to support multiple prices and items in a single subscription or order.

  * <Icon icon="circle-exclamation" size={16} color="orange" /> **Deprecated**:
    `Subscription.price_id` and `Subscription.price`. Use the
    `Subscription.prices` array instead.
  * <Icon icon="circle-exclamation" size={16} color="orange" /> **Deprecated**:
    `Order.product_price_id` and `Order.product_price`. Use the `Order.items`
    array instead.
  * <Icon icon="circle-exclamation" size={16} color="orange" /> **Deprecated**:
    `Order.amount`. Use the `Order.net_amount` instead. It has the same value and
    meaning, but the new name is more explicit.
  * <Icon icon="check" size={16} color="green" /> **Added**:
    `Order.subtotal_amount`, `Order.discount_amount`, and `Order.total_amount`
    fields to provide a more detailed breakdown of the order amount.
</Update>


# Product Updates
Source: https://polar.sh/docs/changelog/recent

Stay up to date with the latest changes and improvements to Polar.

<Update label="2025-09-22">
  ## Improved preview of next invoice in Customer Portal

  We've enhanced the Customer Portal to provide a clearer and more accurate preview of your next invoice. The overview now updates automatically after subscription changes, and you can preview upcoming charges with all relevant taxes and discounts included.

  ## Cancellation metrics

  <img src="https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=03281906e75a2f354a6636e54d226296" data-og-width="2490" width="2490" data-og-height="1186" height="1186" data-path="assets/changelog/2025-09-22/cancellation-metrics-example.png" srcset="https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=280&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=6ae19ffbdaba4c7c0fe0d526ace61321 280w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=560&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=42b4d9d3462985ebbe5caf58f19ecbe1 560w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=840&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=fb4c1227797e8c4a7b87470f359b745e 840w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=1100&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=8a7543565cb1ecfc64d1646cbc314f09 1100w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=1650&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=364f0ea64944d70c3cf8d1dafb791c60 1650w, https://mintcdn.com/polar/KPDvrxuIefIR_xN_/assets/changelog/2025-09-22/cancellation-metrics-example.png?w=2500&fit=max&auto=format&n=KPDvrxuIefIR_xN_&q=85&s=db2266c6f032f8d0c503f06ea1de3ffa 2500w" data-optimize="true" data-opv="2" />

  We've added detailed cancellation metrics, giving you clearer insights into subscription cancellations and their impact on your business performance.
</Update>

<Update label="2025-09-12">
  ## Webhooks payload now includes timestamp

  We've updated our webhooks server implementation to [include a timestamp in each payload](https://github.com/polarsource/polar/pull/6770), in line with the Standard Webhooks specification.

  This change ensures that every webhook payload contains precise event timing, making it easier to trace and debug webhook deliveries, and to meet integration requirements for external platforms.
</Update>

<Update label="2025-09-05">
  ## Meter management improvements

  We've made it easier to manage your meters with new UI functionality for archiving and unarchiving meters directly from the dashboard.

  You can now archive meters that are no longer needed, which helps keep your meter list organized. Archived meters can be unarchived if you need to use them again. Note that meters cannot be archived if they are still attached to active products or referenced by active benefits.

  ## Metrics accuracy improvements

  We've improved the accuracy of our metrics by excluding unpaid orders from all calculations. Previously, orders in pending status were included in metrics, which could lead to inflated numbers.

  Now, only successfully paid and refunded orders are included in metrics calculations, giving you a more accurate view of your actual business performance.

  ## Enhanced customer email branding

  We've improved the branding of emails sent to your customers by using organization-specific 'From' and 'Reply-to' addresses.

  Customer emails now appear to come from your organization (e.g., "YourOrg (via Polar)") with replies directed to your organization's email address, providing a more professional and branded experience for your customers.
</Update>

<Update label="2025-06-12">
  ## Update subscription discount

  We've added the ability to update the discount on a subscription. This allows you to add, remove, or change the discount applied to a subscription at any time.

  This feature is both available through the [API](/api-reference/subscriptions/update) and the dashboard.
</Update>

<Update label="2025-06-05">
  ## Payout Reverse Invoices

  We've added the ability to generate reverse invoices for payouts directly from the Payouts page. This feature allows you to easily create an invoice that details the sales made on your behalf, minus our fees.

  [Read more](/features/finance/payouts#reverse-invoices)
</Update>

<Update label="2025-05-22">
  ## Business Purchase Option on Checkout

  We've added a new "I'm purchasing as a business" checkbox to the Checkout flow. When selected, customers are required to provide their business billing name and complete billing address.
</Update>

<Update label="2025-05-19">
  ## Enhanced Attribution for Checkout Links

  We've added support for `reference_id` and UTM parameters (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`) as query parameters for Checkout Links. These parameters are automatically stored in the Checkout metadata, allowing you to track the source of your traffic and conversions more effectively.

  [Read more](/features/checkout/links#store-attribution-and-reference-metadata)
</Update>

<Update label="2025-05-15">
  ## Checkouts and payments insights

  We've added a new **Checkouts** tab under the **Sales**, where you can review all the checkout sessions, successful or not. You can filter them by customer email, status, and product. You can also see the payment attempts for each checkout session, including the reason for any failed or declined payments.

  <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4672cafc0b218d34a55c5cc006fdb153" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bcf9dd8baf9fae7b84d2d046e9b4f811 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1ac73955d12edfb9a605799d246d5237 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4c931b7de4121f568d1ebefe90f42792 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=87c8d57825f9c084f1b3664402629a23 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=21eb74aed158f9b11a2015bcfa763039 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d51d0053a32db9f505742b4d4203854c 2500w" data-optimize="true" data-opv="2" />

  <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d8ebc400902b1179700e7348745793e8" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5b1783d55724d4260dab83ba63b66a77 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a0cf5741f10810ab68d2dd1962511895 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=189ed0cb4d1ec19a9daf370f778dfea1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=115d82a958ab384611b9fa868566d104 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=479d59cc8717b0f6330996e2f04915dd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=af86f31f76639dc114a243f54495601f 2500w" data-optimize="true" data-opv="2" />

  The payment attempts information is also available on each order.

  Besides, we've also added new analytics around checkouts: total number of checkouts, successful checkouts, and conversion rate.
</Update>

<Update label="2025-03-11">
  ## Zapier integration officially launched

  We're excited to announce the official launch of our [Zapier integration](https://zapier.com/apps/polar/integrations)! Get started now and connect Polar to 2,000+ other web services.

  <Note>
    We've focused on **triggers** (webhooks) for now, so you can react to events in Polar and trigger actions in other apps.

    Need to perform actions in Polar? Tell us about your use case [here](https://github.com/orgs/polarsource/discussions/new?category=integrations\&labels=integrations%2Fzapier) and we'll consider adding more actions in the future.
  </Note>
</Update>

<Update label="2025-03-05">
  ## Customer State

  Maybe one of our neatest features to date! Customer State is a concept allowing you to query for the current state of a customer, including their **active subscriptions** and **granted [benefits](/features/benefits/introduction)**, in a single [API call](/api-reference/customers/state-external) or single [webhook event](/api-reference/webhooks/customer.state_changed).

  Combined with the [External ID](/features/customer-management#external-id) feature, you can get up-and-running in minutes.

  [Read more](/integrate/customer-state)
</Update>

<Update label="2025-03-04">
  ## Better Auth Plugin

  Integrating authentication and billing for your users has never been easier.

  <img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=41206888e5c593cac95721d75ef3292c" data-og-width="3680" width="3680" data-og-height="3668" height="3668" data-path="assets/changelog/2025-03-04/better_auth.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a3a315f319b6e462a42d1a4815c806df 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1c166f855f7dac6b29f212ed49793fa9 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=45446626b116d984c78c9d821396cca6 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06b67e75a228b7a33f5c1d60cafabedf 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e7315932501dc71542d1ea1bea1d495e 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-03-04/better_auth.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6a2e2aacb09903b8be46f928e989d702 2500w" data-optimize="true" data-opv="2" />

  [Better Auth](https://www.better-auth.com/) is an open source authentication framework for
  TypeScript that is quickly becoming a favorite amongst developers. Today, we're
  thrilled to have shipped a Polar plugin for Better Auth - in collaboration with them.

  Checkout our [integration guide](/integrate/sdk/adapters/better-auth).
</Update>

<Update label="2025-02-27">
  ## Customer External ID

  We've added support for an `external_id` field on Customers. We believe this will greatly simplify the reconciliation process between your system and Polar.

  Previously, the recommended way to reconcile with your users was to use `metadata`. However, this was not always the most convenient method, especially if you needed to fetch a Customer from our API.

  With `external_id`, you can now fetch a Customer directly by their external ID through dedicated `GET`, `PATCH`, and `DELETE` endpoints. You don't even need to store Polar's internal ID in your system anymore! [Read more](/features/customer-management#external-id)

  Of course, you can also directly preset `external_customer_id` when creating a Checkout Session, and it will automatically be set on the newly created Customer after a successful checkout. [Read more](/features/checkout/session#external-customer-id)
</Update>

<Update label="2025-02-19">
  ## Polar's take on Product variants

  We've released big changes to how we handle products and pricing, allowing us to support a unique approach to what the industry typically calls **variants** 🔥

  We believe having a single product with multiple pricing models and benefits adds unneccessary complexity to the user and to the API. Instead, we chose to treat everything as a product, giving you maximum flexibility about the pricing and benefits you want to offer.

  Thus, we introduce support for **multiple products** at checkout, allowing customers to switch between them before purchasing. Typically, you can offer a monthly and a yearly product, with specific pricing and benefits for each.

  {" "}

  <img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=36f88ae4e5e70735484c068f3605b713" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=04994e58aef6964bcbad83136d7a623b 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=97436039cd7d08c4ca762d81dada1a73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3bf82c3989003e71f22a230a25db119f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10505f70deec13a9097af4daa1d04b86 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=47784df3a7278ec4df21c13c3ff81b5c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f91a412a12601270ac3bfadd82832e7e 2500w" data-optimize="true" data-opv="2" />

  <img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=82f61a0c8e8108b64d214c223d9a0f67" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06d12edfe721f4ed1686a09110f935be 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7bfedd743a9e5a2e2924f072218a6d73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d931de8df011738cedb1988f3c7adaee 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bd13134692851f71dd9228f52558b8a6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5396835651699c364b553bcc5ea9f34d 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8b2984d955958ad755028e2760028fcd 2500w" data-optimize="true" data-opv="2" />

  This is available right now using the [Checkout Session API](/features/checkout/session) and [Checkout Links](/features/checkout/links).

  ### Depreciations

  * Products can no longer have both a monthly and yearly pricing. Existing products still work, but you'll see a warning like this when trying to edit their pricing:

  {" "}

  <Frame>
    <img className="block dark:hidden h-[200px]" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=49934d3505bcdc38dbeafe43f9a72b58" data-og-width="636" width="636" data-og-height="840" height="840" data-path="assets/changelog/2025-02-19/deprecated_pricing.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e65d3de7ddfd5a6ab1769f4b6df49c86 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5cd2637aa8693c489f61689bf9608b2c 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f1848eed72e8996b801ca5ff2dd369a0 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cff67ee9261a7fa66266b23054905ce9 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a41ef4b91020fd4ec3fcc1f52ba39e91 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b642f0b6bfcbcb10d76b5e10d75cafe0 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block h-[200px]" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=26006e80ef284cc79eb4bf7a434e166f" data-og-width="636" width="636" data-og-height="840" height="840" data-path="assets/changelog/2025-02-19/deprecated_pricing.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4525f8a4779925efaf53ad5a21118c47 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7f79e8f8b5bdb4269b6bee2454466d45 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e29745dbd4d5b72a54b350560f24af76 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=30576f8854febabb8129d38f184b8361 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ca196f3fc92085b830bdc6dbba0375cb 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/changelog/2025-02-19/deprecated_pricing.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=023941a6e7f1cf03e82c18376cd5c7b6 2500w" data-optimize="true" data-opv="2" />
  </Frame>

  ### API changes

  * The `product_id` and `product_price_id` fields are deprecated in the [Checkout Session API](/api-reference/checkouts/create-session). You should now use the `products` field to specify the products you want to include in the checkout.
  * The `type` and `recurring_interval` fields on `ProductPrice` are deprecated. `recurring_interval` is now set directly on `Product`.
</Update>


# Analytics
Source: https://polar.sh/docs/features/analytics



## Sales Metrics

Polar offers a professional metrics dashboard out of the box. So you can stay focused on increasing revenue vs. how to measure it.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f926ad1de9c00a3f8ba61bf2e90776aa" data-og-width="5108" width="5108" data-og-height="2648" height="2648" data-path="assets/features/analytics/overview.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=67927d816784763bb42159cea9ae5c90 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0faf455f9402048ade37405bf3fb473d 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c8846a8b10e94f1aeaf3f953bc22d7d4 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3546fddaab33ac92866b60af5f190f06 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ad5b55f9a6d5141c20c1abf140d72e55 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7b66890781954ea18ba661314b1350e6 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=010e4bacd232feaa9964092602b7c826" data-og-width="5108" width="5108" data-og-height="2646" height="2646" data-path="assets/features/analytics/overview.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=fd42834a06e0720001d624286e946817 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cc41424432d453af72bc3ff7c593ff77 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cb007dc6579e9e693eb7cca4b62cdd46 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e5bdf711c781921f957ce2db97e6ef96 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4576dbb757f5b2e82cdc9a7f4fe8f155 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/analytics/overview.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f3d6510f86407edaff882f9470879483 2500w" data-optimize="true" data-opv="2" />

**Missing any metrics?** [Let us know so we can add it.](https://github.com/orgs/polarsource/discussions/categories/feature-requests)

### Filters

You can easily slice and dice metrics with the filters below.

### Period

Change the time period in the X-axis to one of:

* Yearly
* Monthly
* Weekly
* Daily
* Hourly

### Timeframe

You can choose a date range to view all metrics for.

### Product

By default metrics reflect the total across all products. However, you can specify individual products or subscription tiers to filter metrics by.

## Metrics

### Revenue

How much revenue you've earned before fees.

### Orders

How many product sales and subscription payments have been made.

### Average Order Value (AOV)

The average earning per order, i.e revenue / orders.

### One-Time Products

Amount of products sold.

### One-Time Products Revenue

Amount of revenue earned from products.

### New Subscriptions

Amount of new subscriptions.

### New Subscription Revenue

Amount of revenue earned from new subscriptions.

### Renewed Subscriptions

Amount of renewed subscriptions.

### Renewed Subscription Revenue

Amount of revenue earned from renewed subscriptions.

### Active Subscriptions

Amount of active subscriptions (new + renewed)

### Monthly Recurring Revenue (MRR)

Amount of revenue earned from active subscriptions.

### Checkouts

Number of created checkouts.

### Succeeded Checkouts

Number of successful checkouts, i.e. checkouts that lead to a new order or subscription.

### Checkouts Conversion Rate

The percentage of successful checkouts out of all created checkouts.


# Credits Benefit
Source: https://polar.sh/docs/features/benefits/credits

Create your own Credits benefit

The Credits benefit allows you to credit a customer's Usage Meter balance.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=95a964aa562069bd58a551e44c757459" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b760d24e9a3986942f85f837906349fa 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=83df523fa528bf405607cfffc437ef16 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=05e2f5f37fc1f0f66a2269a07f188ed1 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed026417db037e5e4248776054fd6033 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b547ce3907051f816340a08b145fa910 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=deda471c9661f21c57aebfcd23057040 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a545e217dd64f288b127ec76eb3527ef" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f53dd50244006f52fe28389ccd32dc11 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed51c6ecd5c605c90933ff9a8036c01f 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c1604014eb9f4556687cb2dae0cd4730 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8d6c8f2f81c2fbe10de06d045cae5488 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=08efb35cd818b5c25f0011415eb7da5e 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6ce168ea0a513884b7be0e7989633a84 2500w" data-optimize="true" data-opv="2" />

## Crediting Usage Meter Balance

The Credits benefit will credit a customer's Usage Meter balance at different points in time depending on the type of product purchased.

### Subscription Products

The customer will be credited the amount of units specified in the benefit at the beginning of every subscription cycle period — monthly or yearly.

### One-Time Products

The customer will be credited the amount of units specified in the benefit once at the time of purchase.

## Rollover unused credits

You can choose to rollover unused credits to the next billing cycle. This means that if a customer doesn't use all of their credits in a given billing cycle, the remaining credits will be added to their balance for the next billing cycle. To enable this feature, check the "Rollover unused credits" checkbox when creating or editing the Credits benefit.

<Note>
  If you change the rollover setting for a benefit, it will only apply to new
  credits issued after the change. Existing credits will not be affected.
</Note>


# Custom Benefit
Source: https://polar.sh/docs/features/benefits/custom

Create your own Custom benefit

You can add a simple, custom benefit, which allows you to attach a note to paying customers.

## **Custom Notes**

Secret message only customers can see, e.g [Cal.com](http://Cal.com) link, private email for support etc.

For custom integrations you can also distinguish benefits granted to customers to offer even more bespoke user benefits.


# Automate Discord Invites & Roles
Source: https://polar.sh/docs/features/benefits/discord-access

Sell Discord access & roles with ease

<img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=184ffa11c392303eecdec13a1c91ae5e" data-og-width="2400" width="2400" data-og-height="1448" height="1448" data-path="assets/features/benefits/discord/hero.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8d1cc71114f3239845eb7cf3f7cfd8cf 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8aad162e4078a9d1102a27359a55867f 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5800491c7ed21990320723c8cb620732 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=79cf17a84dde92b8751b6edec92d0585 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=216483bae4e5ba762681758c6f9912bd 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/hero.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=543d19cae5dd8300908c2ba03a8c591e 2500w" data-optimize="true" data-opv="2" />

Automating Discord server invites and roles for customers or subscribers is super easy and powerful with Polar.

* Fully automated Discord server invitations
* You can even setup multiple Discord servers, or...
* Offer different roles for different subscription tiers or products

## Create Discord Benefit

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e2045a8cbc6eb7bac1168682a29456dd" data-og-width="940" width="940" data-og-height="764" height="764" data-path="assets/features/benefits/discord/create.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=151886d0b7a9ad757afba66158d02a4e 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d6add5fcb01c77b043375600469d2396 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=14f6c9c256767df1e3a10a24c961b458 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ae2d25089d4234e5aff515a0b7dbe091 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=13d6d4190d916dfcdd2536b7fbfc6c91 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4faf97a4f150659dcd5d6a148d5b8e1c 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c5ed8ed8263425b77fda1414c373958f" data-og-width="940" width="940" data-og-height="764" height="764" data-path="assets/features/benefits/discord/create.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4759ac188bb096faa3d0e928017d43e6 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=62fb5d5a08cf2bcf297ec95d0346da0a 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ffb1b08ffe2d4bab674d18476bfd0e84 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=92f6035303cfe5739bbe9f83de8f3673 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=da8672773481aadae6326b61d38b1e86 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/discord/create.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=fc117373ec9a93a6e24ef17b27fe9690 2500w" data-optimize="true" data-opv="2" />

Click on `Connect your Discord server`. You'll be redirected to Discord where you can grant the Polar App for your desired server.

Next, you'll be prompted to approve the permissions our app requires to function. It needs all of them.

### **Manage Roles**

Access to your Discord roles. You'll be able to select which ones to grant to your customers later.

### **Kick Members**

Ability to kick members who have this benefit and connected Discord with Polar.

### **Create Invite**

Ability to invite members who purchase a product or subscribes to a tier with this benefit.

You're now redirected back to Polar and can finish setting up the Discord benefit on our end.

### **Connected Discord server**

The Discord server you connected cannot be changed. However, you can create multiple benefits and connect more Discord servers if you want.

### **Granted role**

Which Discord role do you want to grant as part of this benefit?

## Adding Benefit to Product

Head over to the product you want to associate this new Discord benefit with. You should be able to toggle the benefit in the bottom of the Edit Product form.


# Automate Customer File Downloads
Source: https://polar.sh/docs/features/benefits/file-downloads

Offer digital file downloads with ease

<img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ddcefae9f5a02b807dd50dda51fa18cc" data-og-width="2396" width="2396" data-og-height="1712" height="1712" data-path="assets/features/benefits/file-downloads/hero.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=63e45f6b0bca5d1f1e3c0c7e567531b5 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bd593d64b5a1ef56a0a9b4f1eb089b72 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=32d8b705e5666a9b58e10466bfd8cd41 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5b8dcf4116452d787cd5064afade1113 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1e96f1754ae30ef2a4dc6af7de30fcfa 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/file-downloads/hero.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8ebcdde0ec150b3de9a0abbd876a7b21 2500w" data-optimize="true" data-opv="2" />

## Sell Digital Products

You can easily offer customers and subscribers access to downloadable files with Polar.

* Up to 10GB per file
* Upload any type of file - from ebooks to full-fledged applications
* SHA-256 checksum validation throughout for you and your customers (if desired)
* Customers get a signed & personal downloadable URL

## Create Downloadable Benefit

1. Go to `Benefits` in the Dashboard sidebar
2. Click `+ Add Benefit` to create a new benefit
3. Choose `File Downloads` as the `Type`

You can now upload the files you want to offer as downloadables for customers.

1. Drag & drop files to the dropzone (`Feed me some bytes`)
2. Or click on that area to open a file browser

### Change filename

Click on the filename to change it inline.

### Change order of files

You can drag and drop the files in the order you want.

### Review SHA-256 checksum

Click on the contextual menu dots and then `Copy SHA-256 Checksum`

### Delete a file

Click on the contextual menu dots and then `Delete` in the menu.

**Active subscribers & customers will lose access too!**

Deleting a file permanently deletes it from Polar and our S3 buckets except for the metadata. Disable the file instead if you don't want it permanently deleted.

### Disable & Enable Files

You can disable files at any point to prevent new customers getting access to it.

**Existing customers retain their access**

Customers who purchased before the file was disabled will still have access to legacy files. Only new customers will be impacted.

**Enabling or adding files grants access retroactively**

In case you add more files or re-enable existing ones, all current customers and subscribers with the benefit will be granted access.


# Automate Private GitHub Repo(s) Access
Source: https://polar.sh/docs/features/benefits/github-access

Sell premium GitHub repository access with ease

<img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=12d4147b094c8f5b3d002d600757ceb0" data-og-width="2400" width="2400" data-og-height="1374" height="1374" data-path="assets/features/benefits/github/hero.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=63ab6d00001a48eb6e2238a7d3810f8b 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=50de8533120fd2528f0dfc08821f13bc 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c8e2e6f5f7eb1243f5d73005fa99908b 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=913360e5400ee1a5af42173b254b2c34 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=602a9f9247cb101f8c4a85a95df67e33 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/github/hero.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b1470520f9688da10c7d7b451bddff18 2500w" data-optimize="true" data-opv="2" />

## Sell GitHub Repository Access

With Polar you can seamlessly offer your customers and subscribers automated access to private GitHub repositories.

* Fully automated collaborator invites
* Unlimited repositories (via multiple benefits) from your organization(s)
* Users get access upon subscribing & removed on cancellation
* Or get lifetime access upon paying a one-time price (product)

### **Use cases**

* Sponsorware
* Access to private GitHub discussions & issues for sponsors
* Early access to new feature development before upstream push
* Premium educational materials & code
* Self-hosting products
* Courses, starter kits, open core software & more...

## Create GitHub Repository Benefit

1. Go to `Benefits` in the sidebar
2. Click `+ New Benefit` to create a new benefit
3. Choose `GitHub Repository Access` as the `Type`

You first need to `Connect your GitHub Account` and install a dedicated Polar App for this benefit across the repositories you want to use it with.

* Click `Connect your GitHub Account`

<Info>
  **Why do I need to connect GitHub again and install a separate app?**

  This feature requires permission to manage repository collaborators. GitHub Apps does not support progressive permission scope requests. So instead of requesting this sensitive permission from all users (unnecessarily) in our core GitHub Login this feature uses a standalone app instead.
</Info>

Once you've authorized our dedicated GitHub App for this feature you'll be redirected back to Polar and the benefit form - now connected and updated.

### **Repository**

Select the desired repository you want to automate collaborator invites for.

<Info>
  **Why can I only connect organization repositories vs. personal ones?**

  GitHub does not support granular permissions for collaborators on personal repositories - granting them all write permissions instead. Since collaborators would then be able to push changes, releases and more, we do not support personal repositories by default.Want this still? Reach out to us and we can enable it.
</Info>

### **Role**

Select the role you want to grant collaborators.

* **Read (Default & Highly recommended)**
* Triage
* Write
* Maintain
* Admin

Read access (read-only) is what 99.9% of cases should use and the others are highly discouraged unless you have special use cases & absolutely know the impact of these permissions. Checkout the [GitHub documentation](https://docs.github.com/en/organizations/managing-user-access-to-your-organizations-repositories/managing-repository-roles/repository-roles-for-an-organization#permissions-for-each-role) for reference.

<Info>
  Anyone with read access to a repository can create a pull request [(source)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).
</Info>

<Info>
  **Additional Costs for Paid GitHub Organizations**

  GitHub treats collaborators as a seat and they will incurr charges accordingly to your billing unless you're using a free GitHub organization plan. So make sure to confirm you're on a free plan OR charge sufficiently to offset the costs you'll need to pay to GitHub.
</Info>


# Automated Benefits
Source: https://polar.sh/docs/features/benefits/introduction



Polar offers built-in benefit (entitlements) automation for common upsells within the developer &
designer ecosystem with more to come.

* [**Credits**](/features/benefits/credits). A simple benefit that allows you to credit a customer's Usage Meter balance.
* [**License Keys**](/features/benefits/license-keys). Software license keys that you can customize the branding of.
* [**File Downloads**](/features/benefits/file-downloads). Downloadable files of any kind up to 10GB each.
* [**GitHub Repository Access**](/features/benefits/github-access). Automatically invite subscribers to private GitHub repo(s).
* [**Discord Invite**](/features/benefits/discord-access). Automate invitations and granting of roles to subscribers and customers.

## Product & Subscription Benefits

Product and subscription benefits are standalone resources in Polar - connected to one or many products or subscription tiers.

This approach is a bit different from other platforms, but offers many advantages:

* Easy to enable the same benefit across multiple products & subscriptions
* You can change a benefit in one place vs. many
* No duplicate data or work (error prone)
* More intuitive UI for you and your customers

**How customers get access to benefits:**

* ✅ Active subscribers of tiers with the benefit enabled
* ✅ Customers who bought a product with the benefit (lifetime access)
* ❌ Subscribers with an expired subscription (cancelled)
* ❌ Users who are not customers

## Creating & Managing Benefits

You can manage benefits in two ways:

1. Directly within a product create/edit form
2. Or via `Benefits` in your dashboard


# Automate Customer License Key Management
Source: https://polar.sh/docs/features/benefits/license-keys

Sell license key access to your service, software or APIs with ease

<img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=179f2df948e4835f6e8e160b31507c3a" data-og-width="1807" width="1807" data-og-height="923" height="923" data-path="assets/features/benefits/license-keys/hero.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=fd5df2ce54643a72893c02979b2f934a 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e668484882393fee5a4c4709889de083 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0b2edd3d16ac8a699424b4e43623b9a9 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8a26693d265da8debd720c7f353f7e97 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=97f97ac71f3111178accbf4f6ab71d1f 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/license-keys/hero.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=09a569e033695495781eac931e9bf818 2500w" data-optimize="true" data-opv="2" />

You can easily sell software license keys with Polar without having to deal with sales tax or hosting an API to validate them in real-time. License keys with Polar come with a lot of powerful features built-in.

* Brandable prefixes, e.g `POLAR_*****`
* Automatic expiration after `N` days, months or years
* Limited number of user activations, e.g devices
* Custom validation conditions
* Usage quotas per license key
* Automatic revokation upon cancelled subscriptions

## Create License Key Benefit

1. Go to `Benefits` in the sidebar
2. Click `+ New Benefit` to create a new benefit
3. Choose `License Keys` as the `Type`

### Custom Branding

Make your license keys standout with brandable prefixes, e.g `MYAPP_<AUTO_GENERATED_UUID4>`

### Automatic Expiration

Want license keys to expire automatically after a certain time period from when the customer bought them? No problem.

### Activation Limits

You can require license keys to be activated before future validation. A great feature in case you want to limit license key usage to a certain number of devices, IPs or other conditions.

**Enable user to deactivate instances via Polar.** Instead of building your own custom admin for customers to manage their activation instances - leave it to Polar instead.

### Usage Limit

Offering OpenAI tokens or anything else with a variable usage cost? You can set a custom usage quota per license key and increment usage upon validation.

## Customer Experience

Once customers buy your product or subscribes to your tier, they will automatically receive a unique license key. It's easily accessible to them under their purchases page.

Customers can:

* View & copy their license key
* See expiration date (if applicable)
* See usage left (if applicable)
* Deactivate activations (if enabled)

## Integrate API

It's super easy and straightforward to integrate Polar license keys into your application, library or API.

### Activate License Keys (Optional)

In case you've setup license keys to have a maximum amount of activation instances, e.g user devices. You'll then need to create an activation instance prior to validating license keys / activation.

**No activation limit?** You can skip this step.

```bash
curl -X POST https://api.polar.sh/v1/customer-portal/license-keys/activate
-H "Content-Type: application/json"
-d '{
  "key": "1C285B2D-6CE6-4BC7-B8BE-ADB6A7E304DA",
  "organization_id": "fda84e25-7b55-4d67-916d-60ead04ff61f",
  "label": "hello",
  "conditions": { "major_version": 1 },
  "meta": { "ip": "84.19.145.194" }
}'
```

<ParamField path="key" type="string" required>
  Replace with the users license key (from input in your app).
</ParamField>

<ParamField path="organization_id" type="string" required>
  Replace with your organization ID here found in your settings.
</ParamField>

<ParamField path="label" type="string" required>
  Set a label to associate with this specific activation.
</ParamField>

<ParamField path="conditions" type="object">
  JSON object with custom conditions to validate against in the future, e.g IP, mac address, major version etc.
</ParamField>

<ParamField path="meta" type="object">
  JSON object with metadata to store for the users activation.
</ParamField>

#### **Response (200 OK)**

```json
{
  "id": "b6724bc8-7ad9-4ca0-b143-7c896fcbb6fe",
  "license_key_id": "508176f7-065a-4b5d-b524-4e9c8a11ed63",
  "label": "hello",
  "meta": {
    "ip": "84.19.145.194"
  },
  "created_at": "2024-09-02T13:48:13.251621Z",
  "modified_at": null,
  "license_key": {
    "id": "508176f7-065a-4b5d-b524-4e9c8a11ed63",
    "organization_id": "fda84e25-7b55-4d67-916d-60ead04ff61f",
    "user_id": "d910050c-be66-4ca0-b4cc-34fde514f227",
    "benefit_id": "32a8eda4-56cf-4a94-8228-792d324a519e",
    "key": "1C285B2D-6CE6-4BC7-B8BE-ADB6A7E304DA",
    "display_key": "****-E304DA",
    "status": "granted",
    "limit_activations": 3,
    "usage": 0,
    "limit_usage": 100,
    "validations": 0,
    "last_validated_at": null,
    "expires_at": "2026-08-30T08:40:34.769148Z"
  }
}
```

### Validate License Keys

For each session of your premium app, library or API, we recommend you validate the users license key via the
[`/v1/customer-portal/license-keys/validate`](/api-reference/customer-portal/license-keys/validate) endpoint.

```bash
curl -X POST https://api.polar.sh/v1/customer-portal/license-keys/validate
-H "Content-Type: application/json"
-d '{
  "key": "1C285B2D-6CE6-4BC7-B8BE-ADB6A7E304DA",
  "organization_id": "fda84e25-7b55-4d67-916d-60ead04ff61f",
  "activation_id": "b6724bc8-7ad9-4ca0-b143-7c896fcbb6fe",
  "conditions": { "major_version": 1 },
  "increment_usage": 15
}'
```

<ParamField path="key" type="string" required>
  Replace with the users license key (from input in your app).
</ParamField>

<ParamField path="organization_id" type="string" required>
  Replace with your organization ID here found in your settings.
</ParamField>

<ParamField path="activation_id" type="string">
  The activation ID to validate - required in case activations limit is enabled and used (above).
</ParamField>

<ParamField path="conditions" type="object">
  In case of activation instances. Same exact JSON object as upon registration of the activation.
</ParamField>

<ParamField path="increment_usage" type="integer">
  In case you want to increment usage upon validation.
</ParamField>

#### **Response (200 OK)**

```json
{
  "id": "508176f7-065a-4b5d-b524-4e9c8a11ed63",
  "organization_id": "fda84e25-7b55-4d67-916d-60ead04ff61f",
  "user_id": "d910050c-be66-4ca0-b4cc-34fde514f227",
  "benefit_id": "32a8eda4-56cf-4a94-8228-792d324a519e",
  "key": "1C285B2D-6CE6-4BC7-B8BE-ADB6A7E304DA",
  "display_key": "****-E304DA",
  "status": "granted",
  "limit_activations": 3,
  "usage": 15,
  "limit_usage": 100,
  "validations": 5,
  "last_validated_at": "2024-09-02T13:57:00.977363Z",
  "expires_at": "2026-08-30T08:40:34.769148Z",
  "activation": {
    "id": "b6724bc8-7ad9-4ca0-b143-7c896fcbb6fe",
    "license_key_id": "508176f7-065a-4b5d-b524-4e9c8a11ed63",
    "label": "hello",
    "meta": {
      "ip": "84.19.145.194"
    },
    "created_at": "2024-09-02T13:48:13.251621Z",
    "modified_at": null
  }
}
```

Validate `benefit_id` in case of multiple license keys

We require `organization_id` to be provided to avoid cases of Polar license keys being used across Polar organizations erroneously. Otherwise, a valid license key for one organization could be used on another.However, you are required to validate and scope license keys more narrowly within your organization if necessary. Offering more than one type of license key? Be sure to validate their unique benefit\_id in the responses.


# Embedded Checkout
Source: https://polar.sh/docs/features/checkout/embed

Embed our checkout directly on your site

<img src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=721c4f727f588f28851d8da2322daf16" data-og-width="3680" width="3680" data-og-height="2236" height="2236" data-path="assets/features/checkout/embed/demo.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e3f8f37a1c1b77a90c6665f48ce073d7 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=da785d45034ef0b276d690b0529bd798 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e0e25deefa02bde98bf7b14c2d8b9d1a 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c3e65abb8cc2a5f6cd80c060bfbd01cb 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=17fb67d868489bb4155c6f2c3b116ee4 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/embed/demo.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=87bd933324c57090e46d2120f73cd407 2500w" data-optimize="true" data-opv="2" />

You can either copy and paste our code snippet to get up and running in a second or use our JavaScript library for more advanced integrations. Our embedded checkout allows you to provide a seamless purchasing experience without redirecting users away from your site.

## Code Snippet

The code snippet can be used on any website or CMS that allows you to insert HTML.

First, create a [Checkout Link](/features/checkout/links) as described in the previous section. The code snippet can directly be copied from there by clicking on `Copy Embed Code`.

The snippet looks like this:

```typescript
<a
  href="__CHECKOUT_LINK__"
  data-polar-checkout
  data-polar-checkout-theme="light"
>
  Purchase
</a>
<script
  src="https://cdn.jsdelivr.net/npm/@polar-sh/checkout@0.1/dist/embed.global.js"
  defer
  data-auto-init
></script>
```

This will display a `Purchase` link which will open an inline checkout when clicked.

You can style the trigger element any way you want, as long as you keep the `data-polar-checkout` attribute.

## Import Library

If you have a more advanced project in JavaScript, like a React app, adding the `<script>` tag may not be an option. In this case, you can install our dedicated library.

<CodeGroup>
  ```bash npm
  npm install @polar-sh/checkout
  ```

  ```bash pnpm
  pnpm add @polar-sh/checkout
  ```

  ```bash yarn
  yarn add @polar-sh/checkout
  ```
</CodeGroup>

Then, you should import the `PolarEmbedCheckout` helper class and manually call `PolarEmbedCheckout.init()`. This will add the required handlers on elements having the `data-polar-checkout` attribute.

Here is an example in React:

```ts
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed'
import { useEffect } from 'react'

const PurchaseLink = () => {
  useEffect(() => {
    PolarEmbedCheckout.init()
  }, [])

  return (
    <a
      href="__CHECKOUT_LINK__"
      data-polar-checkout
      data-polar-checkout-theme="light"
    >
      Purchase
    </a>
  )
}

export default PurchaseLink
```

<Tip>
  Instead of a Checkout Link, you can also use a [Checkout Session](/features/checkout/session) URL created dynamically from the API.

  For this to work, make sure to set the [`embed_origin`](/api-reference/checkouts/create-session#body-embed-origin) parameter correctly when creating the Checkout Session. For example, if your checkout page is served on the URL `https://example.com/checkout`, you should set `embed_origin` to `https://example.com`.
</Tip>

## Advanced Integration

For users who need more control over the embedded checkout flow, the `PolarEmbedCheckout` class provides several advanced features.

### Programmatically creating an embed

Instead of using declarative triggers with `data-polar-checkout` attributes, you can programmatically create and control checkout instances:

```ts
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

// Open checkout programmatically when needed
const openCheckout = async () => {
  const checkoutLink = "__CHECKOUT_LINK__";
  const theme = "light"; // or 'dark'

  try {
    // This creates the checkout iframe and returns a Promise
    // that resolves when the checkout is fully loaded
    const checkout = await PolarEmbedCheckout.create(checkoutLink, theme);

    // Now you can interact with the checkout instance
    return checkout;
  } catch (error) {
    console.error("Failed to open checkout", error);
  }
};

// Example: Trigger checkout when a button is clicked
document.getElementById("buy-button").addEventListener("click", () => {
  openCheckout();
});
```

### Listening for checkout events

You can listen for checkout events to respond to user interactions:

```ts
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

const openCheckoutWithEvents = async () => {
  const checkout = await PolarEmbedCheckout.create("__CHECKOUT_LINK__");

  // Listen for when the checkout is loaded
  checkout.addEventListener("loaded", (event) => {
    console.log("Checkout loaded");
    // Call event.preventDefault() if you want to prevent the standard behavior
    // event.preventDefault()
    // Note: This would prevent removing the loader if it's still visible
  });

  // Listen for when the checkout has been closed
  checkout.addEventListener("close", (event) => {
    console.log("Checkout has been closed");
    // Call event.preventDefault() if you want to prevent the standard behavior
    // event.preventDefault()
  });

  // Listen for when the checkout has been confirmed (payment processing)
  checkout.addEventListener("confirmed", (event) => {
    console.log("Order confirmed, processing payment");
    // Call event.preventDefault() if you want to prevent the standard behavior
    // event.preventDefault()
    // Note: This would prevent setting the checkout as non-closable
  });

  // Listen for successful completion
  checkout.addEventListener("success", (event) => {
    console.log("Purchase successful!", event.detail);

    // Call event.preventDefault() if you want to prevent the standard behavior
    // event.preventDefault()
    // Note: For success event, this prevents automatic redirection if redirect is true

    // If redirect is false, you can show your own success message
    if (!event.detail.redirect) {
      showSuccessMessage();
    }
    // Otherwise, the user will be redirected to the success URL (unless prevented)
  });

  return checkout;
};
```

### React Integration with event handling

Here's a more complete React example that handles checkout events:

```ts
import { PolarEmbedCheckout } from '@polar-sh/checkout/embed'
import { useState, useEffect } from 'react'

const CheckoutButton = () => {
  const [checkoutInstance, setCheckoutInstance] = useState(null)

  // Clean up checkout instance on unmount
  useEffect(() => {
    return () => {
      if (checkoutInstance) {
        checkoutInstance.close()
      }
    }
  }, [checkoutInstance])

  const handleCheckout = async () => {
      try {
        const checkout = await PolarEmbedCheckout.create(
          '__CHECKOUT_LINK__',
          'light'
        )

      setCheckoutInstance(checkout)

      checkout.addEventListener('success', (event) => {
        // Track successful purchase
        analytics.track('Purchase Completed', {
          productId: 'your-product-id',
          // Add other analytics data
        })

        // Show success message or redirect
        if (!event.detail.redirect) {
          // Handle success in your app
        }
      })

      checkout.addEventListener('close', (event) => {
        // Clean up our reference when checkout is closed
        setCheckoutInstance(null)
      })
    } catch (error) {
      console.error('Failed to open checkout', error)
    }
  }

  return (
    <button onClick={handleCheckout}>
      Complete Purchase
    </button>
  )
}

export default CheckoutButton
```

### Programmatically closing checkout

In some cases, you might need to programmatically close the checkout - for instance, if you detect that a user needs to take an action elsewhere in your application first:

```ts
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

// Example: open checkout and store the instance
let activeCheckout = null;

async function openCheckout() {
  const checkout = await PolarEmbedCheckout.create("__CHECKOUT_LINK__");
  activeCheckout = checkout;
  return checkout;
}

// Later, close it programmatically when needed
function closeCheckout() {
  if (activeCheckout) {
    activeCheckout.close();
    // The 'close' event will fire automatically
    // Don't set activeCheckout to null here, as we'll handle that in the event listener
  }
}

// Add a listener to update our reference when checkout is closed
function setupCheckout(checkout) {
  checkout.addEventListener("close", (event) => {
    // Reset our reference when checkout is closed
    activeCheckout = null;
  });
  return checkout;
}

// Example usage
document.getElementById("open-checkout").addEventListener("click", async () => {
  const checkout = await openCheckout();
  setupCheckout(checkout);
});
document
  .getElementById("close-checkout")
  .addEventListener("click", closeCheckout);
```

## Enabling Wallet Payment Methods (Apple Pay, Google Pay, etc.)

Wallet payment methods such as Apple Pay and Google Pay are supported in the checkout with the following conditions:

* **Apple Pay** appears automatically in the checkout if:
  * The user is on an Apple device
  * The browser is Safari
  * The device is connected to an Apple account with Apple Pay configured

* **Google Pay** appears automatically in the checkout if:
  * The user is on Google Chrome
  * The browser is connected to a Google account with Google Pay configured

**No additional action is required** if you meet these conditions and are not using an embedded checkout.

### Enabling Wallet Payments for Embedded Checkout

By default, wallet payment methods (Apple Pay, Google Pay, etc.) are **not enabled** when you embed our checkout form into your website. For security reasons, your website domain needs to be manually validated before enabling these payment methods in embedded mode.

To enable wallet payment methods on your embedded checkout, please [email us](mailto:support@polar.sh) with:

* Your organization slug
* The domain you wish to allow for wallet payments


# Checkout Links
Source: https://polar.sh/docs/features/checkout/links

Sell your digital products with ease by sharing a checkout link to select products

Checkout links can be shared or linked on your website which automatically
creates a checkout session for customers.

<Tip>
  Looking for a way to generate Checkout session programmatically? Checkout
  Links might not be the right tool for you. Instead, you should use the
  [Checkout API](/features/checkout/session).
</Tip>

## Create a Checkout Link

Checkout Links can be managed from the **Checkout Links** tabs of the Products section. Click on **New Link** to create a new one.

<Frame>
  <img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=72a31513d6f7226cc17e94b4c58ca2cd" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/checkout/links/create.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2a601b4e14c78c6a3a86f4695cb0e874 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=738a28ee21637ac4897fb77cae731173 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d5be5ff69604d81851a21811342f40f0 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1dbf2230a8d62f3eca56f143c89bd3d5 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f8558ed91355eb9c7ff8d06c87948f23 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=58d314816ed83e11395270b7cae32a05 2500w" data-optimize="true" data-opv="2" />

  <img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=17c40b706377d71c9e5d73b4ee1e1ebe" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/checkout/links/create.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a88117255fb447f2167a901dc44bd786 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0a69d0efc11e9b8622ff3ccb23f4a6ff 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=09c1d11b23cac91601239d820dadc57f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2c64df021ceb0683ac37ceb4ae0192e6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=74d157d480eb828b0ec4dd180b7e3376 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/create.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=109598098aa62f2e37805ac7bf1d1261 2500w" data-optimize="true" data-opv="2" />
</Frame>

#### Label

This is an internal name for the Checkout Link. It's only visible to you.

#### Products

You can select one or **several** products. With several products, customers will be able to switch between them on the checkout page.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0cce5b2ade56d8be88bcecd1b59a9426" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/links/checkout_multiple_products.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=81d388ddcfb786bb86cc09d9cf9ba637 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=dbcfdd0c2a27b2d3d29e3cf1448a1904 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e1374223415627f8c45d1ef4d56a9535 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=efd59ce3ad4738fa316b18ead4a6c93c 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=799013832ed88bfa4a8709e6e31ec13c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=93fdb67c6e863d2a3d42b4e6106beecd 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=284cedc2ba0bee4bc5a35c8571f9884a" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/links/checkout_multiple_products.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=28ad596f39f0071cdf6ebff24dd924af 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a458623c56f532dd1107ceb10df8c00c 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0f3c313cde746fb224893f493f46ec36 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c7d5cddba9a739f8a6b426aedc94e362 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=232c97d2f61fec1a91697edfcd68a01c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_multiple_products.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bfd17425e10cd466072e1238183b5f7e 2500w" data-optimize="true" data-opv="2" />

#### Discount

You can disable discount codes, if you wish to prevent customers from using them.

You can also preset a discount: it'll be automatically applied when the customer lands on the checkout page.

#### Metadata

This is an optional key-value object allowing you to store additional information which may be useful for you when handling the order. This metadata will be copied to the generated Checkout object and, if the checkout succeeds, to the resulting Order and/or Subscription.

## Using Checkout Links

You can share the Checkout Link URL on your webpage, social media, or directly to customers.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0cea22165e21ee7df3bb8b40fd6c802d" data-og-width="1320" width="1320" data-og-height="1030" height="1030" data-path="assets/features/checkout/links/checkout_link.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8eaa90d8814cd2a0bd7da1463bdc76c8 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a706e71e5ff949498115ec1ef8aa341a 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bff20c898abc7d24b5f13fc6be80773b 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=19ac59f8dc034a68eefbf60f27c9ac90 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=93e300396799bd58d70012b6bb57e532 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=232769397ef0a371aec554b8b951a38b 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=52995548b0c4a6b960981f91c663174e" data-og-width="1320" width="1320" data-og-height="1030" height="1030" data-path="assets/features/checkout/links/checkout_link.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=51bafd1fda3dff32a0d380a93294af6a 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ad493c46a4f264c513bbd7155aa7f8ea 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5013674a50e89c7712952b968c4800d5 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=eb532d2bd4a06e919c03d560158a3abd 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=599bef0ee892334a94f1a15faa9779c4 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/links/checkout_link.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=86d193d3f120d300194d4659c3647228 2500w" data-optimize="true" data-opv="2" />

<Warning>
  Checkout Links will go against our API, and redirect to short-lived Checkout session. This means that the Checkout page the user will end up on, are temporary and expires after a while if no successful purchase is made.

  This means that you need to make sure to always use this Checkout Link URL (as shown above). If you mistakenly copy the URL from a Checkout Session, the link will expire.
</Warning>

### Query parameters

You can pass optional query parameters to your Checkout Links.

#### Prepopulate fields

You can prefill the checkout fields with the following query parameters:

<ParamField path="customer_email" type="string">
  Prefill customer email at checkout
</ParamField>

<ParamField path="customer_name" type="string">
  Prefill customer name at checkout
</ParamField>

<ParamField path="discount_code" type="string">
  Prefill discount code
</ParamField>

<ParamField path="amount" type="string">
  Prefill amount in case of Pay What You Want pricing
</ParamField>

<ParamField path="custom_field_data.{slug}" type="string">
  Prefill checkout fields data, where `{slug}` is the slug of the custom field.
</ParamField>

#### Store attribution and reference metadata

The following query parameters will automatically be set on Checkout [`metadata`](/api-reference/checkouts/get-session#response-metadata).

<ParamField path="reference_id" type="string">
  Your own reference ID for the checkout session.
</ParamField>

<ParamField path="utm_source" type="string">
  UTM source of the checkout session.
</ParamField>

<ParamField path="utm_medium" type="string">
  UTM medium of the checkout session.
</ParamField>

<ParamField path="utm_campaign" type="string">
  UTM campaign of the checkout session.
</ParamField>

<ParamField path="utm_content" type="string">
  UTM content of the checkout session.
</ParamField>

<ParamField path="utm_term" type="string">
  UTM term of the checkout session.
</ParamField>


# Checkout API
Source: https://polar.sh/docs/features/checkout/session

Create checkout sessions programmatically for complete control

If you want to integrate more deeply the checkout process with your website or application, you can use our dedicated API.

The first step is to [create a Checkout session](/api-reference/checkouts/create-session). For this you'll need at least your **Product ID**.

You can retrieve your Product ID from Products in your dashboard, click on "context-menu" button in front of your product and click on Copy Product ID.

The API will return you an object containing all the information about the session, including **an URL where you should redirect your customer** so they can complete their order.

## Multiple products

You can create a checkout session with multiple products. This is useful if you want to allow your customers to choose between different products before they checkout.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=36f88ae4e5e70735484c068f3605b713" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=04994e58aef6964bcbad83136d7a623b 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=97436039cd7d08c4ca762d81dada1a73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3bf82c3989003e71f22a230a25db119f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10505f70deec13a9097af4daa1d04b86 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=47784df3a7278ec4df21c13c3ff81b5c 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f91a412a12601270ac3bfadd82832e7e 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=82f61a0c8e8108b64d214c223d9a0f67" data-og-width="3840" width="3840" data-og-height="2500" height="2500" data-path="assets/features/checkout/session/checkout_multiple_products.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06d12edfe721f4ed1686a09110f935be 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7bfedd743a9e5a2e2924f072218a6d73 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d931de8df011738cedb1988f3c7adaee 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bd13134692851f71dd9228f52558b8a6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5396835651699c364b553bcc5ea9f34d 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/checkout/session/checkout_multiple_products.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8b2984d955958ad755028e2760028fcd 2500w" data-optimize="true" data-opv="2" />

## External Customer ID

Quite often, you'll have your own users management system in your application, where your customer already have an ID. To ease reconciliation between Polar and your system, you can inform us about your customer ID when creating a checkout session through the [`external_customer_id`](/api-reference/checkouts/create-session/) field.

After a successful checkout, we'll create a Customer on Polar with the external ID you provided. It'll be provided through the `customer.external_id` property in webhooks you may have configured.

## SDK examples

Using our SDK, creating a checkout session is quite straightforward.

<CodeGroup>
  ```ts TypeScript
  import { Polar } from "@polar-sh/sdk";

  const polar = new Polar({
    accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
  });

  async function run() {
    const checkout = await polar.checkouts.create({
      products: ["productId"]
    });

    console.log(checkout.url)
  }

  run();
  ```

  ```py Python
  from polar_sdk import Polar

  with Polar(
      access_token="<YOUR_BEARER_TOKEN_HERE>",
  ) as polar:

      checkout = polar.checkouts.create(request={
          "allow_discount_codes": True,
          "product_id": "<value>",
      })

      print(checkout.url)
  ```
</CodeGroup>


# Custom Fields
Source: https://polar.sh/docs/features/custom-fields

Learn how to add custom input fields to your checkout with Polar

By default, the Checkout form will only ask basic information from the customer to fulfill the order: a name, an email address, billing information, etc. But you might need more! A few examples:

* A checkbox asking the customer to accept your terms
* An opt-in newsletter consent
* A select menu to ask where they heard from you
* ...

With Polar, you can easily add such fields to your checkout using **Custom Fields**.

## Create Custom Fields

Custom Fields are managed at an organization's level. To create them, go to **Settings** and **Custom Fields**. You'll see the list of all the available fields on your organization.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9336e8c093e8554f3c876539b0a04dfc" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/custom_fields.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=99738023cb392ee16d02c7054e9754a9 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=048d0d106f56c8edaef22aef0e99dd81 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=34107884543bfd1c72905cc70549689b 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=008ff767bd951aa023dfee7f7979bc5a 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0bc7971296e76e6a605755ffab93f55a 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5f172512315eb713c17eb17978044337 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5ef991dece22a9936a56ba80ff2b7f0b" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/custom_fields.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=fc52ba0c61d624545ea29c159494231e 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7c6ccbf7fdca8a9a21c4113cd38f9baa 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c77df99ab9f9595201730d7b0fa97539 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d64b3fa5d15352ff291393b944b1819e 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c3be6ef25b4c9109d2879740e5a60652 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ff9d438f6dcc5b86ed9bb62009a32500 2500w" data-optimize="true" data-opv="2" />

Click on **New Custom Field** to create a new one.

### Type

The type of the field is the most important thing to select. It determines what type of input will be displayed to the customer during checkout.

The type can't be changed after the field is created.

We support five types of fields:

#### Text

This will display a simple text field to input textual data. By default, it'll render a simple input field but you can render a **textarea** by toggling the option under `Form input options`.

Under `Validation constraints`, you can add minimum and maximum length validation.

Underneath, the data will be stored as a string.

#### Number

This will display a number input field. Under `Validation constraints`, you can add minimum and maximum validation.

Underneath, the data will be stored as a number.

#### Date

This will display a date input field. Under `Validation constraints`, you can add minimum and maximum validation.

Underneath, the data will be stored as a string using the ISO 8601 format.

#### Checkbox

This will display a checkbox field.

Underneath, the data will be stored as a boolean (`true` or `false`).

#### Select

This will display a select field with a predefined set of options. Each option is a pair of `Value` and `Label`, the first one being the value that'll be stored underneath and the latter the one that will be shown to the customer.

### Slug and name

The slug determines the key that'll be used to store the data inside objects related to the checkout, like Orders and Subscriptions. It must be unique across your organization. You can change it afterwards, we'll automatically update the data to reflect the new slug.

The name is what we'll be displayed to you to recognize the field across your dashboard. By default, it'll also be the label of the field displayed to the customer, unless you customize it under `Form input options`.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6f8ed2dbf246c197d69eabc7b21f0c11" data-og-width="1620" width="1620" data-og-height="2334" height="2334" data-path="assets/features/custom-fields/create_custom_field.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7145aa50e436d95a00ae6daa21844dd8 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c5ea12890fe0a4c56ae6cf65109bba36 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10209fe5d1ee0ce9e81dd2ffd21515ac 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f7f9b8c239476a79ada1198ce9d67ca3 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3e5ffcbb2a8ef05b39f77de327b54bb6 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=45309ac3f5dbb22a07c847be60ba6162 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7b328aefe3e549d8f5b3239ed4ab6c8a" data-og-width="1620" width="1620" data-og-height="2334" height="2334" data-path="assets/features/custom-fields/create_custom_field.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f007d5a459da5fd3a3ffec21065d4adf 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=289bded19a3c21dbf4545869ce1ec08e 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=65aa7cee7b5bed0709b3c1c1b1b84732 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=29a401893fa916d2a501b6522e9c7062 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e98f035efdf080491a243aaa00f1e7c5 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/create_custom_field.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=341b56ceead350f11e635508f8abe638 2500w" data-optimize="true" data-opv="2" />

### Form input options

Those options allow you to customize how the field is displayed to the customer. You can set:

* The label, displayed above the field
* The help text, displayed below the field
* The placeholder, displayed inside the field when there is no value

The label and help text supports basic Markdown syntax, so you can add bold, italic or even links.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ab5165a85316c4f7fcf18a7a1fddc1ed" data-og-width="1383" width="1383" data-og-height="132" height="132" data-path="assets/features/custom-fields/label_markdown.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=19844fefa75decc0601c8128e98d9c96 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=be9c366a882e53983a18c8b400e7bc06 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ef4676c752357a75de68d6983051be6e 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9daa35911458a0ac34d3f7b81711f563 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bba0de986dcc4038e3484214f7de8eaf 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=532f364ac05a4f92b5e7da1b5ca35269 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=37edbb93d8023a969f300f0c6ed64ec1" data-og-width="1383" width="1383" data-og-height="132" height="132" data-path="assets/features/custom-fields/label_markdown.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0765fc54e2d5ae68cb8b40313ff12731 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=62e402a85a3b7caf2af24e094be9ba2a 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=33b9838694288f840345e0bb0f969495 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=767e6b797327290e8019fefecac9916f 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5ad6b20342db96da76c9f37d143c1366 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/label_markdown.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=73f6e72be1efd3d8c36c5c51451f2ad1 2500w" data-optimize="true" data-opv="2" />

## Add Custom Field to Checkout

Custom Fields are enabled on Checkout specifically on each **product**. While [creating or updating](/features/products) a product, you can select the custom fields you want to include in the checkout for this product.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3e6f915cce570e5557be4840a8b3635f" data-og-width="3837" width="3837" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/add_custom_field.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4bdcf4810737beb41ed521a928407635 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c2041fe74136e03ef388644aeea7a434 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d6071ab1af356051ed83715e177dee00 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=58f8ba77347b09fee18ac471c4907611 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8f56592489d9413d31854657234331fc 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=aeff088270d57722f9da8becba3105b1 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=112f8074ec995496251095ebd4df8357" data-og-width="3837" width="3837" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/add_custom_field.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0f6ada199c79681b31d6dd4258d65272 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=504c37f51d4e036374057188caf7cfc6 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=85010fa50961e1669864d9dffaeb2d9e 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3f2f1b750428c92f7811eefda4babe16 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9841ba793d86860a77ff28864ffba5aa 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/add_custom_field.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a8b6597bff942af6791ed8db7710938a 2500w" data-optimize="true" data-opv="2" />

Note that you can make the field `Required`.

<Tip>
  If you make a **checkbox** field **required**, customers will have to check
  the box before submitting the checkout. Very useful for terms acceptance!
</Tip>

The fields are now added as part of the Checkout form for this product.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4e3f32d0f537cf0380c4a8a115202768" data-og-width="1866" width="1866" data-og-height="4245" height="4245" data-path="assets/features/custom-fields/custom_fields_checkout.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1893b34f87e7c82e92f8e6b3f59332e1 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e0538da0d07c346dd56da836812d40f9 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b749a6b21fb0267de676e8202ff82da5 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=651735fedc7da7960627e85c69666654 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7cb564705010222b816c593a434a7b64 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=58a42c1de4ed2717c3873bccdee3d5d7 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=68bf181a740cd2112944ad02fac3cd19" data-og-width="1866" width="1866" data-og-height="4245" height="4245" data-path="assets/features/custom-fields/custom_fields_checkout.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=37b05d38a102673642ad98226dba6a09 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9428f14dbb8a2fbc963fb736c772c390 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7793c80f3b096e26fb1438894b73b4aa 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4333ac142a8c12f93374f2fa5077c1c0 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ad26d11aa34ef27f3f176e9b1ec36ee6 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_fields_checkout.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=66c1d2c61a0b953ae79e833f527423b8 2500w" data-optimize="true" data-opv="2" />

## Read data

Once you have added Custom Fields to your organization, they'll be automatically displayed as a column in your `Sales` page, both on Orders and Subscriptions. From there, you'll be able to see the data input by the customer.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=775aed8bcca102fe3a9caf11e8206589" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/custom_field_data.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=856ce9f562e46e391a38f4d2f593dca5 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f832cc93c8243197a5dd468f10e487dc 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8c5618d4d3f450eacaff556d342da7f5 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=268debb6a903f1e9909ad85b4bdbbc3f 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6b8d02bcf00ddf2840fd1c7b5c65769a 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9bb67b0942b01aeb4cef525eff57a7ce 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e519df0b07c7c4ce98f43d2db87d617d" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/custom-fields/custom_field_data.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6137a51ded5e20729371330eab9c2b5a 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4ff972940db450a9500ca9f826459926 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=40e5347906d7d65f567123b6c0ef9ceb 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=20a253bb440e190ecaff8bb9a4ff71fb 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=05052261aa334be53809a8fc3d3c53d6 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/custom-fields/custom_field_data.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9ce699636347368146bd0dd6360158ae 2500w" data-optimize="true" data-opv="2" />

This data is also available from the [Orders](/api-reference/orders/get) and [Subscriptions](/api-reference/subscriptions/get) API, under the `custom_field_data` property. Each value is referenced by the **slug** of the field.

```json
{
  // ...
  "custom_field_value": {
    "terms": true,
    "source": "social_media"
  }
}
```


# Customer Management
Source: https://polar.sh/docs/features/customer-management

Get insights on your customers and sales

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=dc8cb8a0793331ec889f89f3b84d33ac" data-og-width="3586" width="3586" data-og-height="2058" height="2058" data-path="assets/features/customer-management/details.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bae78683c0d08af7443429396e34ff37 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3373c7a73fd4466b11e869a77d565087 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=77b4dfed4b853207f4f7bcc80cfbc8c5 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4203867948a461a250e4fd8a0e0b80b4 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=9b8c2177ae145edd18da9d342e6b41bc 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=eabd97efe2c60bf0d4383b5b2ffb9040 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=53377b04b7d065e66102c0a2141118fb" data-og-width="5110" width="5110" data-og-height="2642" height="2642" data-path="assets/features/customer-management/details.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bbd9c9c7ce8485be5e5f915a3a50ce59 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2a8289667951ee421994f95ab675e8ec 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=92b6c0e70e36f730ca69201ee3d6a0c2 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1ed6e42cf08b7d6493e66a8ebf40880e 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2fb8048d2b752758b307b972d51a8293 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/details.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d3677f8c6668c78a86fbebc3ec990c68 2500w" data-optimize="true" data-opv="2" />

## Managing Customers

Polar has a built in feature to view and manage your Customers.

Everyone who has ever purchased something from you will be recorded as a Customer to your Organization. You’re able to see past orders and their ongoing subscriptions, as well as some additional metrics.

## External ID

Quite often, you'll have our own users management system in your application, where your customer already have an ID. To ease reconciliation between Polar and your system, we have a dedicated [`external_id`](/api-reference/customers/get-external#response-external-id) field on Customers. It's unique across your organization and can't be changed once set.

We have dedicated API endpoints that work with the `external_id` field, so you don't even have to store the internal Polar ID in your system.

<Card title="Get Customer by External ID" icon="link" href="/api-reference/customers/get-external" horizontal />

<Card title="Update Customer by External ID" icon="link" href="/api-reference/customers/update-external" horizontal />

<Card title="Delete Customer by External ID" icon="link" href="/api-reference/customers/delete-external" horizontal />

## Metadata

You may set additional metadata on Customers. This can be very useful to store additional data about your customer you want to be available through our API and webhooks.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=00c8cdfc037e19bfe63045c1d9d9459e" data-og-width="1498" width="1498" data-og-height="960" height="960" data-path="assets/features/customer-management/edit.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2311a62fc87614187fdc6db3cf6dcc4e 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3136da81850bbf5112a08da4dd331a90 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4d0dc1e893909a66008cae1d58d1bb79 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0a45a8134a21dbb82eef752f96c88e11 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2fc8bb0d02e3f5855ac354d26529eec6 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4dde37266fa28b5479ddd3a3eaac611e 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1981f637bea304c95d62ed7b7d85d14f" data-og-width="1512" width="1512" data-og-height="964" height="964" data-path="assets/features/customer-management/edit.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=88775acf708be69243d11458acf316cf 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e5119c234bc4c23d48135d83ce06349e 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2b2d2e7fef128546a7bc00d9d9d25c45 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b8ed1faa8b58f5775359d737eb762315 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=046e0d5acd6f5a6128566168d1acc316 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-management/edit.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=684fac2c9c0f32548cf08dd328875e54 2500w" data-optimize="true" data-opv="2" />

It can be set through the dashboard or through the [API](/api-reference/customers/update#body-metadata). It can also be pre-set when creating a Checkout Session by using the [`customer_metadata`](/api-reference/checkouts/create-session#body-customer-metadata) field. This way, after a successful checkout, the metadata will automatically be set on the newly created Customer.


# Customer Portal
Source: https://polar.sh/docs/features/customer-portal

Enable customers to view & manage orders and subscriptions easily

The Customer Portal is a destination where your customers can see their orders and ongoing subscriptions. It’s also where they’re able to get hands on receipts, benefits, and more.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=20c5b716cad34eae8c8826867b5ca193" data-og-width="2560" width="2560" data-og-height="1600" height="1600" data-path="assets/features/customer-portal/overview.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8f01ea1d4e91c09f49c2476110386353 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c9d66922828a39dc3ac909b30917b446 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=785ee603adb693a4fa829d93a606ab77 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=324319684f981d20851136ffcb88ee67 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f18087ef61f5465d0ed023a028872083 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e2ca2157b2bd081ac151da31307406f5 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=632bacb36eafb5ff4dbe0ab5df3d99e3" data-og-width="2560" width="2560" data-og-height="1600" height="1600" data-path="assets/features/customer-portal/overview.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=35b91aae9a98baf708121c72c68d39bc 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4522200fcbfce8b1eaf4030533fb90b4 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=46a007396278fb0e8f0a56f8dacc8b0d 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=59efb6fd2b7be5c0fb2b8bd09c231085 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6e82b4f155efb4e91c24ed7acb607c78 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/overview.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=2089aef4bba333852bc03de6a003806d 2500w" data-optimize="true" data-opv="2" />

## Redirect to your Customer Portal

The customer portal is directly available from the URL `https://polar.sh/your-org-slug/portal`. Your customers will be able to authenticate there by entering the email they used to purchase or subscribe to your products.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1320caeb29255a378aa93359741683dc" data-og-width="2560" width="2560" data-og-height="1600" height="1600" data-path="assets/features/customer-portal/signin.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=06755f525ecbcbb281e1a6ee4bbb3ae6 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7a4faf4286bd9cce515605645d9a2438 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=922cbbc24b93ce5ecbf039df1c39eb7f 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=de1643211047afbb1cbf9f271b30c90d 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0f96da032474ec30ff2b9507fbb4dd47 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7c26c94ab8ba80ea4b157bbcdb20a143 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ccae95a5124e942c32465d86d3a3c2be" data-og-width="2560" width="2560" data-og-height="1600" height="1600" data-path="assets/features/customer-portal/signin.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=fba70cd56605613ebaa2d15d88d14dd0 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5825af76eb943ab0616a3c51845bdbfd 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1dfa40c2881bc64c6181a61fc0b0dfc0 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b556c0723753d57745205ae9af24bb6f 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=dc6beb4d5a7b576d90074e2424f2fd0a 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/customer-portal/signin.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=902d186439610cffb4414735903adf1c 2500w" data-optimize="true" data-opv="2" />

Customer Portal Sign In

## Creating an authenticated Customer Portal Link

You can provide a pre-authenticated Customer Portal Link to your customers. This is handy if you want to redirect them directly from your application.

Using the Polar API, all you need is to call the `customerSessions` endpoint. Here’s an example using our TypeScript SDK.

```typescript
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

async function run() {
  const result = await polar.customerSessions.create({
    customerId: "<value>",
  });

  redirect(result.customerPortalUrl)
}

run();
```

Or, if you use NextJS as your framework, we have a handy utility which shortens down your code significantly.

```typescript
// app/portal/route.ts
import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  getCustomerId: async (req) => '<value>',
  server: 'sandbox' // Use sandbox if you're testing Polar - pass 'production' otherwise
});
```


# Discounts
Source: https://polar.sh/docs/features/discounts

Create discounts on products and subscriptions

Discounts are a way to reduce the price of a product or subscription. They can be applied to one-time purchasable products or subscriptions.

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3c4044637217753344822d88e4807de7" data-og-width="2598" width="2598" data-og-height="1710" height="1710" data-path="assets/features/discounts/create.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=68c6dde8e228e487236c57c1a4662e7c 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d5c23eaed21e4222942bcc01fbffa12c 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c5299db162e19f12339ef6a918cef77a 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=419bdefa767de5a45bdc2e37ff7f7464 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4f739cc64b4056a3489b92c74e5d5d26 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f86b965d715c16caf6f4b56b75e56182 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=42b5287244d46cabf83fce057270dafe" data-og-width="2414" width="2414" data-og-height="1702" height="1702" data-path="assets/features/discounts/create.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f4a8a684b3167574299c44dd943c79d7 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=93359f47f1550465094b1f3d07cc7f3d 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=54cb09d31fd6519568f09dcd0b41f9a8 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0afbe2464830888bfd8e81ef759ab2e6 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cbf2607c8b664696a2c55106c3eeabdc 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/discounts/create.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c946617093723bdd2fcdf45acb2cdb8c 2500w" data-optimize="true" data-opv="2" />

## Create a discount

Go to the **Products** page and click on the **Discounts** tab.

#### Name

Displayed to the customer when they apply the discount.

#### Code

Optional code (case insensitive) that the customer can use to apply the discount. If left empty, the discount can only be applied through a Checkout Link or the API.

#### Percentage Discount

The percentage discount to apply to the product or subscription.

#### Fixed Amount Discount

The discount deducts a fixed amount from the price of the product or subscription.

#### Recurring Discount

The percentage discount to apply to the product or subscription.

* **Once** The discount is applied once.
* **Several Months** The discount is applied for a fixed number of months.
* **Forever** The discount is applied indefinitely.

#### Restrictions

* **Products** The discount can only be applied to specific products. By default the discount can be applied to all products, also ones created after the discount was created.
* **Starts at** The discount can only be applied after this date
* **Ends at** The discount can only be applied before this date
* **Maximum redemptions** The maximum number of times the discount can be applied.

## Apply a discount

Discounts can be applied to a Checkout Link or a Checkout Session.


# Setup a Payout Account
Source: https://polar.sh/docs/features/finance/accounts



## Connect Payout Account

You need to setup an account so that we can issue [payouts](/features/finance/payouts).

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3e8753cc9ed378fb8fbcccc90a103805" data-og-width="1764" width="1764" data-og-height="122" height="122" data-path="assets/features/finance/accounts/onboarding.light.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d23fc05f85d95c4f1118e5e53d2123a6 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=76371132b7b8796537d17beb9d5e37d2 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a57d8982cc281a118f65e84c1e37c92d 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3d1770bd2e16045920d438cea0e3b039 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ae9a44f26b18a51e99f854631b96488b 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.light.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=371bb135b3bf22d7dd0870399edc1bcd 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=28d52eb8f51bc8508d4a9ad7362fac73" data-og-width="1764" width="1764" data-og-height="124" height="124" data-path="assets/features/finance/accounts/onboarding.dark.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b941bdf218edbc0d64b7e8d3d40984ea 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cd9c903fd3057fb712b83093a70552df 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=1e422dc85feed9441e0d84f4abe71f77 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b78a2ede5c816891f768d7f055836a0e 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=999e2ccb820157f42690f5bd94686e37 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/onboarding.dark.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c6d365b0dafe3b04c4fc6210f4bc3c61 2500w" data-optimize="true" data-opv="2" />

1. Go to the `Finance` page in your Polar dashboard
2. Click `Setup` in the card shown above in your dashboard
3. Choose account type & follow their setup instructions

*This is only required the first time and you can do this proactively too in order - recommended to avoid any additional delays.*

### Stripe Connect Express

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=42e607628ce93340ba7a1137f976da65" data-og-width="1794" width="1794" data-og-height="612" height="612" data-path="assets/features/finance/accounts/create.light.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b2f28752e52cf5ddd12cecd103f5cb93 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=3a40171a7ca59fa67ef7e3037ec04792 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=7da85808b33c0e23ea97cc31a949559a 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=af81ee6d951c320f6683cc2d972b6cec 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=0f1bbcab0c3810923dc16eeb90580363 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.light.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f7a930718380c76180aacd99e6a105e1 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=e26f1f4573f9670ed7a4f2f8acb7d0a1" data-og-width="1794" width="1794" data-og-height="604" height="604" data-path="assets/features/finance/accounts/create.dark.jpeg" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a382e69965e427ec88df07e7b9a6e516 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8afd5ac9a49b24b43114499e47abab78 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=24504b2a71abafec31ffc2a8c9804557 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=5ac1f6b3e9eb56d5c160adec3794e87b 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=d316f841046371fcbbbbabb902a9dc49 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/finance/accounts/create.dark.jpeg?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c9034aace3d938454c13531cca1b4cf2 2500w" data-optimize="true" data-opv="2" />

Stripe is the default and recommended option since it enables instant transfers.


# Account Balance & Transparent Fees
Source: https://polar.sh/docs/features/finance/balance

Monitor your Polar balance without hidden fees

You can see your available balance for payout at any time under your `Finance` page.

## Polar Balance

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=603040c0ac9331aa9f71061ce20401fe" data-og-width="2700" width="2700" data-og-height="1655" height="1655" data-path="assets/features/finance/balance/overview.light.jpeg" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6529976df66cd742e20c10ebb55e0ae4 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=69d38a80ec87b8570ac2de258c2aca5a 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eee05402a367e6b6ff852a6bd1affc73 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=478a2087cc991fe8e1ee79c7df3b4c15 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=86fa56a53c17368478745b16eca9bcc6 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.light.jpeg?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c0f49ccecfa3816949bf667aef241d7 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4ac9458eabafcf793d75e6f3ed1fba5" data-og-width="2700" width="2700" data-og-height="1655" height="1655" data-path="assets/features/finance/balance/overview.dark.jpeg" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6856965e705e0a7780a314efd51323e9 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f961a0dc4422622252b8bcb1e14807d5 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ba183428c854b03b7298925de3a8ea71 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=632b277632ce76ca121f02f03bf887e4 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6829eb56c20281d715f0f157a5fcc640 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/balance/overview.dark.jpeg?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9b705aa285731285b606a34dc6aa3c51 2500w" data-optimize="true" data-opv="2" />

Your balance is all the earnings minus:

1. Any VAT we've captured for remittance, i.e balance is excluding VAT
2. Our revenue share (4% + 40¢)

All historic transactions are available in chronological order along with their associated fees that have been deducted.

Note: Upon [payout (withdrawal)](/features/finance/payouts), Stripe incurs additional fees that will be deducted before the final payout of the balance.


# Payouts
Source: https://polar.sh/docs/features/finance/payouts

Easily withdraw money from your Polar account at any time

You can issue a withdrawal, i.e payout, at any time once there is at least **\$10 on your balance**. We will then transfer the balance minus Stripe payout fees (see below) to your Stripe account & issue a payout on their side.

## Manual Withdrawal

We require this to be done manually since:

1. Users have requested control for easier accounting vs. frequent & small payouts
2. Giving users control of Stripe payout fees

## **Stripe Payout Fees**

1. \$2 per month of active payout(s)
2. 0.25% + \$0.25 per payout
3. Cross border fees (currency conversion): 0.25% (EU) - 1% in other countries.

Given the fixed costs, we want to default to manual payouts so you can control when you want to incur them and do it once vs. per each individual transaction in order to reduce the overall fees.

## Reverse invoices

Since we're the Merchant of Record, your customers get an invoice from Polar. Thus, for your accounting, you need to issue an invoice to Polar for the amount we paid out to you. To ease this process, we can automatically generate a **reverse invoice** for you, detailing the sells we made on your behalf, minus our fees.

You can generate them from the **Payouts** page under **Finance** in your Polar dashboard. Click on the ellipsis next to the payout you want to generate a reverse invoice for, and select **Download invoice**.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=40ec44b479a7df5eda411f5a78efb007" data-og-width="3120" width="3120" data-og-height="2352" height="2352" data-path="assets/features/finance/payouts/download.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb7bb80dd439c561b090ebd235944f94 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cc6713f08cc15b4500cc3d35a2b3466b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9aebb3d34f319d33e6e6322fa06031b9 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81da6c8f5e4c7898575c24ef5664c87a 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ab50f3f8394580bf5aac81adc2296e88 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3b8a9f013ca990ef5c41f450916941fa 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=05f61e1a55d50ab99578c60b38b2dba8" data-og-width="3120" width="3120" data-og-height="2352" height="2352" data-path="assets/features/finance/payouts/download.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2967273df8ce5f2d36e25deb8392bde5 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3b8929a716ae3c360ec85220c24a126a 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3eb07e86cd3e5e4a40851c44d248c613 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b6729b01b076fc738c600455761e428d 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0a75de9a244d44f2d073f3228a035cc0 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/download.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=669c04eeca43efdb65bfa7851a485a94 2500w" data-optimize="true" data-opv="2" />

A modal will open, allowing you to:

* Set your billing name and address.
* Add information shown below your billing address.
* Add notes shown at the bottom of the invoice.
* Customize the invoice number. By default, we generate one like `POLAR-0001`, but you can change it to your own format and sequence.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=14a707adf05125dd6ffa2adf110e8a85" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/finance/payouts/generate.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c73992012e6e856c17844654571dee7b 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8752891d4a18f61c8d925b7a534125e9 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2175eb00739053f72fcf606ddfebf073 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e8eb0e887e5b0afc11a4530f3094f74b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4f3ef364476cbc2b967b8f3fea3c8c78 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b8c50729f9c429d12802feee26f43f0a 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a0cbb2660c294ef3042e4fdfe4eed7f" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/finance/payouts/generate.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fab78703b125a33119834aa4fbace888 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fcf1095d697c75c475b0184e0dd888d7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d365af461cc432040b18de62e1d38cd1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4b0c2c94c8dbeab77159872c97b5a0f4 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9ca26a531f657dad53338aa4d7ffaabb 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/finance/payouts/generate.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3021598d1155465ab187dda0e8558345 2500w" data-optimize="true" data-opv="2" />

<Warning>
  Once the reverse invoice is generated, it cannot be changed. Make sure to
  double-check the information before generating it.
</Warning>

### Sample Reverse Invoice

<iframe src="https://polar-public-assets.s3.us-east-2.amazonaws.com/sample-reverse-invoice.pdf" width="100%" height="600px" />

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="How long do payouts take?">
    Payouts typically take 4-7 business days.
  </Accordion>

  <Accordion title="Can I use my personal bank account to receive payouts?">
    For individual accounts, yes. For business accounts, you will need a business bank account.
  </Accordion>
</AccordionGroup>


# Affonso Affiliates with Polar
Source: https://polar.sh/docs/features/integrations/affonso



This guide explains how to integrate
[Affonso](https://affonso.io)'s affiliate marketing software with your Polar
account to track and manage affiliate-driven sales for your SaaS business.

## What is Affonso?

[Affonso](https://affonso.io) is an affiliate marketing software that enables SaaS businesses to launch, manage, and scale their own affiliate programs. With Affonso, you can:

* Set up flexible commission structures
* Manage multiple affiliate programs from one dashboard
* Provide your affiliates with real-time tracking and marketing resources
* Automate affiliate payments and commission calculations

## Integration Steps

### 1. Create a Polar Access Token for Affonso

First, you'll need to create an API token in Polar that Affonso can use to communicate with your account:

1. Login to your **Polar Dashboard**
2. Navigate to **Settings** in the main menu
3. Scroll down to the **Developers** section on the Settings page
4. Click the **New token** button
5. Give your token a name (e.g., "Affonso Integration")
6. Set token expiration to **No expiration**
   Important: If you set an expiration date, you'll need to manually update the token in Affonso when it expires. Tracking will stop working if the token expires.
7. Enable all the following scopes:
   * discounts:read
   * discounts:write
   * events:read
   * subscriptions:read
   * customers:read
   * customers:write
   * orders:read
   * refunds:read
   * webhooks:read
   * webhooks:write
8. Click **Create token** and copy the generated token
9. Provide this token to Affonso by entering it [in their integration settings](https://affonso.io/app/affiliate-program/connect)

<video controls width="600">
  <source src="https://affonso-videos.s3.eu-central-1.amazonaws.com/Connect_Polar_Affonso_1.mp4" type="video/mp4" />
</video>

### 2. Set Up Webhooks in Polar

After connecting your Polar account with Affonso, you'll [receive a webhook URL and secret from Affonso](https://affonso.io/app/affiliate-program/connect). Add these to your Polar account:

1. Go to **Settings** → **Developers** → **Webhooks** in your Polar Dashboard
2. Click the **"Add Endpoint"** button
3. In the URL field, paste the webhook URL provided by Affonso
4. For Format, select **RAW** from the dropdown
5. In the Secret field, paste the webhook secret provided by Affonso
6. Under Events, enable all of the following:
   * `order.created`
   * `order.refunded`
   * `subscription.canceled`
7. Click **Save** to complete the webhook setup

<video controls width="600">
  <source src="https://affonso-videos.s3.eu-central-1.amazonaws.com/Connect_Polar_Affonso_2.mp4" type="video/mp4" />
</video>

### 3. Add the Affonso Tracking Script to Your Website

Add Affonso's tracking script to the `<head>` tag of your website:

```html
<!-- Place in <head> tag -->
<script
  async
  defer
  src="https://affonso.io/js/pixel.min.js"
  data-affonso="YOUR_AFFONSO_PROGRAM_ID"
  data-cookie_duration="YOUR_COOKIE_DURATION">
</script>
```

Replace `YOUR_AFFONSO_PROGRAM_ID` with the unique program ID provided by Affonso.

This script should be placed on all pages of your website, including:

* Your main marketing website
* Your application domain
* Any subdomains where users might land or make purchases

### 4. Track User Signups (Optional)

For better conversion insights, you can track when users sign up through an affiliate link:

```javascript
// After successful registration
window.Affonso.signup(userEmail);
```

### 5. Pass Referral Data to Polar Checkout

To ensure proper commission attribution, pass the referral data when creating checkout sessions:

```javascript
// Get the referral ID from the Affonso global variable
const referralId = window.affonso_referral;

// Create checkout session with Polar
const checkout = await polar.checkouts.create({
  products: ["your_product_id"],
  success_url: "https://your-site.com/success",
  metadata: {
    affonso_referral: referralId, // Include referral ID from Affonso
  }
});

// Redirect to checkout
window.location.href = checkout.url;
```

## How It Works

1. When a user visits your site through an affiliate link, Affonso's script stores a unique identifier in a cookie
2. If you've implemented signup tracking, Affonso records when the user creates an account
3. When the user makes a purchase, the referral ID is passed to Polar as metadata
4. Polar's webhook notifies Affonso about the purchase
5. Affonso attributes the sale to the correct affiliate and calculates the commission

## Benefits of the Integration

* **Automated Tracking**: No manual work required to track affiliate-driven sales
* **Real-Time Analytics**: Both you and your affiliates get immediate insights into performance
* **Seamless User Experience**: The integration works behind the scenes without affecting your checkout flow
* **Flexible Commission Structures**: Set up complex commission rules based on product, subscription duration, etc.

## Getting Help

More details about the integration: [Polar Affiliate Program](https://affonso.io/polar-affiliate-program)

If you need assistance with your Affonso integration, contact Affonso's support team:

* Email: [hello@affonso.io](mailto:hello@affonso.io)
* Live chat: Available directly in the Affonso dashboard


# Polar Integration in Fernand
Source: https://polar.sh/docs/features/integrations/fernand

Learn how to sync customer and payment data from Polar to Fernand.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b88538e65544e963bc3d58002ae490a9" data-og-width="2160" width="2160" data-og-height="1236" height="1236" data-path="assets/features/integrations/fernand/overview.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=897c6c50feef09e9935e65dbb621d22f 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9c5c32018b6ecf2dda93a9fc475b419d 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=65425ec74bab9627bd2993756bcc90cb 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=248ad82e7f68819bed5ac67a850571b0 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e0ce3b8d1639085693ed42f72c400c35 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/overview.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=05fbb37d999054add9754eff7161ed51 2500w" data-optimize="true" data-opv="2" />

## What is Fernand?

[Fernand](https://getfernand.com/) is a modern customer support tool designed for SaaS — it’s fast, calm, and built to reduce the anxiety of answering support requests.

## How it works

After connecting your [Polar](https://polar.sh/) account to Fernand, you’ll be able to see customer payment information and product access details directly within each customer conversation.

This enables you to:

* Instantly verify if someone is an active customer
* Prioritize conversations from high-tier plans
* View product purchases and payment history in context

***

## How to connect Fernand with Polar

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fd7b3bb222aaf0f953bb3380b6191ae3" data-og-width="2160" width="2160" data-og-height="1199" height="1199" data-path="assets/features/integrations/fernand/enable.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3c91be1f53a2db0d09d0815aaa418bb9 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=636155ebaba7e9bc3fb3fe9dd45eefa3 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5c33cd5d98f078b0c87c071f4b596cc6 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c9c31d16e617c0d5a9016b2af742d080 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9517b8d2ee3c256b1b182d8e7a0a8657 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/enable.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5e1e8ced3419be0eebdd773590ed46cc 2500w" data-optimize="true" data-opv="2" />

1. Open [Integrations](https://app.getfernand.com/settings/organization/integrations) in your Fernand organization settings.
2. Click on **Connect Polar**.
3. You'll be redirected to Polar to authorize the connection.
4. Once approved, Fernand will begin syncing customer data automatically.

That’s it! You’ll now see Polar customer info directly in Fernand's conversation list and sidebar.

***

## How to automate your inbox with Polar data

Once Polar is connected, you can create automation rules in Fernand based on Polar data.

Let’s walk through a basic example: auto-replying to all customers on your `Pro` plan.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d4e253667c841e2223bd94db3b34f409" data-og-width="1280" width="1280" data-og-height="659" height="659" data-path="assets/features/integrations/fernand/inbox.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4e04e85618a90322a16cae3c8ce670ec 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=31ee8e81b408242dd33c7cdb3fc9ec2b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=821ea41265e2228afefcc409eb1c84fe 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ed05d0eb42cfcfbf50d37ee630627dd0 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f7740f807828d9cb68e6d63d195ae14b 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/inbox.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b0e1217e19a8d48884711988c7169095 2500w" data-optimize="true" data-opv="2" />

### Create a new rule

<Steps>
  <Step title="Create a new rule">
    1. Go to [Rules](https://app.getfernand.com/settings/organization/rules) in Fernand.
    2. Click `Add rule` and give it a descriptive name.

    <img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=25780e683d3c9796dde3245b65915c04" data-og-width="2320" width="2320" data-og-height="1597" height="1597" data-path="assets/features/integrations/fernand/create-rule.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a53366fd55fb6a34271057a3cd3cf055 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dee0c4481ee8f196b5cdd2b3aac167a4 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d5fe3839441b01a27076d6b4f8a8dc2a 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81f5eaaa4b926dc92e83ef5d7919bb32 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=479bc657cf2f5fcfee76b7f832bc1344 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/create-rule.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d36ade3b5cf72a25aaa418617daa16a9 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select a trigger">
    This ensures the rule runs on each new customer message.

    <img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=aeff3403e656453aa466b014e60b576b" data-og-width="2320" width="2320" data-og-height="1597" height="1597" data-path="assets/features/integrations/fernand/rule-trigger.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2556e928d12ec31c371fbd0c4d4c3740 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dac0117d53c8841023342742d70433be 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2348c74c80bdcd7d52f3f953fbffa4d6 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e290a183aa0f239677b75ca25d3b6d96 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b7c65e12376bd68f8651ea985f9cc648 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-trigger.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ad57136672c63572d7f08e47ddaf518c 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select a condition">
    Now add a condition based on Polar data. For example:

    * `Contact is a customer...`
    * `Contact has paid plan...`

    You can target specific plans (e.g. `Pro`, `Business`) or specific products to personalize support or automate prioritization.

    <img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7ed92fcbca3e73c386624f3fadd59e0f" data-og-width="2320" width="2320" data-og-height="1597" height="1597" data-path="assets/features/integrations/fernand/rule-conditions.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e4f1816abf559122016d1bbba1f09fb0 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2f2a39970873f13a645ac9da14431ded 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=af65ed15ea90391de629467476f357c2 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ac3fe60db359a36cefa3310065d6580e 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3f67fc898eca5931ecebb4f8b0624651 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/rule-conditions.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b925c4ae62aaf58690ce493b3d03c504 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select an action">
    Now define what happens when the rule matches. For example:

    * Send an auto reply (with variables)
    * Assign the conversation to a specific agent
    * Tag the conversation with `priority` or `paid`
    * Trigger a webhook for external automation

    <img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5991fcfc0687d4cc116fc5e67da3b579" data-og-width="2320" width="2320" data-og-height="2352" height="2352" data-path="assets/features/integrations/fernand/action.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=793688754f120034816233cdecd19307 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=09c4a013ad40ecb03d7e963d7eac3a3e 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=45dbd1bbd21ac26941deec8828af8445 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=aed9e829552d2878db7987084ac5c798 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2b1a1284dec7cee9f78d488d138d0b7c 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/fernand/action.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8fb23f5d26ca36a8483281100dea8958 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>

### Disconnecting the integration

If you ever want to disconnect Polar from your Fernand workspace:

<Steps>
  <Step title="Go to the Integrations page." />

  <Step title="Click Disconnect next to Polar." />
</Steps>

Deleting your organization on Fernand will also remove the Polar integration automatically.


# Polar for Framer
Source: https://polar.sh/docs/features/integrations/framer

The fastest way to sell digital products on your Framer site

Introducing the official Polar plugin for Framer. Allowing you to sell products on your site without having to build a custom checkout flow.

![](https://www.framer.com/marketplace/_next/image/?url=https%3A%2F%2Fy4pdgnepgswqffpt.public.blob.vercel-storage.com%2Fplugins%2F174-egCWZYwZbpLc42xnGQIY42F1KqtNDk\&w=1920\&q=100)

## Getting Started

[Get your hands on the Polar plugin in the Framer Marketplace](https://www.framer.com/marketplace/plugins/polar/)


# Purchase Power Parity with ParityDeals
Source: https://polar.sh/docs/features/integrations/paritydeals

Offer products with different price across the globe

Want to offer different prices in different countries? [ParityDeals](https://www.paritydeals.com/) offers [automatic pricing optimizations depending on customers geolocation](https://www.paritydeals.com/features/purchasing-power-parity-discounts/) and a seamless integration with Polar.

## Simple Integration, Powerful Deals

* You can easily and securely (OAuth 2.0) connect Polar to ParityDeals
* Select products on Polar to offer deals for
* Configure deals by country or holidays
* ParityDeals automatically creates and manages discounts on Polar
* Showing them to customers based on time and geolocation (unless VPN is detected)
* Offering great & local deals internationally with ease

## Setup Guide

### Signup to ParityDeals

Go to [app.paritydeals.com](http://app.paritydeals.com) and sign up.

### Connect Polar on ParityDeals

In your ParityDeals dashboard, click `Create Deals` > `Create Deals with Polar`.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=380b19a4b436cc7144fe70555ac48ee4" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/connect.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7d745ea42b4abe2cee4579bf86449ad0 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=28479d2a12040a0296fe40bc337b8b28 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8dbc2b0a3416399b402bea92d6bd4e92 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e4949ae5880e0870f10c96b6a557897b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=297e9b0fa3c9f6adde369f22bef342c9 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/connect.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=91ac45cbf0e762a29321e1ebe3134248 2500w" data-optimize="true" data-opv="2" />

### Grant ParityDeals Access (OAuth 2.0)

No need to create API access keys and share them externally. Just connect securely and grant the necessary permissions using Polar OAuth 2.0.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d38ee9aaa7efe1e936f0f65847fcfe30" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/grant.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1a7b7ebfc5273a94cf720c666b0cde2b 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d8976370466d04f6937e2dfc00eadab3 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=020e30f2601600d65dbfd7fbd883355a 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f798b1964cd77ccb4c4fdd979e866af6 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=36442459bbef903454e5d338d23d503b 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/grant.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f39001580304c8249f19db6df7b74b54 2500w" data-optimize="true" data-opv="2" />

### Choose Products

Now, let's select the Polar products you want to offer deals for.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=389665fb4c7b0433696ee3127849acb2" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/choose-products.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d55cceeb66c9b4573fb1a5951fd5d734 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=feedd73bfda73ad81b1ba79d696a710d 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8925335195bfb7a5136b788bd3a7595e 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=da8f4af1b3581d9f5ec9e8a3f23aedab 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7757301076c61fddfeb090af3075d305 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/choose-products.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=144b0050975045513c5ce627dc8cc6b0 2500w" data-optimize="true" data-opv="2" />

### Configure Deals

Let's configure our deal settings.

* Enter your website URL (requires your own site vs. Polar storefront)
* Enter a targeted URL path, e.g `/pricing` to only show deals on that page

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=949909121fedb3cb385841126059b886" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/create-deals.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4fb54994d85087b94038e251b0836413 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a7df5ee1577322e4976a7d46918d229e 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fa041e6735614992bb0e43f5b032d8f9 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0bcad37131b54954b9e7f5dd4c8af0c1 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2167e43a1524946731f84f3fe553f387 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/create-deals.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0f72314ca5421ad81f9eaf5305695850 2500w" data-optimize="true" data-opv="2" />

Now we can configure the deals for different countries. ParityDeals offers great defaults, but you can of course change them.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=437db4cc1c875c1a43312801267e1edf" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/customize-deals.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=29bae9c54ab955b50ff738e9dbc434a9 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1bb023e2b2c0ec5be9747bdbba712ae4 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ff713eba200368872c0a89e636d0452a 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d149e337bfd0e398d99962dc786e9b30 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d1463511b58391313590762cc7e8c5e2 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-deals.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dee705be869e3bbb3f7179d478448d6a 2500w" data-optimize="true" data-opv="2" />

### Configure Banner

You can then customize the ParityDeals banner to suit your site and design.

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=768323a8222a26b6279e33a29d58ed2f" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/customize-banner.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c43943ff594e56ab4ddeddd33c0b40b1 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=301fb1563d0a16d0af7633e3ad2d7986 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b056bccb572f29ac4e38e61dfc07196c 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2334bd67d3ebc36143c0c7d1b972dfb9 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=344aec11c0f0592a95ce6c531aa274fd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/customize-banner.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1da6795cc3ce00ad959b512eebb13daf 2500w" data-optimize="true" data-opv="2" />

### Embed Banner

Finally, we're all setup over at ParityDeals. Just copy the script to their banner and embed it on your site. You're now done 👏🏼

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f798f597faf884b32ded6cf493c0097b" data-og-width="3390" width="3390" data-og-height="1928" height="1928" data-path="assets/features/integrations/paritydeals/success.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4ed7aa5041af60702eb44174001e76bc 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=34e118bfc67351cd76fe839499b0915d 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b497f411f874d49dda64e71404dbc6d2 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fdbd8cd7f969d4946c109d3e98e23d73 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dd0e89169fe28e895668bfb6bd392c7f 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/paritydeals/success.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=302773ed132549f33d4e23b90e7e3c7c 2500w" data-optimize="true" data-opv="2" />

## Questions & Help

Checkout the [ParityDeals documentation](https://www.paritydeals.com/docs/) for more guides and information.


# Polar for Raycast
Source: https://polar.sh/docs/features/integrations/raycast

The fastest way to access Polar from your keyboard

<img src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c0ee6608105a2797546bb31d14121345" data-og-width="1020" width="1020" data-og-height="1020" height="1020" data-path="assets/features/integrations/raycast/hero.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1d8527b4e4e57261524ab63e55eb52ca 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fb4df1391ba100ceae0e81f4f1c60b6d 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8bcd00a258807e37fabbe7f164dfaca6 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2a3cb9420f33f97db0875eeb6f3bddf3 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=70967cceab0d4d287f821f2a156cc94b 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/integrations/raycast/hero.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=611d5da40856ff9df3bb7f7ba97f472e 2500w" data-optimize="true" data-opv="2" />

## Install Extension

[Head over to Polar on the Raycast Store, and install it from there.](https://www.raycast.com/emilwidlund/polar)

### View Orders

Easily view orders across organizations.

![](https://files.raycast.com/acvj8yffxqxbnv82lhtsnf7u7x29)

### View Subscriptions

View all active subscriptions across your organizations.

![](https://files.raycast.com/y6he77j6ig6hchxbpxdcsd2i1yjf)

### View Customers

Keep track of all your customers.


# Polar for Zapier
Source: https://polar.sh/docs/features/integrations/zapier

Connect Polar to hundreds of other apps with Zapier

export const ZapierEmbed = () => {
  if (typeof document === "undefined") {
    return null;
  } else {
    setTimeout(() => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js";
      document.head.appendChild(script);
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css";
      document.head.appendChild(stylesheet);
      const element = document.createElement("zapier-workflow");
      element.clientId = "Zci4gpfx7Co47mBoFOYm0m8bmnzB5UPcw7eGhpSR";
      element.theme = document.querySelector("html").classList.contains("dark") ? "dark" : "light";
      element.introCopyDisplay = "hide";
      element.manageZapsDisplay = "hide";
      element.guessZapDisplay = "hide";
      const container = document.querySelector("#zapier-container") || document.body;
      container.appendChild(element);
    }, 1);
    return <div id="zapier-container"></div>;
  }
};

[Zapier](https://zapier.com/apps/polar/integrations) lets you connect Polar to 2,000+ other web services. Automated connections called Zaps, set up in minutes with no coding, can automate your day-to-day tasks and build workflows between apps that otherwise wouldn't be possible.

Each Zap has one app as the **Trigger**, where your information comes from and which causes one or more **Actions** in other apps, where your data gets sent automatically.

<Note>
  We've focused on **triggers** (webhooks) for now, so you can react to events in Polar and trigger actions in other apps.

  Need to perform actions in Polar? Tell us about your use case [here](https://github.com/orgs/polarsource/discussions/new?category=integrations\&labels=integrations%2Fzapier) and we'll consider adding more actions in the future.
</Note>

## Getting Started with Zapier

Sign up for a free [Zapier](https://zapier.com/apps/polar/integrations) account, from there you can jump right in. To help you hit the ground running, you'll find popular pre-made Zaps below.

## How do I connect Polar to Zapier?

Log in to your [Zapier account](https://zapier.com/sign-up) or create a new account.
Navigate to "My Apps" from the top menu bar.
Now click on "Connect a new account..." and search for "Polar"
Use your credentials to connect your Polar account to Zapier.
Once that's done you can start creating an automation! Use a pre-made Zap or create your own with the Zap Editor. Creating a Zap requires no coding knowledge and you'll be walked step-by-step through the setup.
Need inspiration? See everything that's possible with [Polar and Zapier](https://zapier.com/apps/Polar/integrations).

If you have any additional questions, you can open a ticket with Zapier Support from [https://zapier.com/app/get-help](https://zapier.com/app/get-help)

## Popular use cases

<ZapierEmbed />


# Orders & Subscriptions
Source: https://polar.sh/docs/features/orders



## Sales

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fe0b6b72270e05881b7b37758edcb85a" data-og-width="3018" width="3018" data-og-height="1706" height="1706" data-path="assets/features/orders/overview.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e71aaf8816e96b397bf06ab3e2cdab20 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8233141eafba9efb803fba4939a8cb33 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6a7195f46cb2642c85b09ffcd165822b 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4009e51d6778b9c54aa83a9266681823 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=439681c34e80f22486bdb6584492c7b6 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=016bfa3f8d6f5d3464f3a3d2c12d0c2e 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=737954c20bfae390ecceaca168331728" data-og-width="3012" width="3012" data-og-height="1706" height="1706" data-path="assets/features/orders/overview.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=889bd833b0c6d24c4d20fe067e5ef44c 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7f59e12f70c35c1a92bb72f28daac6f6 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ea77b1ae5336918db227d5d7e87060d6 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a898822f08437fde39a7c2632a1d28f 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f63178461b550cbc85e10b586392f62b 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/overview.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ef3a70bcbafee15fb6f22e88fd40da2b 2500w" data-optimize="true" data-opv="2" />

The sales view shows you all sales in a paginated list.

## Order & Subscription Details

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6523d1c46bff6d54f477c93c4aba4ac4" data-og-width="3586" width="3586" data-og-height="2064" height="2064" data-path="assets/features/orders/detail.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=79b2ee7e67d0871211bf44b28f31644e 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=56d87ffddd6c188cfb477791452b7b4b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3b9a46077f1b5cee757f9397d039f703 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=21c96d19451a20f440590133d3660758 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=87169c7e4f4a0b97373c4bf491436944 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3def73e428c7babb6561a21d5c2490db 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8e6249c99bc8a0de9692a8a2552d68bd" data-og-width="3582" width="3582" data-og-height="2062" height="2062" data-path="assets/features/orders/detail.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9615ad7f2aa387ec580eb4f4f99d533f 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=40b4205341eaa10b8413764237a3dc2a 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=acc68b0686d95652492dc15ec2e33b76 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0d4a1563fe9fe66fa81c461143c5def7 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6e4ce9645f34c1fdeb2149e70612b460 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/detail.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=93369b6e2b0aafccb25cfbd05d26f025 2500w" data-optimize="true" data-opv="2" />

Each sale has metadata attached to it. Common properties like

* Amount
* Tax Amount
* Invoices
* Customer
  * Basic Customer Details
  * Past Orders

## Checkouts

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ae81bc0afa3cbb1eac266c1c487b467f" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkouts.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dda034f0aac14f6433420a16d47469cc 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a0712f5e452032a07d0277b9127cdc3f 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6ae741beae2cc2771f811bb77dcbaef4 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0ba869459fa97197554e24ca34ee48f7 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9216bfdef2347effa99d1b49164f76a8 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a977560848eacecf32e77e079a689071 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=24c3d3dae78336a5df6f137c3b9361cb" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkouts.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cfd0379b58face2c354f35d45327fcd5 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=90a0ee60d259b24fb55f3e84f7a75898 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7033a3f522e6dd4b63177c12a952f7bc 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=16dec8bdc47655a3e6911da315911961 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b2c514226bdf913c25946fdcf5c85b4e 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkouts.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ca30d6c0dc46933a3b3d5793e0b3e601 2500w" data-optimize="true" data-opv="2" />

You can also have an overview of all checkout sessions. You can filter them by customer email, status and product.

A checkout can be in the following states:

* Open: The checkout session is open and waiting for the customer to complete the payment.
* Confirmed: The customer clicked the **Pay** or **Subscribe** button and the payment is being processed.
* Succeeded: The payment was successful and the order was created.
* Expired: The checkout session expired and the customer can no longer complete it. A new checkout session must be created.

If you click on a Checkout, you can have more details on the **payment attempts**, in particular, why a payment has failed or has been declined.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4672cafc0b218d34a55c5cc006fdb153" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bcf9dd8baf9fae7b84d2d046e9b4f811 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1ac73955d12edfb9a605799d246d5237 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=4c931b7de4121f568d1ebefe90f42792 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=87c8d57825f9c084f1b3664402629a23 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=21eb74aed158f9b11a2015bcfa763039 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d51d0053a32db9f505742b4d4203854c 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d8ebc400902b1179700e7348745793e8" data-og-width="3840" width="3840" data-og-height="2403" height="2403" data-path="assets/features/orders/checkout.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5b1783d55724d4260dab83ba63b66a77 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a0cf5741f10810ab68d2dd1962511895 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=189ed0cb4d1ec19a9daf370f778dfea1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=115d82a958ab384611b9fa868566d104 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=479d59cc8717b0f6330996e2f04915dd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/orders/checkout.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=af86f31f76639dc114a243f54495601f 2500w" data-optimize="true" data-opv="2" />


# Products
Source: https://polar.sh/docs/features/products

Create digital products on Polar in minutes

<Note>
  **Everything is a product**

  Subscriptions or pay once products are both considered a product in Polar (API & data model). Just with different pricing & billing logic. So both are shown & managed under Products with the ability to filter based on pricing model.
</Note>

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cc972f143aecd8d88c9f349d013240d1" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/products/create.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e45c5c8469852c55f4200077a6227e45 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e4ad77ccce20078d15f59fa662638b86 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a1bea22614e17d28942915a7336811b7 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a495ff71760bb84e53c122982e6da41c 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b8064e8a8a765bf2f1056938c09ed2ce 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06e4ea2db1a9dd8d3c7a722a84167b69 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=051a16a968078b31954b030f3bcc6191" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/products/create.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f5976e23ffbe2b68c3d18b532dec1579 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06338c580f24c437a32a80fc875e9329 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=020e58b04e874df98745e721837dcc3e 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=691f30f6e02f75ae3c63069aad996506 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=00e3df46e4b2ebd951e1c0565cbc6f9d 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/create.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dd28e9aad254ab477b088f882a7f465b 2500w" data-optimize="true" data-opv="2" />

## Create a product

### Name & Description

Starting off with the basic.

* **Name** The title of your product.
* **Description** Markdown is supported here too.

### Pricing

Determine how you want to charge your customers for this product.

<Steps>
  <Step title="Billing cycle">
    * **One-time purchase** Customer is charged once and gets access to the product forever.
    * **Monthly** Customer is charged every month.
    * **Yearly** Customer is charged every year.
  </Step>

  <Step title="Pricing type">
    * **Fixed price** Set a fixed price for the product.
    * **Pay what you want** Let customers decide how much they want to pay.
    * **Free** No charge for the product.
  </Step>

  <Step title="Price">
    For fixed price products, set the amount you want to charge.

    For pay what you want products, you can set a minimum amount and a default amount that will be preset on checkout.
  </Step>
</Steps>

<Warning>
  Billing cycle and pricing type cannot be changed after the product is created.
</Warning>

<Note>
  **What if I want both a monthly and yearly pricing?**

  Polar has a unique approach to what the industry typically calls **variants**. Each product has a single pricing model, but you can create multiple products with different pricing models, and showcase them both at checkout.
</Note>

### Trial Period

For recurring products, you can set a trial period during which the customer won't be charged. Toggle **Enable trial period** to enable it. Then, you'll be able to set the duration of the trial period, given a number and a unit (days, weeks, months or years).

You can read more about how trials work [here](/features/trials).

### Product Media

* You can upload public product images to be displayed on product pages
* They can be up to 10MB each
* You can remove and re-arrange images

### Checkout Fields

You can collect additional information from your customers at checkout. This can be useful for things like phone number, terms of service agreement or specific data you need to collect.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1394767c6a9ac3dd67a0b157d67d75bf" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/products/checkout_fields.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a574ad20018eedb35a61e3d0653c5843 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=00cd89835338cac091a71424180cfd3d 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7fdf47e98b6168e68fed05ca990b3ef1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2e731af81f2da9dd735b97297beeb68b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b462de25d3b5aa20681af750c0465906 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=976aa37c321250bc16f0629eff07f394 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=492b690412808d395f607b0a4d8bd26b" data-og-width="3840" width="3840" data-og-height="2400" height="2400" data-path="assets/features/products/checkout_fields.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bd637dbe9230878ea68c0663901930e3 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d74f4d8e7b415c9e3f48677d133e1fd4 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b614a10720b6b9354daaaf7cb8bdece8 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f1d473aed64d62e294b3c680cb153f7f 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bc9bdfecdf190335bc46caa6e4b3d1d2 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/products/checkout_fields.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=50d5636dea88c4e276fa0dc0a581a865 2500w" data-optimize="true" data-opv="2" />

Fields are managed from your organization settings, and you can choose which fields to show on a per-product basis, and set if they are required or not. We support the following field types:

* Text
* Number
* Date
* Checkbox
* Select

<Tip>
  If you make a checkbox **required**, the customer will need to check it before
  confirming their purchase. Very handy for legal terms!
</Tip>

The data collected will be available in the order and subscription details.

### Automated Entitlements

Finally, you can enable or create new entitlements (what we call Benefits) that you tie to the product.

Read more in our [product benefits guide](/features/benefits/introduction) on how they work and how to customize the built-in ones we offer:

* License Keys
* Discord Server Role
* GitHub Repository Access
* File Downloads
* Custom Benefit

## Variants

Polar has a unique approach regarding what the industry typically calls **variants**.

We believe having a single product with multiple pricing models and benefits adds unnecessary complexity to the user and to the API. Instead, we chose to treat everything as a product, giving you maximum flexibility about the pricing and benefits you want to offer.

You can showcase several products at checkout, allowing the customer to switch between them. Typically, you can offer a monthly and a yearly product, with specific pricing and benefits for each. Read more about how to do so using [Checkout Links](/features/checkout/links) or the [Checkout Session API](/features/checkout/session).

## Update a product

You can edit any product details, except the **billing cycle** and **pricing type**.

For fixed price products, you can change the price. Existing subscribers will remain on their current pricing.

If you add benefits, existing subscribers will get them automatically. If you remove benefits, existing subscribers will lose access to them.

## Archive a product

Products on Polar can't be deleted, but they can be **archived**. You can do so by clicking the **Archive** button on the bottom right of the product page.

Existing customers will keep their access to the product, and subscriptions will continue to renew. However, the product will no longer be available for new purchases.

It's possible to unarchive a product using the [Products Update API](/api-reference/products/update#body-is-archived).


# Manage Refunds
Source: https://polar.sh/docs/features/refunds

You can easily refund orders on Polar - both in full or in parts.

No matter what refund policy you offer to customers, Polar makes it easy to offer both full and partial refunds to easily deliver the customer experience and refund policy you want.

However, even in case you have a “no refund” policy, Polar reserves the right to issue refunds within 60 days of purchase - at our own discretion. We reserve this right in an effort to automatically and proactively reduce costly chargebacks.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8deb5fa2aadb287ab895c8e6d0dc9b96" data-og-width="1488" width="1488" data-og-height="634" height="634" data-path="assets/features/refunds/order-refund.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ecbeb7c946b3ff7ad7de16857948a8ab 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c15206646029c7ebf0c7ee5bed1cc237 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9834eac763ec16939f755c3d3d6be2a3 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b1bfcfc0495574d13d5b12a3b4b07a8e 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=da7c1ac70d5020ec59ee434e91c63445 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=554a61cff813c9c39556a479e6be158f 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b634b5a88b66bcb8379a238832e37d8d" data-og-width="1472" width="1472" data-og-height="646" height="646" data-path="assets/features/refunds/order-refund.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=46f1205d710b57ae3250ce35eaf30857 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c3e114f35114a5fce2ce31a96d853439 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=9a6ac68c728a98d093a85f9d79eaf8fc 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=dfc6f7fd4178a03c1e5f3ab724d6e5d9 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=446c057b0cfdf6fb3579bd63dee963d5 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/order-refund.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=480743c1277dd317fe7b296f5cd67750 2500w" data-optimize="true" data-opv="2" />

<Note>
  **Polar can issue refunds on your behalf**

  Polar reserves the right to issue refunds within 60 days of purchase, at its own discretion, in order to prevent chargebacks. So if you choose to have a “no refunds” policy, be aware that Polar could still issue refunds in an effort to proactively prevent chargebacks.
</Note>

## Issuing a refund

1. Go to the order details page for the specific order you want to refund
2. Scroll down to the “Refund” section
3. Click “Refund”

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=72b1c9f4e81f6fcc00d395f681396515" data-og-width="1402" width="1402" data-og-height="960" height="960" data-path="assets/features/refunds/issue-refund.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=918554c1ec10dd8092d87fe8f0b5cb8f 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2f197a8156e8cb17a914895d3e290ec2 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=91a6745d8938f98ddc09405a853c0dfa 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cbb728319eb9ce79dd5378495b3b7ff8 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7a5ac21de9dd591098c0f6f249119071 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=adb22faaa7f43423c283f52189f41132 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=239999e5fdca1b9f872a847a893e2f33" data-og-width="1430" width="1430" data-og-height="966" height="966" data-path="assets/features/refunds/issue-refund.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c9c0f915426fc6f26c579a6a6ead12c7 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5341a41bf0876f0efbeb07d7b1dcdc17 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6a54d47b34539317fafb79e339659bf3 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cbf1ee0407910fb5ee2815da47fcf949 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c7436d4ce2358fbcd2c7b5ac242ff435 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/refunds/issue-refund.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ee55a2f3cd980e247a3c2c8745c53fc9 2500w" data-optimize="true" data-opv="2" />

**Amount**

Specify the amount to refund. By default it’s the full order amount, but you can reduce this to issue a partial refund instead.

<Warning>
  **Payment fees are not refunded**

  Unfortunately, credit card networks and PSPs charge us for the underlying transactions regardless of whether it’s later refunded (industry standard). Therefore, we cannot offer a refund on our fees since the costs remain constant.

  Example: An order of $30 costs ~$1.6 in fees to Polar. You can still refund the customer $30, but the ~$1.6 fee remains and is deducted on your balance from other purchases.
</Warning>

**Reason**

Select the reason for the refund - helpful for future reference.

**Revoke Benefits (One-time purchases)**

For one-time purchases, you can revoke the customers access to product benefits, e.g file downloads, license keys or Discord/GitHub invites. By default this is selected since we default to a full refund, but can be disabled.

**Revoke Benefits (Subscriptions)**

You cannot revoke access by refunding an order associated with a subscription. Instead the subscription is required to be canceled and Polar will then automatically revoke access once the subscription itself is revoked.


# Trials
Source: https://polar.sh/docs/features/trials

Offer free trials on your subscriptions

Trials are a great way to let potential customers experience your product before committing to a subscription. With Polar, you can easily set up free trials for your subscription products.

## Setting up a trial

You can set up a trial period through the following means:

* When creating or editing a [product](/features/products).
* When creating or editing a [checkout link](/features/checkout/links).
* When creating a Checkout Session through the [API](/api-reference/checkouts/create-session).

If you set a trial period on the Checkout Link or Checkout Session, it will **override the trial period set on the product**.

The trial period consists of two parameters:

* **A unit**: day, week, month, or year.
* **A duration**: a number representing how many units the trial will last.

<img className="block dark:hidden" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=808ba964c320447e8bb71612e27687d0" data-og-width="738" width="738" data-og-height="260" height="260" data-path="assets/features/trials/setup.light.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=4fcfd0070c9e5253ee69f2bdbb59f1f7 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=c3f79b4b212a10ac184114d9daaa3875 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=46a20e477e4440168def8ff1f5ff981d 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=6aa9888c5eb90426e3c1871d6bbf189c 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=6a7e1cbe712be49b252f5f6a6957b04c 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.light.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=d6481e23ba2cf03e160d9db75eb39a9c 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=45e513c1055d34cff0569e72750ca83c" data-og-width="738" width="738" data-og-height="260" height="260" data-path="assets/features/trials/setup.dark.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=a87e68d23703f6f6821467d7f9401035 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=0571140c6735921dfcef1243e2212817 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=ba7005e18f90b984d287cb1fa38e6adc 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=1eb19537130488fdc5b2e602207fc9d6 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=5b44bdaf04a9e05685654917f3de36a6 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/setup.dark.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=c15cd0d1db1ce2971e6f5d2920760875 2500w" data-optimize="true" data-opv="2" />

## Starting a trial

When a customer checks out a subscription product with a trial period, they will not be charged immediately. Instead, they will have access to the product for the duration of the trial period.

We'll still collect their payment information at checkout, but they won't be charged until the trial period ends. This means that if they decide to cancel before the trial ends, they won't be charged at all.

Once the trial period ends, the customer will be automatically charged for the subscription, and their billing cycle will begin.

<img className="block dark:hidden" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=a022daf013c20b48e1fdfd6610214b21" data-og-width="1162" width="1162" data-og-height="612" height="612" data-path="assets/features/trials/checkout.light.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=fbd287450129c8314db7c172a18e0400 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=a754f0e914ea2a5d33cbdb9a78e3e63c 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=3bdf9c2c463c415b3e5d4ecdaedaf7ce 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=1519c8ce8d5bf50da448c5fabab2ebf2 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=55cb34b210769fc9a1a491125e834170 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.light.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=dbdfada58d5dfa2188ac8227e50dad43 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=5b41262d9dd3f8513060027341ab72ff" data-og-width="1160" width="1160" data-og-height="612" height="612" data-path="assets/features/trials/checkout.dark.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=19af6353f41146584913e2e9b8b25cd2 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=b43b031871cae05ad977af0c559c2571 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=3cf49290fd51d8f145dcd296c7fc9d6a 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=4b6e98e4d1381fd7666c6bfd36c0b5a8 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=075e63a6d5688dae9291616969909f64 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/checkout.dark.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=23bf69aa0406fb615fd781cfdbc2baa1 2500w" data-optimize="true" data-opv="2" />

## Adding, extending or canceling a trial

For existing subscriptions, youu can add, extend or cancel a customer's trial period at any time through the dashboard, from the subscription details page. Click on **Update Subscription**, then click on the **Trial** tab.

To add or extend a trial, set a new trial end date in the future. If the subscription was active, its status will be changed to **trialing**, and the billing will be postponed until the end of the trial.

To cancel a trial, click on the **End trial** button. The subscription will become active immediately, and the customer will be charged immediately for a new billing cycle.

<img className="block dark:hidden" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=e8068c41e9a3eef52df62342a8b24cdb" data-og-width="1080" width="1080" data-og-height="800" height="800" data-path="assets/features/trials/update.light.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=8f0072d92524ba23db0456da130d3b53 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=9d251cdf512299f07e62b7448902b2ba 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=0dcf7d5afaecf3cfabe0d0e24da92568 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=6c92cf547dbee64f012b08387252ca15 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=64d82d2d76092fc1b7b9bbeecd854eeb 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.light.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=0654a5854cac78a4986675c1a119b944 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=18f6391c5e807fae964668ca29702895" data-og-width="1080" width="1080" data-og-height="800" height="800" data-path="assets/features/trials/update.dark.png" srcset="https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=280&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=593567603580e4c92a390d5306f13084 280w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=560&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=06b8c708e99d0939d0b7950b793b79b4 560w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=840&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=607ceb412cf8911a45653b7dbe414b1a 840w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=1100&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=79e2379515425312d36838b7ab5cd792 1100w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=1650&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=c0e7b9fb0e08327860b4aa388f4632e7 1650w, https://mintcdn.com/polar/6okRukiIx_KDNAFT/assets/features/trials/update.dark.png?w=2500&fit=max&auto=format&n=6okRukiIx_KDNAFT&q=85&s=67b1072c9ea512b588e1e4e33d2017c1 2500w" data-optimize="true" data-opv="2" />


# Billing
Source: https://polar.sh/docs/features/usage-based-billing/billing

How billing works with Usage Based

## Metered Pricing

Metered Pricing is a pricing model where you charge your customers based on the usage of your application.

There are a few different pricing models unique to Usage Based Billing:

* Unit Pricing
* Volume Pricing *(coming soon)*

### Unit Pricing

Unit pricing is a simple pricing model where you charge a fixed amount for each unit of usage.

For example:

| Product Meter       | Price per unit |
| ------------------- | -------------- |
| `prompt-tokens`     | \$0.10         |
| `completion-tokens` | \$0.18         |

This means that every unit of `prompt-tokens` consumed by a customer will be charged at \$0.10 and every unit of `completion-tokens` will be charged at \$0.18.

It's a linear pricing model, where the price per unit is fixed.

### Volume Pricing *(coming soon)*

Volume pricing is a pricing model where you charge a fixed amount for a certain volume of usage. Volume pricing is not yet available, but will be coming soon.

## Invoicing Customers for Usage

Our Usage Based Billing infrastructure is built to work with Subscription products out of the box.

### Add a metered price to your product

To charge your customers for usage, you need to add a metered price to your product. You'll need the select the **Meter** and the **amount per unit**.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4ac7dd5bf3e6a6f1aa8ef8866bc81a3" data-og-width="1434" width="1434" data-og-height="752" height="752" data-path="assets/features/usage/cap.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=822053ba1df3df18cbcbc561b192be2d 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=bbb1d12e8d4747fdd517589e269ac0ea 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=33795a10571507b63808224050dbdb44 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d49bad6531fa37e3cf6971220f0ea173 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=15e6a9f00e9cbccc1fc19543e5d6b2da 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5ded0738148af721334e6697c1faccf6 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d2fb533708a2a5a4f25ffaa9f248331b" data-og-width="1444" width="1444" data-og-height="748" height="748" data-path="assets/features/usage/cap.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7efa3c14ef16cc2d9d5b8d95f1807c0f 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=c5a7da3d6b825d49c0a3b703ea6c7348 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5bfcb816299d5d0c1217e97deac61ca1 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06a4f592338b149cffa42701aa5076c2 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=560342eb952b8b4275a299861f894656 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/cap.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=387130fbd30b5ad23b78b34f351b768a 2500w" data-optimize="true" data-opv="2" />

Optionally, you can set a **cap**. The customer will be charged the cap amount if they exceed it, regardless of the usage.

### Monthly Invoicing

If a customer has a subscription with a monthly billing period, usage is aggregated monthly and invoiced at the end of the month with the rest of the subscription.

### Yearly Invoicing

If a customer has a subscription with a yearly billing period, usage is aggregated yearly and invoiced at the end of the year with the rest of the subscription.

### Usage Charges and Subscription Cancellation

When a subscription is canceled, it generally remains active until the end of the current billing period (known as the grace period). During this grace period, all accumulated usage-based charges continue to be tracked. A final invoice will be issued at the end of that period to cover the consumed usage, even if the subscription will not be renewed. This ensures no pending usage charges are lost.

<Warning>
  If a [discount](/features/discounts) is applied on the subscription, it'll be
  applied on the **whole invoice**, including metered usage.
</Warning>

## Customer Portal

Customers can view their estimated charges for each meter in the Customer Portal.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=85bdb395f87e972ed50a7381ba3aad43" data-og-width="2358" width="2358" data-og-height="1218" height="1218" data-path="assets/features/usage/portal.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8972d5a0a8a6f872681d6f9868bcc880 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=96aeab3c57e09af522465cc2d079c11b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eb837824af9aaa0ed9ea55353c8375a0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1b4dda5c34f856b934d2b76fdfbade24 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=553abd674a5c2fb50a15fe5aad61a54e 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5a029265468a698405d6b5b85e8c4d2 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=44f1b0e0f67aaa22b293a7dafaf3ab99" data-og-width="2364" width="2364" data-og-height="1214" height="1214" data-path="assets/features/usage/portal.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f5c9e22d99ee09640a9057f823bddfa2 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1cfb93c49691551d3a0015f86ba582ec 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=30229e91a32620d8044e49045b02c465 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d7a5b71049e90623dbc912bc4040cdff 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0d05475d6642dd222c07255936727b21 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b541f2af5d8fb788af4089b07d7d395d 2500w" data-optimize="true" data-opv="2" />


# Credits
Source: https://polar.sh/docs/features/usage-based-billing/credits

Crediting customers for Usage Based Billing

Credits is the way to pre-pay for usage in Polar. It allows you to give your customers the ability to pre-pay for usage instead of risk getting a hefty bill at the end of the month.

## How Credits Work

When you ingest events into a Usage Meter, customers will be charged for the usage based on the product's pricing model.

However, sometimes you may want to give your customers the ability to pre-pay for usage instead of risk getting a hefty bill at the end of the month.

When you issue Credits to a customer, we first deduct the Credits from their Usage Meter balance. If the Usage Meter balance reaches 0, the customer will be charged for the overage.

### Credits-only spending

To avoid any overage charges, don't create any Metered price on your product. This way, billing won't be triggered at all for the meter

## Issuing Credits with the Credits Benefit

<img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=95a964aa562069bd58a551e44c757459" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b760d24e9a3986942f85f837906349fa 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=83df523fa528bf405607cfffc437ef16 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=05e2f5f37fc1f0f66a2269a07f188ed1 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed026417db037e5e4248776054fd6033 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b547ce3907051f816340a08b145fa910 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=deda471c9661f21c57aebfcd23057040 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=a545e217dd64f288b127ec76eb3527ef" data-og-width="1620" width="1620" data-og-height="2304" height="2304" data-path="assets/features/benefits/credits/credits.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f53dd50244006f52fe28389ccd32dc11 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=ed51c6ecd5c605c90933ff9a8036c01f 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=c1604014eb9f4556687cb2dae0cd4730 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8d6c8f2f81c2fbe10de06d045cae5488 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=08efb35cd818b5c25f0011415eb7da5e 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/features/benefits/credits/credits.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=6ce168ea0a513884b7be0e7989633a84 2500w" data-optimize="true" data-opv="2" />

The Credits benefit will credit a customer's Usage Meter balance at different points in time depending on the type of product the benefit is attached to.

### Subscription Products

The customer will be credited the amount of units specified in the benefit at the beginning of every subscription cycle period — monthly or yearly.

### One-Time Products

The customer will be credited the amount of units specified in the benefit once at the time of purchase.

## Tracking customer's balance

In your application, you'll likely need to track the customer's balance for a given meter. The easiest way to do this is to use the [Customer State](/integrate/customer-state), which will give you the overview of the customer, including the balance for each of their active meters.

You can also specifically query the meters balance using the [Customer Meters API](/api-reference/customer-meters/list).

<Warning>
  Polar doesn't block usage if the customer exceeds their balance. You're
  responsible for implementing the logic you need to prevent usage if they
  exceed it.
</Warning>


# Event Ingestion
Source: https://polar.sh/docs/features/usage-based-billing/event-ingestion

Ingest events from your application

Events are the core of Usage Based Billing. They represent *some* usage done by a customer in your application. Typical examples of events are:

* A customer consumed AI LLM tokens
* A customer streamed minutes of video
* A customer uploaded a file to your application

Events are sent to Polar using the [Events Ingestion API](/api-reference/events/ingest) and are stored in our database. An event consists of the following fields:

* A `name`, which is a string that can be used to identify the type event. For example, `ai_usage`, `video_streamed` or `file_uploaded`.
* A `customer_id` or `external_customer_id`, which is the Polar's customer ID or your user's ID. This is used to identify the customer that triggered the event.
* A `metadata` object, which is a JSON object that can contain any additional information about the event. This is useful for storing information that can be used to filter the events or compute the actual usage. For example, you can store the duration of the video streamed or the size of the file uploaded.

Here is an example of an event:

```json
{
  "name": "ai_usage",
  "external_customer_id": "cus_123",
  "metadata": {
    "model": "gpt-4.1-nano",
    "requests": 1,
    "total_tokens": 77,
    "request_tokens": 58,
    "response_tokens": 19
  }
}
```

## Ingest events using the Polar SDK

To ingest events, you can use the Polar SDKs.

### TypeScript Example

```typescript
import { Polar } from "@polar-sh/sdk";

const polar = new Polar({
  accessToken: process.env["POLAR_ACCESS_TOKEN"] ?? "",
});

await polar.events.ingest({
  events: [
    {
      name: "<value>",
      externalCustomerId: "<id>",
      metadata: {
        key: "value",
      },
    },
  ],
});
```

<Note>
  You are always responsible for checking the balance of your customers' Usage
  Meter. As events always are ingested, we will never prohibit any customer's
  action based on their Usage Meter balance.
</Note>

## Ingestion Strategies

To make it easier to ingest events, we have created a set of ingestion strategies for common event sources.

Learn more about our [Ingestion Strategies](/features/usage-based-billing/ingestion-strategies).

## Good to know

### Events are immutable

Once an event is ingested, it cannot be changed, nor can it be deleted.


# Delta Time Strategy
Source: https://polar.sh/docs/features/usage-based-billing/ingestion-strategies/delta-time-strategy

Ingest delta time of arbitrary execution

## Javascript SDK

Ingest delta time of arbitrary execution. Bring your own now-resolver.

```
pnpm add @polar-sh/ingestion
```

```typescript
import { Ingestion } from "@polar-sh/ingestion";
import { DeltaTimeStrategy } from "@polar-sh/ingestion/strategies/DeltaTime";

const nowResolver = () => performance.now();
// const nowResolver = () => Number(hrtime.bigint())
// const nowResolver = () => Date.now()

// Setup the Delta Time Ingestion Strategy
const deltaTimeIngestion = Ingestion({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
})
  .strategy(new DeltaTimeStrategy(nowResolver))
  .ingest("execution-time");

export async function GET(request: Request) {
  try {
    // Get the wrapped start clock function
    // Pass Customer Id to properly annotate the ingestion events with a specific customer
    const start = deltaTimeIngestion.client({
      customerId: request.headers.get("X-Polar-Customer-Id") ?? "",
    });

    const stop = start();

    await sleep(1000);

    // { deltaTime: xxx } is automatically ingested to Polar
    const delta = stop();

    return Response.json({ delta });
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
```

#### Ingestion Payload

```json
{
  "customerId": "123",
  "name": "execution-time",
  "metadata": {
    "deltaTime": 1000
  }
}
```


# Strategy Introduction
Source: https://polar.sh/docs/features/usage-based-billing/ingestion-strategies/ingestion-strategy

Ingestion strategies for Usage Based Billing

Polar offers an ingestion framework to work with Polar's event ingestion API.

Want to report events regarding Large Language Model usage, S3 file uploads or something else? Our Ingestion strategies are customized to make it as seamless as possible to fire ingestion events for complex needs.

* [LLM Strategy](/features/usage-based-billing/ingestion-strategies/llm-strategy)
* [S3 Strategy](/features/usage-based-billing/ingestion-strategies/s3-strategy)
* [Stream Strategy](/features/usage-based-billing/ingestion-strategies/stream-strategy)
* [Delta Time Strategy](/features/usage-based-billing/ingestion-strategies/delta-time-strategy)

### Help us improve

We're always looking for ways to improve our ingestion strategies. Feel free to contribute — [Polar Ingestion SDK](https://github.com/polarsource/polar-ingestion).


# LLM Strategy
Source: https://polar.sh/docs/features/usage-based-billing/ingestion-strategies/llm-strategy

Ingestion strategy for LLM Usage

## Javascript SDK

### LLM Strategy

Wrap any LLM model from the `@ai-sdk/*` library, to automatically fire prompt- & completion tokens used by every model call.

```
pnpm add @polar-sh/ingestion ai @ai-sdk/openai
```

```typescript
import { Ingestion } from "@polar-sh/ingestion";
import { LLMStrategy } from "@polar-sh/ingestion/strategies/LLM";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

// Setup the LLM Ingestion Strategy
const llmIngestion = Ingestion({ accessToken: process.env.POLAR_ACCESS_TOKEN })
  .strategy(new LLMStrategy(openai("gpt-4o")))
  .ingest("openai-usage");

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  // Get the wrapped LLM model with ingestion capabilities
  // Pass Customer Id to properly annotate the ingestion events with a specific customer
  const model = llmIngestion.client({
    customerId: request.headers.get("X-Polar-Customer-Id") ?? "",
  });

  const { text } = await generateText({
    model,
    system: "You are a helpful assistant.",
    prompt,
  });

  return Response.json({ text });
}
```

#### Ingestion Payload

```json
{
  "customerId": "123",
  "name": "openai-usage",
  "metadata": {
    "promptTokens": 100,
    "completionTokens": 200
  }
}
```

## Python SDK

Our Python SDK includes an ingestion helper and strategies for common use cases. It's installed as part of the Polar SDK.

<CodeGroup>
  ```bash pip
  pip install polar-sdk
  ```

  ```bash uv
  uv add polar-sdk
  ```
</CodeGroup>

### Ingestion helper

The ingestion helper is a simple wrapper around the Polar events ingestion API. It takes care of batching and sending events to Polar in the background, without blocking your main thread.

```python
import os
from polar_sdk.ingestion import Ingestion

ingestion = Ingestion(os.getenv("POLAR_ACCESS_TOKEN"))

ingestion.ingest({
    "name": "my-event",
    "external_customer_id": "CUSTOMER_ID",
    "metadata": {
        "usage": 13.37,
    }
})
```

### PydanticAI Strategy

[PydanticAI](https://ai.pydantic.dev) is an AI agent framework for Python. A common use-case with AI applications is to track the usage of LLMs, like the number of input and output tokens, and bill the customer accordingly.

With our PydanticAI strategy, you can easily track the usage of LLMs and send the data to Polar for billing.

```python
import os
from polar_sdk.ingestion import Ingestion
from polar_sdk.ingestion.strategies import PydanticAIStrategy
from pydantic import BaseModel
from pydantic_ai import Agent


ingestion = Ingestion(os.getenv("POLAR_ACCESS_TOKEN"))
strategy = ingestion.strategy(PydanticAIStrategy, "ai_usage")


class MyModel(BaseModel):
    city: str
    country: str


agent = Agent("gpt-4.1-nano", output_type=MyModel)

if __name__ == '__main__':
    result = agent.run_sync("The windy city in the US of A.")
    print(result.output)
    strategy.ingest("CUSTOMER_ID", result)
```

*This example is inspired from the [Pydantic Model example](https://ai.pydantic.dev/examples/pydantic-model/) of PydanticAI documentation.*

#### Ingestion Payload

```json
{
  "name": "ai_usage",
  "external_customer_id": "CUSTOMER_ID",
  "metadata": {
    "requests": 1,
    "total_tokens": 78,
    "request_tokens": 58,
    "response_tokens": 20
  }
}
```


# S3 Strategy
Source: https://polar.sh/docs/features/usage-based-billing/ingestion-strategies/s3-strategy

Ingestion strategy for S3 Operations

## Javascript SDK

Wrap the official AWS S3 Client with our S3 Ingestion Strategy to automatically ingest bytes uploaded.

```
pnpm add @polar-sh/ingestion @aws-sdk/client-s3
```

```typescript
import { Ingestion } from "@polar-sh/ingestion";
import { S3Strategy } from "@polar-sh/ingestion/strategies/S3";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT_URL,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

// Setup the S3 Ingestion Strategy
const s3Ingestion = Ingestion({ accessToken: process.env.POLAR_ACCESS_TOKEN })
  .strategy(new S3Strategy(s3Client))
  .ingest("s3-uploads");

export async function POST(request: Request) {
  try {
    // Get the wrapped S3 Client
    // Pass Customer Id to properly annotate the ingestion events with a specific customer
    const s3 = s3Ingestion.client({
      customerId: request.headers.get("X-Polar-Customer-Id") ?? "",
    });

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: "a-random-key",
        Body: JSON.stringify({
          name: "John Doe",
          age: 30,
        }),
        ContentType: "application/json",
      })
    );

    return Response.json({});
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
```

#### Ingestion Payload

```json
{
  "customerId": "123",
  "name": "s3-uploads",
  "metadata": {
    "bytes": 100,
    "bucket": "my-bucket",
    "key": "my-key",
    "contentType": "application/text"
  }
}
```


# Stream Strategy
Source: https://polar.sh/docs/features/usage-based-billing/ingestion-strategies/stream-strategy

Ingestion strategy for Readable & Writable Streams

## Javascript SDK

Wrap any Readable or Writable stream of choice to automatically ingest the bytes consumed.

```
pnpm add @polar-sh/ingestion
```

```typescript
import { Ingestion } from '@polar-sh/ingestion';
import { StreamStrategy } from '@polar-sh/ingestion/strategies/Stream';

const myReadstream = createReadStream(...);

// Setup the Stream Ingestion Strategy
const streamIngestion = Ingestion({ accessToken: process.env.POLAR_ACCESS_TOKEN })
  .strategy(new StreamStrategy(myReadstream))
  .ingest("my-stream");

export async function GET(request: Request) {
  try {

    // Get the wrapped stream
    // Pass Customer Id to properly annotate the ingestion events with a specific customer
    const stream = streamIngestion.client({
      customerId: request.headers.get("X-Polar-Customer-Id") ?? ""
    });

    // Consume stream...
    stream.on('data', () => ...)

    return Response.json({});
  } catch (error) {
    return Response.json({ error: error.message });
  }
}
```

#### Ingestion Payload

```json
{
  "customerId": "123",
  "name": "my-stream",
  "metadata": {
    "bytes": 100
  }
}
```


# Introduction
Source: https://polar.sh/docs/features/usage-based-billing/introduction

Usage based billing using ingested events

<Info>
  Usage Based Billing is a new feature. We have a lot in store and welcome
  feedback!
</Info>

## Overview

Polar has a powerful Usage Based Billing infrastructure that allows you to charge your customers based on the usage of your application.

This is done by ingesting events from your application, creating Meters to represent that usage, and then adding metered prices to Products to charge for it.

## Concepts

### Events

Events are the core of Usage Based Billing. They represent *some* usage done by a customer in your application. Typical examples of events are:

* A customer consumed AI LLM tokens
* A customer streamed minutes of video
* A customer uploaded a file to your application

Events are sent to Polar using the [Events Ingestion API](/api-reference/events/ingest) and are stored in our database. An event consists of the following fields:

* A `name`, which is a string that can be used to identify the type event. For example, `ai_usage`, `video_streamed` or `file_uploaded`.
* A `customer_id` or `external_customer_id`, which is the Polar's customer ID or your user's ID. This is used to identify the customer that triggered the event.
* A `metadata` object, which is a JSON object that can contain any additional information about the event. This is useful for storing information that can be used to filter the events or compute the actual usage. For example, you can store the duration of the video streamed or the size of the file uploaded.

Here is an example of an event:

```json
{
  "name": "ai_usage",
  "external_customer_id": "cus_123",
  "metadata": {
    "model": "gpt-4.1-nano",
    "requests": 1,
    "total_tokens": 77,
    "request_tokens": 58,
    "response_tokens": 19
  }
}
```

### Meters

Meters are there to filter and aggregate the events that are ingested. Said another way, this is how you define what usage you want to charge for, based on the events you send to Polar. For example:

* AI usage meter, which filters the events with the name `ai_usage` and sums the `total_tokens` field.
* Video streaming meter, which filters the events with the name `video_streamed` and sums the `duration` field.
* File upload meter, which filters the events with the name `file_uploaded` and sums the `size` field.

You can create and manage your meters from the dashboard. Polar is then able to compute the usage over time, both globally and per customer.

### Metered Price

A metered price is a price that is based on the usage of a meter, which is computed by filtering aggregating the events that are ingested. This is how you charge your customers for the usage of your application.

### Meter Credits benefit

You can give credits to your customers on a specific meter. This is done by creating a Meter Credits Benefit, which is a special type of benefit that allows you to give credits to your customers on a specific meter.

On a recurring product, the customer will be credited the amount of units specified in the benefit at the beginning of every subscription cycle period — monthly or yearly.

### Diagram

Here is a diagram of how the different components of Usage Based Billing work together:

```mermaid
flowchart TD
App[Your Application]
User[User]

    subgraph Polar["Polar"]
        API[Events Ingestion API]
        DB[(Events database)]
        Meters[Meters]
        Products[Products]
        Benefit[Meter Credits Benefit]

        subgraph MeteredPrice["Metered Prices"]
            Unit[Unit Pricing]
        end
    end


    User -->|Uses| App
    App -->|Sends events| API
    API -->|Stores events| DB
    Benefit -->|Stores credit events| DB

    DB -->|Filtered & aggregated by| Meters
    Meters -->|Associated with| Products
    Benefit -->|Associated with| Meters

    Products -.->|Apply| MeteredPrice
```

## Quickstart

Get up and running in 5 minutes

<Steps>
  <Step title="Enable Usage Based Billing">
    Usage Based Billing is currently in Alpha. Enable it by navigating to the Organization Settings and toggling the "Usage Based Billing" switch.
  </Step>

  <Step title="Create a Meter">
    Meters consist of filters and an aggregation function.
    The filter is used to filter the events that should be included in the meter and the aggregation function is used to compute the usage.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0145ac51bc8100b038482d31612f3ea6" data-og-width="3598" width="3598" data-og-height="2070" height="2070" data-path="assets/features/usage/create-meter.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06564195b986ffcc5e117fe8d9811a5a 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=68bed5ae2b654f960df4cfd9f89067df 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4eae2ac77588c804de04f46f9bb0ea0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7a869fe027539a8cecb45c92c5781031 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e661f4bf96776191db89ceaf6f74c4bd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ed97c0b4c66e04ccee501693c309a6bc 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2293c25c2e2c014abcf6c8a761568f95" data-og-width="3590" width="3590" data-og-height="2066" height="2066" data-path="assets/features/usage/create-meter.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5dfdb7fff99d88e7ab1e071dc3b1c49 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb463be35ab687fc710735ecc25115a7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81913de1ce93b114391ef2e3e47e7326 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3517924ffa89faf0a672ded7ebfce07b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=121d7076d48d16cc60d6f8d01da93b83 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a90619357124a1d53198daeb6cac936 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Add metered price to a Product">
    To enable usage based billing for a Product, you need to add a metered price to the Product. Metered prices are only applicable to Subscription Products.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=c1a9f0493fa6b73f0d4581b19e5d757c" data-og-width="2552" width="2552" data-og-height="1600" height="1600" data-path="assets/features/usage/product-meter.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=3bd76b239eb542976ada85b10d77ac74 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=77cc8b5ff8e3ece74597def4976e6e54 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=000613bbe30c7d0ea01a68010df9057f 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=28a3944f3bd8883e7087e115df0eb0c8 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0767631d6e5b86e1619cc148ba1165f2 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=09603dfff2709840a9d549daf1212edd 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4a54e18d784e6c6312c73dd42b02c473" data-og-width="2548" width="2548" data-og-height="1596" height="1596" data-path="assets/features/usage/product-meter.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4220c9a8ec19f60bfeea859a6347a768 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5d64369c39f00993c5c02c333b651e1f 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1ea7e017198475c81a3fd3299ad7bded 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=145f18199abc0b5374aa57645b37a01d 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7e7e6a2f4a6e2caf87821fe0d2386ba2 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/features/usage/product-meter.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e4dd36ce07c66dbcc6ccd39721148808 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Ingest Events">
    Now you're ready to ingest events from your application. Sending events which match the meter's filter will increment the meter's usage for the customer.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6428f34bbf464c2e8248138ccbcea782" data-og-width="1572" width="1572" data-og-height="1104" height="1104" data-path="assets/features/usage/ingest.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=48ec9760e08b32f72af0eb64f6fdf229 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=203d82a019fad623818cb1bc97e6ee32 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a5c2fd9b97c3a34b3c9781751cae1f2 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d0cd0f66ddb26b8c21cad10cbf39ce31 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b0b2666811cd8342645f91466cc66b07 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ac827327a6bdc5ab6e808b10bb45dd6d 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f8b485ff1e386a0fa79c50d428c5b958" data-og-width="1566" width="1566" data-og-height="1102" height="1102" data-path="assets/features/usage/ingest.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=5bf03be85d4df401d958f91cf55b843c 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a36b6e326318b5348db5a266b1419932 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e98887dbff16f4595454edacb70abb13 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5e57c3e293ec3763c69d5b9f5aa79e0 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3bf6e392f7eb1c9a5566ae8d4dd3593d 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/ingest.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=be5fb49f7b023b6d7d9696aaa1d4aa55 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Customer Usage">
    Customers can view their estimated charges for each meter in the Customer Portal.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=85bdb395f87e972ed50a7381ba3aad43" data-og-width="2358" width="2358" data-og-height="1218" height="1218" data-path="assets/features/usage/portal.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=8972d5a0a8a6f872681d6f9868bcc880 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=96aeab3c57e09af522465cc2d079c11b 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eb837824af9aaa0ed9ea55353c8375a0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1b4dda5c34f856b934d2b76fdfbade24 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=553abd674a5c2fb50a15fe5aad61a54e 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5a029265468a698405d6b5b85e8c4d2 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=44f1b0e0f67aaa22b293a7dafaf3ab99" data-og-width="2364" width="2364" data-og-height="1214" height="1214" data-path="assets/features/usage/portal.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f5c9e22d99ee09640a9057f823bddfa2 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1cfb93c49691551d3a0015f86ba582ec 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=30229e91a32620d8044e49045b02c465 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d7a5b71049e90623dbc912bc4040cdff 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0d05475d6642dd222c07255936727b21 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/portal.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b541f2af5d8fb788af4089b07d7d395d 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>


# Meters
Source: https://polar.sh/docs/features/usage-based-billing/meters

Creating and managing meters for Usage Based Billing

Meters are there to filter and aggregate the events that are ingested. Said another way, this is how you define what usage you want to charge for, based on the events you send to Polar. For example:

* AI usage meter, which filters the events with the name `ai_usage` and sums the `total_tokens` field.
* Video streaming meter, which filters the events with the name `video_streamed` and sums the `duration` field.
* File upload meter, which filters the events with the name `file_uploaded` and sums the `size` field.

You can create and manage your meters from the dashboard. Polar is then able to compute the usage over time, both globally and per customer.

## Creating a Meter

To create a meter, navigate to the Meters page in the sidebar and click the "Create Meter" button.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=0145ac51bc8100b038482d31612f3ea6" data-og-width="3598" width="3598" data-og-height="2070" height="2070" data-path="assets/features/usage/create-meter.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=06564195b986ffcc5e117fe8d9811a5a 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=68bed5ae2b654f960df4cfd9f89067df 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b4eae2ac77588c804de04f46f9bb0ea0 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7a869fe027539a8cecb45c92c5781031 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e661f4bf96776191db89ceaf6f74c4bd 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ed97c0b4c66e04ccee501693c309a6bc 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2293c25c2e2c014abcf6c8a761568f95" data-og-width="3590" width="3590" data-og-height="2066" height="2066" data-path="assets/features/usage/create-meter.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b5dfdb7fff99d88e7ab1e071dc3b1c49 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cb463be35ab687fc710735ecc25115a7 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=81913de1ce93b114391ef2e3e47e7326 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3517924ffa89faf0a672ded7ebfce07b 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=121d7076d48d16cc60d6f8d01da93b83 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/create-meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=3a90619357124a1d53198daeb6cac936 2500w" data-optimize="true" data-opv="2" />

## Filters

A filter is a set of clauses that are combined using conjunctions. They're used to filter events that you've ingested into Polar.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=77aca67ac7630a38fefa9a6d567a58f3" data-og-width="1274" width="1274" data-og-height="922" height="922" data-path="assets/features/usage/filter.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=63aa8d2fcf57607d894e4197508ac471 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=d490a459b8e9337775da489d8eca6479 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a9194a1390f970bfb6e6b6ce3dbe5f91 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f77a2c146f613ff58848c7f061b21032 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=fd58c1a2958502970dd1be8186c23008 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f2856bd8129920878767bfa7220a50fd 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=6c855b483334dba4b7f26e54c2878080" data-og-width="1276" width="1276" data-og-height="914" height="914" data-path="assets/features/usage/filter.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=08917a3bdf591a0fbf9935baa877c923 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cc350040cb98987f87fa45533bed74d8 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c069e1bc97edf426a6f52c394ba172a 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e90bf35497aa55d2ddaee0bb890a5339 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2f6b218e91faa3c76ad587c943ffab61 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/filter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ea95d3313fd786655c0071a4fea0eaaa 2500w" data-optimize="true" data-opv="2" />

### Clauses

A clause is a condition that an event must meet to be included in the meter.

#### Property

Properties are the properties of the event that you want to filter on.

If you want to match on a metadata field, you can use the metadata key directly. No need to include a `metadata.` prefix.

#### Operator

Operators are the operators that you want to use to filter the events.

* **Equals**
* **Not equals**
* **Greater Than**
* **Greater Than or Equals**
* **Less Than**
* **Less Than or Equals**
* **Contains**
* **Does Not Contain**

#### Value

Values are automatically parsed in the filter builder. They're parsed in the following order:

1. Number — Tries to parse the value as number
2. Boolean — Checks if value is "true" or "false"
3. String — Treats value as string as fallback

### Conjunctions

A conjunction is a logical operator that combines two or more clauses.

* **and** — All clauses must be true for the event to be included.
* **or** — At least one clause must be true for the event to be included.

## Aggregation

The aggregation is the function that is used to aggregate the events that match the filter.

For example, if you want to count the number of events that match the filter, you can use the **Count** aggregation. If you want to sum the value of a metadata field, you can use the **Sum** aggregation.

* **Count** — Counts the number of events that match the filter.
* **Sum** — Sums the value of a property.
* **Average** — Computes the average value of a property.
* **Minimum** — Computes the minimum value of a property.
* **Maximum** — Computes the maximum value of a property.
* **Unique** — Counts the number of unique values of a property.

<AccordionGroup>
  <Accordion title="Example">
    Consider the following events:

    ```json
    [
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 10
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 20
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 30
        }
      },
      {
        "name": "ai_usage",
        "external_customer_id": "cus_123",
        "metadata": {
          "total_tokens": 30
        }
      }
    ]
    ```

    Here is the result of each aggregation function, over the `total_tokens` metadata property:

    * **Count**: 4 units
    * **Sum**: 90 units
    * **Average**: 22.5 units
    * **Minimum**: 10 units
    * **Maximum**: 30 units
    * **Unique**: 3 units
  </Accordion>
</AccordionGroup>

If you want to use a metadata property in the aggregation, you can use the metadata property directly. No need to include a `metadata.` prefix.

## Example

The following Meter Filter & Aggregation will match events that have the name `openai-usage` and sum units over metadata property `completionTokens`.

<img className="block dark:hidden" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=2c4ba244ceee17f9bda8665f6a22a6b6" data-og-width="1108" width="1108" data-og-height="936" height="936" data-path="assets/features/usage/meter.light.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=b2a94e81c180337d7ee2009a44bc2785 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=eed0481a8ba7ccd18c11926272a102cd 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=36c75ae39756a3e7a432d7e820321647 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=548601de5159c35205887b849fbf5e1d 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=e5c3046097cc051d249d43da23ff2f74 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.light.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=75af4ab8b61038d26c2bf1f0b92dfa96 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=ef46a2a0420e3e01d7a181d3e7ddf118" data-og-width="1116" width="1116" data-og-height="928" height="928" data-path="assets/features/usage/meter.dark.png" srcset="https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=280&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=1c1c57db0b50e0894c152e6fa5efce1c 280w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=560&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=a798552d1ead623238cc00e12de88cf3 560w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=840&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=cbcf411fe67a5142b614989510ae9952 840w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=1100&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=7c6db5a8ea7a281cdfc14291a96082c1 1100w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=1650&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=88a0ffbfa69bf627373eca1f00b73557 1650w, https://mintcdn.com/polar/fnujBPxaFvfkZfB0/assets/features/usage/meter.dark.png?w=2500&fit=max&auto=format&n=fnujBPxaFvfkZfB0&q=85&s=f76c0904beb7ecb5a83c2da8f27b1704 2500w" data-optimize="true" data-opv="2" />

<Tip>
  You can **Preview** the events matched by the meter while creating it.
</Tip>

## Good to know

A few things to keep in mind when creating and managing meters:

### Renaming a Meter

Until [https://github.com/polarsource/polar/issues/6490](https://github.com/polarsource/polar/issues/6490) is fixed, please [contact support](/support) to rename the meter for you.

### Updating a Meter

You may update a meter's filters or aggregation function as long as the meter doesn't have any processed events or does not have any customer purchase associated with it.

### Deleting a Meter

Meters are permanent. Once created, they cannot be deleted.


# How to allow multiple subscriptions per customer
Source: https://polar.sh/docs/guides/allow-multiple-subscriptions-per-customer

Learn how to allow multiple subscriptions per customer in Polar.

<Steps>
  <Step title="Go to Organization Settings">
    In the Polar dashboard sidebar, click on **Settings**.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/settings`\
    Scroll down to **Subscriptions** section.

    <img height="200" src="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=c0389fa04bf3816133ac86eaf963cc5f" data-og-width="1715" data-og-height="895" data-path="assets/guides/enable-multiple-subscription/settings.png" srcset="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=280&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=e464376c3bc81c7726e2b128f753dfb5 280w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=560&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=2ba293efda1cc1ff4176688f55ca2a43 560w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=840&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=059dad623c48cd23ce641112622ea1c8 840w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=1100&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=d6521b821cd77deaf6a36b3995ebe03f 1100w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=1650&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=9b6f45d13f175e5be4e78cd190da0146 1650w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/settings.png?w=2500&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=c2a25af16082b79d4029e6343d88f7d8 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Toggle Allow multiple subscriptions">
    **Toggle ON** Allow multiple subscriptions to allow multiple subscriptions per customer.

    <img height="200" src="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=cc78edc5981bd43ad3fead3c25a8876f" data-og-width="1715" data-og-height="895" data-path="assets/guides/enable-multiple-subscription/enable-multiple-subs.png" srcset="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=280&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=5b8df83f8b869fa10b000256ffe9ca9c 280w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=560&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=8fcb48b0229a259dd91ebe982bbfb1e2 560w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=840&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=d5d7b379a7ca5a58ef2629e1c4fa0ebc 840w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=1100&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=d961988b0e6833d665c94a9ef0bf6ebf 1100w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=1650&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=a13a84940ec935b8419d2adc6f3aabaa 1650w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/enable-multiple-subs.png?w=2500&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=ee6df11eeebac60ea44828198a627018 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Save the changes">
    Click **Save** in the **Subscriptions** section to save the changed settings.

    <img height="200" src="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=c0333a02947fb1e9129c14af811bcdd7" data-og-width="1715" data-og-height="895" data-path="assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png" srcset="https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=280&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=309ff56e2494e4adf989338cea064f48 280w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=560&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=c5181e0303e117e77329e92798fa9589 560w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=840&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=cc506cca6099195ac54d426adf841e33 840w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=1100&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=ad6cec2429f8df685ae648bd69a7430f 1100w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=1650&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=35dfa44956f38095679c9015d0f0cd5a 1650w, https://mintcdn.com/polar/t2pAmq6cpH5AKAcM/assets/guides/enable-multiple-subscription/save-enabled-multiple-subs.png?w=2500&fit=max&auto=format&n=t2pAmq6cpH5AKAcM&q=85&s=818dd40b78e4b84ed4632f830874f4d2 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>


# How to create product variants
Source: https://polar.sh/docs/guides/create-variants

Learn how create product variants in Polar and how customers can easily switch between them in the customer portal.

## Creating product variants (3 subscription products)

<Steps>
  <Step title="Go to Products Catalogue">
    In the Polar dashboard sidebar, navigate to **Products** > **Catalogue** for your organization.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/products`

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=7c4a8b6889162b8ba00b1ec3a76ab1ba" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/product-catalogue.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=e00d3b4533a027bca5eb27a3d2233610 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=7a957ac0ff64baa1aa2db2682137a1ad 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4bc353016fafd7f706f9c310b35598a4 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=c4082d9e73a9a1bf35bd0e0854b95916 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=84ad8a280e6be664841db2e9e5e1e5ae 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/product-catalogue.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=09fdad8d0b18bd7c6ade92caed936708 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Create a product">
    Click on **New Product** and fill the product information. Here, we are creating a monthly subscription product **Basic version** with cost \$20.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8c2c27cad0a3deecc7f4c01293ff7031" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/basic-version.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5493e15916391a3a2ef0339dd7dd8df5 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ad9512312363b9fc212662e7e45cd0d5 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=a90e8e24bb9fdd4d30084d08b225f923 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8c8e1df677240b16464268d4a7a5ee47 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=945c2ddad73715cd823dbdb2e0b279d5 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=627c01e8e9f118e2c5130b32957ec24b 2500w" data-optimize="true" data-opv="2" />

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=1d2f834903fda274c4aa4f699d2c21b7" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/basic-version2.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=1cf97840d3e99b8946d79c4017ae2252 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3accfc7f210994d44fb7dcdfb645bbcb 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=a91a5d8dc428f6f6b207df62b2bd75f4 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=dd9ad7383e38029ffe0452e934a70cb5 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=aff210bb22071dc7cae4369f5c0960cb 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/basic-version2.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=2c6da4d1f857b81466a0885219cc8743 2500w" data-optimize="true" data-opv="2" />

    Your product catalogue should now show this product as follows:

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=97849159c32582a962b4c59ee1ed4809" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/catalogue-basic.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=12d7a6369febb872784c82986207a93b 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=bd903d50f3e4aebdef8347d7de7e5d74 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=9610545a7be1d45f9d238bb076eaddf5 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=eaf653048bdfe1625a9595cf9a6ae922 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=715a35b82f4fb7ae1536e8cd44eee799 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-basic.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ff17b00278d3b056f06318482121b722 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Similarly, create two more products">
    Click on **New Product** and create two more subscription products one by one.

    * **Mid version**: Fill the product information. We create a monthly subscription product named **Mid version** with cost \$30.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0e6e087786645c6c70f4772ae00e042" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/mid-version.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=336c0434fce191707f2f9bc27389c949 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=fceaf35a72978ad8f55a0afcd166af54 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=c6d8d0082b3a8ac899063afbf2dd50b5 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=9057a30dc0b848b37963f940a7795a69 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b265e24697cb5bada8cd1cce91661985 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=521cdfc36d2a4b9bfcc60706622138c1 2500w" data-optimize="true" data-opv="2" />

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b89cff6a6b5f76d9a6ea9f260b4e8e37" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/mid-version2.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8bfd355326fddc61d90ca6927147270b 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=0ed90025563730cd841322dceccea2a5 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=03c3663d498f889e7c435139f49c9912 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=0eb746e67a293437ed73abca3c9a0515 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=448ce8b24cd2a37a7c58d54ecd55d636 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/mid-version2.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=728f891adf874d88c2910a07838336c5 2500w" data-optimize="true" data-opv="2" />

    * **Advanced version**: We create a monthly subscription product named **Advanced version** with cost \$40.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4069bb1bcf54841ccdcbb0019e35c7eb" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/advanced-version.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=058c58a4bdb960f79e4db20ad901e1f9 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=332b31c6f1a3876a02c1c8872cea2f0a 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=92d1565d8d9c1ddcce2346a391cb752e 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=914e66ff65dd3fd47a465b61eedb8013 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=17b506e998738a4594cb57325edf25b6 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4d545f3c659ead0a87765ffe69ccfdca 2500w" data-optimize="true" data-opv="2" />

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b2305b715d19a9d01f6d4310b72c1e62" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/advanced-version2.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=64c050199971010489612ebd329383c5 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=57ed4a483fd44eb9fd37bb30904d0e14 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=c9928dc1c51477eeb3e687c51ceb3d56 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=f943194f963f77352e89663ecf0d4695 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=06c1bbb00d58ac6d9de2ae107c805c0d 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/advanced-version2.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ffe61dceae328894eac280ccaa088ef0 2500w" data-optimize="true" data-opv="2" />

    * **Product Catalogue**: You should be able to see all your products on Product Catalogue.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=adaa8979c5f15f5ab657f8b042d3f83e" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/catalogue-with-3-products.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=67fa6d02e05b70534e6aa03b6a281b2a 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=dde99f90cbf9ce98321875abaf883ae1 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=80831818df4d98fb92e074f2329f2101 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=c6a9ecef6a7efe75005165dab4fd35eb 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=7ebb09920e3a21aca49e73b634ca7e32 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/catalogue-with-3-products.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=024c3aad8078fc09af3a82fa534b53c3 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>

## Creating checkout links with variants

<Steps>
  <Step title="Navigate to Checkout Links in the dashboard">
    In the Polar dashboard sidebar, navigate to **Products** > **Checkout Links**.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/products/checkout-links`

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=23d69547e3f9a82ea6549e65612140e4" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/checkout-links.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8dd3aa6cb0dbe57709a4a430ddcb6882 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8cebc5108369331e8b46afd773f4c2a6 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5b9df8f7b810ce70712dbda8a352e0ff 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=57e429830047e4077dd5d28e92becf19 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b8a2252fb5770f2ba9e6261dd19d85e9 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/checkout-links.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=77828a1d012c8ab8c9ae99828166bf01 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Create a Checkout Link">
    Click on **New Link** and select all your products which you want to offer as variants.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=101ad4a828b7f2bf6837416c74f95035" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/create-checkout-links.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0ea8e14630df687b3a38f1072e5c36b 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=205bb1283365a5f2c1e3a6f9de748eec 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=836ac4bb7eef5b11faae853b4b5af1d4 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=40babfef68f234de451ba2e59c34cd61 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=e00c703b819fd9872b062af7a8b350d7 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/create-checkout-links.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=a45679bab485848ebb8ce02c18d40456 2500w" data-optimize="true" data-opv="2" />

    At this step, you may add a label, success URL and metadata. You may also configure whether discount codes are allowed and whether billing address is required from customers.
    Click on **Create Link** after adding your configurations.
  </Step>

  <Step title="Accessing the checkout link">
    You should be able to see your label name in **Checkout Links**. In our case, **3 products** is the default label name assigned by the system.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3667c130d38ba37dacc9116fb46b84de" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/link-created.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5f4c475b5ea236b4fcec6fb25321d5c9 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=f02400318f29a5d588bede388edff10c 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=1bdc99672bf40f32d51654b7234b7a4f 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=e8f600fb00fd909759c706838e29ddb2 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5492abd38984522ccc0ea620e12a107f 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/link-created.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=1a180009d8fa569c4409b6999a6fadad 2500w" data-optimize="true" data-opv="2" />

    Click on your label to see the checkout link.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d819dacbf7cf45c2a31dbbe6e7b44e13" data-og-width="1757" data-og-height="871" data-path="assets/guides/variants/access-link.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=21cb2613e618416456294d3f25a926b9 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0c210aa96b8871909575397d32e7c77 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0f47ca993732b8d37ac9d9be26be189 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3165120ea92e4f9e40e3f0466dabfa93 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=49725791cd7daf98daab5b6074eaf3b4 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/access-link.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4aa50f0f189deae33004e4479673f99e 2500w" data-optimize="true" data-opv="2" />

    You can copy this link and share to your customers for them to purchase a variant.
  </Step>
</Steps>

## Purchasing from variants

<Steps>
  <Step title="Purchasing a product">
    On opening the checkout link, the customer will need to select the variant they want to purchase and fill their email address and card details.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=766c5bf3cf2d0fff321f464f3c6e2adb" data-og-width="1444" data-og-height="1410" data-path="assets/guides/variants/full-page-checkout-page.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=35a0bc0f42ccefec65d3697fb12f3bf5 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ead885117a379a9b94c96bbf16052b1a 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=e0e1dc806223eb9fea886f1adba1a6c5 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=1492862b73dd47c8452faba13bb27e64 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=22dba661c2131ea94590c27a8ce08806 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/full-page-checkout-page.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=9046f3d0c69180f0242563d6cb08044e 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Access email for upgrade/downgrade link">
    Once the customer has purchased the subscription, they will receive an email containing the link to access their purchase.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=cc127fe5bde5d5120d813d710f55b430" data-og-width="971" data-og-height="781" data-path="assets/guides/variants/customer-mail-2.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=34242c2738eb2565d97bc69b155e9ddd 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=eaaa1ea5e817086542cb0f441c24365a 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3139378644b34cc776eea25ef948bdf7 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4afe9d6657e55aefc9a1de1cdf26c4ce 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b1877ca68b5b24ba54cf176ea95a8894 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-mail-2.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b2e99840c0b01d7315a67ef419306fff 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>

## Downgrading to another product variant

<Steps>
  <Step title="Open Customer Portal and click on Change Plan">
    On opening the link from the email received, the customer needs to click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b710f5f771290112039e945e9b48b368" data-og-width="1482" data-og-height="787" data-path="assets/guides/variants/customer-portal-1.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0ccfc3e85dc64534feedf33e3c27ac3 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4e6a9b417e4d2c4b1dfcf873942b4b67 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b615cb64cf6805e4ca113b2db5dd3c15 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ddc465a86cf51543fb3ac80856f646c1 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5d3b9f9ec7e62fda55525f929be30429 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3226182458d7c65ba918f1bf3f8b7d9f 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select the desired plan">
    Then, they can select the plan they want to downgrade to and click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=8f050dfc7823abcfaccdb4c771552f57" data-og-width="1645" data-og-height="865" data-path="assets/guides/variants/customer-portal-3.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ed973945b3d33a0ecaeee96365ed89f6 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=f7b79439cafa746989d7cfd0ff4d8866 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=7ebdea2e0681677eb583645b675cc52e 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=49043970fa7552c028c0b8b434884695 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=624d74a73a1df92f59fa6461713e54ee 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-3.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=111c5de0e216f6265829cd01c98c9dc4 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Downgraded successfully">
    Now, the product is changed to **Basic version** instead of **Mid version** on the portal.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b4070552c8549136a3b97432b9c05abf" data-og-width="1645" data-og-height="865" data-path="assets/guides/variants/customer-portal-4.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=60c0276913e8e4c7aada546d260ebf2b 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5a09a1dc8c85329e7e41f03a600cc281 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=de26f4e10dd904cafe5063dc23da04e1 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=98957060497d81a67aef1ebee8921844 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=701e4a43f7c29491ce55d3ef5dad07fe 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-4.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d6a50c078031177748ed12b43fb2f43d 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>

## Upgrading to another product variant

<Steps>
  <Step title="Open Customer Portal and click on Change Plan">
    On opening the link from the email received, the customer needs to click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b710f5f771290112039e945e9b48b368" data-og-width="1482" data-og-height="787" data-path="assets/guides/variants/customer-portal-1.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d0ccfc3e85dc64534feedf33e3c27ac3 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=4e6a9b417e4d2c4b1dfcf873942b4b67 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b615cb64cf6805e4ca113b2db5dd3c15 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ddc465a86cf51543fb3ac80856f646c1 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5d3b9f9ec7e62fda55525f929be30429 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-1.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=3226182458d7c65ba918f1bf3f8b7d9f 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select the desired plan">
    Then, they need to select the variant they want to upgrade to, **Advanced version** and click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ae7ae1008422adcc755ab56d4da26224" data-og-width="1645" data-og-height="865" data-path="assets/guides/variants/customer-portal-5.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=934129b1c8ad7c2935f57a7be533a017 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5b216d92934cea154fa9d3847f6f05f4 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=a9368af496546fd9146d6b460a9da937 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=5eef222d768bfaff6bac7aa74b2a64c4 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=aa48914e6213711e21b1ece73555f958 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-5.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=d78888f1c7499bbc81417c930216e732 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Upgraded successfully">
    Now, the product is changed to **Advanced version** on the portal.

    <img height="200" src="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=ca35ad3ea7e4d154680e4788185638b5" data-og-width="1645" data-og-height="865" data-path="assets/guides/variants/customer-portal-6.png" srcset="https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=280&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=c5c1c736de93a02ae7b34043ac0397f8 280w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=560&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=b510e257f0d6254497bca450429b384d 560w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=840&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=6c948d26155800e0954c983eec2624fb 840w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=1100&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=7f174535ab6291b2383bd7b91a6adea4 1100w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=1650&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=86d433cdfa6153552993a3a4e7c84042 1650w, https://mintcdn.com/polar/DR6pBq_Z5cTZz3sx/assets/guides/variants/customer-portal-6.png?w=2500&fit=max&auto=format&n=DR6pBq_Z5cTZz3sx&q=85&s=0859c56a99c91e2fe3777b6fe555e5b3 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>


# How to disable subscription upgrades/downgrades in customer portal
Source: https://polar.sh/docs/guides/disable-subscription-changes-in-customer-portal

Learn how to disable the option for customers to upgrade or downgrade subscription plans from the customer portal.

<Steps>
  <Step title="Go to Organization Settings">
    In the Polar dashboard sidebar, click on **Settings**.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/settings`\
    Scroll down to **Subscriptions** section.

    <img height="200" src="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=701f0dc92b3ae6aefc794ca3d16c6b2e" data-og-width="1715" data-og-height="895" data-path="assets/guides/disable-prices-changes-by-customer/settings.png" srcset="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=280&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=5a0e5b29df80f2af2a5214c22ff9ebd8 280w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=560&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=48a49708b7b7ec372402021e7f6311b8 560w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=840&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=7a2f6efa7d327293e55ce74d1b12b540 840w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=1100&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=f48341705c1fac568bb77f64732c44a2 1100w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=1650&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=517368b29ab6a348222c29c9c5cabaac 1650w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/settings.png?w=2500&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=dc53203f5142157c4ed5ae34a6aaef9b 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Toggle Allow price changes">
    **Toggle OFF** Allow price changes to prevent customers from upgrading or downgrading their subscriptions from the customer portal.

    <img height="200" src="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=23defe54af5e17807c516beaf52cda32" data-og-width="1715" data-og-height="895" data-path="assets/guides/disable-prices-changes-by-customer/disable-price-changes.png" srcset="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=280&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=544cb8b5ae636060cf1012dec97f9124 280w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=560&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=f016b72d973c8b522b0a358b35c7ad2c 560w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=840&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=fb9f9dc6eae4a92c5bc0f7a96051646a 840w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=1100&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=ca27f0e7d5d5b9be7f9501cb23c0bdc9 1100w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=1650&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=e91128afe750c747193bc35722059ae2 1650w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/disable-price-changes.png?w=2500&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=fa83a3b408d6cda98379745bef3bcbc1 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Save the changes">
    Click **Save** in the **Subscriptions** section to save the changed settings.

    <img height="200" src="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=a17e65a0b1d14c9569a318aa417bcd3e" data-og-width="1715" data-og-height="895" data-path="assets/guides/disable-prices-changes-by-customer/price-changes-saved.png" srcset="https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=280&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=18c8a1f24b7557d06ff6d2d121e0989a 280w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=560&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=8d278754e026c13e8ef0c1f20310d615 560w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=840&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=58941a6d88123c347de6bb56d63ac144 840w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=1100&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=1653a17e87a101a743e213e6a1ec14ff 1100w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=1650&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=5ce9b1df1e9bbfe659dbab7e31174cfa 1650w, https://mintcdn.com/polar/YXFhZ1qGOz_x16Vd/assets/guides/disable-prices-changes-by-customer/price-changes-saved.png?w=2500&fit=max&auto=format&n=YXFhZ1qGOz_x16Vd&q=85&s=ade9e55382cc0710c252d41c42fd980e 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>


# Introduction
Source: https://polar.sh/docs/guides/introduction

A collection of how-tos with Polar in form of step-by-step guides and tutorials.

This section is your starting point for learning how to use Polar with various stacks, environments, etc. Here you will find step-by-step guides and tutorials to help you integrate Polar into your projects, set up your environment, and make the most of our platform.

## Get Started

Browse the guides in the sidebar to find the right one based on your needs.

If you want to request a new guide, please [create an issue on polarsource/polar](https://github.com/polarsource/polar/issues/new/choose).


# Integrate Polar with Laravel
Source: https://polar.sh/docs/guides/laravel

In this guide, we'll show you how to integrate Polar with Laravel.

<img src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7f57da3dcc77d6f8e0f8b2e760f0aeea" data-og-width="1920" width="1920" data-og-height="1080" height="1080" data-path="assets/guides/laravel/hero.jpeg" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5c8af67a7a1f3e1ed28e24fd633057fb 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=991feb7c5298a76f861c23fe8143583b 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=2a542a3866463e546ed8f3d295fcf843 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4f7bc6092412d56d1ae3bccdfeebdfcf 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9b627520015006b566123b43379d83c0 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/guides/laravel/hero.jpeg?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=36e5b661f7df187fac6bb1b04d18fa88 2500w" data-optimize="true" data-opv="2" />

Consider following this guide while using the Polar Sandbox Environment. This will allow you to test your integration without affecting your production data.

## Polar Laravel Example App

We've created a simple example Laravel application that you can use as a reference.

[View Code on GitHub](https://github.com/polarsource/polar-laravel)

## Setting up environment variables

### Polar API Key

To authenticate with Polar, you need to create an access token, and supply it to Laravel using a `POLAR_API_KEY` environment variable.

You can create an organization access token from your organization settings.

## Fetching Polar Products for display

### Creating the Products Controller

Go ahead and add the following entry in your `routes/web.php` file:

```php
// routes/web.php
Route::get('/products', [ProductsController::class, 'handle']);
```

Next up, create the `ProductsController` class in the `app/Http/Controllers` directory:

```php
// app/Http/Controllers/ProductsController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ProductsController extends Controller
{
    public function handle(Request $request)
    {
        // Change from sandbox-api.polar.sh -> api.polar.sh when ready to go live
        // And don't forget to update the .env file with the correct POLAR_ORGANIZATION_ID and POLAR_WEBHOOK_SECRET
        $data = Http::get('https://sandbox-api.polar.sh/v1/products', [
            'is_archived' => false,
        ]);

        $products = $data->json();

        return view('products', ['products' => $products['items']]);
    }
}
```

## Displaying Products

Finally, create the `products` view in the `resources/views` directory:

```php
// resources/views/products.blade.php
@foreach ($products as $product)
    <div>
        <h3>{{ $product['name'] }}</h3>
        <a href="/checkout?priceId={{ $product['prices'][0]['id'] }}">Buy</a>
    </div>
@endforeach
```

Notice that we create a link to `/checkout` with a query parameter `priceId`. This is the ID of the price that the user will be charged for when they click the "Buy" button. We will configure this route in the next section.

That's it for the products page. You can now display the products to your users, and they will be able to buy them. Let's now create the checkout endpoint.

## Generating Polar Checkout Sessions

This endpoint will be responsible for creating a new checkout session, redirecting the user to the Polar Checkout page & redirect back to a configured confirmation page.

Go ahead and create a new entry in your `routes/web.php` file:

```php
// routes/web.php
Route::get('/checkout', [CheckoutController::class, 'handle']);
```

Next, create the `CheckoutController` class in the `app/Http/Controllers` directory:

```php
// app/Http/Controllers/CheckoutController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CheckoutController extends Controller
{
    public function handle(Request $request)
    {
        $productPriceId = $request->query('priceId', '');
        // Polar will replace {CHECKOUT_ID} with the actual checkout ID upon a confirmed checkout
        $confirmationUrl = $request->getSchemeAndHttpHost() . '/confirmation?checkout_id={CHECKOUT_ID}';

        // Change from sandbox-api.polar.sh -> api.polar.sh when ready to go live
        // And don't forget to update the .env file with the correct POLAR_ORGANIZATION_ID and POLAR_WEBHOOK_SECRET
        $result = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('POLAR_API_KEY'),
            'Content-Type' => 'application/json',
        ])->post('https://sandbox-api.polar.sh/v1/checkouts/custom/', [
            'product_price_id' => $productPriceId,
            'success_url' => $confirmationUrl,
            'payment_processor' => 'stripe',
        ]);

        $data = $result->json();

        $checkoutUrl = $data['url'];

        return redirect($checkoutUrl);
    }
}
```

We can now easily create a checkout session & redirect there by creating a link to `/checkout?priceId={priceId}`. Just like we did when displaying the products above.

Upon Checkout success, the user will be redirected to the confirmation page.

## Creating the Confirmation Page

Create a new entry in your `routes/web.php` file:

```php
// routes/web.php
Route::get('/confirmation', [ConfirmationController::class, 'handle']);
```

Next, create the `ConfirmationController` class in the `app/Http/Controllers` directory:

```php
// app/Http/Controllers/ConfirmationController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ConfirmationController extends Controller
{
    public function handle(Request $request)
    {
        // Change from sandbox-api.polar.sh -> api.polar.sh when ready to go live
        // And don't forget to update the .env file with the correct POLAR_ORGANIZATION_ID and POLAR_WEBHOOK_SECRET
        $data = Http::withHeaders([
            'Authorization' => 'Bearer ' . env('POLAR_API_KEY'),
            'Content-Type' => 'application/json',
        ])->get('https://sandbox-api.polar.sh/v1/checkouts/custom/' . $request->query('checkout_id'));

        $checkout = $data->json();

        Log::info(json_encode($checkout, JSON_PRETTY_PRINT));

        return view('confirmation', ['checkout' => $checkout]);
    }
}
```

The checkout is not considered "successful" yet however. It's initially marked as `confirmed` until you've received a webhook event `checkout.updated` with a status set to `succeeded`. We'll cover this in the next section.

## Handling Polar Webhooks

Polar can send you events about various things happening in your organization. This is very useful for keeping your database in sync with Polar checkouts, orders, subscriptions, etc.

Configuring a webhook is simple. Head over to your organization's settings page and click on the "Add Endpoint" button to create a new webhook.

### Tunneling webhook events to your local development environment

If you're developing locally, you can use a tool like [ngrok](https://ngrok.com/) to tunnel webhook events to your local development environment. This will allow you to test your webhook handlers without deploying them to a live server.

Run the following command to start an ngrok tunnel:

```bash
ngrok http 3000
```

### Add Webhook Endpoint

1. Point the Webhook to `your-app.com/api/webhook/polar`. This must be an absolute URL which Polar can reach. If you use ngrok, the URL will look something like this: `https://<your-ngrok-id>.ngrok-free.app/api/webhook/polar`.
2. Select which events you want to be notified about. You can read more about the available events in the [Events section](/api-reference#webhooks).
3. Generate a secret key to sign the requests. This will allow you to verify that the requests are truly coming from Polar.
4. Add the secret key to your environment variables.

```bash
# .env
POLAR_API_KEY="polar_oat..."
POLAR_WEBHOOK_SECRET="..."
```

### Setting up the Webhook handler

First, we need to install the standard-webhooks package to properly decode the incoming webhook payloads.

```bash
composer require standard-webhooks/standard-webhooks:dev-main
```

Go and add a `routes/api.php` file and add the following entry:

```php
// routes/api.php
Route::webhooks('/webhook/polar');
```

Make sure that it is included in the Bootstrap file.

```php
// bootstrap/app.php
<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
```

We will use Spatie's Webhook Client to handle the webhook events. It will automatically verify the signature of the requests, and dispatch the payload to a job queue for processing.

```bash
composer require spatie/laravel-webhook-client
```

Let's publish the config:

```bash
php artisan vendor:publish --provider="Spatie\WebhookClient\WebhookClientServiceProvider" --tag="webhook-client-config"
```

This will create a new file called webhook-client.php in the config folder.

We need to adjust it to properly verify the signature of the requests.

```php
// config/webhook-client.php
<?php
return [
    'configs' => [
        [
            /*
             * This package supports multiple webhook receiving endpoints. If you only have
             * one endpoint receiving webhooks, you can use 'default'.
             */
            'name' => 'default',

            /*
             * We expect that every webhook call will be signed using a secret. This secret
             * is used to verify that the payload has not been tampered with.
             */
            'signing_secret' => env('POLAR_WEBHOOK_SECRET'),

            /*
             * The name of the header containing the signature.
             */
            'signature_header_name' => 'webhook-signature',

            /*
             *  This class will verify that the content of the signature header is valid.
             *
             * It should implement \Spatie\WebhookClient\SignatureValidator\SignatureValidator
             */
            // 'signature_validator' => \Spatie\WebhookClient\SignatureValidator\DefaultSignatureValidator::class,
            'signature_validator' => App\Handler\PolarSignature::class,

            /*
             * This class determines if the webhook call should be stored and processed.
             */
            'webhook_profile' => \Spatie\WebhookClient\WebhookProfile\ProcessEverythingWebhookProfile::class,

            /*
             * This class determines the response on a valid webhook call.
             */
            'webhook_response' => \Spatie\WebhookClient\WebhookResponse\DefaultRespondsTo::class,

            /*
             * The classname of the model to be used to store webhook calls. The class should
             * be equal or extend Spatie\WebhookClient\Models\WebhookCall.
             */
            'webhook_model' => \Spatie\WebhookClient\Models\WebhookCall::class,

            /*
             * In this array, you can pass the headers that should be stored on
             * the webhook call model when a webhook comes in.
             *
             * To store all headers, set this value to `*`.
             */
            'store_headers' => [],

            /*
             * The class name of the job that will process the webhook request.
             *
             * This should be set to a class that extends \Spatie\WebhookClient\Jobs\ProcessWebhookJob.
             */
            'process_webhook_job' => App\Handler\ProcessWebhook::class,
        ],
    ],

    /*
     * The integer amount of days after which models should be deleted.
     *
     * 7 deletes all records after 1 week. Set to null if no models should be deleted.
     */
    'delete_after_days' => 30,
];
```

### Preparing the database

By default, all webhook calls get saved into the database. So, we need to publish the migration that will hold the records. So run:

```bash
php artisan vendor:publish --provider="Spatie\WebhookClient\WebhookClientServiceProvider" --tag="webhook-client-migrations"
```

This will create a new migration file in the “database/migration” folder.

Then run `php artisan migrate` to run the migration.

### Setting up the queue system

Before we set up our job handler — let’s set up our queue system

Go to your “.env” file and set the QUEUE\_CONNECTION=database — you can decide to use other connections like redis.

Let’s create our jobs table by running php artisan queue:table and then run the migration using php artisan migrate.

### Create the Handlers

The next thing we do is to create a folder named Handler inside the app folder. Then inside this app/Handler, create two files which are

* PolarSignature.php
* ProcessWebhook.php

Inside app/Handler/PolarSignature.php, what we want to do is to validate that the request came from Polar. Add the code to that file.

```php
// app/Handler/PolarSignature.php
<?php

namespace App\Handler;

use Illuminate\Http\Request;
use Spatie\WebhookClient\Exceptions\WebhookFailed;
use Spatie\WebhookClient\WebhookConfig;
use Spatie\WebhookClient\SignatureValidator\SignatureValidator;

class PolarSignature implements SignatureValidator
{
    public function isValid(Request $request, WebhookConfig $config): bool
    {
        $signingSecret = base64_encode($config->signingSecret);
        $wh = new \StandardWebhooks\Webhook($signingSecret);

        return boolval( $wh->verify($request->getContent(), array(
            "webhook-id" => $request->header("webhook-id"),
            "webhook-signature" => $request->header("webhook-signature"),
            "webhook-timestamp" => $request->header("webhook-timestamp"),
        )));
    }
}
```

Great. So the other file app/Handler/ProcessWebhook.php extends the ProcessWebhookJob class which holds the WebhookCall variables containing each job’s detail.

```php
// app/Handler/ProcessWebhook.php
<?php

namespace App\Handler;

use Illuminate\Support\Facades\Log;
use Spatie\WebhookClient\Jobs\ProcessWebhookJob;

class ProcessWebhook extends ProcessWebhookJob
{
    public function handle()
    {
        $decoded = json_decode($this->webhookCall, true);
        $data = $decoded['payload'];

        switch ($data['type']) {
            case "checkout.created":
                // Handle the checkout created event
                break;
            case "checkout.updated":
                // Handle the checkout updated event
                break;
            case "subscription.created":
                // Handle the subscription created event
                break;
            case "subscription.updated":
                // Handle the subscription updated event
                break;
            case "subscription.active":
                // Handle the subscription active event
                break;
            case "subscription.revoked":
                // Handle the subscription revoked event
                break;
            case "subscription.canceled":
                // Handle the subscription canceled event
                break;
            default:
                // Handle unknown event
                Log::info($data['type']);
                break;
        }

        //Acknowledge you received the response
        http_response_code(200);
    }
}
```

Our application is ready to receive webhook requests.

Don’t forget to run `php artisan queue:listen` to process the jobs.

### Tips

If you're keeping track of active and inactive subscriptions in your database, make sure to handle the `subscription.active` and `subscription.revoked` events accordingly.

The cancellation of a subscription is handled by the `subscription.canceled`
event. The user has probably canceled their subscription before the end of the
billing period. Do not revoke any kind of access immediately, but rather wait
until the end of the billing period or when you receive the
`subscription.revoked` event.

## Notifying the client about the event

If you're building a real-time application, you might want to notify the client about the event. On the confirmation-page, you can listen for the `checkout.updated` event and update the UI accordingly when it reaches the succeeded status.

## Polar Laravel Example App

We've created a simple example Laravel application that you can use as a reference

[View Code on GitHub](https://github.com/polarsource/polar-laravel)

If you have issues or need support, feel free to join [our Discord](https://discord.gg/Pnhfz3UThd).


# Integrate Polar with Next.js
Source: https://polar.sh/docs/guides/nextjs

In this guide, we'll show you how to integrate Polar with Next.js.

Feel free to use our quick-start script to get started inside a new Next.js project:

```bash
# Inside a new Next.js project
npx polar-init
```

Consider following this guide while using the Polar Sandbox Environment. This will allow you to test your integration without affecting your production data.

[A complete code-example of this guide can be found on GitHub](https://github.com/polarsource/polar-next).

## Install the Polar JavaScript SDK

To get started, you need to install the Polar JavaScript SDK and the Polar Nextjs helper package. You can do this by running the following command:

```bash
pnpm install @polar-sh/sdk @polar-sh/nextjs
```

## Setting up environment variables

### Polar Access Token

To authenticate with Polar, you need to create an access token, and supply it to Next.js using a `POLAR_ACCESS_TOKEN` environment variable.

You can create an organization access token from your organization settings.

## Configuring a Polar API Client

To interact with the Polar API, you need to create a new instance of the `Polar` class. This class uses the provided access token to authenticate with the Polar API.

```typescript
// src/polar.ts
import { Polar } from "@polar-sh/sdk";

export const api = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  server: "sandbox", // Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
});
```

Remember to replace `sandbox` with `production` when you're ready to switch to the production environment.

## Generating Polar Checkout Sessions

Next up, we need to create a checkout endpoint to handle the creation of checkout sessions.

Go ahead and create a new GET route in Next.js.

```typescript
// src/app/checkout/route.ts
import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: "/confirmation?checkout_id={CHECKOUT_ID}",
  server: "sandbox", // Use this option if you're using the sandbox environment - else use 'production' or omit the parameter
});
```

## Handling Polar Webhooks

Polar can send you events about various things happening in your organization. This is very useful for keeping your database in sync with Polar checkouts, orders, subscriptions, etc.

Configuring a webhook is simple. Head over to your organization's settings page and click on the "Add Endpoint" button to create a new webhook.

### Tunneling webhook events to your local development environment

If you're developing locally, you can use a tool like [ngrok](https://ngrok.com/) to tunnel webhook events to your local development environment. This will allow you to test your webhook handlers without deploying them to a live server.

Run the following command to start an ngrok tunnel:

```bash
ngrok http 3000
```

### Add Webhook Endpoint

1. Point the Webhook to `your-app.com/api/webhook/polar`. This must be an absolute URL which Polar can reach. If you use ngrok, the URL will look something like this: `https://<your-ngrok-id>.ngrok-free.app/api/webhook/polar`.
2. Select which events you want to be notified about. You can read more about the available events in the [Events section](/api-reference#webhooks).
3. Generate a secret key to sign the requests. This will allow you to verify that the requests are truly coming from Polar.
4. Add the secret key to your environment variables.

```bash
# .env
POLAR_ACCESS_TOKEN="polar_pat..."
POLAR_WEBHOOK_SECRET="..."
```

### Setting up the Webhook handler

```typescript
// src/app/api/webhook/polar/route.ts
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
	webhookSecret: process.env.POLAR_WEBHOOK_SECRET,
	onPayload: async (payload) => // Handle payload...
});
```

The webhook event is now verified and you can proceed to handle the payload data.

### Handling Webhook Events

Depending on which events you've subscribed to, you'll receive different payloads. This is where you can update your database, send notifications, etc.

```typescript
// src/app/api/webhook/polar/route.ts
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => ...,
  onOrderCreated: async (order) => ...,
  onCustomerStateChanged: async (customerState) => ...,
  ...
});
```

### Notifying the client about the event

If you're building a real-time application, you might want to notify the client about the event. On the confirmation-page, you can listen for the `checkout.updated` event and update the UI accordingly when it reaches the succeeded status.

## Conclusion

If you have issues or need support, feel free to join [our Discord](https://discord.gg/Pnhfz3UThd).


# How to perform subscription downgrades
Source: https://polar.sh/docs/guides/subscription-downgrades

Learn how to downgrade a subscription as a merchant or a customer.

## Downgrading a subscription as a merchant

<Steps>
  <Step title="Go to Sales > Subscriptions">
    In the Polar dashboard sidebar, navigate to **Sales** > **Subscriptions** for your organization.
    You can also go directly to:\
    `https://polar.sh/dashboard/${org_slug}/sales/subscriptions`

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=7eb81fed176683efe283ff229ccd8503" data-og-width="1751" data-og-height="888" data-path="assets/guides/downgrades/subscription-page.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=6392a181b621f176c1c85097f94e0b4d 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=274d4e85961a05b79304bd6c07dec9cf 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=efcc15793306bc4528781fa8e9fb5369 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=38cdcd13e979e7227e51f23bfae2f17f 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=f4f4544eb204a9adce86453326353765 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/subscription-page.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=8ea03006c0707678cc3ce2c52e7cee35 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select the subscription to be downgraded">
    Click on the subscription you want to downgrade. The subscription details page opens up as shown below. Click on **Update Subscription**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=c034f5e337e6db8299aee306d3f19f42" data-og-width="1758" data-og-height="886" data-path="assets/guides/downgrades/open-subscription.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=4ca3f14c32cc812acaa8304472921be8 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=8e9285fcf44e305728e8ee9d3c02a980 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=99525671e8b372ce08d0f4a15c1a23d3 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=797202eeb235c60fb66fb38f76385315 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=68779650eeea6b659a637489eda77e6a 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/open-subscription.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=91be4b15096b4abc80b460d032703192 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Choose the plan and the proration behavior">
    Select the **New product** (plan to downgrade to) and the **Proration behavior** from the dropdown menu.

    <Info>
      Regardless of the option, the subscription is downgraded immediately, only the invoicing happens according to the selected **Proration behaior**.
    </Info>

    There are two types of proration:

    * **Next invoice**: The customer is charged (or credited) in the upcoming invoice for the difference.
    * **Invoice immediately**: The customer is charged (or credited) right away for the difference.

    Then, click on **Update Subscription**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=6a474d763ef0edcd2f0503e76569b7f5" data-og-width="1751" data-og-height="888" data-path="assets/guides/downgrades/downgrade-subscription.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=3a4253ec16977fc47cd57b478bbf152a 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=c355638849e663e44be7594c65130475 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=eadbe17ad279f1c4dbefcb43d4fff9da 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=e0f87f159dd2e0a0e01b818270046929 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=0982710c9c3a4b925e5902a00f825b11 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgrade-subscription.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=7ae33469816d79f32f207d9a49c4975b 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Successful downgrade!">
    The subscription is successfully downgraded to **Basic version**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=b57209d76570479c6bdf2936708c4485" data-og-width="1751" data-og-height="888" data-path="assets/guides/downgrades/downgraded-successfully.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=3e161cc0b31a357c65be8f2f11d8d05e 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=4a7d1debbbb9d0cd43eaf403f164cd09 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=51e4edb12c0d1a1f35a554e39c0e808c 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=b1d2dbcc1674d80a0de4f66942de9127 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=a14a0930e3529656d3ad252ec30d811a 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/downgraded-successfully.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=1f2f33dd53eef86ac298f89645e5ad52 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>

<Info>
  Note that merchants can disable customer-level upgrades or downgrades in the portal [by toggling OFF **Allow price change** setting](/docs/guides/disable-subscription-changes-in-customer-portal).
</Info>

## Downgrading a subscription as a customer

<Steps>
  <Step title="Open email and click the purchase link">
    Open the email you received after purchasing the subscription. Click the **Access my Purchase** link to go to the Customer Portal, where you can downgrade your subscription.

    <img height="10" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=c9d8f725498c1b3746efec167a7d63db" data-og-width="971" data-og-height="781" data-path="assets/guides/downgrades/customer-mail-2.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=d4092347cf6f930dd4e77a8a5218d537 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=e3a0a6e511cfabd73a8a8079be03ff2e 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=3c4473949a1864d88ddd16a096292169 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=ef36fb6f6edc00d0d5e02320d9f442f9 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=8400a225bec2dc5931e78777a662bc8c 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-mail-2.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=a62d053aab0001540f45142f7d00f44b 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Browse Overview > Subscriptions in Customer Portal">
    In the Overview tab of Customer Portal, scroll to **Subscriptions** and click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=13acf9cdcc4f8943429e4f5ddfdbe038" data-og-width="1482" data-og-height="787" data-path="assets/guides/downgrades/customer-portal-1.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=732047a094c3a5dbfa4e2d7c7f9e48f1 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=89bc7a352c5886777aac4c10f6a97cdb 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=94971b445bc87dae1b51292feaebb08b 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=004b4a2ee235d7ebfa88af90749cb852 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=7eedab4a97cf4db3f558e0617eaaa0c3 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-1.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=904dce0f33cef6f7997c213f0a58b4a2 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Select the desired plan">
    Select the plan you want to downgrade to and click on **Change Plan**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=0a0bcf75f8d7f0382fe856e51a3f0cc9" data-og-width="1645" data-og-height="865" data-path="assets/guides/downgrades/customer-portal-3.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=9512758c7eadde40434bd482741144cb 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=880f0b9575aea3a54101ebf9e80513ac 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=d3fafa6ca7414d7d0e3959b0af05a6f6 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=f1bd3e6bb97905cd24f682d8471220b8 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=67cb3c58ba44bcc19c2f021d9b6b390d 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-3.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=26aa3916b592ca347ce7812fb82ccb9b 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Successful downgrade!">
    The subscription is successfully downgraded to **Basic version**.

    <img height="200" src="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=f173ca27018320bd58009364735e08ff" data-og-width="1645" data-og-height="865" data-path="assets/guides/downgrades/customer-portal-4.png" srcset="https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=280&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=c3667bb51815312ca03a2ff076ea52a1 280w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=560&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=d5eed1d527c5c8b1a96e2985547b4c4f 560w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=840&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=8f8da3f2b05bbccf7bd7312c44a87284 840w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=1100&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=33dff3baf44d3c540afaddc64a9240b2 1100w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=1650&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=08d0a8264fe9b3bd5e583df8ea87ccf1 1650w, https://mintcdn.com/polar/K0t73w4I_XlJF033/assets/guides/downgrades/customer-portal-4.png?w=2500&fit=max&auto=format&n=K0t73w4I_XlJF033&q=85&s=8f6dc78f6fa429520f6cf1f90d1a13e1 2500w" data-optimize="true" data-opv="2" />
  </Step>
</Steps>


# Authentication
Source: https://polar.sh/docs/integrate/authentication



<Info>
  All bearer tokens should be kept private and never shared or exposed in client-side code.
</Info>

To authenticate requests, Polar API has two mechanisms.

1. [Organization Access Tokens (OAT)](/integrate/oat) - Recommended
2. [OAuth 2.0 Provider](/integrate/oauth2/introduction) (Partner Integrations)

## Organization Access Tokens (OAT)

They are tied to **one** of your organization. You can create them from your organization settings.

## Security

To protect your data and ensure the security of Polar, we've several mechanisms in place to automatically revoke tokens that may have been leaked publicly on the web.

In particular, we're part of the [GitHub Secret Scanning Program](https://docs.github.com/en/code-security/secret-scanning/about-secret-scanning). If GitHub systems detect a Polar token in a code repository or public discussion, our systems are notified and the tokens are immediately revoked.

If you received an email about one of your token being leaked, it means that we were notified of such situation. The email contains the details about the nature of the token and the source of the leak.

In the future, it's crucial that you remain extra cautious about not leaking your tokens publicly online. You can read more about the good practices to manage secrets in the [OWASP Secrets Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html).


# Customer State
Source: https://polar.sh/docs/integrate/customer-state

The quickest way to integrate billing in your application

Customer State is a concept allowing you to query for the current state of a customer, including their active subscriptions and granted [benefits](/features/benefits/introduction), in a single [API call](/api-reference/customers/state-external) or single [webhook event](/api-reference/webhooks/customer.state_changed).

Combined with the [External ID](/features/customer-management#external-id) feature, you can get up-and-running in minutes.

## The customer state object

The customer state object contains:

* All the data about the customer.
* The list of their **active** subscriptions.
* The list of their **granted** benefits.
* The list of their **active** meters, with their current balance.

Thus, with that single object, you have all the required information to check if you should provision access to your service or not.

<Card title="Get Customer State by External ID" icon="ring" iconType="duotone" href="/api-reference/customers/state-external" horizontal>
  One endpoint to rule them all, using your own customer ID.
</Card>

<Card title="Get Customer State " icon="ring" iconType="duotone" href="/api-reference/customers/state" horizontal>
  The same one, but with internal Polar customer ID.
</Card>

## The `customer.state_changed` webhook

To be notified of the customer state changes, you can listen to the `customer.state_changed` webhook event. It's triggered when:

* Customer is created, updated or deleted.
* A subscription is created or updated.
* A benefit is granted or revoked.

By subscribing to this webhook event, you keep your system up-to-date and update your customer's access accordingly.

<Card title="customer.state_changed" icon="ring" iconType="duotone" href="/api-reference/webhooks/customer.state_changed" horizontal>
  One webhook to rule them all.
</Card>


# Polar as Model Context Protocol (MCP)
Source: https://polar.sh/docs/integrate/mcp

Extend the capabilities of your AI Agents with Polar as MCP Server

<img src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=a6b10fbceef95c6f4a2c9793c9ee60fa" data-og-width="2676" width="2676" data-og-height="1592" height="1592" data-path="assets/integrate/mcp/mcp.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=abc2ede6a851f182767300a280c00411 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ef8336debe0ab28deeef4d7d7669368c 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ad707972479f7eb54511bc2f713bf8c5 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=6920ec776075a3506ef44e29c12403c7 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=12a956db103ce1c7851ee28f1ebb40e1 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/mcp/mcp.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=2b4774ac779c3531d71c628fbb564d69 2500w" data-optimize="true" data-opv="2" />

Supercharge your AI Agents with Polar as a Model Context Protocol (MCP) server.

## What is MCP?

MCP is a protocol for integrating tools with AI Agents. It can greatly enhance the capabilities of your AI Agents by providing them with real-time data and context.

Polar has MCP support built into the Polar TypeScript SDK.

## How does it work?

You need a MCP-capable Agent environment to use Polar as an MCP server. A few of them are Claude and Cursor.

## Using Polar as an MCP server

### Claude

Add the following server definition to your claude\_desktop\_config.json file:

```json
{
  "mcpServers": {
    "Polar": {
      "command": "npx",
      "args": [
        "-y",
        "--package",
        "@polar-sh/sdk",
        "--",
        "mcp",
        "start",
        "--access-token",
        "..."
      ]
    }
  }
}
```

### Cursor

Go to Cursor Settings > Features > MCP Servers > Add new MCP server and use the following settings:

* Name: Polar
* Type: command
* Command:

```bash
npx -y --package @polar-sh/sdk -- mcp start --access-token ...
```

### Help

For a full list of server arguments, run:

```bash
npx -y --package @polar-sh/sdk -- mcp start --help
```


# OAuth 2.0 Connect
Source: https://polar.sh/docs/integrate/oauth2/connect



## Authorize

To start the authorization flow you need to redirect the user to the authorization URL. It looks like this:

```
https://polar.sh/oauth2/authorize?
  response_type=code
  &client_id=CLIENT_ID
  &redirect_uri=https%3A%2F%2Fexample.com%2Fcallback
  &scope=openid%20email
```

The parameters are the one described in the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest). The most important ones are:

<ParamField path="response_type=code" type="string" required>
  Indicates that you want to use the authorization code flow. Most common and
  the only one supported by Polar.
</ParamField>

<ParamField path="client_id" type="string" required>
  The Client ID you got when creating the OAuth 2.0 client.
</ParamField>

<ParamField path="redirect_uri" type="string" required>
  The URL where the user will be redirected after granting access to their data. Make sure you declared it when creating the OAuth2 client.
</ParamField>

<ParamField path="scope" type="string" required>
  A space-separated list of scopes you want to ask for. Make sure they are part of the scopes you declared when creating the OAuth2 client.
</ParamField>

If you redirect the user to this URL, they'll see a page asking them to grant access to their data, corresponding to the scopes you asked for.

<img src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1927989fc0478485e77a1140a088e939" data-og-width="1920" width="1920" data-og-height="1080" height="1080" data-path="assets/integrate/oauth2/connect.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=a1aee489dd928855eebd48275b442a3a 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=08e3afe8990106c73cd5201a6175fd50 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=98c7a9731dec10d2c508bb6165acc93e 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5d09f0d4a88bb704f79590b3f8e611bd 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=fee040d7fffec477262ae5bf313ffa76 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/oauth2/connect.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=a60a6a05eb190e81c422087c317e8300 2500w" data-optimize="true" data-opv="2" />

If they allow it, they'll be redirected to your `redirect_uri` with a `code` parameter in the query string. This code is a one-time code that you can exchange for an access token.

#### Exchange code token

Once you have the authorization code, you can exchange it for an access token. To do so, you'll need to make a `POST` request to the token endpoint. This call needs to be authenticated with the Client ID and Client Secret you got when creating the OAuth2 client.

Here is an example with cURL:

```bash
curl -X POST https://api.polar.sh/v1/oauth2/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code&code=AUTHORIZATION_CODE&client_id=CLIENT_ID&client_secret=CLIENT_SECRET&redirect_uri=https://example.com/callback'
```

You should get the following response:

```json
{
  "token_type": "Bearer",
  "access_token": "polar_at_XXX",
  "expires_in": 864000,
  "refresh_token": "polar_rt_XXX",
  "scope": "openid email",
  "id_token": "ID_TOKEN"
}
```

The `access_token` will allow you to make authenticated API requests on behalf of the user. The `refresh_token` is a long-lived token that you can use to get new access tokens when the current one expires. The `id_token` is a signed JWT token containing information about the user, as per the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#IDToken).

#### User vs Organization Access Tokens

We support the concept of access tokens at **organization level**. Contrary to the standard access tokens, those tokens are not tied to a user but to an organization. They can be used to make requests operating only on a specific organization data, improving privacy and security.

To ask for an organization access token, you need to add the parameter `sub_type=organization` to the authorization URL:

```
https://polar.sh/oauth2/authorize?response_type=code&client_id=polar_ci_j3X95_MgfdSCeCd2qkFnUw&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=openid%20email&sub_type=organization
```

At this point, the user will be prompted to select one of their organization before allowing access to their data.

The rest of the flow remains unchanged. The access token you'll get will be tied to the selected organization.

Bear in mind that some endpoints might not support organization access tokens.
Typically, user-specific endpoints like `/v1/users/benefit` will not work with
organization access tokens.

#### Public Clients

Public clients are clients where the Client Secret can't be kept safe, as it would be accessible by the final user. This is the case for SPA, mobile applications, or any client running on the user's device.

In this case, **and only if the client is configured as a Public Client**, the request to the token endpoint won't require the `client_secret` parameter. However, the [PKCE](https://oauth.net/2/pkce/) method will be required to maximize security.

### Make authenticated requests

Once you have an access token, either from a Personal Access Token or from the OpenID Connect flow, you can make authenticated requests to the API. Here is a simple example with cURL:

```bash
curl -X GET https://api.polar.sh/v1/oauth2/userinfo \
  -H 'Authorization: Bearer polar_at_XXX'
```


# Introduction
Source: https://polar.sh/docs/integrate/oauth2/introduction

For partners building services and extensions for Polar customers

### OpenID Connect (OAuth2)

Only use our **OpenID Connect** in case you want to act on the behalf of other users via our API, e.g building an app/service for Polar customers. Otherwise, always use an **Organization Access Token (OAT)** to integrate Polar for your own service.

Polar implements the [OpenID Connect specification](https://openid.net/developers/how-connect-works/) to enable third-party authentication. It's a layer on top of the OAuth2 framework aiming at making integration more standard and predictable.

In particular, it comes with a **discovery endpoint** allowing compatible clients to automatically work with the OpenID Connect server. Here is Polar's one:

[OpenID Configuration](https://api.polar.sh/.well-known/openid-configuration)


# Create an OAuth 2.0 Client
Source: https://polar.sh/docs/integrate/oauth2/setup



Before being able to make authentication requests, you'll need an **OAuth2 Client**. It's the entity that'll identify you, as a third-party developer, between Polar and the final user.

You can manage them from your [User Settings](https://polar.sh/settings#oauth)

Here are the required fields:

* *Application Name*: the name of the application that'll be shown to the final users.
* *Client Type*: the type of client you are creating. [Read more](#public-clients)
* *Redirect URIs*: for security reasons, you need to declare your application URL where the users will be redirected after granting access to their data.
  <Note>
    When configuring your OAuth client, you must use an `https://` URL for security reasons. We block `http://` URLs, except when the hostname is `localhost`. This exception allows you to use `http://localhost` for convenient testing in development mode.
  </Note>
* *Scopes*: the list of scopes your app will be able to ask for. To improve privacy and security, select only the scopes you really need for your application.
* *Homepage URL*: the URL of your application. It'll be shown to the final users on the authorization page.

Optionally, you can also add a **logo**, **terms of service** and **privacy policy** URL. They'll all be shown to the final users on the authorization page.

Once your client is created, you'll get a **Client ID** and a **Client Secret**. You'll need those values to make authentication requests.

Those values are super sensitive and should be kept secret. They allow making authentication requests on Polar!


# Sandbox Environment
Source: https://polar.sh/docs/integrate/sandbox



A separate environment, isolated from your production data

To test Polar or work on your integration without worrying about actual money processing or breaking your live organization, you can use our [sandbox environment](https://sandbox.polar.sh/start).

It's a dedicated server, completely isolated from the production instance where you can do all the experiments you want.

<Note>
  **Why a dedicated environment instead of a test mode?**

  Since we're dealing with money and need to keep track of all movements to assure our Merchant of Record service, we found it safer to isolate live data from test data so it never interferes. Besides, it allows you to create an unlimited number of account and organization to test lot of different scenarios. Consider it as your own development server!
</Note>

## Get started

You can access the sandbox environment directly on [sandbox.polar.sh](https://sandbox.polar.sh/start) or by clicking on `Go to sandbox` from the organization switcher.

You'll then need to create a dedicated user account and organization, the same way described in our [Quick Start guide](/introduction).

### Testing payments

The sandbox environment allows you to experience the complete customer funnel, including checkout. You can perform test payments using Stripe's [test card numbers](https://docs.stripe.com/testing#cards).

The easiest one to test a successful payment is to use the following card number with a future expiration date and random CVC:

```
4242 4242 4242 4242
```

## API and SDK

To make requests to our [API](/api-reference), all you need to do is to switch the base URL from `https://api.polar.sh` to `https://sandbox-api.polar.sh`. You'll also need to create an access token in the **sandbox environment**, the access token created in the production environment can't be used in the sandbox.

Our official SDK supports the sandbox environment through a dedicated parameter.

<CodeGroup>
  ```ts TypeScript
  const polar = new Polar({
    server: 'sandbox',
    accessToken: process.env['POLAR_ACCESS_TOKEN'] ?? '',
  })
  ```

  ```py Python
  s = Polar(
      server="sandbox",
      access_token="<YOUR_BEARER_TOKEN_HERE>",
  )
  ```

  ```go Go
    s := polargo.New(
    	polargo.WithServer("sandbox"),
    	polargo.WithSecurity(os.Getenv("POLAR_ACCESS_TOKEN")),
    )
  ```

  ```php PHP
  $sdk = Polar\Polar::builder()
      ->setServer('sandbox')
      ->setSecurity(
          '<YOUR_BEARER_TOKEN_HERE>'
      )
      ->build();
  ```
</CodeGroup>

## Limitations

The limitations listed below only apply to sandbox and doesn't reflect the behavior in production.

* Subscriptions created in sandbox are automatically canceled **90 days after their creation**.


# Astro
Source: https://polar.sh/docs/integrate/sdk/adapters/astro

Payments and Checkouts made dead simple with Astro

`pnpm install @polar-sh/astro zod`

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import { Checkout } from "@polar-sh/astro";
import { POLAR_ACCESS_TOKEN, POLAR_SUCCESS_URL } from "astro:env/server";

export const GET = Checkout({
  accessToken: POLAR_ACCESS_TOKEN,
  successUrl: POLAR_SUCCESS_URL,
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
});
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import { CustomerPortal } from "@polar-sh/astro";
import { POLAR_ACCESS_TOKEN } from "astro:env/server";

export const GET = CustomerPortal({
  accessToken: POLAR_ACCESS_TOKEN,
  getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import { Webhooks } from '@polar-sh/astro';
import { POLAR_WEBHOOK_SECRET } from "astro:env/server"

export const POST = Webhooks({
  webhookSecret: POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => /** Handle payload */,
})
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# BetterAuth
Source: https://polar.sh/docs/integrate/sdk/adapters/better-auth

Payments and Checkouts made dead simple with BetterAuth

# @polar-sh/better-auth

A [Better Auth](https://github.com/better-auth/better-auth) plugin for integrating [Polar](https://polar.sh) payments and subscriptions into your authentication flow.

## Features

* [Automatic Customer creation on signup](#automatic-customer-creation-on-signup)
* [Sync customer deletion](#sync-customer-deletion)
* [Reference System to associate purchases with organizations](#3-2-orders)
* [Checkout Integration](#checkout-plugin)
* [Event Ingestion & Customer Meters for flexible Usage Based Billing](#usage-plugin)
* [Handle Polar Webhooks securely with signature verification](#webhooks-plugin)
* [Customer Portal](#portal-plugin)

## Installation

<Tabs>
  <Tab title="npm">
    Install the BetterAuth and Polar required libraries using the following
    command:

    ```bash
    npm install better-auth @polar-sh/better-auth @polar-sh/sdk
    ```
  </Tab>

  <Tab title="yarn">
    Install the BetterAuth and Polar required libraries using the following
    command:

    ```bash
    yarn add better-auth @polar-sh/better-auth @polar-sh/sdk
    ```
  </Tab>

  <Tab title="pnpm">
    Install the BetterAuth and Polar required libraries using the following
    command:

    ```bash
    pnpm add better-auth @polar-sh/better-auth @polar-sh/sdk
    ```
  </Tab>
</Tabs>

## Integrate Polar with BetterAuth

<Steps>
  <Step title="Configure Polar Access Token">
    Go to your Polar Organization Settings, create an Organization Access Token, and add it to the environment variables of your application.

    ```bash .env
    POLAR_ACCESS_TOKEN=...
    ```
  </Step>

  <Step title="Configure BetterAuth Server">
    The Polar plugin comes with it's own set of plugins to add functionality to your stack:

    * **checkout** - Enable seamless checkout integration
    * **portal** - Make it possible for your customers to manage their orders, subscriptions & benefits
    * **usage** - List customer meters & ingest events for Usage Based Billing
    * **webhooks** - Listen for relevant Polar webhooks

    ```typescript icon="square-js" BetterAuth Server with Polar Example
    import { betterAuth } from "better-auth";
    import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; // [!code ++]
    import { Polar } from "@polar-sh/sdk"; // [!code ++]

    const polarClient = new Polar({ // [!code ++]
        accessToken: process.env.POLAR_ACCESS_TOKEN, // [!code ++]
        // Use 'sandbox' if you're using the Polar Sandbox environment
        // Remember that access tokens, products, etc. are completely separated between environments.
        // Access tokens obtained in Production are for instance not usable in the Sandbox environment.
        server: 'sandbox' // [!code ++]
    }); // [!code ++]

    const auth = betterAuth({
        // ... Better Auth config
        plugins: [
            polar({ // [!code ++]
                client: polarClient, // [!code ++]
                createCustomerOnSignUp: true, // [!code ++]
                use: [ // [!code ++]
                    checkout({ // [!code ++]
                        products: [ // [!code ++]
                            { // [!code ++]
                                productId: "123-456-789", // ID of Product from Polar Dashboard // [!code ++]
                                slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro // [!code ++]
                            } // [!code ++]
                        ], // [!code ++]
                        successUrl: "/success?checkout_id={CHECKOUT_ID}", // [!code ++]
                        authenticatedUsersOnly: true // [!code ++]
                    }), // [!code ++]
                    portal(), // [!code ++]
                    usage(), // [!code ++]
                    webhooks({ // [!code ++]
                        secret: process.env.POLAR_WEBHOOK_SECRET, // [!code ++]
                        onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes // [!code ++]
                        onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.) // [!code ++]
                        ...  // Over 25 granular webhook handlers // [!code ++]
                        onPayload: (payload) => // Catch-all for all events // [!code ++]
                    }) // [!code ++]
                ], // [!code ++]
            }) // [!code ++]
        ]
    });
    ```

    #### Polar Plugin Configuration Options

    ```typescript
    // ...

    const auth = betterAuth({
      // ... Better Auth config
      plugins: [
        polar({
          client: polarClient, // [!code ++]
          createCustomerOnSignUp: true, // [!code ++]
          getCustomerCreateParams: ({ user }, request) => ({ // [!code ++]
            metadata: { // [!code ++]
              myCustomProperty: 123, // [!code ++]
            }, // [!code ++]
          }), // [!code ++]
          use: [ // [!code ++]
            // This is where you add Polar plugins // [!code ++]
          ], // [!code ++]
        }),
      ],
    });
    ```

    * `client` (required): Polar SDK client instance
    * `createCustomerOnSignUp` (optional): Automatically create a Polar customer when a user signs up
    * `getCustomerCreateParams` (optional): Custom function to provide additional customer creation metadata
    * `use` (optional): Array of Polar plugins to enable specific functionality (checkout, portal, usage, and webhooks)
  </Step>

  <Step title="Configure BetterAuth Client">
    You will be using the BetterAuth Client to interact with the Polar functionalities.

    ```typescript icon="square-js" BetterAuth Client with Polar Example
    import { createAuthClient } from "better-auth/react";
    import { polarClient } from "@polar-sh/better-auth"; // [!code ++]
    import { organizationClient } from "better-auth/client/plugins"; // [!code ++]

    // All Polar plugins, etc. should be attached to BetterAuth server
    export const authClient = createAuthClient({ // [!code ++]
      plugins: [polarClient()], // [!code ++]
    }); // [!code ++]
    ```
  </Step>
</Steps>

## Automatic Customer creation on signup

Enable the `createCustomerOnSignUp` [Polar plugin configuration option](#polar-plugin-configuration-options) to automatically create a new Polar Customer when a new User is added in the BetterAuth database.

All new customers are created with an associated `externalId`, i.e. the ID of your User in the Database. This skips any Polar to User mapping in your database.

## Sync Customer deletion

To add user deletion logic with external Polar customer deletion in BetterAuth, extend the user config of your betterAuth setup with the deleteUser option and an afterDelete hook. Here’s how to integrate this alongside your Polar plugin and automatic customer creation:

```typescript icon="square-js" Customer Deletion Example
const auth = betterAuth({
    user: { // [!code ++]
        deleteUser: { // [!code ++]
            enabled: true, // [!code ++]
            afterDelete: async (user, request) => { // [!code ++]
                await polar.customers.deleteExternal({ // [!code ++]
                  externalId: user.id // [!code ++]
                }) // [!code ++]
            }, // [!code ++]
        }, // [!code ++]
    }, // [!code ++]
});
```

## Checkout Plugin

[Source code](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/checkout.ts)

To support [checkouts](/features/checkout/links) in your app, you would pass the `checkout` plugin in the `use` property.

The checkout plugin accepts the following configuration options:

* **`products`** (optional): An array of product mappings or a function that returns them asynchronously. Each mapping contains a `productId` and a `slug` that allows you to reference products by a friendly slug instead of their full ID.
* **`successUrl`** (optional): The relative URL where customers will be redirected after a successful checkout completion. You can use the `{CHECKOUT_ID}` placeholder in the URL to include the checkout session ID in the redirect.
* **`authenticatedUsersOnly`** (optional): A boolean flag that controls whether checkout sessions require user authentication. When set to `true`, only authenticated users can initiate checkouts and the customer information will be automatically associated with the authenticated user. When `false`, anonymous checkouts are allowed.
* **`theme`** (optional): A string that can be used to enforce the theme of the checkout page. Can be either `light` or `dark`.

<Steps>
  <Step title="Use Checkout Plugin">
    Update the `use` property of the Polar plugin for BetterAuth client to have the `checkout` plugin.

    ```typescript icon="square-js" Checkout Plugin Example
    import {
      polar,
      checkout // [!code ++]
    } from "@polar-sh/better-auth";

    const auth = betterAuth({
        // ... Better Auth config
        plugins: [
            polar({
                ...
                use: [
                    checkout({ // [!code ++]
                        // Optional field - will make it possible to pass a slug to checkout instead of Product ID
                        products: [ { productId: "123-456-789", slug: "pro" } ], // [!code ++]
                        // Relative URL to return to when checkout is successfully completed
                        successUrl: "/success?checkout_id={CHECKOUT_ID}", // [!code ++]
                        // Wheather you want to allow unauthenticated checkout sessions or not
                        authenticatedUsersOnly: true // [!code ++]
                    }) // [!code ++]
                ],
            })
        ]
    });
    ```
  </Step>

  <Step title="Create checkouts using BetterAuth client">
    When the `checkout` plugin is passed, you are then able to initialize Checkout Sessions using the `checkout` method on the BetterAuth client. This will redirect the user to the product's checkout link.

    The `checkout` method accepts the following properties:

    * **`products`** (optional): An array of Polar Product IDs.
    * **`slug`** (optional): A string that can be used as a reference to the `products` defined in the Checkout config
    * **`referenceId`** (optional): An identifier that will be saved in the metadata of the checkout, order & subscription object

    ```typescript icon="square-js" BetterAuth Checkout with Polar Example
    await authClient.checkout({
      // Polar Product IDs
      products: ["e651f46d-ac20-4f26-b769-ad088b123df2"], // [!code ++]
      // OR
      // if "products" in passed in the checkout plugin's config, you may pass the slug
      // slug: "pro", // [!code ++]
    });
    ```

    This plugin supports the Organization plugin. If you pass the organization ID to the Checkout referenceId, you will be able to keep track of purchases made from organization members.

    ```typescript icon="square-js" BetterAuth Checkout with Polar Organization Example
    const organizationId = (await authClient.organization.list())?.data?.[0]?.id,

    await authClient.checkout({
        // Any Polar Product ID can be passed here
        products: ["e651f46d-ac20-4f26-b769-ad088b123df2"],
        // Or, if you setup "products" in the Checkout Config, you can pass the slug
        slug: 'pro',
        // Reference ID will be saved as `referenceId` in the metadata of the checkout, order & subscription object
        referenceId: organizationId
    });
    ```
  </Step>
</Steps>

## Usage Plugin

[Source code](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/usage.ts)

A plugin for Usage Based Billing that allows you to [ingest events](#event-ingestion) from your application and list the [authenticated user's Usage Meter](#customer-meters).

To enable [usage based billing](/integrate/sdk/adapters/better-auth) in your app, you would pass the `usage` plugin in the `use` property.

```typescript icon="square-js" Usage Plugin Example
import {
  polar, checkout, portal,
  usage // [!code ++]
} from "@polar-sh/better-auth";

const auth = betterAuth({
    // ... Better Auth config
    plugins: [
        polar({
            ...
            use: [
                checkout(...),
                portal(),
                usage() // [!code ++]
            ],
        })
    ]
});
```

### 1. Event Ingestion

Polar's Usage Based Billing builds entirely on event ingestion. Ingest events from your application, create Meters to represent that usage, and add metered prices to Products to charge for it.

The `ingestion` method of the `usage` plugin accepts the following parameters:

* `event` (string): The name of the event to ingest. For example, `ai_usage`, `video_streamed` or `file_uploaded`.

* `metadata` (object): A record containing key-value pairs that provide additional context about the event. Values can be strings, numbers, or booleans. This is useful for storing information that can be used to filter the events or compute the actual usage. For example, you can store the duration of the video streamed or the size of the file uploaded.

<Info>
  The authenticated user is automatically associated with the ingested event.
</Info>

```typescript icon="square-js" Event Ingestion with Usage Plugin Example
const { data: ingested } = await authClient.usage.ingestion({
  event: "file-uploads",
  metadata: {
    uploadedFiles: 12,
  },
});
```

### 2. Customer Meters

A method to list the authenticated user's Usage Meters (aka Customer Meters). A Customer Meter contains all the information about their consumption on your defined meters.

The `meters` method of the `usage` plugin accepts the following parameters:

* `page` (number): The page number for pagination (starts from 1).

* `limit` (number): The maximum number of meters to return per page.

```typescript icon="square-js" Customer Meters with Usage Plugin Example
const { data: customerMeters } = await authClient.usage.meters.list({
  query: {
    page: 1,
    limit: 10,
  },
});
```

The `meters` method returns the following fields in the response object:

* **Customer Information**: Details about the authenticated customer
* **Meter Information**: Configuration and settings of the usage meter
* **Customer Meter Information**:
  * **Consumed Units**: Total units consumed by the customer
  * **Credited Units**: Total units credited to the customer
  * **Balance**: The balance of the meter, i.e. the difference between credited and consumed units.

## Webhooks Plugin

[Source code](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/webhooks.ts)

The `webhooks` plugin can be used to capture incoming events from your Polar organization.

To set up the Polar `webhooks` plugin with the BetterAuth client, follow the steps below:

<Steps>
  <Step title="Configure Webhook Endpoints in Polar">
    Configure a Webhook endpoint in your Polar Organization Settings page by following [this guide](/integrate/webhooks/endpoints). Webhook endpoint is configured at `/api/auth/polar/webhooks`.
  </Step>

  <Step title="Add the Webhook Secret">
    Add the obtained webhook secret to your application environment as an environment variable (to be used as `process.env.POLAR_WEBHOOK_SECRET`):

    ```bash .env
    POLAR_WEBHOOK_SECRET="..."
    ```
  </Step>

  <Step title="Use Webhooks Plugin in BetterAuth client">
    Pass the `webhooks` plugin in the `use` property.

    ```typescript icon="square-js" Webhooks Plugin Example
    import {
      polar,
      webhooks // [!code ++]
    } from "@polar-sh/better-auth";

    const auth = betterAuth({
        // ... Better Auth config
        plugins: [
            polar({
                ...
                use: [
                    webhooks({ // [!code ++]
                        secret: process.env.POLAR_WEBHOOK_SECRET, // [!code ++]
                        onCustomerStateChanged: (payload) => // Triggered when anything regarding a customer changes // [!code ++]
                        onOrderPaid: (payload) => // Triggered when an order was paid (purchase, subscription renewal, etc.) // [!code ++]
                        ...  // Over 25 granular webhook handlers // [!code ++]
                        onPayload: (payload) => // Catch-all for all events // [!code ++]
                    }) // [!code ++]
                ],
            })
        ]
    });
    ```
  </Step>
</Steps>

The `webhooks` plugin allows you to invoke handlers for all Polar webhook events:

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes

## Portal Plugin

[Source code](https://github.com/polarsource/polar-adapters/blob/main/packages/polar-betterauth/src/plugins/portal.ts)

A plugin which enables customer management of their purchases, orders and subscriptions.

```typescript icon="square-js" Portal Plugin Example
import {
  polar, checkout,
  portal // [!code ++]
} from "@polar-sh/better-auth";

const auth = betterAuth({
    // ... Better Auth config
    plugins: [
        polar({
            ...
            use: [
                checkout(...),
                portal() // [!code ++]
            ],
        })
    ]
});
```

The `portal` plugin gives the BetterAuth Client a set of customer management methods, scoped under `authClient.customer` object.

### 1. Customer Portal Management

The following method will redirect the user to the Polar Customer Portal, where they can see their orders, purchases, subscriptions, benefits, etc.

```typescript icon="square-js" Open Customer Portal Example
await authClient.customer.portal();
```

### 2. Customer State

The portal plugin also adds a convenient method to retrieve the Customer State.

```typescript icon="square-js" Retrieve Customer State Example
const { data: customerState } = await authClient.customer.state();
```

The customer state object contains:

* All the data about the customer.
* The list of their active subscriptions.
  <Note>
    This does not include subscriptions done by a parent organization. See the
    subscription list-method below for more information.
  </Note>
* The list of their granted benefits.
* The list of their active meters, with their current balance.

Using the customer state object, you can determine whether to provision access for the user to your service.

Learn more about the Polar Customer State [in the Polar Docs](https://polar.sh/docs/integrate/customer-state).

### 3. Benefits, Orders & Subscriptions

The portal plugin adds the following 3 convenient methods for listing benefits, orders & subscriptions relevant to the authenticated user/customer.

#### 3.1 Benefits

This method only lists granted benefits for the authenticated user/customer.

```typescript icon="square-js" List User Benefits Example
const { data: benefits } = await authClient.customer.benefits.list({
  query: {
    page: 1,
    limit: 10,
  },
});
```

#### 3.2 Orders

This method lists orders like purchases and subscription renewals for the authenticated user/customer.

```typescript icon="square-js" List User Orders Example
const { data: orders } = await authClient.customer.orders.list({
  query: {
    page: 1,
    limit: 10,
    productBillingType: "one_time", // or 'recurring'
  },
});
```

Using the Organization ID as the `referenceId` you can retrieve all the subscriptions associated with that organization (instead of the user).

To figure out if a user should have access, pass the user's organization ID to see if there is an active subscription for that organization.

```typescript icon="square-js" List Organization Subscriptions Example
const organizationId = (await authClient.organization.list())?.data?.[0]?.id,

const { data: subscriptions } = await authClient.customer.orders.list({
    query: {
	    page: 1,
		limit: 10,
		active: true,
        referenceId: organizationId
    },
});

const userShouldHaveAccess = subscriptions.some(
    sub => // Your logic to check subscription product or whatever.
)
```

#### 3.3 Subscriptions

This method lists the subscriptions associated with authenticated user/customer.

```typescript icon="square-js" List User Subscriptions Example
const { data: subscriptions } = await authClient.customer.subscriptions.list({
  query: {
    page: 1,
    limit: 10,
    active: true,
  },
});
```

<Danger>
  This will not return subscriptions made by a parent organization to the
  authenticated user.
</Danger>


# Deno
Source: https://polar.sh/docs/integrate/sdk/adapters/deno

Payments and Checkouts made dead simple with Deno

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import { Checkout } from "jsr:@polar-sh/deno";

Deno.serve(
  Checkout({
    accessToken: "xxx",
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import { CustomerPortal } from "jsr:@polar-sh/deno";

Deno.serve(
  CustomerPortal({
    accessToken: "xxx",
    getCustomerId: (req) => "",
    server: "sandbox",
  })
);
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import { Webhooks } from "jsr:@polar-sh/deno";

Deno.serve(
    Webhooks({
        webhookSecret: Deno.env.get('POLAR_WEBHOOK_SECRET'),
        onPayload: async (payload) => /** Handle payload */,
    })
);
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Elysia
Source: https://polar.sh/docs/integrate/sdk/adapters/elysia

Payments and Checkouts made dead simple with Elysia

```bash
pnpm install @polar-sh/elysia zod
```

### Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import { Elysia } from "elysia";
import { Checkout } from "@polar-sh/elysia";

const app = new Elysia();

app.get(
  "/checkout",
  Checkout({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    successUrl: process.env.SUCCESS_URL,
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);
```

#### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

### Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import { Elysia } from "elysia";
import { CustomerPortal } from "@polar-sh/elysia";

const app = new Elysia();

app.get(
  "/portal",
  CustomerPortal({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  })
);
```

### Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import { Elysia } from 'elysia'
import { Webhooks } from "@polar-sh/elysia";

const app = new Elysia()

app.post('/polar/webhooks', Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => /** Handle payload */,
}))
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Express
Source: https://polar.sh/docs/integrate/sdk/adapters/express

Payments and Checkouts made dead simple with Express

```bash
pnpm install @polar-sh/express zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import express from "express";
import { Checkout } from "@polar-sh/express";

const app = express();

app.get(
  "/checkout",
  Checkout({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    successUrl: process.env.SUCCESS_URL,
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import express from "express";
import { CustomerPortal } from "@polar-sh/express";

const app = express();

app.get(
  "/portal",
  CustomerPortal({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  })
);
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import express from 'express'
import { Webhooks } from "@polar-sh/express";

const app = express()

app
.use(express.json())
.post('/polar/webhooks', Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => /** Handle payload */,
}))
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Fastify
Source: https://polar.sh/docs/integrate/sdk/adapters/fastify

Payments and Checkouts made dead simple with Fastify

```bash
pnpm install @polar-sh/fastify zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import fastify from "fastify";
import { Checkout } from "@polar-sh/fastify";

fastify().get(
  "/checkout",
  Checkout({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    successUrl: process.env.SUCCESS_URL,
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import fastify from "fastify";
import { CustomerPortal } from "@polar-sh/fastify";

fastify().get(
  "/portal",
  CustomerPortal({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  })
);
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import fastify from 'fastify'
import { Webhooks } from "@polar-sh/fastify";

fastify.post('/polar/webhooks', Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => /** Handle payload */,
}))
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Hono
Source: https://polar.sh/docs/integrate/sdk/adapters/hono

Payments and Checkouts made dead simple with Hono

```bash
pnpm install @polar-sh/hono zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import { Hono } from "hono";
import { Checkout } from "@polar-sh/hono";

const app = new Hono();

app.get(
  "/checkout",
  Checkout({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    successUrl: process.env.SUCCESS_URL,
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
);
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import { Hono } from "hono";
import { CustomerPortal } from "@polar-sh/hono";

const app = new Hono();

app.get(
  "/portal",
  CustomerPortal({
    accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
    getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  })
);
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import { Hono } from 'hono'
import { Webhooks } from "@polar-sh/hono";

const app = new Hono()

app.post('/polar/webhooks', Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => /** Handle payload */,
}))
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# null
Source: https://polar.sh/docs/integrate/sdk/adapters/laravel



![](https://banners.beyondco.de/laravel-polar.png?theme=dark\&packageManager=composer+require\&packageName=danestves%2Flaravel-polar\&pattern=pieFactory\&style=style_1\&description=Easily+integrate+your+Laravel+application+with+Polar.sh\&md=1\&showWatermark=1\&fontSize=100px\&images=https%3A%2F%2Flaravel.com%2Fimg%2Flogomark.min.svg "Laravel Polar")

# Polar for Laravel

Seamlessly integrate Polar.sh subscriptions and payments into your Laravel application. This package provides an elegant way to handle subscriptions, manage recurring payments, and interact with Polar's API. With built-in support for webhooks, subscription management, and a fluent API, you can focus on building your application while we handle the complexities of subscription billing.

## Installation

**Step 1:** You can install the package via composer:

```bash
composer require danestves/laravel-polar
```

**Step 2:** Run `:install`:

```bash
php artisan polar:install
```

This will publish the config, migrations and views, and ask to run the migrations.

Or publish and run the migrations individually:

```bash
php artisan vendor:publish --tag="polar-migrations"
```

```bash
php artisan vendor:publish --tag="polar-config"
```

```bash
php artisan vendor:publish --tag="polar-views"
```

```bash
php artisan migrate
```

This is the contents of the published config file:

```php
<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Polar Access Token
    |--------------------------------------------------------------------------
    |
    | The Polar access token is used to authenticate with the Polar API.
    | You can find your access token in the Polar dashboard > Settings
    | under the "Developers" section.
    |
    */
    'access_token' => env('POLAR_ACCESS_TOKEN'),

    /*
    |--------------------------------------------------------------------------
    | Polar Webhook Secret
    |--------------------------------------------------------------------------
    |
    | The Polar webhook secret is used to verify that the webhook requests
    | are coming from Polar. You can find your webhook secret in the Polar
    | dashboard > Settings > Webhooks on each registered webhook.
    |
    | We (the developers) recommend using a single webhook for all your
    | integrations. This way you can use the same secret for all your
    | integrations and you don't have to manage multiple webhooks.
    |
    */
    'webhook_secret' => env('POLAR_WEBHOOK_SECRET'),

    /*
    |--------------------------------------------------------------------------
    | Polar Url Path
    |--------------------------------------------------------------------------
    |
    | This is the base URI where routes from Polar will be served
    | from. The URL built into Polar is used by default; however,
    | you can modify this path as you see fit for your application.
    |
    */
    'path' => env('POLAR_PATH', 'polar'),

    /*
    |--------------------------------------------------------------------------
    | Default Redirect URL
    |--------------------------------------------------------------------------
    |
    | This is the default redirect URL that will be used when a customer
    | is redirected back to your application after completing a purchase
    | from a checkout session in your Polar account.
    |
    */
    'redirect_url' => null,

    /*
    |--------------------------------------------------------------------------
    | Currency Locale
    |--------------------------------------------------------------------------
    |
    | This is the default locale in which your money values are formatted in
    | for display. To utilize other locales besides the default "en" locale
    | verify you have to have the "intl" PHP extension installed on the system.
    |
    */
    'currency_locale' => env('POLAR_CURRENCY_LOCALE', 'en'),
];
```

## Usage

### Access Token

Configure your access token. Create a new token in the Polar Dashboard > Settings > Developers and paste it in the `.env` file.

* [https://sandbox.polar.sh/dashboard/ORG\_SLUG/settings](https://sandbox.polar.sh/dashboard/ORG_SLUG/settings) (Sandbox)
* [https://polar.sh/dashboard/ORG\_SLUG/settings](https://polar.sh/dashboard/ORG_SLUG/settings) (Production)

```bash
POLAR_ACCESS_TOKEN="<your_access_token>"
```

### Webhook Secret

Configure your webhook secret. Create a new webhook in the Polar Dashboard > Settings > Webhooks.

* [https://sandbox.polar.sh/dashboard/ORG\_SLUG/settings/webhooks](https://sandbox.polar.sh/dashboard/ORG_SLUG/settings/webhooks) (Sandbox)
* [https://polar.sh/dashboard/ORG\_SLUG/settings/webhooks](https://polar.sh/dashboard/ORG_SLUG/settings/webhooks) (Production)

Configure the webhook for the following events that this pacckage supports:

* `order.created`
* `order.updated`
* `subscription.created`
* `subscription.updated`
* `subscription.active`
* `subscription.canceled`
* `subscription.revoked`
* `benefit_grant.created`
* `benefit_grant.updated`
* `benefit_grant.revoked`

```bash
POLAR_WEBHOOK_SECRET="<your_webhook_secret>"
```

### Billable Trait

Let’s make sure everything’s ready for your customers to checkout smoothly. 🛒

First, we’ll need to set up a model to handle billing—don’t worry, it’s super simple! In most cases, this will be your app’s User model. Just add the Billable trait to your model like this (you’ll import it from the package first, of course):

```php
use Danestves\LaravelPolar\Billable;

class User extends Authenticatable
{
    use Billable;
}
```

Now the user model will have access to the methods provided by the package. You can make any model billable by adding the trait to it, not just the User model.

### Polar Script

Polar includes a JavaScript script that you can use to initialize the [Polar Embedded Checkout](https://polar.sh/docs/features/checkout/embed). If you going to use this functionality, you can use the `@polarEmbedScript` directive to include the script in your views inside the `<head>` tag.

```blade
<head>
    ...

    @polarEmbedScript
</head>
```

### Webhooks

This package includes a webhook handler that will handle the webhooks from Polar.

#### Webhooks & CSRF Protection

Incoming webhooks should not be affected by [CSRF protection](https://laravel.com/docs/csrf). To prevent this, add your webhook path to the except list of your `App\Http\Middleware\VerifyCsrfToken` middleware:

```php
protected $except = [
    'polar/*',
];
```

Or if you're using Laravel v11 and up, you should exclude `polar/*` in your application's `bootstrap/app.php` file:

```php
->withMiddleware(function (Middleware $middleware) {
    $middleware->validateCsrfTokens(except: [
        'polar/*',
    ]);
})
```

### Commands

This package includes a list of commands that you can use to retrieve information about your Polar account.

| Command                      | Description                                |
| ---------------------------- | ------------------------------------------ |
| `php artisan polar:products` | List all available products with their ids |

### Checkouts

#### Single Payments

To create a checkout to show only a single payment, pass a single items to the array of products when creating the checkout.

```php
use Illuminate\Http\Request;

Route::get('/subscribe', function (Request $request) {
    return $request->user()->checkout(['product_id_123']);
});
```

If you want to show multiple products that the user can choose from, you can pass an array of product ids to the `checkout` method.

```php
use Illuminate\Http\Request;

Route::get('/subscribe', function (Request $request) {
    return $request->user()->checkout(['product_id_123', 'product_id_456']);
});
```

This could be useful if you want to offer monthly, yearly, and lifetime plans for example.

> \[!NOTE]
> If you are requesting the checkout a lot of times we recommend you to cache the URL returned by the `checkout` method.

#### Custom Price

You can override the price of a product using the `charge` method.

```php
use Illuminate\Http\Request;

Route::get('/subscribe', function (Request $request) {
    return $request->user()->charge(1000, ['product_id_123']);
});
```

#### Embedded Checkout

Instead of redirecting the user you can create the checkout link, pass it to the page and use our blade component:

```php
use Illuminate\Http\Request;

Route::get('/billing', function (Request $request) {
    $checkout = $request->user()->checkout(['product_id_123']);

    return view('billing', ['checkout' => $checkout]);
});
```

Now we can use the button like this:

```blade
<x-polar-button :checkout="$checkout" />
```

The component accepts the normal props that a link element accepts. You can change the theme of the embedded checkout by using the following prop:

```blade
<x-polar-button :checkout="$checkout" data-polar-checkout-theme="dark" />
```

It defaults to light theme, so you only need to pass the prop if you want to change it.

### Prefill Customer Information

You can override the user data using the following methods in your models provided by the `Billable` trait.

```php
public function polarName(): ?string; // default: $model->name
public function polarEmail(): ?string; // default: $model->email
```

### Redirects After Purchase

You can redirect the user to a custom page after the purchase using the `withSuccessUrl` method:

```php
$request->user()->checkout('variant-id')
    ->withSuccessUrl(url('/success'));
```

You can also add the `checkout_id={CHECKOUT_ID}` query parameter to the URL to retrieve the checkout session id:

```php
$request->user()->checkout('variant-id')
    ->withSuccessUrl(url('/success?checkout_id={CHECKOUT_ID}'));
```

### Custom metadata and customer metadata

You can add custom metadata to the checkout session using the `withMetadata` method:

```php
$request->user()->checkout('variant-id')
    ->withMetadata(['key' => 'value']);
```

You can also add customer metadata to the checkout session using the `withCustomerMetadata` method:

```php
$request->user()->checkout('variant-id')
    ->withCustomerMetadata(['key' => 'value']);
```

These will then be available in the relevant webhooks for you.

#### Reserved Keywords

When working with custom data, this library has a few reserved terms.

* `billable_id`
* `billable_type`
* `subscription_type`

Using any of these will result in an exception being thrown.

### Customers

#### Customer Portal

Customers can update their personal information (e.g., name, email address) by accessing their [self-service customer portal](https://polar.sh/docs/features/customer-portal). To redirect customers to this portal, call the `redirectToCustomerPortal()` method on your billable model (e.g., the User model).

```php
use Illuminate\Http\Request;

Route::get('/customer-portal', function (Request $request) {
    return $request->user()->redirectToCustomerPortal();
});
```

Optionally, you can obtain the signed customer portal URL directly:

```php
$url = $user->customerPortalUrl();
```

### Orders

#### Retrieving Orders

You can retrieve orders by using the `orders` relationship on the billable model:

```blade
<table>
    @foreach ($user->orders as $order)
        <td>{{ $order->ordered_at->toFormattedDateString() }}</td>
        <td>{{ $order->polar_id }}</td>
        <td>{{ $order->amount }}</td>
        <td>{{ $order->tax_amount }}</td>
        <td>{{ $order->refunded_amount }}</td>
        <td>{{ $order->refunded_tax_amount }}</td>
        <td>{{ $order->currency }}</td>
        <!-- Add more columns as needed -->
    @endforeach
</table>
```

#### Check order status

You can check the status of an order by using the `status` attribute:

```php
$order->status;
```

Or you can use some of the helper methods offers by the `Order` model:

```php
$order->paid();
```

Aside from that, you can run two other checks: refunded, and partially refunded. If the order is refunded, you can utilize the refunded\_at timestamp:

```blade
@if ($order->refunded())
    Order {{ $order->polar_id }} was refunded on {{ $order->refunded_at->toFormattedDateString() }}
@endif
```

You may also see if an order was for a certain product:

```php
if ($order->hasProduct('product_id_123')) {
    // ...
}
```

Or for an specific price:

```php
if ($order->hasPrice('price_id_123')) {
    // ...
}
```

Furthermore, you can check if a consumer has purchased a specific product:

```php
if ($user->hasPurchasedProduct('product_id_123')) {
    // ...
}
```

Or for an specific price:

```php
if ($user->hasPurchasedPrice('price_id_123')) {
    // ...
}
```

### Subscriptions

#### Creating Subscriptions

Starting a subscription is simple. For this, we require our product's variant id. Copy the product id and start a new subscription checkout using your billable model:

```php
use Illuminate\Http\Request;

Route::get('/subscribe', function (Request $request) {
    return $request->user()->subscribe('product_id_123');
});
```

When a customer completes their checkout, the incoming `SubscriptionCreated` event webhook connects it to your billable model in the database. You may then get the subscription from your billable model:

```php
$subscription = $user->subscription();
```

#### Checking Subscription Status

Once a consumer has subscribed to your services, you can use a variety of methods to check on the status of their subscription. The most basic example is to check if a customer has a valid subscription.

```php
if ($user->subscribed()) {
    // ...
}
```

You can utilize this in a variety of locations in your app, such as middleware, rules, and so on, to provide services. To determine whether an individual subscription is valid, you can use the `valid` method:

```php
if ($user->subscription()->valid()) {
    // ...
}
```

This method, like the subscribed method, returns true if your membership is active, on trial, past due, or cancelled during its grace period.

You may also check if a subscription is for a certain product:

```php
if ($user->subscription()->hasProduct('product_id_123')) {
    // ...
}
```

Or for a certain price:

```php
if ($user->subscription()->hasPrice('price_id_123')) {
    // ...
}
```

If you wish to check if a subscription is on a specific price while being valid, you can use:

```php
if ($user->subscribedToPrice('price_id_123')) {
    // ...
}
```

Alternatively, if you use different [subscription types](#multiple-subscriptions), you can pass a type as an additional parameter:

```php
if ($user->subscribed('swimming')) {
    // ...
}

if ($user->subscribedToPrice('price_id_123', 'swimming')) {
    // ...
}
```

#### Cancelled Status

To see if a user has cancelled their subscription, you can use the cancelled method:

```php
if ($user->subscription()->cancelled()) {
    // ...
}
```

When they are in their grace period, you can utilize the `onGracePeriod` check.

```php
if ($user->subscription()->onGracePeriod()) {
    // ...
}
```

#### Past Due Status

If a recurring payment fails, the subscription will become past due. This indicates that the subscription is still valid, but your customer's payments will be retried in two weeks.

```php
if ($user->subscription()->pastDue()) {
    // ...
}
```

#### Subscription Scopes

There are several subscription scopes available for querying subscriptions in specific states:

```php
// Get all active subscriptions...
$subscriptions = Subscription::query()->active()->get();

// Get all of the cancelled subscriptions for a specific user...
$subscriptions = $user->subscriptions()->cancelled()->get();
```

Here's all available scopes:

```php
Subscription::query()->incomplete();
Subscription::query()->incompleteExpired();
Subscription::query()->onTrial();
Subscription::query()->active();
Subscription::query()->pastDue();
Subscription::query()->unpaid();
Subscription::query()->cancelled();
```

#### Changing Plans

When a consumer is on a monthly plan, they may desire to upgrade to a better plan, alter their payments to an annual plan, or drop to a lower-cost plan. In these cases, you can allow them to swap plans by giving a different product id to the `swap` method:

```php
use App\Models\User;

$user = User::find(1);

$user->subscription()->swap('product_id_123');
```

This will change the customer's subscription plan, however billing will not occur until the next payment cycle. If you want to immediately invoice the customer, you can use the `swapAndInvoice` method instead.

```php
$user = User::find(1);

$user->subscription()->swapAndInvoice('product_id_123');
```

#### Multiple Subscriptions

In certain situations, you may wish to allow your consumer to subscribe to numerous subscription kinds. For example, a gym may provide a swimming and weight lifting subscription. You can let your customers subscribe to one or both.

To handle the various subscriptions, you can offer a type of subscription as the second argument when creating a new one:

```php
$user = User::find(1);

$checkout = $user->subscribe('product_id_123', 'swimming');
```

You can now always refer to this specific subscription type by passing the type argument when getting it:

```php
$user = User::find(1);

// Retrieve the swimming subscription type...
$subscription = $user->subscription('swimming');

// Swap plans for the gym subscription type...
$user->subscription('gym')->swap('product_id_123');

// Cancel the swimming subscription...
$user->subscription('swimming')->cancel();
```

#### Cancelling Subscriptions

To cancel a subscription, call the `cancel` method.

```php
$user = User::find(1);

$user->subscription()->cancel();
```

This will cause your subscription to be cancelled. If you cancel your subscription in the middle of the cycle, it will enter a grace period, and the ends\_at column will be updated. The customer will continue to have access to the services offered for the duration of the period. You may check the grace period by calling the `onGracePeriod` method:

```php
if ($user->subscription()->onGracePeriod()) {
    // ...
}
```

Polar does not offer immediate cancellation. To resume a subscription while it is still in its grace period, use the resume method.

```php
$user->subscription()->resume();
```

When a cancelled subscription approaches the end of its grace period, it becomes expired and cannot be resumed.

### Handling Webhooks

Polar can send webhooks to your app, allowing you to react. By default, this package handles the majority of the work for you. If you have properly configured webhooks, it will listen for incoming events and update your database accordingly. We recommend activating all event kinds so you may easily upgrade in the future.

#### Webhook Events

* `Danestves\LaravelPolar\Events\BenefitGrantCreated`
* `Danestves\LaravelPolar\Events\BenefitGrantUpdated`
* `Danestves\LaravelPolar\Events\BenefitGrantRevoked`
* `Danestves\LaravelPolar\Events\OrderCreated`
* `Danestves\LaravelPolar\Events\OrderRefunded`
* `Danestves\LaravelPolar\Events\SubscriptionActive`
* `Danestves\LaravelPolar\Events\SubscriptionCanceled`
* `Danestves\LaravelPolar\Events\SubscriptionCreated`
* `Danestves\LaravelPolar\Events\SubscriptionRevoked`
* `Danestves\LaravelPolar\Events\SubscriptionUpdated`

Each of these events has a billable `$model` object and an event `$payload`. The subscription events also include the `$subscription` object. These can be accessed via the public properties.

If you wish to respond to these events, you must establish listeners for them. For example, you may wish to react when a subscription is updated.

```php
<?php

namespace App\Listeners;

use Danestves\LaravelPolar\Events\WebhookHandled;

class PolarEventListener
{
    /**
     * Handle received Polar webhooks.
     */
    public function handle(WebhookHandled $event): void
    {
        if ($event->payload['type'] === 'subscription.updated') {
            // Handle the incoming event...
        }
    }
}
```

The [Polar documentation](https://polar.sh/docs/integrate/webhooks/events) includes an example payload.

Laravel v11 and up will automatically discover the listener. If you're using Laravel v10 or lower, you should configure it in your app's `EventServiceProvider`:

```php
<?php

namespace App\Providers;

use App\Listeners\PolarEventListener;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Danestves\LaravelPolar\Events\WebhookHandled;

class EventServiceProvider extends ServiceProvider
{
    protected $listen = [
        WebhookHandled::class => [
            PolarEventListener::class,
        ],
    ];
}
```

## Testing

```bash
composer test
```

## Changelog

Please see [CHANGELOG](https://github.com/danestves/laravel-polar/blob/main/CHANGELOG.md) for more information on what has changed recently.

## License

The MIT License (MIT). Please see [License File](https://github.com/danestves/laravel-polar/blob/main/LICENSE.md) for more information.


# NextJS
Source: https://polar.sh/docs/integrate/sdk/adapters/nextjs

Payments and Checkouts made dead simple with NextJS

```bash
pnpm install @polar-sh/nextjs zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
// checkout/route.ts
import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.SUCCESS_URL,
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
});
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
// portal/route.ts
import { CustomerPortal } from "@polar-sh/nextjs";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  getCustomerId: (req: NextRequest) => "", // Function to resolve a Polar Customer ID
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
// api/webhook/polar/route.ts
import { Webhooks } from "@polar-sh/nextjs";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle the payload
    // No need to return an acknowledge response
  },
});
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Nuxt
Source: https://polar.sh/docs/integrate/sdk/adapters/nuxt

Payments and Checkouts made dead simple with Nuxt

## Installation

Choose your preferred package manager to install the module:

`pnpm add @polar-sh/nuxt`

### Register the module

Add the module to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ["@polar-sh/nuxt"],
});
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
// server/routes/api/checkout.post.ts
export default defineEventHandler((event) => {
  const {
    private: { polarAccessToken, polarCheckoutSuccessUrl, polarServer },
  } = useRuntimeConfig();

  const checkoutHandler = Checkout({
    accessToken: polarAccessToken,
    successUrl: polarCheckoutSuccessUrl,
    server: polarServer as "sandbox" | "production",
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  });

  return checkoutHandler(event);
});
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
// server/routes/api/portal.get.ts
export default defineEventHandler((event) => {
  const {
    private: { polarAccessToken, polarCheckoutSuccessUrl, polarServer },
  } = useRuntimeConfig();

  const customerPortalHandler = CustomerPortal({
    accessToken: polarAccessToken,
    server: polarServer as "sandbox" | "production",
    getCustomerId: (event) => {
      // Use your own logic to get the customer ID - from a database, session, etc.
      return Promise.resolve("9d89909b-216d-475e-8005-053dba7cff07");
    },
  });

  return customerPortalHandler(event);
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
// server/routes/webhook/polar.post.ts
export default defineEventHandler((event) => {
  const {
    private: { polarWebhookSecret },
  } = useRuntimeConfig();

  const webhooksHandler = Webhooks({
    webhookSecret: polarWebhookSecret,
    onPayload: async (payload) => {
      // Handle the payload
      // No need to return an acknowledge response
    },
  });

  return webhooksHandler(event);
});
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Remix
Source: https://polar.sh/docs/integrate/sdk/adapters/remix

Payments and Checkouts made dead simple with Remix

```bash
pnpm install @polar-sh/remix zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
import { Checkout } from "@polar-sh/remix";

export const loader = Checkout({
  accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
  successUrl: process.env.SUCCESS_URL,
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
});
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
import { CustomerPortal } from "@polar-sh/remix";

export const loader = CustomerPortal({
  accessToken: "xxx", // Or set an environment variable to POLAR_ACCESS_TOKEN
  getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
import { Webhooks } from "@polar-sh/remix";

export const action = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => /** Handle payload */,
})
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Sveltekit
Source: https://polar.sh/docs/integrate/sdk/adapters/sveltekit

Payments and Checkouts made dead simple with Sveltekit

```bash
pnpm install @polar-sh/sveltekit zod
```

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
// /api/checkout/+server.ts
import { Checkout } from "@polar-sh/sveltekit";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  successUrl: process.env.SUCCESS_URL,
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
});
```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
// /api/portal/+server.ts
import { CustomerPortal } from "@polar-sh/sveltekit";

export const GET = CustomerPortal({
  accessToken: process.env.POLAR_ACCESS_TOKEN,
  getCustomerId: (event) => "", // Function to resolve a Polar Customer ID
  server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
// api/webhook/polar/+server.ts
import { Webhooks } from "@polar-sh/sveltekit";

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onPayload: async (payload) => {
    // Handle the payload
  },
});
```

### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# TanStack Start
Source: https://polar.sh/docs/integrate/sdk/adapters/tanstack-start

Payments and Checkouts made dead simple with TanStack Start

<CodeGroup>
  ```bash npm
  npm install @polar-sh/tanstack-start zod
  ```

  ```bash pnpm
  pnpm add @polar-sh/tanstack-start zod
  ```

  ```bash yarn
  yarn add @polar-sh/tanstack-start zod
  ```

  ```bash bun
  bun install @polar-sh/tanstack-start zod
  ```
</CodeGroup>

## Checkout

Create a Checkout handler which takes care of redirections.

```typescript
// routes/api/checkout.ts
import { Checkout } from '@polar-sh/tanstack-start'
import { createServerFileRoute } from '@tanstack/react-start/server'

export const ServerRoute = createServerFileRoute('/api/checkout').methods({
  GET: Checkout({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    successUrl: process.env.SUCCESS_URL,
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
    theme: "dark", // Enforces the theme - System-preferred theme will be set if left omitted
  })
})

```

### Query Params

Pass query params to this route.

* products `?products=123`
* customerId (optional) `?products=123&customerId=xxx`
* customerExternalId (optional) `?products=123&customerExternalId=xxx`
* customerEmail (optional) `?products=123&customerEmail=janedoe@gmail.com`
* customerName (optional) `?products=123&customerName=Jane`
* metadata (optional) `URL-Encoded JSON string`

## Customer Portal

Create a customer portal where your customer can view orders and subscriptions.

```typescript
// routes/api/portal.ts
import { CustomerPortal } from "@polar-sh/tanstack-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { getSupabaseServerClient } from "~/servers/supabase-server";

export const APIRoute = createAPIFileRoute("/api/portal")({
  GET: CustomerPortal({
    accessToken: process.env.POLAR_ACCESS_TOKEN,
    getCustomerId: async (request: Request) => "", // Function to resolve a Polar Customer ID
    server: "sandbox", // Use sandbox if you're testing Polar - omit the parameter or pass 'production' otherwise
  }),
});
```

## Webhooks

A simple utility which resolves incoming webhook payloads by signing the webhook secret properly.

```typescript
// api/webhook/polar.ts
import { Webhooks } from "@polar-sh/tanstack-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/webhook/polar")({
  POST: Webhooks({
    webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
    onPayload: async (payload) => {
      // Handle the payload
      // No need to return an acknowledge response
    },
  }),
});
```

#### Payload Handlers

The Webhook handler also supports granular handlers for easy integration.

* `onPayload` - Catch-all handler for any incoming Webhook event
* `onCheckoutCreated` - Triggered when a checkout is created
* `onCheckoutUpdated` - Triggered when a checkout is updated
* `onOrderCreated` - Triggered when an order is created
* `onOrderPaid` - Triggered when an order is paid
* `onOrderRefunded` - Triggered when an order is refunded
* `onRefundCreated` - Triggered when a refund is created
* `onRefundUpdated` - Triggered when a refund is updated
* `onSubscriptionCreated` - Triggered when a subscription is created
* `onSubscriptionUpdated` - Triggered when a subscription is updated
* `onSubscriptionActive` - Triggered when a subscription becomes active
* `onSubscriptionCanceled` - Triggered when a subscription is canceled
* `onSubscriptionRevoked` - Triggered when a subscription is revoked
* `onSubscriptionUncanceled` - Triggered when a subscription cancellation is reversed
* `onProductCreated` - Triggered when a product is created
* `onProductUpdated` - Triggered when a product is updated
* `onOrganizationUpdated` - Triggered when an organization is updated
* `onBenefitCreated` - Triggered when a benefit is created
* `onBenefitUpdated` - Triggered when a benefit is updated
* `onBenefitGrantCreated` - Triggered when a benefit grant is created
* `onBenefitGrantUpdated` - Triggered when a benefit grant is updated
* `onBenefitGrantRevoked` - Triggered when a benefit grant is revoked
* `onCustomerCreated` - Triggered when a customer is created
* `onCustomerUpdated` - Triggered when a customer is updated
* `onCustomerDeleted` - Triggered when a customer is deleted
* `onCustomerStateChanged` - Triggered when a customer state changes


# Go SDK
Source: https://polar.sh/docs/integrate/sdk/golang



Documentation coming soon.


# PHP SDK
Source: https://polar.sh/docs/integrate/sdk/php



Documentation coming soon.


# Python SDK
Source: https://polar.sh/docs/integrate/sdk/python



Fully type-hinted and allows both synchronous and asynchronous usage, thanks to [HTTPX](https://www.python-httpx.org/).
Under the hood, schemas are validated by [Pydantic](https://docs.pydantic.dev/latest/).

### Quickstart

```bash
pip install polar-sdk
```

```python
# Synchronous Example
from polar_sdk import Polar

s = Polar(
    access_token="<YOUR_BEARER_TOKEN_HERE>",
)


res = s.users.benefits.list()

if res is not None:
    while True:
        # handle items

        res = res.Next()
        if res is None:
            break
```

[Read more](https://github.com/polarsource/polar-python)

### Sandbox Environment

You can configure the SDK so it hits the [sandbox environment](/integrate/sandbox) instead of the production one. You just need to add the `server` argument when instantiating the client:

```python
s = Polar(
    server="sandbox",
    access_token="<YOUR_BEARER_TOKEN_HERE>",
)
```


# TypeScript SDK
Source: https://polar.sh/docs/integrate/sdk/typescript

SDK for JavaScript runtimes (Node.js and browsers)

### Quickstart

```bash
pnpm add @polar-sh/sdk
```

```typescript
import { Polar } from '@polar-sh/sdk'

const polar = new Polar({
  accessToken: process.env['POLAR_ACCESS_TOKEN'] ?? '',
})

async function run() {
  const result = await polar.users.benefits.list({})

  for await (const page of result) {
    // Handle the page
    console.log(page)
  }
}

run()
```

[Read more](https://github.com/polarsource/polar-js)

<Note>
  **camelCase vs. snake\_case**

  Our API (and docs) is designed with `snake_case`. However, our TS SDK currently
  converts this to camelCase to follow JS/TS convention. You should automatically
  see the camelCase parameters suggested in modern IDEs due to typing, but it's
  worth keeping in mind switching between code & docs.

  We aim to introduce the ability to toggle this in the future, i.e using
  `snake_case` even in TypeScript to more easily map it to our documentation and
  design of the API itself.
</Note>

### Framework Adapters

Implement Checkout & Webhook handlers in 5 lines of code.

* [Next.js](/integrate/sdk/adapters/nextjs)
* [Astro](/integrate/sdk/adapters/astro)
* [Remix](/integrate/sdk/adapters/remix)
* [Sveltekit](/integrate/sdk/adapters/sveltekit)
* [Deno](/integrate/sdk/adapters/deno)
* [Elysia](/integrate/sdk/adapters/elysia)
* [Express](/integrate/sdk/adapters/express)
* [Fastify](/integrate/sdk/adapters/fastify)
* [Hono](/integrate/sdk/adapters/hono)

### Sandbox Environment

You can configure the SDK so it hits the [sandbox environment](/integrate/sandbox) instead of the production one. You just need to add the `server` property to the configuration object:

```typescript
const polar = new Polar({
  server: 'sandbox',
  accessToken: process.env['POLAR_ACCESS_TOKEN'] ?? '',
})
```


# Handle & monitor webhook deliveries
Source: https://polar.sh/docs/integrate/webhooks/delivery

How to parse, validate and handle webhooks and monitor their deliveries on Polar

<img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1c5f560bcca11607c67cc7f8b467dca4" data-og-width="2740" width="2740" data-og-height="1522" height="1522" data-path="assets/integrate/webhooks/delivery.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=61c5f66e8cb7acab698915171b5bde4e 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=f452e9e0edebfa7b912f85238d9d7f3c 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=49d406e3c294cb33ac178f7c61cd81aa 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=f2a6770fba4cc61303cc7d84de7db7bb 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=609d960dff8b2cf958e52118b7747365 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=683818fb66539342505f27574af611a5 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4ce4ac52095eb88c9073c4a18099a0bf" data-og-width="2672" width="2672" data-og-height="1526" height="1526" data-path="assets/integrate/webhooks/delivery.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=623e1747b6245fd84986462620718bcc 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=da4785f9e803826575e0a148286e3c43 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0d3e453abcd767cddea396717bc774ec 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=314fcf0248f280018d16f61ff50cb86c 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=aa74acbb1c73448868054df87bd7e0ad 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/delivery.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9117a6ffafa146e98eed1f1f1582a776 2500w" data-optimize="true" data-opv="2" />

Once a webhook endpoint is setup you will have access to the delivery overview
page. Here you can:

* See historic deliveries
* Review payload sent
* Trigger redelivery in case of failure

Now, let's integrate our endpoint route to validate, parse & handle incoming webhooks.

## Validate & parse webhooks

You now need to setup a route handler for the endpoint registered on Polar to
receive, validate and parse webhooks before handling them according to your
needs.

### Using our SDKs

Our TypeScript & Python SDKs come with a built-in helper function to easily
validate and parse the webhook event - see full examples below.

<CodeGroup>
  ```typescript JS (Express)
  import express, { Request, Response } from 'express'
  import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks'

  const app = express()

  app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req: Request, res: Response) => {
  try {
  const event = validateEvent(
  req.body,
  req.headers,
  process.env['POLAR_WEBHOOK_SECRET'] ?? '',
  )

        // Process the event

        res.status(202).send('')
      } catch (error) {
        if (error instanceof WebhookVerificationError) {
          res.status(403).send('')
        }
        throw error
      }

  },
  )

  ```

  ```python Python (Flask)
  import os
  from flask import Flask, request
  from polar_sdk.webhooks import validate_event, WebhookVerificationError

  app = Flask(__name__)

  @app.route('/webhook', methods=['POST'])
  def webhook():
      try:
          event = validate_event(
              body=request.data,
              headers=request.headers,
              secret=os.getenv('POLAR_WEBHOOK_SECRET', ''),
          )

          # Process the event

          return "", 202
      except WebhookVerificationError as e:
          return "", 403
  ```
</CodeGroup>

Both examples above expect an environment variable named `POLAR_WEBHOOK_SECRET`
to be set to the secret you configured during the endpoint setup.

### Custom validation

We follow the [Standard Webhooks](https://www.standardwebhooks.com/)
standard which offers [many libraries across languages](https://github.com/standard-webhooks/standard-webhooks/tree/main/libraries) to
easily validate signatures. Or you can follow their
[specification](https://github.com/standard-webhooks/standard-webhooks/blob/main/spec/standard-webhooks.md)
in case you want to roll your own.

<Info>
  **Note: Secret needs to be base64 encoded**

  One common gotcha with the specification is that the webhook secret is expected to be
  base64 encoded. You don't have to do this with our SDK as it takes care of the
  implementation details with better developer ergonomics.
</Info>

## IP Allowlist

If you are using a firewall or a reverse proxy that requires IP allowlisting, here are the IPs you need to allow:

<CodeGroup>
  ```txt Production
  3.134.238.10
  3.129.111.220
  52.15.118.168
  ```

  ```txt Sandbox
  3.134.238.10
  3.129.111.220
  52.15.118.168
  ```
</CodeGroup>

## Failure Handling

### Delivery Retries

If we hit an error while trying to reach your endpoint, whether it is a temporary network error or a bug, we'll retry to send the event up to **10 times** with an exponential backoff.

### Delivery Timeouts

We timeout our requests to your endpoint after **20 seconds**. Triggering a
retry attempt after a delay as explained above. However, we strongly recommend you optimize your endpoint route to be fast. A
best practice is for your webhook handler to queue a background worker task to handle the
payload asynchronously.

## Troubleshooting

### Not receiving webhooks

Seeing deliveries on Polar, but not receiving them on your end? Below are some
common techniques to resolve the issue depending on the reported error status.

**General**

*Start ngrok or similar*

Make sure you have started `ngrok` or whatever tunneling service you're using
during local development.

*Add excessive logging*

E.g
`console.log('webhook.handler_called')`,
`console.log('webhook.validate_signature')`,
`console.log('webhook.signature_validated')` etc.

So you can easily confirm if the handler is called and how far it gets before
any issues arise.

`HTTP 404`

* Try `curl -vvv -X POST <copy-paste-endpoint-url>` in your terminal to confirm the
  route exists and see any issues along the way
* Try adding trailing `/` to the URL on Polar. Often `/foo` is resolved to
  `/foo/` by frameworks.

`HTTP 403`

* Using middleware for authorization? Make sure to exclude the webhook route
  from it since it needs to be publicly accessible
* Using Cloudflare?
  * Check the firewall logs to verify if they are blocking our requests and setup a custom WAF rule to accept incoming requests from Polar.
  * Webhook delivery failures with 403 errors can occur when Cloudflare's Bot Fight Mode is enabled. Bot Fight Mode automatically blocks requests it identifies as bots, including legitimate webhook requests from Polar. Adding Polar's IP addresses to your IP Allow List or creating custom WAF rules will not resolve this issue. To fix webhook delivery problems, disable Bot Fight Mode in your Cloudflare dashboard under Security > Bots. Alternatively, you can check your Cloudflare firewall logs to confirm if requests are being blocked and create appropriate firewall rules if needed.

### Invalid signature exceptions

Rolling your own webhook validation logic? Make sure to base64 encode the secret
you configured on Polar in your code before generating the signature to validate
against.


# Setup Webhooks
Source: https://polar.sh/docs/integrate/webhooks/endpoints

Get notifications asynchronously when events occur instead of having to poll for updates

Our webhook implementation follows the [Standard Webhooks](https://www.standardwebhooks.com/) specification
and our SDKs offer:

* Built-in webhook signature validation for security
* Fully typed webhook payloads

In addition, our webhooks offer built-in support for **Slack** & **Discord**
formatting. Making it a breeze to setup in-chat notifications for your team.

## Get Started

<Info>
  **Use our sandbox environment during development**

  So you can easily test purchases, subscriptions, cancellations and refunds to
  automatically trigger webhook events without spending a dime.
</Info>

<Steps>
  <Step title="Add new endpoint">
    Head over to your organization settings and click on the `Add Endpoint` button to create a new webhook.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=23eb5510c1dbd2f511461dfe1e262485" data-og-width="1532" width="1532" data-og-height="389" height="389" data-path="assets/integrate/webhooks/create.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=a351c94bc7d002cfe01d4b90d8ec583f 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=bf3519e1ee9851a86af38687e0f485fc 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1da4ac8731e29d4854dfc874051725c0 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1a925a887349c660469c221438ce8472 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0e7d63bd8ed6e7d29c84f6f31d376042 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=989ec443952fc397adca0fcd68e2ab8d 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=c86d0770b5dc4d42279d9f1da568edb8" data-og-width="1494" width="1494" data-og-height="388" height="388" data-path="assets/integrate/webhooks/create.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=32ccd01674a4936933650414fc920523 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=642a4166857e8c82092f035c5055b30c 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=f5dc475d503ecbb05ee41e6c879756f8 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1421996da6c06e3cfe3ad7212579e3c4 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ac70b9d0291437b5073e22fe413bee30 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/create.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=adae7e7ef7b875a18a6582b7b7c2f3c0 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Specify your endpoint URL">
    Enter the URL to which the webhook events should be sent.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7ef69a33df9105e42fd8ab618a30669d" data-og-width="1075" width="1075" data-og-height="402" height="402" data-path="assets/integrate/webhooks/url.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9b83d589c935a1114d1abe2363ccc320 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7e07c55097be4d033521f8df4cc3d10d 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=503ebb430cff99a14ec5a6958479ddfd 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=2f13c432330d46fd247bb7865083c8c5 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=65760df05d7310fa490cc0b7714dd7fc 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=806064df619d5c8d9bae4a61688310ad 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=6a4514f5bd12fcf01ab1aa1bc2b1f26a" data-og-width="1068" width="1068" data-og-height="398" height="398" data-path="assets/integrate/webhooks/url.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=a2a279ce6d5955c0cb1f79504e880cb1 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=aff292b704a653df95e8f7a0fdbf6c62 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e05077418ae849f841b8817725095f7b 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=11a85bb4ca26112804fafa276290e53a 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ff125ccdf3b378753f5022621b0b78a8 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/url.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ec6538e59e41c92123760a599197ade0 2500w" data-optimize="true" data-opv="2" />

    <Tip>
      **Developing locally?**

      Use a tool like [ngrok](https://ngrok.com/) to tunnel webhook events to your local development environment. This will allow you to test your webhook handlers without deploying them to a live server.

      Once you have `ngrok` you can easily start a tunnel:

      ```bash
      ngrok http 3000
      ```

      Just be sure to provide the URL ngrok gives you as the webhook endpoint on
      Polar.
    </Tip>
  </Step>

  <Step title="Choose a delivery format">
    For standard, custom integrations, leave this parameter on **Raw**. This will send a payload in JSON format.

    If you wish to send notifications to a Discord or Slack channel, you can select the corresponding format here. Polar will then adapt the payload so properly formatted messages are sent to your channel.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=77c7f9e6a2f2c3bd1bede381f692908c" data-og-width="1034" width="1034" data-og-height="402" height="402" data-path="assets/integrate/webhooks/format.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=277936fd188888f6e4b81f8973f2f8ac 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=acded2e888ca6e24d95d4684793139a9 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=566b754e7651e74e8876e4fcb3692467 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=7e607f77f8b1811f5ae45a269fea7afb 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ba2313fa067e67b0ec450a2d83643c49 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=c6e8087507a215a93b47d821c536ea47 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=896fc481fe7c61892b034380247479ae" data-og-width="1050" width="1050" data-og-height="418" height="418" data-path="assets/integrate/webhooks/format.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=46a709ed3ee3cc5c0e879e62eda39d87 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=473dd0c2d23a6018519bdc5db9198635 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=360f78fc430b955e0c7148c428c672a1 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0182443ea5be4606ce19c61e383b0dbb 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=43763ad9655461dd11d8b0a427ac7d86 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/format.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d17c85b66413e5749f7681ad3075fda2 2500w" data-optimize="true" data-opv="2" />

    If you paste a Discord or Slack Webhook URL, the format will be automatically selected.
  </Step>

  <Step title="Set a secret">
    We cryptographically sign the requests using this secret. So you can easily
    verify them using our SDKs to ensure they are legitimate webhook payloads
    from Polar.

    You can set your own or generate a random one.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e9fa8ce33d0e86d6331813f4a37ab509" data-og-width="1074" width="1074" data-og-height="331" height="331" data-path="assets/integrate/webhooks/secret.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=4461f60b5496f5ebaabdaaeb21ec3277 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0d849356d3b2b6fee04f64499211e30c 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9930ebe92473176eb9609e7a2e519d9a 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=b973426f396f58c78ba1ed383ca48cd1 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e1cf218d85849a7decda559d7a80bdb9 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=cce65883b68b70301736c88079002ee5 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d447062a9726d8d9116aef2984a96cc2" data-og-width="1072" width="1072" data-og-height="332" height="332" data-path="assets/integrate/webhooks/secret.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e95eaeac04c68cdf4ba4fe55bd3cb011 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0254c3bbabf858a252aeac0d41a0980e 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=6e4bb6b660dbd7267967be16dbd683d4 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=6200bd4919d56b4d28a836d3ef2adcf5 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5066f5e1100d89df0c798edb0e4dae2c 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/integrate/webhooks/secret.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=3e3435cd0dc0323f90420e6302f861e7 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Subscribe to events">
    Finally, select all the events you want to be notified about and you're done 🎉
  </Step>
</Steps>

[Now, it's time to integrate our endpoint to receive events
→](/integrate/webhooks/delivery)


# Webhook Events
Source: https://polar.sh/docs/integrate/webhooks/events

Our webhook events and in which context they are useful

## Billing Events

### Checkout

<Card title="checkout.created" icon="link" href="/api-reference/webhooks/checkout.created" horizontal />

<Card title="checkout.updated" icon="link" href="/api-reference/webhooks/checkout.updated" horizontal />

### Customers

<Card title="customer.created" icon="link" href="/api-reference/webhooks/customer.created" horizontal>
  Fired when a new customer has been created.
</Card>

<Card title="customer.updated" icon="link" href="/api-reference/webhooks/customer.updated" horizontal>
  Fired when a customer has been updated.
</Card>

<Card title="customer.deleted" icon="link" href="/api-reference/webhooks/customer.deleted" horizontal>
  Fired when a customer has been deleted.
</Card>

<Card title="customer.state_changed" icon="link" href="/api-reference/webhooks/customer.state_changed" horizontal>
  Fired when a customer's state has changed. Includes active subscriptions and
  granted benefits.
</Card>

### Subscriptions

In order to properly implement logic for handling subscriptions, you should look into the following events.

<Card title="subscription.created" icon="link" href="/api-reference/webhooks/subscription.created" horizontal>
  Fired when a new subscription has been created.
</Card>

<Card title="subscription.updated" icon="link" href="/api-reference/webhooks/subscription.updated" horizontal>
  Use this event if you want to handle cancellations, un-cancellations, etc. The
  updated event is a catch-all event for `subscription.active` ,
  `subscription.canceled`, `subscription.uncanceled` and `subscription.revoked`.
</Card>

<Card title="order.created" icon="link" href="/api-reference/webhooks/order.created" horizontal>
  In case you want to do logic when a subscription is renewed, you should listen
  to `order.created` and the `billing_reason` field. It can be `purchase`,
  `subscription_create`, `subscription_cycle` and `subscription_update`.
  `subscription_cycle` is used when subscriptions renew.
</Card>

<Card title="subscription.active" icon="link" href="/api-reference/webhooks/subscription.active" horizontal />

<Card title="subscription.canceled" icon="link" href="/api-reference/webhooks/subscription.canceled" horizontal />

<Card title="subscription.uncanceled" icon="link" href="/api-reference/webhooks/subscription.uncanceled" horizontal />

<Card title="subscription.revoked" icon="link" href="/api-reference/webhooks/subscription.revoked" horizontal />

#### Cancellation Sequences

When a subscription is canceled, the events triggered depend on whether the cancellation is immediate or scheduled for the end of the billing period.

**End-of-Period Cancellation (default)**

When a subscription is **canceled** (by customer action from the portal or by the merchant from the dashboard/API), the following events are sent immediately:

1. `subscription.updated`
2. `subscription.canceled`

Both events contain the same subscription data. The subscription will still have `active` status, but the `cancel_at_period_end` flag will be set to `true`.

When the end of the current billing period arrives, the subscription is definitively revoked: billing cycles stop and benefits are revoked. The following events are then sent:

3. `subscription.updated`
4. `subscription.revoked`

Both events contain the same subscription data. The subscription will have the `canceled` status.

**Immediate Revocation**

When a merchant cancels a subscription with **immediate revocation**, those events are sent at once:

1. `subscription.updated`
2. `subscription.canceled`
3. `subscription.revoked`

All three events contain the same subscription data. The subscription will have the `canceled` status immediately.

#### Renewal Sequences

When a subscription is renewed for a new cycle, the webhook events are triggered in a specific sequence to help you track the renewal process and handle billing logic appropriately.

**Initial Renewal Events**

When a subscription reaches its renewal date, the following events are sent immediately (if enabled on the webhook):

1. `subscription.updated`
2. `order.created`

The subscription data will reflect the new billing period through the `current_period_start` and `current_period_end` properties, showing the updated cycle dates.

The order data represents the new invoice for the upcoming cycle, with a total representing what the customer will pay for this new period. If usage-based billing is involved, their consumption for the past period will be included in the total. The status of this order is `pending` at this stage.

**Payment Processing Events**

Shortly after the initial renewal events, the platform will trigger a payment for the new order. Once the payment is successfully processed, the following events are sent:

3. `order.updated`
4. `order.paid`

Both events will contain the same order data, with the order status changed to `paid`.

### Order

<Card title="order.created" icon="link" href="/api-reference/webhooks/order.created" horizontal />

<Card title="order.paid" icon="link" href="/api-reference/webhooks/order.paid" horizontal />

<Card title="order.updated" icon="link" href="/api-reference/webhooks/order.updated" horizontal />

<Card title="order.refunded" icon="link" href="/api-reference/webhooks/order.refunded" horizontal />

### Refunds

<Card title="refund.created" icon="link" href="/api-reference/webhooks/refund.created" horizontal />

<Card title="refund.updated" icon="link" href="/api-reference/webhooks/refund.updated" horizontal />

### Benefit Grants

<Card title="benefit_grant.created" icon="link" href="/api-reference/webhooks/benefit_grant.created" horizontal />

<Card title="benefit_grant.updated" icon="link" href="/api-reference/webhooks/benefit_grant.updated" horizontal />

<Card title="benefit_grant.revoked" icon="link" href="/api-reference/webhooks/benefit_grant.revoked" horizontal />

## Organization Events

### Benefits

<Card title="benefit.created" icon="link" href="/api-reference/webhooks/benefit.created" horizontal />

<Card title="benefit.updated" icon="link" href="/api-reference/webhooks/benefit.updated" horizontal />

### Products

<Card title="product.created" icon="link" href="/api-reference/webhooks/product.created" horizontal />

<Card title="product.updated" icon="link" href="/api-reference/webhooks/product.updated" horizontal />

### Organization

<Card title="organization.updated" icon="link" href="/api-reference/webhooks/organization.updated" horizontal />


# Polar: Modern Billing Infrastructure for Developers
Source: https://polar.sh/docs/introduction

Open-source Merchant of Record platform with developer-first APIs, automated tax compliance, and 20% lower fees than traditional solutions

<img height="200" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=817581d5a2bbb583f6e460c7c8e5f7b1" data-og-width="2000" data-og-height="1000" data-path="assets/welcome.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=62e16ba260d027547000035548b348b6 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=05a90540273278952550d7a500870090 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=b393863078b3848a8447f2aa481bfa91 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=1f60065e2d94cef94ad96eac31169e85 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=6b8d3fdb3d525e4fc8916cd02a028540 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/welcome.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=56905c7b2e36e22e2a5f40ea03d25cf8 2500w" data-optimize="true" data-opv="2" />

<Note>
  **TL;DR**: Polar is an open-source billing platform that handles global tax
  compliance, automates product delivery, and integrates with 5 lines of code.
  Start selling in minutes, not months.
</Note>

## What is Polar?

Polar is an **open-source billing infrastructure platform** designed specifically for developers, designers, and digital creators who want to monetize their products without the complexity of traditional payment systems.

<CardGroup cols={2}>
  <Card title="Beyond Payment Processing" icon="credit-card">
    Unlike Stripe that only handles transactions, we provide complete billing
    infrastructure with tax compliance, product management, and automated access
    & delivery.
  </Card>

  <Card title="Merchant of Record" icon="globe">
    We handle all international tax compliance, so you can sell globally without
    worrying about VAT, GST, or sales tax regulations.
  </Card>
</CardGroup>

## Problems We Solve

<AccordionGroup>
  <Accordion title="Tax Compliance Nightmare" icon="building-columns">
    **The Problem**: Selling digital products globally means dealing with VAT, GST, and sales tax in dozens of jurisdictions, each with different rates, rules, and filing requirements. Most developers either ignore this (risky) or avoid international sales entirely.

    **Polar's Solution**: As your Merchant of Record, we handle all international tax compliance. We calculate, collect, and remit taxes worldwide. You focus on building; we handle the paperwork.
  </Accordion>

  <Accordion title="Complex Billing Infrastructure" icon="gears">
    **The Problem**: Building subscription billing, product catalogs, customer portals, and payment flows from scratch takes months of development time and ongoing maintenance.

    **Polar's Solution**: Complete billing infrastructure out-of-the-box with APIs that let you integrate in minutes. No need to build customer portals, handle subscription lifecycle, or manage failed payments.
  </Accordion>

  <Accordion title="Manual Access & Delivery Overhead" icon="box">
    **The Problem**: Manually sending license keys, granting repository access, or managing Discord invites for every purchase doesn't scale and creates delays for customers.

    **Polar's Solution**: Automated benefit delivery for common developer needs - license keys, file downloads, GitHub repo access, Discord roles, and more. Customers get instant access.
  </Accordion>

  <Accordion title="High Processing Costs" icon="money-bill">
    **The Problem**: Traditional MoR solutions charge 5-8% per transaction plus monthly fees, eating into your profits before you even start.

    **Polar's Solution**: 20% lower fees at just 4% + 40¢ per transaction with no monthly minimums. We earn when you earn.
  </Accordion>
</AccordionGroup>

## Core Features

### Flexible Product Management

<CardGroup cols={3}>
  <Card title="One-time Purchases" icon="cart-shopping">
    Sell digital products, courses, templates, or software licenses with instant
    delivery
  </Card>

  <Card title="Subscriptions" icon="arrows-rotate">
    Recurring billing with automatic renewals and dunning management
  </Card>

  <Card title="Flexible Pricing" icon="hand-holding-dollar">
    Fixed price, pay-what-you-want, or free products with optional minimums
  </Card>
</CardGroup>

### Powerful Checkout Experience

<img className="block dark:hidden" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=46584e16a18277dd02826c4cb7bd022e" data-og-width="5114" width="5114" data-og-height="2634" height="2634" data-path="assets/introduction/checkout.light.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=21510e8fe4de5b148dd01dee0995ac0c 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=72bce537427cca4d98ba9abddf1e7fd7 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=60178f415259c421a68bfd32aac9917b 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d4f97a26d0a84d1c2f3bf3c00fbdd95f 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9a05830baaf35382a005488a05a0339f 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.light.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=8f69d0043f8b5f333f62872cb9f67dcc 2500w" data-optimize="true" data-opv="2" />

<img className="hidden dark:block" src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0b0e33d58f00d805d8a69b6b0427d66a" data-og-width="5108" width="5108" data-og-height="2632" height="2632" data-path="assets/introduction/checkout.dark.png" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=0e0410d0af4eeab8965d201908a75d5a 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=f890d34fdd4c207fb22200d0632dfdba 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=383f251422314162525d5027d26bb383 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=aa0b5cf0b6f37fb7fdb7e5ef788a0ae7 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=5bc29bc1c9481cd0e0ca0bc37f8199c6 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/introduction/checkout.dark.png?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d55ea9c6814f62cca863f002754e21a7 2500w" data-optimize="true" data-opv="2" />

<CardGroup cols={3}>
  <Card title="Checkout Links" icon="link" href="/features/checkout/links">
    No-code solution for quick product sales. Create and share instantly.
  </Card>

  <Card title="Embedded Checkout" icon="browser" href="/features/checkout/embed">
    Integrate seamlessly into your website with customizable branding.
  </Card>

  <Card title="Checkout API" icon="code" href="/api-reference">
    Programmatically create dynamic checkout sessions for custom flows.
  </Card>
</CardGroup>

### Automated Benefits (Entitlements)

**Set it and forget it**: Configure once, and customers get instant access to
their benefits automatically. No manual work required.

<CardGroup cols={2}>
  <Card title="License Keys" icon="key" href="/features/benefits/license-keys">
    Generate and deliver software licenses automatically with custom formats
  </Card>

  <Card title="File Downloads" icon="download" href="/features/benefits/file-downloads">
    Secure delivery of digital assets up to 10GB with download tracking
  </Card>

  <Card title="GitHub Access" icon="github" href="/features/benefits/github-access">
    Auto-invite customers to private repositories and manage permissions
  </Card>

  <Card title="Discord Access" icon="discord" href="/features/benefits/discord-access">
    Automatic role assignment and server invites for community access
  </Card>
</CardGroup>

### Global Merchant of Record

* **Worldwide tax compliance** - We handle VAT, GST, and sales tax in all jurisdictions
* **EU VAT handling** - Proper B2B reverse charge and B2C tax collection
* **Automatic tax calculation** - Real-time tax rates for every transaction

<Warning>
  **Important**: We handle tax compliance in all major markets including US, EU,
  UK, and more. We continuously expand coverage based on customer needs.
</Warning>

## Quick Start Guide

<Steps>
  <Step title="Create Your Account">
    [Sign up for Polar](https://polar.sh/signup) using GitHub, Google, or email. Create an organization to manage your products and customers.

    <img className="block dark:hidden" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b416d158706b4ba00056ba9fbe29657c" data-og-width="2044" width="2044" data-og-height="1664" height="1664" data-path="assets/create-org.light.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f367f8bee4da0a2a4c698b281a67c55f 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=33706ed67d23149e33a392e669a35394 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=bb36c1899e8040449c96bbc9d2766fc9 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=cc5a2cefa02e173a44d8cee69906c892 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f30b170b73f62471e70d405db6dbf555 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.light.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=df816a78009c7c6ff94780c6fa5c70a7 2500w" data-optimize="true" data-opv="2" />

    <img className="hidden dark:block" src="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=59301a615164f57999574c07c7b55f0d" data-og-width="1986" width="1986" data-og-height="1678" height="1678" data-path="assets/create-org.dark.png" srcset="https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=280&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=f53b0b62849df5f50f00f03b7034c9b0 280w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=560&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=10395cc35b04681cb2fae0695e63c96f 560w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=840&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=b55ba88bb0ba84a14cc74898eaa9f4fc 840w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=1100&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=8e66502778b17459062169266138e64e 1100w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=1650&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=27015fbb4b98a501750e3ff6b786ea09 1650w, https://mintcdn.com/polar/Ut0vPUvE1pIdMcH2/assets/create-org.dark.png?w=2500&fit=max&auto=format&n=Ut0vPUvE1pIdMcH2&q=85&s=4bb9f7c6f7a388a93cf012c46ab421cd 2500w" data-optimize="true" data-opv="2" />
  </Step>

  <Step title="Create Your First Product">
    Set up a digital product in minutes:

    * Choose between one-time purchase or subscription
    * Set your pricing (fixed, pay-what-you-want, or free)
    * Configure automated benefits for instant delivery

    Learn more about [Products →](/features/products)
  </Step>

  <Step title="Choose Your Integration">
    Pick the approach that fits your needs:

    <Tabs>
      <Tab title="No-Code (Fastest)">
        Perfect for getting started quickly:

        * Create [Checkout Links](/features/checkout/links) from your dashboard
        * Share via email, social media, or embed in websites
        * Start accepting payments immediately
      </Tab>

      <Tab title="Embedded">
        Integrate into your existing website:

        * Add our [Embedded Checkout](/features/checkout/embed) component
        * Maintain your site's look and feel
        * Customers never leave your domain
      </Tab>

      <Tab title="Full API (Maximum Control)">
        Maximum flexibility for custom workflows:

        * Use our [SDKs](/integrate/sdk/typescript) for any language
        * Build custom checkout flows and experiences
        * Integrate with your existing tech stack
      </Tab>
    </Tabs>
  </Step>

  <Step title="Set Up Webhooks">
    Stay synchronized with customer events:

    * Configure webhook endpoints in your dashboard
    * React to purchases, subscription changes, and customer events
    * Keep your database in sync automatically

    Read the [Webhooks guide →](/integrate/webhooks/endpoints)
  </Step>
</Steps>

## Integration Options

### Framework Adapters (Recommended)

<CardGroup cols={2}>
  <Card title="Next.js" icon="react" href="/integrate/sdk/adapters/nextjs">
    React-based full-stack framework with App Router support
  </Card>

  <Card title="SvelteKit" icon="js" href="/integrate/sdk/adapters/sveltekit">
    Svelte-based full-stack framework with TypeScript support
  </Card>

  <Card title="Laravel" icon="php" href="/integrate/sdk/adapters/laravel">
    PHP web application framework with Eloquent ORM integration
  </Card>

  <Card title="Express" icon="node-js" href="/integrate/sdk/adapters/express">
    Minimal and flexible Node.js web application framework
  </Card>
</CardGroup>

<Expandable title="All 12 supported frameworks">
  <CardGroup cols={4}>
    <Card title="Nuxt" href="/integrate/sdk/adapters/nuxt">
      Vue.js framework
    </Card>

    <Card title="Remix" href="/integrate/sdk/adapters/remix">
      React framework
    </Card>

    <Card title="Fastify" href="/integrate/sdk/adapters/fastify">
      Fast Node.js
    </Card>

    <Card title="Hono" href="/integrate/sdk/adapters/hono">
      Cloudflare Workers
    </Card>

    <Card title="Deno" href="/integrate/sdk/adapters/deno">
      Modern runtime
    </Card>

    <Card title="Tanstack Start" href="/integrate/sdk/adapters/tanstack-start">
      Full-stack React
    </Card>

    <Card title="Elysia" href="/integrate/sdk/adapters/elysia">
      Bun framework
    </Card>

    <Card title="Astro" href="/integrate/sdk/adapters/astro">
      Static site generator
    </Card>
  </CardGroup>
</Expandable>

### Native SDKs

<CardGroup cols={4}>
  <Card title="JS/TS" icon="js" href="/integrate/sdk/typescript">
    For web and Node.js applications
  </Card>

  <Card title="Python" icon="python" href="/integrate/sdk/python">
    For Django, Flask, FastAPI frameworks
  </Card>

  <Card title="Go" icon="golang" href="/integrate/sdk/golang">
    For Go web services and applications
  </Card>

  <Card title="PHP" icon="php" href="/integrate/sdk/php">
    For WordPress, Laravel, and PHP apps
  </Card>
</CardGroup>

## Why Choose Polar?

<Tabs>
  <Tab title="Individual Developers">
    <CardGroup cols={2}>
      <Card title="Ship Faster" icon="rocket">
        Focus on your product, not billing infrastructure. Get to market weeks faster.
      </Card>

      <Card title="Global Reach" icon="globe">
        Sell worldwide without worrying about tax compliance or regional restrictions.
      </Card>

      <Card title="Automated Delivery" icon="box">
        License keys and downloads handled automatically. No manual work required.
      </Card>

      <Card title="Lower Costs" icon="piggy-bank">
        20% cheaper than competitors with transparent, pay-as-you-earn pricing.
      </Card>
    </CardGroup>
  </Tab>

  <Tab title="Small Teams">
    <CardGroup cols={2}>
      <Card title="No Engineering Overhead" icon="wrench">
        Complete billing solution without months of custom development work.
      </Card>

      <Card title="Scalable Pricing" icon="chart-line">
        Pay only when you earn, no monthly minimums or setup fees.
      </Card>

      <Card title="Team Collaboration" icon="users">
        Multiple team members can manage products, customers, and analytics.
      </Card>

      <Card title="Professional Checkout" icon="credit-card">
        Branded experience that builds customer trust and increases conversions.
      </Card>
    </CardGroup>
  </Tab>

  <Tab title="Growing Businesses">
    <CardGroup cols={2}>
      <Card title="Enterprise Features" icon="building">
        Advanced analytics, custom fields, bulk operations, and priority support.
      </Card>

      <Card title="API Flexibility" icon="code">
        Full programmatic control over products, customers, orders, and subscriptions.
      </Card>

      <Card title="Webhook Reliability" icon="link">
        Reliable real-time synchronization with your systems and database.
      </Card>
    </CardGroup>
  </Tab>
</Tabs>

## Transparent Pricing

<CardGroup cols={2}>
  <Card title="4% + 40¢" icon="percent">
    **Per successful transaction**

    Simple, transparent pricing with no surprises
  </Card>

  <Card title="$0" icon="dollar-sign">
    **Monthly fees or setup costs**

    Pay only when you earn, no fixed costs
  </Card>
</CardGroup>

<Info>
  **Additional fees may apply**: Some transactions may incur additional fees
  (international cards, subscriptions). Payout fees are charged by payment
  providers. See our [detailed fees page](/merchant-of-record/fees) for complete
  information.
</Info>

## Open Source & Community

Polar is built in the open with full transparency and a growing community of
contributors.

<CardGroup cols={2}>
  <Card title="Open Source Codebase" icon="github" href="https://github.com/polarsource/polar">
    Apache 2.0 license with 36+ contributors and growing
  </Card>

  <Card title="Public Development" icon="users" href="https://github.com/polarsource/polar/issues">
    Feature requests, roadmap, and issues - all developed in public
  </Card>

  <Card title="Transparent Pricing" icon="eye">
    No hidden fees or surprise charges. What you see is what you pay.
  </Card>

  <Card title="Community Support" icon="discord" href="https://discord.gg/Pnhfz3UThd">
    Join our Discord for help, feedback, and feature discussions
  </Card>
</CardGroup>

<Warning>
  While self-hosting is technically possible, we recommend using our hosted
  service to get the full Merchant of Record benefits including global tax
  compliance.
</Warning>

## Ready to Start?

<CardGroup cols={2}>
  <Card title="Create Account" icon="user-plus" href="https://polar.sh/signup">
    **Free signup, no credit card required**

    Get started in under 2 minutes
  </Card>

  <Card title="Read the Guides" icon="book" href="/guides/nextjs">
    **Framework-specific tutorials**

    Step-by-step integration guides
  </Card>

  <Card title="Explore the API" icon="code" href="/api-reference">
    **Complete API documentation**

    Interactive examples and SDKs
  </Card>

  <Card title="Join Our Community" icon="discord" href="https://discord.gg/Pnhfz3UThd">
    **Get help from our team**

    Active community and support
  </Card>
</CardGroup>


# null
Source: https://polar.sh/docs/merchant-of-record/acceptable-use



As your Merchant of Record (MoR), we are the reseller of all digital goods and
services and focus exclusively on digital products. Therefore we cannot support
physical goods or entirely human services, e.g consultation or support. In
addition to not accepting the sale of anything illegal, harmful, abusive,
deceptive or sketchy.

## Acceptable Products & Businesses

* Software & SaaS
* Digital products: Templates, eBooks, PDFs, code, icons, fonts, design assets, photos, videos, audio etc
* Premium content & access: Discord server, GitHub repositories, courses and content requiring a subscription.

**General rule of acceptable services**

Digital goods, software or services that can be fulfilled by…

1. Polar on your behalf (License Keys, File Downloads, GitHub- or Discord invites or private links, e.g premium YouTube videos etc)
2. Your site/service using our APIs to grant immediate access to digital assets
   or services for customers with a one-time purchase or subscriptions

Combined with being something you’d proudly boast about in public, i.e nothing illegal, unfair, deceptive, abusive, harmful or shady.

Don’t hesitate to [reach out to us](/support) in advance in case you’re unsure if your use case would be approved.

## Prohibited Businesses

<Note>
  **Not an exhaustive list**

  We reserve the right to add to it at any time. Combined with placing your
  account under further review or suspend it in case we consider the usage
  deceptive, fraudulent, high-risk or of low quality for consumers with high
  refund/chargeback risks.
</Note>

* Illegal or age restricted, e.g drugs, alcohol, tobacco or vaping products
* Violates laws in the jurisdictions where your business is located or to which your business is targeted
* Violates any rules or regulations from payment processors & credit card networks, e.g [Stripe](https://stripe.com/en-se/legal/restricted-businesses)
* Reselling or distributing customer data to other parties for commercial, promotional or any other reason (disclosed service providers are accepted).
* Threatens reputation of Polar or any of our partners and payment providers
* Causes or has a significant risk of refunds, chargebacks, fines, damages, or harm and liability
* Services used by-, intended for or advertised towards minors
* Physical goods of any kind. Including SaaS services offering or requiring fulfilment via physical delivery or human services.
* Human services, e.g marketing, design, web development and consulting in general.
* Donations or charity, i.e price is greater than product value or there is no exchange at all (pure money transfer). Open source maintainers with sponsorship can be supported - reach out.
* Marketplaces. Selling others’ products or services using Polar against an upfront payment or with an agreed upon revenue share.
* Adult services or content. Including by AI or proxy, e.g
  * AI Girlfriend/Boyfriend services.
  * OnlyFans related services.
  * Explicit/NSFW content generated with AI
* Low-quality products, services or sites, e.g
  * E-books generated with AI or 4 pages sold for \$50
  * Quickly & poorly executed websites, products or services
  * Services with a lot of bugs and issues
  * Products, services or websites we determine to have a low trust score
* Fake testimonials, reviews, and social proof. It's deceptive to consumers which is behaviour we do not tolerate.
* Trademark violations
* "Get rich" schemes or content
* Gambling & betting services
* Regulated services or products
* Counterfeit goods
* Job boards
* NFT & Crypto assets.
* Cheating: Utilizing cheat codes, hacks, or any unauthorized modifications that alter gameplay or provide an unfair advantage.
* Reselling Licenses: Selling, distributing, or otherwise transferring software licenses at reduced prices or without proper authorization.
* Services to circumvent rules or terms of other services: Attempting to bypass, manipulate, or undermine any established rules, gameplay mechanics, or pricing structures of other vendors/games.
* Financial services, e.g facilitating transactions, investments or balances for customers.
* Financial trading, brokerage, or investment advisory services (including insights platforms).
* Financial advice, e.g content or services related to tax guidance, wealth management, investment strategies etc.
* IPTV services
* Virus & Spyware
* Telecommunication & eSIM Services
* Products you don’t own the IP of or have the required licenses to resell
* Advertising & unsolicited marketing services. Including services to:
  * Generate, scrape or sell leads
  * Send SMS/WhatsApp messages in bulk
  * Automate outreach (spam risks)
  * Automate mass content generation & submission across sites
* API & IP cloaking services, e.g services to circumvent IP bans, API rate limits etc.
* Products or services associated with pseudo-science; clairvoyance, horoscopes, fortune-telling etc.
* Travel services, reservation services, travel clubs and timeshares
* Medical advice services or products, e.g. pharmaceutical, weight loss, muscle building.

## Restricted Businesses

Requires closer review and a higher bar of quality, execution, trust and compliance
standards to be accepted.

* Directories & boards
* Marketing services
* Pre-orders & Paid waitlist
* Ticket sales
* eBooks

## FAQ

**Why do directories & boards require closer review?**

They often sell premium placement, i.e ads, without meeting compliance
requirements for advertising. Or even where it's their sole purpose to sell
placement.

**Why do marketing services require closer review?**

Too many services offer sketchy marketing tactics and mass outreach
(unsolicited) features. There is no short-cut to sales beyond offering a great
product & service. We love marketing services that reflect that and focus on the
long game vs. shortcuts and hacks.

**Can I sell pre-orders or use paid waitlists for my service to validate demand
before build?**

Generally, no. It's a high risk category for us as the Merchant of Record.
Sellers could withdraw funds and never deliver the service or not as promised.
Causing consumers to demand refunds or dispute the sale against us at a later
date.

For high-trust cases from developers with a track record, we're able to make
exceptions, but simultaneously need to adapt our payout process to withhold all
funds until verified fulfilment.

**Why are marketplaces or human services (consultancy) not allowed?**

We hope to change this status quo amongst Merchants of Record long-term, but
both come with additional compliance and risk challenges. Since fulfilment is
not digital, immediate or between known parties to us, we cannot fulfil our
compliance & risk requirements or effectively mitigate potential disputes.

**Why are OnlyFans services not allowed?**

Close & blurred lines between the service and the content & service provided on
OnlyFans, i.e often adult content. In addition to us having seen
fraudulent & deceptive behavior in the category. We're simply not comfortable
acting as the Merchant of Record here.


# null
Source: https://polar.sh/docs/merchant-of-record/account-reviews



As a Merchant of Record (MoR), we act as the reseller of digital goods and services. Therefore, we need to make sure that businesses using Polar complies with our [acceptable products & use](/merchant-of-record/acceptable-use) policies. Combined with continuously monitoring, reviewing and preventing fraud, unacceptable use, bad actors and high risk accounts.

Account reviews are typically completed within a week on average. However, sometimes it can take longer due to weekends, holidays etc. We process them as quickly as possible and resolve every single one.

### First payout review

You will need to go through our main review ahead of the initial payout. We’ll reach out over email for:

1. A quick survey about your business, products and intended use case with Polar.
2. Identity verification (KYC) using Passport/ID Card/Driver License and a selfie. It’s secure, easy and quick to submit using Stripe Identity.

We need to perform this review to ensure compliance with our [acceptable products & use](/merchant-of-record/acceptable-use) policy. Combined with meeting our own KYC/AML requirements as a billing platform.

**Submit upfront (Soon)**

We’ll soon offer the ability to submit all of this information in advance to speed up the initial payout even further and without concern of any issues or delays.

### Continuous reviews (Async)

We continuously monitor all transactions across our platform to proactively prevent fraud. In addition to performing asynchronous reviews of accounts at certain sale thresholds. These reviews are often completed within hours and without any additional information required from you.

You’ll get notified over email that a review is taking place. Payouts will be paused during this time, but it has no impact on your customers’ experience or ability to purchase, subscribe or checkout at any time.

We look at:

* Risk scores across historic transactions
* Refund- & Chargeback ratio
* Appropriate next sales threshold for a review given the above

**High chargeback ratios**

Credit card networks, e.g Visa/Mastercard, consider 0.7% of sales in chargebacks excessive. Exceeding it can lead to monitoring programs with high costs, penalties and ultimately termination.

We therefore reach out proactively to collaborate on maintaining a low chargeback ratio and reducing it ahead of getting close to these thresholds.

## Operational Guidelines

To maintain platform integrity and ensure smooth operations, we have established clear guidelines for merchants using Polar.

#### Expected Responsiveness

We expect merchants to maintain high standards of customer support and responsiveness to their customers:

* **Support Ticket Management**: Maintain a low rate of support tickets from customers
* **Merchant Communication**: When we include you in customer support communications, we require a response within 48 hours
  * If no response is received within 48 hours, we may issue refunds to affected customers and a warning to merchants
  * In case of repeated issues, we'll have to offboard unresponsive merchants
* **Customer Service Quality**: We evaluate your customer service history and approach when determining appropriate actions

#### Test Transactions

To maintain platform security and prevent abuse:

* **Use Sandbox Environment or 100% Discounts**: All  testing must be conducted using our sandbox environment. Want to test in production? Use a Free Product or a 100% Discount code to avoid using real money.
* **No Real Money Testing**: Any such transactions are prohibited and will be refunded. It's against the terms of payment service providers, triggers our account reviews and can potentially lead to the card or account getting blocked since it can be flagged as "card testing".

#### Chargeback Management

We monitor chargeback rates closely to protect both merchants and customers:

* **Acceptable Threshold**: We maintain a chargeback rate threshold of 0.4% for merchants
* **Timeframe**: Chargebacks can be filed up to 120 days from the original transaction date
* **Consequences of High Chargeback Rates**:

  We work proactively to maintain a low chargeback rate throughout the platform and strive to collaborate with merchants at risk of exceeding our thresholds to reverse the trend. However, we reserve the right to (in order of severity):

  * Refund transactions as needed
  * Pause payouts pending review – up until the timeframe for chargebacks have been surpassed
  * Pause future payments
  * Block accounts and refund customers

  We don't take this responsibility or actions lightly, and always strive to mitigate and avoid them, but have to take appropriate and proactive actions in case of issues.

  <Note>
    We also have integrations with credit card networks to receive early chargeback signals before they're officially filed. We automatically refund such transactions under a certain value and cancel any subscriptions associated with the customer to reduce chargebacks proactively.
  </Note>

#### Policy Violations

For merchants who violate our [acceptable use policies](/merchant-of-record/acceptable-use) (and don't have high chargeback rates):

* **Immediate Action**: We will offboard merchants who violate our policies
* **Payment Processing**: All payment processing will be blocked
* **Payout Management**: Payouts will be paused pending review
* **Resolution Process**:
  * We may conduct test transactions to verify account status
  * In case of strong suspicion of fraud or intentional abuse, we block the account immediately
  * We reach out merchants about the issue and give them 48 hours to respond
    * Failure to respond may result in refunds to affected customers
  * We pause future payments in the meantime if deemed necessary
  * We pause payouts during the resolution process
  * We strive to collaborate with merchants on the best possible path forward. Clear fraud or abuse, however, is immediately blocked.
  * We have to cancel subscriptions and refund payments made in violation of our acceptable use policies for compliance and risk, and strive to do so in collaboration with the merchant.


# Fees
Source: https://polar.sh/docs/merchant-of-record/fees

Transparent fees at a 20% discount vs. other MoRs

## Transaction Fees

All transactions on Polar come with a small fee of 4% + 40¢ - applied to the entire transaction amount.

Polar is currently built on Stripe, and we cover their 2.9% + 30¢ fee from ours. However, they impose a few additional fees for certain transactions that we need to pass on.

### **Additional Fees**

* +1.5% for international cards (non-US)
* +0.5% for subscription payments
* *We also reserve the right to pass on any other fees Stripe might impose in the future*

**Example**

Let's look at an example breakdown with all these additional fees applied. Below is a payment of a \$30 subscription from Sweden (25% VAT).

| Item                           | Amount     |
| ------------------------------ | ---------- |
| Product Price                  | \$30       |
| VAT (25%)                      | \$7.5      |
| **Total Transaction Value**    | **\$37.5** |
| Transaction Fee (4% + 40¢)     | \$1.9      |
| International Card (+1.5%)     | \$0.56     |
| Subscription (+0.5%)           | \$0.19     |
| **Total Fees (Before Payout)** | **\$2.65** |

### Refunds

You can issue both full or partial refunds on Polar to your customers. However, the initial transaction fees are not refunded to you since credit card networks and PSPs charge them regardless of a future refund.

Please note: Polar reserves the right to issue refunds at our own discretion up to 60 days after the purchase as part of our efforts to continuously and proactively reduce disputes & chargebacks which costs you \$15/dispute. We only leverage this right for this purpose and in the interest of reducing chargebacks and fees for you.

### Dispute/Chargeback Fees

Sometimes, customers can open a **dispute/chargeback** via their bank for a purchase. **Disputes cost \$15 per dispute** regardless of outcome and is deducted from your balance directly. This fee is charged by the underlying credit card networks & PSPs regardless of outcome and therefore something we cannot refund.

However, we continuously work to proactively reduce the rate of chargebacks across Polar to be at or lower than industry standards.

Credit card networks impose monitoring programs, penalties and higher chargeback costs for sellers with high chargeback rates (\~0.7%+). Since Polar is the Merchant of Record, we therefore always monitor and proactively prevent our rate coming close to these thresholds.

Therefore, we might need to intervene and even suspend your account unless swift and proactive measures are taken to reduce chargebacks to an acceptable industry standard.

## Payout Fees

While payouts may incur fees charged by the payout providers (such as Stripe), Polar does not add any extra fees or markup. These are strictly the provider’s fees, and Polar does not profit from them.

In addition, Polar offers manual withdrawals for developers. Keeping you in control of when to issue payouts.

*Unless you have a Polar balance that you haven't withdrawn for several months, at which point we'll eventually need to trigger a payout on your behalf.*

**Stripe**

* \$2 per month of active payout(s)
* 0.25% + \$0.25 per payout
* Cross border fees (currency conversion): 0.25% (EU) - 1% in other countries.

**Open Collective (Deprecated for new users)**

* 10% on amount transferred

## Volume pricing

Large or fast-growing business? We can offer custom pricing to better fit your needs. [Reach out to us](/support).


# Merchant of Record
Source: https://polar.sh/docs/merchant-of-record/introduction

An open source and transparent Merchant of Record

### What is a Merchant of Record?

We take on the liability of international sales taxes globally for you.
So you can focus on growing your business vs. accounting bills. Leave billing
infrastructure and international sales tax headaches to us.

### Payment Service Providers vs. Merchants of Record

**Payment Service Providers (PSPs)**

<img src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d6ebe86951492acc24c283751030c583" data-og-width="887" width="887" data-og-height="387" height="387" data-path="assets/merchant-of-record/introduction/psp.jpeg" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=25d8cf1a2ae0adaccb5167475013e6f2 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=fac4d6d7b5fdc077efd474c16e863dc2 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=cc360576c276b4e0a025f2f3060aa449 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=9db2980a3b5b00b53a66ae5719853f5d 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=effbe04373f198495dd879c5432e9f29 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/psp.jpeg?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=dbac7e033111188f629837188252f731 2500w" data-optimize="true" data-opv="2" />

Stripe and other Payment Service Providers (PSPs) offer an accessible and convenient abstraction to faciliate transactions on top of underlying credit card networks & banks.

* ✅ Powerful, flexibile & low-level APIs to facilitate transactions
* ✅ Can be used to power all business- and pricing models under the sun.
* ❌ You are responsible for all liabilities associated with transactions, e.g international taxes
* ❌ Low-level APIs require more development even for common use cases

**Merchants of Record (MoRs)**

<img src="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=f4fee8f5df14dcf7bee87625c2b2d326" data-og-width="887" width="887" data-og-height="507" height="507" data-path="assets/merchant-of-record/introduction/mor.jpeg" srcset="https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=280&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=ae1577f59bca9cd7de2c2a158e6eca85 280w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=560&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=edad11494676d31b52007110cfe2912e 560w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=840&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=e1f1b60e74670bd7312735c9182552eb 840w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=1100&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=d6ffbc639f044e8ecd59caf7f932fd45 1100w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=1650&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=79244345ed678e50497d165124b53ebe 1650w, https://mintcdn.com/polar/0Af3hN6-oIM4IHT3/assets/merchant-of-record/introduction/mor.jpeg?w=2500&fit=max&auto=format&n=0Af3hN6-oIM4IHT3&q=85&s=b1479bd9e69b8f89f3ae0658e6525968 2500w" data-optimize="true" data-opv="2" />

Merchants of Record offer yet another layer of convenient abstraction to facilitate digital orders on top of the underlying PSPs and transactions. E.g Polar is built on Stripe (+ more PSPs in the future).

* ✅ Higher-level Dashboard, APIs & SDKs to better facilitate digital products, services & orders beyond the underlying transactions
* ✅ The platform (Polar) handles international taxes by being a reseller of your digital goods & services. Of course, without being in the way of your relationship with your customers.
* ❌ Less flexibility & control in terms of advanced business- and pricing models.
* ❌ Higher fees per payment

**What should you choose?**

**Ship with what you feel comfortable with vs. others tell you to**

Just like in programming, abstractions are super helpful to ship faster with fewer low-level concerns, but in exchange for reduced flexibility and higher costs. So what's the right level of abstraction for you? As always, it depends (tm).

**Go with Stripe (PSP) if...**

* You've already integrated it? Just ship already - we salute builders however they ship
* You're comfortable with the Stripe API and prefer absolute control with low-level APIs.
* You're looking for the lowest fees possible.
* You're fine with handling international taxes yourself (you absolutely can).

**Go with Polar (MoR) if...**

* You want product-, customer-, order- and subscription management via an intuitive and easy dashboard
* You want to offer file downloads, license keys, Discord- and/or private GitHub repository invites with ease - with more built-in automations to come.
* You prefer a more high-level API optimized for making monetization easier. We're only getting started here and have some big things coming
* You want us to handle international taxes for you

### Polar MoR

**tl;dr We take on the liability of international sales taxes globally for you. So you can focus on building your passion. Leaving billing infrastructure and sales tax headaches to us.**

So how does Polar offer a Merchant of Record (MoR) service and handle international sale taxes? All other Merchants of Record simply state they handle it internationally - don't worry about it. We do too.

But we believe in transparency and don't want to scare customers into thinking it's impossible to manage it themselves. So below we'll share how exactly we go about doing this.

#### International Sales Taxes

Most countries, states and jurisdictions globally impose sales taxes on digital goods and services (VAT, GST, US Sales Tax etc). Regardless of whether the merchant (seller) is a resident there or not - they're doing business there.

For example, a \$10/month subscription should cost \$12.5/month for a Swedish (25% VAT) consumer, but \$10/month for a Swedish business with VAT registration (reverse charge).

Merchants are responsible for 1) capturing & 2) remitting sales taxes to the local tax authorities. What does that mean in our example?

1. **Capturing**. Charging the Swedish consumer \$12.5/month and saving \$2.5/month for the Swedish tax authorities. Stripe Tax is an excellent service to automate this and the one Polar uses today.
2. **Remitting**. Filing & paying the captured sales taxes with the tax authorities on time. Stripe Tax does not do this, i.e the merchant is liable to register, file and pay taxes to local tax authorities.

Many jurisdictions, however, don't require this until you reach a certain threshold in terms of sales volume. But others require registration even before the first sale - or after a very low threshold. In addition to having different rates and rules on which goods are taxable and whether they're deductable or not for business customers.

For example, United Kingdom and EU countries require upfront registration for international companies, but Texas (United States) does not until you've sold for more than \$500,000 🇺🇸🦅

In short: It's complex and hard. Even large and well-known businesses don't do it perfectly. Arguably, it's almost impossible and at least highly impracticle and expensive to comply perfectly upfront. Many companies even delay compliance as a calculated risk, i.e focus on validating & growing their business with the risk of paying back taxes + penalities later.

**PSP (Stripe)**

* ✅ Your volume alone is what counts towards international thresholds vs. the MoR platform, i.e customers might not need to pay sales taxes with you, but would via a MoR.
* ✅ You can deduct inbound VAT against purchases your business does with VAT
* ❌ You're liable for capturing & remitting international sales taxes
* ❌ Stripe Tax is great to monitor & automate capturing, but registration and remittance is up to you.

**MoR (Polar)**

* ✅ We are liable for all of the above as your reseller, i.e we have to worry about it vs. you.
* ✅ Offer EU VAT for B2B sales (expected and desired within EU for businesses) without having to register, capture and remit it yourself.
* ❌ Sales taxes would be added for more customers vs. with you selling directly
* ❌ You cannot leverage inbound VAT towards VAT expense deductions yourself

Merchants of Record (MoR) handles sales taxes, e.g US Sales Tax, EU VAT,
Canadian GST etc. **However, you're always responsible for your own
income/revenue tax** in your country of residency.

#### Polar Coverage

**tl;dr We support global payments and are liable for all international sales taxes. We continuously monitor and work with our accounting firms to expand registrations as needed on our end.**

**Global Payments & Tax Liabilities**

As your Merchant of Record, Polar is liable for tax compliance globally on all sales internationally via our platform, hosted- or embedded checkoutsfrom payments anywhere in the world.

**Current Polar Tax Registrations**

1. Polar Software Inc. is incorporated as a US Delaware C Corp and will register for US State Sales Taxes upon reaching thresholds
2. EU VAT (Irish OSS VAT)
3. UK VAT

No Merchant of Record (MoR) or business registers upfront in all global jurisdictions. Since it would be 1) unnecessary in case of thresholds & 2) incredibly expensive with uncertain return on investment (ROI) in all markets.

We work with global accounting firms specialized in registering, filing and remitting taxes in all countries. So we can easily scale registrations and remittance as needed. Below is our process and evaluation for expanding registrations.

**Expanding Registrations**

Below are the fees the global acounting firms we work with charge us - on average per market:

* \~\$500 upfront for registration
* \~\$300 per filing and remittance (\~quarterly)
* *Excluding consultations (billed hourly) and our internal efforts and automations to transform Stripe Tax reports into correct output for the accounting firms.*

So on average \$1,700 in year one and \$1,200 therafter for each market at a minimum. Businesses (and you if you handle this yourself) therefore need to ask themselves: Do I anticipate more in sales from a given market vs. costs of operating there?

Let's imagine a country with 20% sales tax.

1. At \$6,000+ the tax liability start outgrowing the accounting costs for you standalone (\$1,200/20%)
2. Polar with a 1.1% premium vs. Stripe would need to help facilitate \$109,090 in sales for the given market in order for it to cover our accounting costs (\$1,200/1.1%)

Our customers are selling mostly in the US, UK & EU. Given US thresholds and our current registrations, it's therefore a non-issue.

In markets we're not registered, we still have the liability and take it on (#1) to assess the potential for our customers and us long-term. In addition to being comfortable betting on markets a lot earlier than it becomes profitable for us (#2).

However, in case of neither we reserve the right to block payments from such countries in the short-term until the opportunity for our customers and us changes in the given market.

**Want to do this yourself?**

Selling a lot and want to handle this yourself, i.e worth the ongoing costs? Feel free to reach out and we'd be happy to introduce you to our contacts at the accounting firms we use.

We consider MoR a key value-add to Polar, but not the sole reason for Polar to exist. Our ambition is to be the easiest way to monetize for developers. However, we're never going to be the right solution for all use cases. But we'll always salute and help anyone who ships software - regardless of billing platform.


# null
Source: https://polar.sh/docs/merchant-of-record/supported-countries



### Payments & Merchant of Record

We support payments globally except from countries with US sanctions.

As your Merchant of Record (MoR) we take on the liability for international sales taxes - [read more here](/merchant-of-record/introduction).

### Payouts

Polar uses Stripe Connect Express to issue payouts to residents or businesses in any of the countries below.

<Note>
  **FAQ: Stripe is not supported in my country**

  Stripe Connect Express for payouts is a separate product from Stripe Payments.

  In some cases, Stripe Payments might not be available for merchants in your country, but Stripe Connect Express is for payouts using cross-border transfers.

  Since Polar is the Merchant of Record and uses Stripe Connect Express for payouts, we're able to support sellers in all of the countries below.
</Note>

* 🇦🇱 Albania
* 🇩🇿 Algeria
* 🇦🇴 Angola
* 🇦🇬 Antigua and Barbuda
* 🇦🇷 Argentina
* 🇦🇲 Armenia
* 🇦🇺 Australia
* 🇦🇹 Austria
* 🇦🇿 Azerbaijan
* 🇧🇸 Bahamas
* 🇧🇭 Bahrain
* 🇧🇩 Bangladesh
* 🇧🇪 Belgium
* 🇧🇯 Benin
* 🇧🇹 Bhutan
* 🇧🇴 Bolivia
* 🇧🇦 Bosnia and Herzegovina
* 🇧🇼 Botswana
* 🇧🇳 Brunei
* 🇧🇬 Bulgaria
* 🇰🇭 Cambodia
* 🇨🇦 Canada
* 🇨🇱 Chile
* 🇨🇴 Colombia
* 🇨🇷 Costa Rica
* 🇭🇷 Croatia
* 🇨🇾 Cyprus
* 🇨🇿 Czech Republic
* 🇩🇰 Denmark
* 🇩🇴 Dominican Republic
* 🇪🇨 Ecuador
* 🇪🇬 Egypt
* 🇸🇻 El Salvador
* 🇪🇪 Estonia
* 🇪🇹 Ethiopia
* 🇫🇮 Finland
* 🇫🇷 France
* 🇬🇦 Gabon
* 🇬🇲 Gambia
* 🇩🇪 Germany
* 🇬🇭 Ghana
* 🇬🇷 Greece
* 🇬🇹 Guatemala
* 🇬🇾 Guyana
* 🇭🇰 Hong Kong
* 🇭🇺 Hungary
* 🇮🇸 Iceland
* 🇮🇳 India
* 🇮🇩 Indonesia
* 🇮🇪 Ireland
* 🇮🇱 Israel
* 🇮🇹 Italy
* 🇨🇮 Ivory Coast
* 🇯🇲 Jamaica
* 🇯🇵 Japan
* 🇯🇴 Jordan
* 🇰🇿 Kazakhstan
* 🇰🇪 Kenya
* 🇰🇼 Kuwait
* 🇱🇦 Laos
* 🇱🇻 Latvia
* 🇱🇮 Liechtenstein
* 🇱🇹 Lithuania
* 🇱🇺 Luxembourg
* 🇲🇴 Macao
* 🇲🇬 Madagascar
* 🇲🇾 Malaysia
* 🇲🇹 Malta
* 🇲🇺 Mauritius
* 🇲🇽 Mexico
* 🇲🇩 Moldova
* 🇲🇨 Monaco
* 🇲🇳 Mongolia
* 🇲🇦 Morocco
* 🇲🇿 Mozambique
* 🇳🇦 Namibia
* 🇳🇱 Netherlands
* 🇳🇿 New Zealand
* 🇳🇪 Niger
* 🇳🇬 Nigeria
* 🇲🇰 North Macedonia
* 🇳🇴 Norway
* 🇴🇲 Oman
* 🇵🇰 Pakistan
* 🇵🇦 Panama
* 🇵🇾 Paraguay
* 🇵🇪 Peru
* 🇵🇭 Philippines
* 🇵🇱 Poland
* 🇵🇹 Portugal
* 🇶🇦 Qatar
* 🇷🇴 Romania
* 🇷🇼 Rwanda
* 🇱🇨 Saint Lucia
* 🇸🇲 San Marino
* 🇸🇦 Saudi Arabia
* 🇸🇳 Senegal
* 🇷🇸 Serbia
* 🇸🇬 Singapore
* 🇸🇰 Slovakia
* 🇸🇮 Slovenia
* 🇿🇦 South Africa
* 🇰🇷 South Korea
* 🇪🇸 Spain
* 🇱🇰 Sri Lanka
* 🇸🇪 Sweden
* 🇨🇭 Switzerland
* 🇹🇼 Taiwan
* 🇹🇿 Tanzania
* 🇹🇭 Thailand
* 🇹🇹 Trinidad and Tobago
* 🇹🇳 Tunisia
* 🇹🇷 Turkey
* 🇦🇪 United Arab Emirates
* 🇬🇧 United Kingdom
* 🇺🇸 United States
* 🇺🇾 Uruguay
* 🇺🇿 Uzbekistan
* 🇻🇳 Vietnam

## Frequently Asked Questions

<AccordionGroup>
  <Accordion title="Can I use Polar in countries (e.g. India) where Stripe is invite-only?">
    <Note>Stripe Connect Express is a different product than the regular Stripe payments.</Note>
    Yes, any individual or company operating in our [supported countries](/merchant-of-record/supported-countries) can receive payouts from Polar even if Stripe standalone is invite-only there.

    This is possible as Polar is the Merchant of Record, all payments from customers are made to Polar (US). [Stripe Connect Express](https://docs.stripe.com/connect/express-accounts) is then used to issue payouts, and is supported in more countries via cross-border transfer than Stripe Payments standalone.

    You might still see a warning in Stripe Connect Express that payments are invite-only, but don't worry. No direct sales are made directly to the Stripe Connect Express account. They're all made to Polar (US) as a platform and the merchant of record. We only use the transfer and payout feature of Stripe Connect Express which is available in all of our [supported countries](/merchant-of-record/supported-countries).
  </Accordion>

  <Accordion title="Can I use Polar as an individual to make sales globally?">
    Yes, given that Stripe Connect Express supports individual as a business type in your region.

    To know which business type is supported in your country, follow steps as below:

    * Open required [verification information](https://docs.stripe.com/connect/required-verification-information#US+RS+express+recipient+individual+transfers) by Stripe to set up a business or personal account in your country.
    * Ensure `Platform Country` is set to `United States (US)`.
    * Ensure `Dashboard Type` is set to `express`.
    * Ensure `Service Agreement` is set to `recipient`.
    * Ensure `Capability` is set to `transfers`.
    * Select the correct `Account Country` relevant to you.
    * Click on the toggle for `Business Type` which will allow you know if individual, business, company or LLC/LLP is supported by Stripe Connect Express in that region.
  </Accordion>
</AccordionGroup>


# Migrate to Polar
Source: https://polar.sh/docs/migrate

Get set up on Polar in minutes from an existing store

## Lemon Squeezy

Ready to make the jump from Lemon Squeezy to Polar? Use the `polar-migrate` CLI tool to quickly and easily migrate your existing Lemon Squeezy products to Polar.

### Getting Started

```bash
npx polar-migrate
```

### Supported Migrations

* Products & Variants
* License Keys
* Associated Files
* Discount Codes
* Customers

This tool is not able to move **active** subscriptions from your Lemon Squeezy store.

### Open Source

The code for the CLI is open source and available on GitHub

[View Code on GitHub](https://github.com/polarsource/polar-migrate)

## Paddle, Stripe, Gumroad or others?

[Reach out to us](mailto:support@polar.sh) and we'd be happy to help.


# Support
Source: https://polar.sh/docs/support



This page outlines Polar's support plans, available channels, and policies. To learn how to access support, please refer to the [Support channels](#support-channels) section. Identify the channels available to you based on your usage and follow the links to navigate to the relevant information.

## Support channels

The support channels you can access differ according to your use of Polar.

| Support channels                                     | Community support | Billing support | Standard support |
| :--------------------------------------------------- | :---------------: | :-------------: | :--------------: |
| [Discord Server](#discord) (not an official channel) |         ✓         |        ✗        |         ✓        |
| [Email](#email)                                      |         -         |        ✓        |         ✓        |

## Email

You can reach us at [support@polar.sh](mailto:support@polar.sh).

## GitHub

* [Found a bug?](https://github.com/polarsource/polar/issues)
* [Have a feature request?](https://github.com/orgs/polarsource/discussions/categories/feature-requests)

## Discord

[Join our Discord](https://dub.sh/polar-discord) to chat with us and fellow Polar developers.

## Etiquette

Regardless of the method or location through which Polar provides Support, communication should be professional and respectful. Any communication that is deemed objectionable by Polar staff is not tolerated. This includes but is not limited to any communication that is abusive or contains profane language. Polar reserves the right to terminate Support Services in the event of any such objectionable communication.

## Customer responsibilities

To ensure efficient resolution of issues, customers are expected to (1) provide detailed information about the issue, (2) cooperate with the Support team during troubleshooting, and (3) utilize available self-service resources for basic inquiries.

## Changes to the support policy

We reserve the right to modify, amend, or update this Support Policy, including the types of support offered, support hours, response times, and support plans, at any time and at our sole discretion. Any changes to the Support Policy will be effective immediately upon posting a revised version of this Support Policy. Continued use of our services after such modifications will constitute acknowledgment and acceptance of the changes.

