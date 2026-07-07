<p align="center">
  <img src="/public/logo-green-o.svg" alt="Golobe Logo" width="160" />
</p>

<h1 align="center">Golobe — Hotel Booking Platform</h1>

<p align="center">
  A full-stack hotel booking web application built with TanStack Start, React 19, Supabase, Clerk, and Stripe.
  <br />
  Users can search for hotels, view detailed listings, book rooms with real-time payments, manage their profile, leave reviews, and save favourites.
</p>

<p align="center">
  <a href="https://golobee.vercel.app/" target="_blank"><strong>🌐 Live Demo</strong></a>
</p>

---

## Features

| Feature                        | Description                                                                                                                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hotel Search & Filtering**   | Search hotels by destination, check-in/check-out dates, rooms, and guests. Filter by price, rating, amenities, freebies, and hotel type (Hotel/Motel/Resort). |
| **Hotel Detail Pages**         | View hotel images, overview, description, tags, amenities, interactive map (Leaflet), available rooms with booking-aware availability, and reviews.           |
| **Room Availability Engine**   | Rooms are filtered by existing bookings to show only available rooms for selected dates. Booked days are blocked in date pickers.                             |
| **Stripe Payment Integration** | Full/split payment modes, Stripe Elements for card payment, saved payment methods, SetupIntents for adding cards, PaymentIntents for bookings.                |
| **Booking System**             | Complete booking lifecycle — create bookings via Stripe webhook, view booking tickets with barcode, download booking as PDF.                                  |
| **User Reviews**               | Authenticated users who have booked a hotel can add/edit reviews with a 5-star rating system. Reviews are paginated and display verified badges.              |
| **Favourites**                 | Toggle-to-favourite hotels (and prepared for flights). View all favourites from the profile, filtered by type.                                                |
| **User Profile Management**    | Edit name, email, phone, address, date of birth. Upload/crop avatar and banner images via Supabase Storage. Manage passwords and payment methods.             |
| **Authentication**             | Full auth flow via Clerk — email/password sign-up with OTP verification, sign-in, forgot/reset password, Google & Apple social OAuth, SSO callback.           |
| **Responsive Design**          | Mobile-first responsive UI with Tailwind CSS v4, custom fonts (Montserrat, Trade Gothic), and shadcn/ui (Radix) components.                                   |
| **Pagination**                 | Server-side pagination for hotels and reviews with page button generation and windowed navigation.                                                            |
| **Sorting**                    | Sort hotels by rating or price (ascending/descending).                                                                                                        |
| **PDF Booking Ticket**         | Generate downloadable PDF booking tickets using `html2canvas-pro` and `jspdf` with barcode support via `next-barcode`.                                        |
| **Webhooks**                   | Clerk webhook syncs user data to Supabase and creates Stripe customers. Stripe webhook auto-creates bookings on successful payment.                           |
| **Error Boundaries**           | Custom `RouteError` and `RouteNotFound` components at every layout level for graceful error handling.                                                         |
| **Toast Notifications**        | Sonner-powered toast notifications across all user-facing actions.                                                                                            |

---

## Tech Stack

### Core Framework

| Technology                                      | Purpose                                                     |
| ----------------------------------------------- | ----------------------------------------------------------- |
| [React 19](https://react.dev/)                  | UI library                                                  |
| [TanStack Start](https://tanstack.com/start)    | Full-stack React framework (SSR, server functions, routing) |
| [TanStack Router](https://tanstack.com/router)  | File-based, type-safe routing with search param validation  |
| [TypeScript 6](https://www.typescriptlang.org/) | Static type checking                                        |
| [Vite 8](https://vitejs.dev/)                   | Build tooling and dev server                                |
| [Nitro](https://nitro.build/)                   | Server engine (Vercel deployment target)                    |

### Backend & Data

| Technology                        | Purpose                                                                |
| --------------------------------- | ---------------------------------------------------------------------- |
| [Supabase](https://supabase.com/) | PostgreSQL database, Row-Level Security, Storage (avatars/banners)     |
| [Clerk](https://clerk.com/)       | Authentication, user management, SSO, webhooks                         |
| [Stripe](https://stripe.com/)     | Payments — PaymentIntents, SetupIntents, customer management, webhooks |

### UI & Styling

| Technology                                            | Purpose                              |
| ----------------------------------------------------- | ------------------------------------ |
| [Tailwind CSS v4](https://tailwindcss.com/)           | Utility-first CSS framework          |
| [shadcn/ui (Radix)](https://ui.shadcn.com/)           | Accessible, composable UI components |
| [Lucide React](https://lucide.dev/)                   | Icon library                         |
| [Sonner](https://sonner.emilkowal.dev/)               | Toast notifications                  |
| [Embla Carousel](https://www.embla-carousel.com/)     | Carousel/slider component            |
| [Vaul](https://vaul.emilkowal.dev/)                   | Drawer component                     |
| [Montserrat](https://fontsource.org/fonts/montserrat) | Primary font                         |
| Trade Gothic LT Std Extended                          | Heading font (custom loaded)         |

### Forms & Validation

| Technology                                                          | Purpose                                                            |
| ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| [React Hook Form](https://react-hook-form.com/)                     | Performant form management                                         |
| [Zod 4](https://zod.dev/)                                           | Schema validation for forms, search params, server function inputs |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Zod integration with React Hook Form                               |

### Utilities

| Technology                                                                                               | Purpose                                               |
| -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| [date-fns](https://date-fns.org/)                                                                        | Date manipulation and formatting                      |
| [React Day Picker](https://react-day-picker.js.org/)                                                     | Date picker calendar component                        |
| [React Leaflet](https://react-leaflet.js.org/) + [Leaflet](https://leafletjs.com/)                       | Interactive maps for hotel locations                  |
| [React Dropzone](https://react-dropzone.js.org/)                                                         | Drag-and-drop file uploads                            |
| [React Avatar Editor](https://github.com/mosch/react-avatar-editor)                                      | Avatar image cropping                                 |
| [html2canvas-pro](https://html2canvas.hertzen.com/) + [jsPDF](https://github.com/parallax/jsPDF)         | PDF ticket generation                                 |
| [next-barcode](https://github.com/nickcoutsos/react-barcode)                                             | Barcode rendering on booking tickets                  |
| [React Responsive](https://github.com/yocontra/react-responsive)                                         | Responsive media queries in JS                        |
| [React Scroll](https://github.com/fisshy/react-scroll)                                                   | Smooth scrolling to sections                          |
| [react-svg-credit-card-payment-icons](https://www.npmjs.com/package/react-svg-credit-card-payment-icons) | Payment card brand icons                              |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge)     | Conditional class merging                             |
| [class-variance-authority](https://cva.style/)                                                           | Component variant management                          |
| [TanStack React Query](https://tanstack.com/query)                                                       | Server-state management and caching                   |
| [Zustand](https://zustand-demo.pmnd.rs/)                                                                 | Client-state management (available, not heavily used) |
| [input-otp](https://input-otp.rodz.dev/)                                                                 | OTP input for email verification                      |

### Dev Tools

| Technology                                      | Purpose                                |
| ----------------------------------------------- | -------------------------------------- |
| [TanStack Devtools](https://tanstack.com/)      | Router & Query devtools                |
| [Vitest](https://vitest.dev/)                   | Unit testing framework                 |
| [Testing Library](https://testing-library.com/) | DOM testing utilities                  |
| [Prettier](https://prettier.io/)                | Code formatting (with Tailwind plugin) |
| [ESLint](https://eslint.org/)                   | Linting                                |

---

## Project Architecture

```
src/
├── components/          # React components organized by feature
│   ├── auth/            # Authentication forms (sign-in, sign-up, forgot password, OTP)
│   ├── booking/         # Booking cards, ticket, checkout sidebar, payment mode
│   ├── common/          # Reusable shared components (inputs, error pages, tab filters)
│   ├── favourites/      # Favourite list, toggle button, type filter
│   ├── home/            # Landing page sections (featured hotels, popular destinations)
│   ├── hotels/          # Hotel listing, detail, filters, reviews, cards
│   ├── layout/          # App shell — Header, Footer, Container, Hero, Logo
│   ├── payment/         # Payment forms, card management, Stripe Elements
│   ├── profile/         # Profile fields, avatar/banner/email/password management
│   ├── skeleton/        # Loading skeleton placeholders
│   └── ui/              # shadcn/ui primitives (Button, Dialog, Calendar, etc.)
├── hooks/               # Custom React hooks
├── lib/                 # Shared logic
│   ├── constants/       # App-wide constants (pagination, URLs, amenity icons)
│   ├── schemas/         # Zod validation schemas
│   ├── stripe/          # Stripe client/server initialization
│   ├── types/           # TypeScript type definitions + auto-generated Supabase types
│   └── utils/           # Utility functions (booking math, filters, formatting)
├── middlewares/         # TanStack Start middleware (auth guard)
├── routes/              # File-based routing (TanStack Router)
│   ├── __root.tsx       # Root layout — ClerkProvider, QueryClient, Toaster, Devtools
│   ├── _auth/           # Auth layout (sign-in, sign-up, forgot-password) — public, redirects if authed
│   ├── _main/           # Main layout with Header/Footer
│   │   ├── index.tsx    # Home page
│   │   ├── hotels/      # Hotel listing + detail + checkout
│   │   └── _protected/  # Authenticated-only routes (bookings, favourites, profile, payment)
│   ├── api/webhooks/    # API routes for Clerk and Stripe webhooks
│   └── sso-callback/    # OAuth SSO redirect handler
├── server/              # Server functions (RPC-style, run server-side only)
│   ├── auth.ts          # Auth status, requireAuth, token retrieval
│   ├── bookings.ts      # CRUD for bookings
│   ├── favourites.ts    # Toggle/list favourites
│   ├── hotels/          # Hotel queries, search, filtering helpers
│   ├── reviews/         # Review CRUD + stats
│   ├── rooms.ts         # Room details
│   ├── stripe.ts        # Stripe PaymentIntent, SetupIntent, card management
│   ├── stripe-core.ts   # Stripe customer creation (shared between webhook + server fn)
│   └── user/            # User CRUD, avatar/banner upload, password, email management
├── router.tsx           # Router instance creation and config
├── start.ts             # TanStack Start entry with Clerk middleware
├── styles.css           # Global CSS (Tailwind, fonts, custom styles)
└── routeTree.gen.ts     # Auto-generated route tree
```

### Architecture Rationale

- **Feature-based component organization**: Components are co-located by domain (hotels, booking, profile) rather than by component type, making features easy to find and maintain.
- **Server functions**: TanStack Start server functions act as an RPC layer, co-locating server logic with the client code that consumes it — no separate API routes needed for most operations.
- **Middleware-protected server functions**: The `authFnMiddleware` ensures all mutation server functions verify authentication before executing, providing a consistent security boundary.
- **Zod schemas as contracts**: Every form, search parameter, and server function input uses Zod for runtime validation, serving as a single source of truth across client and server.
- **Supabase generated types**: The `supabase.ts` types file is auto-generated from the database schema, ensuring type safety between the application and database.

---

## Application Flow

### Authentication Flow

1. **New User**: Visits `/sign-up` → fills form (first name, last name, email, phone, password) → Clerk creates user → email OTP verification via `SignUpVerifyForm` → redirected to home.
2. **Existing User**: Visits `/sign-in` → email + password → authenticated → redirected to home.
3. **Social OAuth**: Clicks Google/Apple button → redirected to provider → callback handled at `/sso-callback` → auto-creates account or signs in → redirected to home.
4. **Forgot Password**: `/forgot-password` → enters email → Clerk sends reset code → enters OTP → sets new password → redirected to sign-in.
5. **Already Authenticated**: Visiting `/sign-in` or `/sign-up` auto-redirects to `/` via `beforeLoad` guard on `_auth` layout.
6. **Webhook Sync**: On `user.created`, Clerk webhook at `/api/webhooks/clerk/` creates a user record in Supabase `users` table and a Stripe customer. On `user.updated`/`user.deleted`, the Supabase record is updated/soft-deleted.

### Hotel Search Flow

1. User enters destination, check-in/check-out dates, rooms, and guests in the `HotelSearchWidget` on the home page.
2. Form is validated by `hotelSearchWidgetSchema` (Zod), then navigated to `/hotels?destination=...&checkIn=...&checkOut=...` with URL search params.
3. `/hotels` route validates search params with `filterSearchParamsSchema`, redirects to `/` if no destination is provided.
4. `getHotels` server function builds a Supabase query: filters by destination (multi-term ilike), star rating, price range, then applies in-memory filters for amenities, freebies, room availability, and room/guest counts.
5. Hotels are sorted (rating or price), type-counted (hotel/motel/resort), and paginated (4 per page).
6. Results render with `HotelCard` components showing cover image, name, rating, price, and a favourite toggle button.
7. Sidebar filters (price slider, rating checkboxes, amenities, freebies) update URL search params, triggering a new server function call.

### Booking Flow

1. User clicks "Book Now" on a room from the hotel detail page → navigated to `/hotels/$hotelId/checkout/$roomId/`.
2. Checkout page loads room data via `getRoom` server function, calculates pricing via `calculateBookingPrice` (base fare × nights + taxes + service fee).
3. User selects payment mode (Full or Split — pay 50% now) via `PaymentMode` component.
4. **If signed in**: User selects a saved card or adds a new one. `createPaymentIntent` server function creates a Stripe PaymentIntent with booking metadata.
5. **If signed out**: A `CheckoutLoginSection` prompts the user to sign in.
6. On payment confirmation, Stripe redirects to `/payment/pending/?payment_intent=...`.
7. Pending page polls `checkBookingExist` every second (up to 15 attempts). Meanwhile, Stripe sends a `payment_intent.succeeded` webhook to `/api/webhooks/stripe/`, which calls `insertBookingIntoDB` with the formatted booking data.
8. Once the booking is found, user is redirected to `/bookings/$bookingId/` to view their booking ticket.

### Review Flow

1. On hotel detail page, reviews are loaded via `getReviews` with pagination (10 per page).
2. `ReviewsSection` displays review stats (total count, verified count), the user's own review (if any), and paginated review cards.
3. **Add Review**: Authenticated users with a booking at this hotel can add a review via `AddReviewForm` (rating + 20-500 char text body). The form uses `reviewFormSchema` for validation. Submitted via `createReview` server function which inserts into `reviews` table.
4. **Edit Review**: Users can edit their existing review via `EditReviewForm`, submitted via `updateReview` server function.
5. Reviews linked to a booking are marked as `is_verified`.

### User Profile Flow

1. `/profile` redirects to `/profile/account` automatically.
2. **Account tab**: Edit name, phone number, address, date of birth — each field uses `EditableProfileField` with inline editing, Zod validation, and saves to Clerk `unsafeMetadata`. Email management allows viewing and removing linked emails. Password management supports change/set password with current password verification.
3. **Payment Methods tab**: Lists saved Stripe cards via `getCards`, allows adding new cards via Stripe `SetupIntent` and deleting cards via `deletePaymentMethod`.
4. **Tickets/Bookings tab**: Lists all user bookings via `getUserBookings` with `Await` for streaming, filtered by type (stays/flights). Each booking card links to the detail page.
5. **Avatar/Banner**: Upload via drag-and-drop (`useSupabaseUpload` hook), crop with `react-avatar-editor`, saved to Supabase Storage, metadata synced to Clerk `publicMetadata`.

### Favourites Flow

1. On hotel cards and listing pages, a heart icon (`ToggleFavorite`) allows toggling favourites.
2. `toggleUserFavourites` server function checks if a favourite exists for the user+hotel pair: if yes → deletes it; if no → inserts it.
3. `/favourites` page lists all user favourites, fetched via `getUserFavourites` with React Query, filtered by type (hotel/flight) via tabs.

---

## Feature Breakdown

### Hotel Search & Filtering

- **Purpose**: Allow users to find hotels matching their travel criteria.
- **Files**: `routes/_main/hotels/index.tsx`, `server/hotels/hotels.ts`, `server/hotels/hotels.helpers.ts`, `components/hotels/Filters/*`, `lib/utils/filters/*`, `lib/schemas/search.ts`
- **Database**: `hotels`, `rooms`, `amenities`, `hotel_amenity_map`, `hotel_images`, `bookings`
- **Validation**: `filterSearchParamsSchema` validates all URL search parameters with defaults and coercion.
- **Filters**: Destination (multi-term ilike search), price range, star rating, amenities, freebies, date-based room availability, room/guest capacity.
- **Edge Cases**: Empty destination redirects to home. Price sorting is done in-memory after filtering. Pagination is bounded with `safePage`.

### Hotel Detail

- **Purpose**: Comprehensive hotel information page with booking capability.
- **Files**: `routes/_main/hotels/$hotelId/index.tsx`, `components/hotels/detail/*`, `components/hotels/Reviews/*`
- **Server Functions**: `getHotel`, `getReviewStats`, `getMyAddedReviewsServer`, `getReviews`
- **Sections**: Breadcrumb, header (name, rating, share, favourite), image gallery with "view all" dialog, overview + tags, available rooms widget, interactive Leaflet map, amenities grid, reviews with pagination.
- **Edge Cases**: Redirects to hotel listing if hotel not found. Conditionally hides sections (overview, map, amenities) if data is empty.

### Payment & Checkout

- **Purpose**: Secure payment processing for hotel room bookings.
- **Files**: `routes/_main/hotels/$hotelId/checkout/$roomId/index.tsx`, `components/payment/*`, `components/booking/*`, `server/stripe.ts`, `server/stripe-core.ts`, `lib/stripe/*`
- **Server Functions**: `createPaymentIntent`, `createSetupIntent`, `getOrCreateStripeCustomer`, `getCards`, `deletePaymentMethod`
- **Payment Modes**: Full payment or split payment (50% now, 50% later).
- **Saved Cards**: Users can select from previously saved cards or add new ones via Stripe Elements.
- **Context**: `CheckoutConfirmProvider` manages the checkout confirmation flow across components.

### Booking Management

- **Purpose**: View and track booking history and details.
- **Files**: `routes/_main/_protected/bookings/$bookingId/index.tsx`, `routes/_main/_protected/profile/tickets-bookings/index.tsx`, `components/booking/*`, `server/bookings.ts`
- **Server Functions**: `getUserBookings`, `getBooking`, `createBooking`, `checkBookingExist`
- **Features**: Booking summary cards, detailed booking ticket with barcode, PDF download, terms & conditions display.

### User Profile

- **Purpose**: Complete account management hub.
- **Files**: `routes/_main/_protected/profile/*`, `components/profile/*`, `server/user/*`
- **Sub-features**: Inline field editing, email management (remove linked emails), password management (verify + change), avatar upload/crop/delete, banner upload/crop/delete, payment method management.

---

## Database

### Tables

| Table               | Purpose                                                                                                                                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `users`             | Core user records synced from Clerk via webhook. Fields: `id`, `full_name`, `email`, `phone`, `avatar_url`, `is_active`. Soft-delete via `is_active` flag.                                                                                                                                                                           |
| `hotels`            | Hotel listings with `name`, `city`, `country`, `address`, `description`, `hotel_type` (hotel/motel/resort), `star_rating`, `avg_rating`, `review_count`, `tax_rate`, `latitude/longitude`, `logo_url`, `slug`, `is_active`.                                                                                                          |
| `rooms`             | Hotel rooms with `name`, `price_per_night`, `max_guests`, `bed_type`, `view_type`, `description`, `image_url`, `is_available`. FK → `hotels`.                                                                                                                                                                                        |
| `bookings`          | Completed bookings with `user_id`, `hotel_id`, `room_id`, check-in/out dates, `guests`, pricing fields (`base_fare`, `discount`, `taxes`, `service_fee`, `paid_amount`, `remaining_amount`, `total`), `payment_intent_id`, `payment_mode`, `payment_status`, `status`, `booking_ref`, `promo_code`. FK → `hotels`, `rooms`, `users`. |
| `reviews`           | User reviews with `rating`, `body`, `hotel_id`, `user_id`, `booking_id`, `is_verified`. FK → `hotels`, `bookings`, `users`.                                                                                                                                                                                                          |
| `favourites`        | Saved items with `user_id`, `hotel_id` (nullable), `flight_id` (nullable), `item_type` (hotel/flight). FK → `hotels`, `flights`, `users`.                                                                                                                                                                                            |
| `amenities`         | Lookup table for amenities with `name`, `category`, `icon_key`.                                                                                                                                                                                                                                                                      |
| `hotel_amenity_map` | Many-to-many join table between `hotels` and `amenities`.                                                                                                                                                                                                                                                                            |
| `hotel_images`      | Hotel photos with `url`, `alt_text`, `is_cover`, `display_order`. FK → `hotels`.                                                                                                                                                                                                                                                     |
| `hotel_tags`        | Hotel tags (features/highlights) with `tag`, `icon_key`. FK → `hotels`.                                                                                                                                                                                                                                                              |
| `destinations`      | Destination metadata with `city`, `country`, `image_url`, `starting_price`, `tagline`, `category`.                                                                                                                                                                                                                                   |
| `flights`           | Flight listings (schema exists, not fully implemented in UI).                                                                                                                                                                                                                                                                        |
| `recent_searches`   | User search history with `destination`, `city`, `country`, `image_url`, `place_count`. FK → `users`.                                                                                                                                                                                                                                 |

### Views

| View                   | Purpose                                                                                                |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `hotel_filter_options` | Aggregated filter options: max price, amenities list, freebies list. Used to populate sidebar filters. |
| `popular_destinations` | Aggregated view with `city`, `country`, `avg_rating`, `image`, `stays` count. Used on the home page.   |
| `user_profiles`        | Public-safe view exposing only `id`, `full_name`, `avatar_url`. Used for review author display.        |

### Database Functions

| Function               | Purpose                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------- |
| `generate_booking_ref` | Auto-generates unique booking reference codes.                                              |
| `search_hotels`        | Server-side hotel search with parameters (destination, dates, guests, price range, rating). |
| `toggle_favourite`     | Atomic toggle for favourite items.                                                          |

### Key Relationships

```
users ──< bookings >── hotels
users ──< reviews >── hotels
users ──< favourites >── hotels
hotels ──< rooms
hotels ──< hotel_images
hotels ──< hotel_tags
hotels ──<< hotel_amenity_map >>── amenities
reviews >── bookings
```

---

## Routing

### Layout Routes (Pathless)

| Route                      | Purpose                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `__root`                   | Root shell — HTML document, `ClerkProvider`, `QueryClientProvider`, `Toaster`, devtools.        |
| `_auth`                    | Auth layout (logo + image sidebar). Guards: redirects to `/` if already authenticated.          |
| `_main`                    | Main app layout with `Header` and `Footer`.                                                     |
| `_main/_protected`         | Protected wrapper. Guards: calls `requireAuth()`, redirects to `/sign-in` if not authenticated. |
| `_main/_protected/profile` | Profile layout with banner, header, and tab navigation.                                         |

### Public Routes

| Path                                | Component       | Description                                                                             |
| ----------------------------------- | --------------- | --------------------------------------------------------------------------------------- |
| `/`                                 | Home            | Landing page with search widget, popular destinations, featured hotels, why-us section. |
| `/hotels`                           | Hotels Listing  | Search results with filters, pagination, sorting. Requires `destination` param.         |
| `/hotels/$hotelId`                  | Hotel Detail    | Full hotel page with rooms, reviews, map, amenities.                                    |
| `/hotels/$hotelId/checkout/$roomId` | Checkout        | Room checkout with payment. Shows login prompt if unauthenticated.                      |
| `/sign-in`                          | Sign In         | Email/password + social auth login.                                                     |
| `/sign-up`                          | Sign Up         | Registration with OTP verification.                                                     |
| `/forgot-password`                  | Forgot Password | Email-based password reset flow.                                                        |
| `/sso-callback`                     | SSO Callback    | OAuth redirect handler with loading animation.                                          |

### Protected Routes (Require Authentication)

| Path                        | Component          | Description                                                    |
| --------------------------- | ------------------ | -------------------------------------------------------------- |
| `/bookings/$bookingId`      | Booking Detail     | Booking ticket view with barcode and PDF download.             |
| `/favourites`               | Favourites         | User's saved hotels/flights list with type filter tabs.        |
| `/profile/account`          | Account Settings   | Edit name, email, phone, address, DOB, password.               |
| `/profile/payment-methods`  | Payment Methods    | View/add/delete saved Stripe cards.                            |
| `/profile/tickets-bookings` | Tickets & Bookings | All user bookings with summary cards.                          |
| `/payment/pending`          | Payment Pending    | Post-payment polling page that waits for webhook confirmation. |

### API Routes

| Path                   | Method | Description                                                                    |
| ---------------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/webhooks/clerk`  | POST   | Clerk webhook — handles `user.created`, `user.updated`, `user.deleted` events. |
| `/api/webhooks/stripe` | POST   | Stripe webhook — handles `payment_intent.succeeded` event to create bookings.  |

### Redirect Routes

| Path                        | Redirects To       |
| --------------------------- | ------------------ |
| `/profile`                  | `/profile/account` |
| `/payment`                  | `/`                |
| `/hotels/$hotelId/checkout` | `/hotels/$hotelId` |

---

## State Management

### Server State (TanStack Router Loaders)

Most data is fetched via TanStack Router `loader` functions that call server functions. Data is available synchronously in components via `Route.useLoaderData()`. Deferred data uses `Await` with `Promise` for streaming.

**Examples**:

- Home page: `getPopularDestinations` and `getFeaturedHotels` are fired as promises, rendered with `Await`.
- Hotels listing: `getHotels` is deferred, sidebar filter options are awaited immediately.
- Hotel detail: `getHotel`, `getReviewStats`, `getMyAddedReviewsServer` are awaited; `getReviews` is deferred.

### Client State (React Query)

- `useFavouriteHotels` hook uses `useQuery` with `["favourites", "hotel"]` key to cache the user's favourite hotel IDs. This enables the favourite toggle to work across multiple hotel cards without re-fetching.

### Local State

- Payment method selection: `useState` in checkout page.
- Payment mode: URL search param (`paymentMode`).
- Form states: Managed by React Hook Form.
- File uploads: `useSupabaseUpload` hook manages files, loading, errors, and success state.

### URL State

Search parameters serve as the primary state for filtering and pagination:

- Hotel filters: `destination`, `checkIn`, `checkOut`, `rooms`, `guests`, `minPrice`, `maxPrice`, `rating`, `freebies[]`, `amenities[]`, `hotelType`, `sortBy`, `hotel_page`
- Review pagination: `reviews_page`
- Favourite type: `favType`
- Booking type: `bookingType`

### Caching

- Router: `defaultPreload: "intent"` and `defaultPreloadStaleTime: 0` enable eager preloading on link hover.
- Scroll restoration is enabled globally.

---

## Forms

### Sign Up Form

- **File**: `components/auth/SignUpForm.tsx`
- **Schema**: `signUpSchema` — first name, last name, email, phone, password (min 8), confirm password, terms checkbox.
- **Validation**: Zod refine ensures passwords match.
- **Submission**: Clerk `signUp.create()` → email OTP verification step.

### Sign In Form

- **File**: `components/auth/SignInForm.tsx`
- **Schema**: `signInSchema` — email, password (min 8), remember me.
- **Submission**: Clerk `signIn.create()` → `setActive()`.

### Forgot Password Form

- **File**: `components/auth/ForgotPasswordForm.tsx`
- **Schema**: `forgotPasswordSchema` — email.
- **Flow**: Sends email via Clerk → OTP input → `ResetPasswordForm` (new password + confirm) → password reset.

### Hotel Search Widget

- **File**: `components/hotels/HotelSearchWidget.tsx`, `components/hotels/Filters/HotelSearchBar.tsx`
- **Schema**: `hotelSearchWidgetSchema` — destination (min 1 char, alphanumeric), checkIn/Out dates, rooms, guests.
- **Submission**: Navigates to `/hotels` with search params.

### Review Forms

- **Files**: `components/hotels/Reviews/AddReviewForm.tsx`, `EditReviewForm.tsx`
- **Schema**: `reviewFormSchema` — rating (0-5), review body (20-500 chars, trimmed).
- **Submission**: `createReview` / `updateReview` server functions → reloads router.

### Profile Fields

- **File**: `components/profile/EditableProfileField.tsx`
- **Schemas**: `nameSchema`, `phoneSchema`, `addressSchema`, `dateOfBirthSchema`
- **Submission**: Updates Clerk `unsafeMetadata` inline.

### Add Card Form

- **File**: `components/payment/AddCardForm.tsx`
- **Flow**: `createSetupIntent` → Stripe `CardElement` → `confirmCardSetup`.

---

## Reusable Components

| Component            | Purpose                                                                                 |
| -------------------- | --------------------------------------------------------------------------------------- |
| `Container`          | Consistent page padding/max-width wrapper.                                              |
| `TabFilter`          | Generic tab navigation that maps values to labels and reports selection changes.        |
| `SortBy`             | Reusable sort dropdown using `Select` primitive.                                        |
| `InputField`         | Form-connected text input with label, error display, and `react-hook-form` integration. |
| `DateField`          | Calendar-based date picker with popover, booked-day disabling, and form integration.    |
| `StarsRating`        | Interactive star rating component (click to rate or display-only).                      |
| `ShareButton`        | Web Share API integration with clipboard fallback.                                      |
| `DashedBorder`       | SVG-based dashed border for decorative separators (booking ticket).                     |
| `DropZone`           | File upload dropzone with preview, validation errors, and upload button.                |
| `RouteError`         | Error boundary component with retry capability and friendly error display.              |
| `RouteNotFound`      | 404 page with navigation back to home.                                                  |
| `HotelCard`          | Hotel listing card with cover image, details, pricing, and favourite toggle.            |
| `BookingSummaryCard` | Compact booking card with hotel info, dates, and status.                                |
| `ToggleFavorite`     | Heart icon button that toggles favourites via server function.                          |

---

## Custom Hooks

### `useSupabaseUpload`

- **File**: `hooks/use-supabase-upload.ts`
- **Purpose**: Manages file uploads to Supabase Storage with drag-and-drop support.
- **Config**: `bucketName`, `path`, `allowedMimeTypes`, `maxFileSize`, `maxFiles`, `cacheControl`, `upsert`, `fixedFileName`.
- **Returns**: `files`, `setFiles`, `loading`, `errors`, `successes`, `isSuccess`, `onUpload`, plus all `useDropzone` props.
- **Features**: Retry failed uploads, partial success tracking, file preview URLs, max file validation.

### `useBookingDates`

- **File**: `hooks/useBookingDates.ts`
- **Purpose**: Manages check-in/check-out date logic for booking forms. Auto-adjusts check-out to be at least 1 day after check-in.
- **Returns**: `checkInDate`, `checkOutDate`, `totalNights`.

### `useCards`

- **File**: `hooks/useCards.ts`
- **Purpose**: Fetches the user's saved Stripe payment cards on mount.
- **Returns**: `cards`, `loading`.

### `useFavouriteHotels`

- **File**: `hooks/useFavouriteHotels.ts`
- **Purpose**: Fetches user's favourite hotels via React Query and provides a `Set` of favourite hotel IDs for fast lookup.
- **Returns**: `favouriteHotels`, `favouriteIds`, plus React Query state.

### `useSyncDatesToURL`

- **File**: `hooks/useSyncDatesToURL.ts`
- **Purpose**: Synchronizes check-in/check-out dates from form state to URL search params on the checkout page.
- **Behavior**: Uses `navigate` with `replace: true` and `resetScroll: false` to update without adding history entries.

---

## Utilities

### Booking Utilities (`lib/utils/booking.ts`)

| Function                | Purpose                                                                                                                |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `isBookedDay`           | Checks if a specific day falls within any existing booking's date range. Used to disable booked dates in the calendar. |
| `calculateBookingPrice` | Computes pricing breakdown: base fare, taxes, service fee ($10), total, split amount, and amount to pay.               |
| `formatBookingData`     | Converts Stripe PaymentIntent metadata into a `BookingToInsert` object for database insertion.                         |
| `hasBookedDayInRange`   | Checks if any day within a date range has existing bookings.                                                           |

### Hotel Utilities (`lib/utils/hotel.ts`)

| Function             | Purpose                                                                         |
| -------------------- | ------------------------------------------------------------------------------- |
| `getCoverImageUrl`   | Extracts the cover image URL from a hotel's images array, with fallback.        |
| `getMinRoomPrice`    | Finds the cheapest room price for display on listing cards.                     |
| `getTypePlacesCount` | Counts hotels by type (hotel/motel/resort) for tab filter badges.               |
| `getRatingLabel`     | Converts numeric rating to human-readable label (Exceptional, Excellent, etc.). |

### Search Utilities (`lib/utils/search.ts`)

| Function                       | Purpose                                                                 |
| ------------------------------ | ----------------------------------------------------------------------- |
| `sanitizeString`               | Removes special characters from search input for safe database queries. |
| `mapSearchParamsToHotelWidget` | Converts URL search params to form-compatible data.                     |
| `mapHotelWidgetToSearchParams` | Converts form data to URL search params.                                |

### Filter Utilities (`lib/utils/filters/`)

| Function                 | Purpose                                                                           |
| ------------------------ | --------------------------------------------------------------------------------- |
| `filterByAmenities`      | Filters hotels by selected amenity names (checks `hotel_amenity_map`).            |
| `filterByFreebies`       | Filters hotels by freebie amenities (parking, breakfast, etc.).                   |
| `filterByAvailableRooms` | Filters hotels to only include those with rooms available for the selected dates. |
| `filterByRoomsGuests`    | Filters hotels by minimum room count and guest capacity.                          |
| `filterByPrice`          | Filters hotels by price range.                                                    |

### Pagination Utilities (`lib/utils/pagination.ts`)

| Function              | Purpose                                                                            |
| --------------------- | ---------------------------------------------------------------------------------- |
| `getPaginationRange`  | Calculates `from`, `to`, and `totalPages` for a given page/perPage/totalItems.     |
| `generatePageButtons` | Creates an array of page numbers with ellipsis ("...") for windowed pagination UI. |

### User Utilities (`lib/utils/user.ts`)

| Function               | Purpose                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `getFullName`          | Resolves user's display name from Clerk metadata, falling back to firstName/lastName.                                      |
| `formatUserName`       | Formats "First L." style abbreviated name.                                                                                 |
| `getFormattedUser`     | Extracts and normalizes all user display fields (name, email, avatar, banner, phone, address, DOB) from Clerk user object. |
| `getFormattedUserJson` | Same as above but for Clerk webhook JSON payload.                                                                          |

---

## Performance Optimizations

| Optimization                | Implementation                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Streaming with `Await`**  | Hotel listings, reviews, bookings, and payment methods use deferred promises with `Await` for non-blocking SSR. The UI renders skeleton placeholders while data streams in. |
| **Skeleton Loading States** | 11 dedicated skeleton components provide instant visual feedback during data loading.                                                                                       |
| **Suspense Boundaries**     | React Suspense wraps deferred data sections (favourites, bookings) for granular loading states.                                                                             |
| **Preloading**              | `defaultPreload: "intent"` preloads route data when users hover over links.                                                                                                 |
| **Scroll Restoration**      | `scrollRestoration: true` preserves scroll position across navigations.                                                                                                     |
| **Parallel Data Loading**   | `Promise.all` is used to fetch independent data in parallel (e.g., hotel + reviews + user review on detail page).                                                           |
| **Server-Side Pagination**  | Hotels (4 per page) and reviews (10 per page) are paginated server-side to minimize data transfer.                                                                          |
| **URL-Based State**         | Filter state is stored in URL search params, avoiding unnecessary client-side state management and enabling shareable filtered views.                                       |
| **Image Optimization**      | WebP format for static images, `loading="eager"` for critical images, Supabase CDN with `cacheControl` for uploaded assets.                                                 |
| **Font Optimization**       | `font-display: swap` on custom fonts, variable Montserrat font for reduced file size.                                                                                       |
| **Memoization**             | `useCallback` and `useMemo` used in hooks (e.g., `useSupabaseUpload`) to prevent unnecessary re-renders.                                                                    |

---

## Security

### Authentication (Clerk)

- Clerk middleware is registered at the application level in `start.ts`, processing every request.
- `ClerkProvider` wraps the entire app, providing auth context to all components.
- The `_auth` layout redirects authenticated users away from login pages.
- The `_protected` layout calls `requireAuth()` server function in `beforeLoad`, redirecting unauthenticated users to `/sign-in`.

### Authorization (Server Functions)

- All mutating server functions use `authFnMiddleware`, which:
  1. Calls Clerk's `auth()` to verify the session.
  2. Throws a redirect to `/sign-in` if not authenticated.
  3. Passes the verified `userId` into the handler's context.
- Read-only server functions like `getHotels` are publicly accessible (no auth required).
- User-specific queries (bookings, favourites) always filter by the authenticated `userId` from the middleware context — users cannot access other users' data.

### Input Validation

- Every server function input is validated with Zod schemas via `inputValidator()`.
- Search params are validated at the route level via `validateSearch`.
- Forms use Zod resolvers with React Hook Form for client-side validation before submission.
- The `sanitizeString` utility strips special characters from search queries to prevent injection.

### Webhook Security

- **Clerk**: Uses `verifyWebhook()` from `@clerk/backend/webhooks` to verify webhook signatures.
- **Stripe**: Verifies webhook signatures via `stripe.webhooks.constructEvent()` with the `STRIPE_WEBHOOK_SECRET`.
- Both webhooks return appropriate HTTP error codes on verification failure.

### Data Protection

- Supabase RLS (Row-Level Security) is enabled — the client-side Supabase client uses Clerk JWTs via `getTokenServer()` for authenticated access.
- Service-role Supabase client (`createServiceSupabaseClient`) is used only in webhook handlers and user creation where RLS bypass is needed.
- Stripe customer IDs are stored in Clerk `privateMetadata`, inaccessible to the client.
- User soft-deletion: `deleteUserDB` sets `is_active: false` rather than hard-deleting records, preserving data integrity.

### Environment Variables

All sensitive keys are server-only (`process.env`). Only `VITE_` prefixed variables (Supabase URL/key, Stripe publishable key) are exposed to the client.

---

## Error Handling

| Layer                       | Strategy                                                                                                                                                        |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Route Error Boundaries**  | Custom `RouteError` component at `__root`, `_main`, `_protected`, and `profile` layouts. Displays error message with a "Try Again" button that calls `reset()`. |
| **Route Not Found**         | Custom `RouteNotFound` component at every layout level with a "Back to Home" link.                                                                              |
| **Server Functions**        | All database queries check for Supabase errors and throw `new Error(error.message)`. Stripe operations use try/catch blocks and return error objects.           |
| **Form Validation**         | Zod schemas provide user-friendly error messages. React Hook Form displays errors inline below fields.                                                          |
| **Toast Notifications**     | `sonner` toasts display success/error messages for user actions (login, favourite toggle, review submission, payment errors).                                   |
| **Payment Pending Timeout** | The payment pending page times out after 15 polling attempts and displays an error toast, redirecting to home.                                                  |
| **Webhook Errors**          | Both webhooks catch and log errors, returning appropriate HTTP status codes (400 for verification failures, 200 for success).                                   |
| **Avatar/Banner Deletion**  | Gracefully handles "Object not found" errors when deleting images that don't exist.                                                                             |

---

## Future Improvements

Based on the current architecture, the following are realistic improvements:

1. **Flight Booking**: The database schema (`flights` table), favourites system (`flight_id` column), and UI tabs (Flights tab on favourites/bookings) are already scaffolded. Implementing the full flight booking flow would complete this feature.
2. **Recent Searches**: The `recent_searches` table exists in the database. Implementing a "Recent Searches" dropdown in the search widget would leverage this.
3. **Booking Cancellation**: Add a cancellation flow with status updates (`cancelled` status exists in the schema) and potential refund processing via Stripe.
4. **Promo Codes**: The `promo_code` field exists on bookings and the `discount` field is tracked. Implementing a promo code input on checkout would complete this feature.
5. **Optimistic Updates for Favourites**: Use React Query's `useMutation` with optimistic updates for instant favourite toggling without waiting for server response.
6. **Image Gallery Optimization**: Implement lazy loading for hotel image galleries and consider a lightbox component for full-screen viewing.
7. **Search Debouncing**: Add debounce to the destination search autocomplete to reduce server calls.
8. **Booking Calendar Visualization**: Show a mini-calendar on the hotel detail page displaying booked vs. available dates at a glance.
9. **Email Notifications**: Send booking confirmation emails via Clerk or a dedicated email service triggered from the Stripe webhook.
10. **Review Moderation**: Add an admin dashboard for review moderation, leveraging the existing `is_verified` field.

---

## Development Setup

### Prerequisites

- **Node.js** ≥ 18
- **npm** (or pnpm)
- A [Supabase](https://supabase.com/) project
- A [Clerk](https://clerk.com/) application
- A [Stripe](https://stripe.com/) account

### Installation

```bash
git clone https://github.com/Aser-Essa/golobe.git
cd golobe
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Clerk
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_signing_secret

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_signing_secret
```

### Running Locally

```bash
npm run dev
```

The app starts at `http://localhost:3000`.

### Building for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Running Tests

```bash
npm test
```

### Code Quality

```bash
# Check formatting
npm run format

# Lint
npm run lint

# Fix all (format + lint)
npm run check
```

---

## Folder Tree

```
golobe/
├── public/                          # Static assets (images, fonts, icons)
├── src/
│   ├── components/
│   │   ├── auth/
│   │   │   ├── CheckoutLoginSection.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   ├── ForgotPasswordVerifyCodeForm.tsx
│   │   │   ├── ResetPasswordForm.tsx
│   │   │   ├── SignInForm.tsx
│   │   │   ├── SignUpForm.tsx
│   │   │   ├── SignUpVerifyForm.tsx
│   │   │   ├── SocialAuthButton.tsx
│   │   │   ├── SocialAuthButtons.tsx
│   │   │   └── VerifyForm.tsx
│   │   ├── booking/
│   │   │   ├── BookingHeader.tsx
│   │   │   ├── BookingSummaryCard.tsx
│   │   │   ├── BookingSummaryCards.tsx
│   │   │   ├── BookingTicket/
│   │   │   ├── CheckoutSummarySidebar.tsx
│   │   │   ├── HotelLogo.tsx
│   │   │   ├── PaymentMode.tsx
│   │   │   ├── RoomSummaryCard.tsx
│   │   │   └── TermsAndConditions/
│   │   ├── common/
│   │   │   ├── DashedBorder.tsx
│   │   │   ├── DateField.tsx
│   │   │   ├── DropZone.tsx
│   │   │   ├── InputField.tsx
│   │   │   ├── RouteError.tsx
│   │   │   ├── RouteNotFound.tsx
│   │   │   ├── ShareButton.tsx
│   │   │   ├── SortBy.tsx
│   │   │   ├── StarsRating.tsx
│   │   │   └── TabFilter.tsx
│   │   ├── favourites/
│   │   │   ├── FavouriteList.tsx
│   │   │   ├── FavouriteTypeFilter.tsx
│   │   │   └── ToggleFavorite.tsx
│   │   ├── home/
│   │   │   ├── FeaturedHotels.tsx
│   │   │   ├── PopularDestinationCard.tsx
│   │   │   ├── PopularDestinations.tsx
│   │   │   └── WhyUs.tsx
│   │   ├── hotels/
│   │   │   ├── Filters/
│   │   │   │   ├── AmenitiesFilter.tsx
│   │   │   │   ├── CheckboxFilter.tsx
│   │   │   │   ├── DestinationSearch.tsx
│   │   │   │   ├── FilterAvailableRoomsWidget.tsx
│   │   │   │   ├── FilterSidebarSheet.tsx
│   │   │   │   ├── FreebiesFilter.tsx
│   │   │   │   ├── HotelFilterSidebar.tsx
│   │   │   │   ├── HotelSearchBar.tsx
│   │   │   │   ├── HotelTypeFilter.tsx
│   │   │   │   ├── PriceFilter.tsx
│   │   │   │   ├── RateFilter.tsx
│   │   │   │   └── RoomGuestFilter.tsx
│   │   │   ├── Reviews/
│   │   │   │   ├── AddReview.tsx
│   │   │   │   ├── AddReviewForm.tsx
│   │   │   │   ├── EditReview.tsx
│   │   │   │   ├── EditReviewForm.tsx
│   │   │   │   ├── ManageReviews.tsx
│   │   │   │   ├── NoReviews.tsx
│   │   │   │   ├── ReviewCard.tsx
│   │   │   │   ├── ReviewRating.tsx
│   │   │   │   ├── ReviewsList.tsx
│   │   │   │   ├── ReviewsPagination.tsx
│   │   │   │   └── ReviewsSection.tsx
│   │   │   ├── card/
│   │   │   │   ├── HotelCard.tsx
│   │   │   │   ├── HotelCardDetails.tsx
│   │   │   │   ├── HotelCardSkeleton.tsx
│   │   │   │   ├── HotelCoverImage.tsx
│   │   │   │   └── HotelPrice.tsx
│   │   │   ├── detail/
│   │   │   │   ├── Amenities.tsx
│   │   │   │   ├── AmenityItem.tsx
│   │   │   │   ├── AvailableRooms.tsx
│   │   │   │   ├── HotelBreadCrumb.tsx
│   │   │   │   ├── HotelHeader.tsx
│   │   │   │   ├── HotelImages.tsx
│   │   │   │   ├── HotelOverView.tsx
│   │   │   │   ├── LeafletMap.tsx
│   │   │   │   ├── MapAndLocation.tsx
│   │   │   │   ├── NoRoomsAvailable.tsx
│   │   │   │   ├── RatingSummary.tsx
│   │   │   │   ├── ViewAllImages.tsx
│   │   │   │   └── ViewRoomDetails.tsx
│   │   │   ├── HotelPagination.tsx
│   │   │   ├── HotelSearchWidget.tsx
│   │   │   ├── HotelSortBy.tsx
│   │   │   ├── HotelsEmptyState.tsx
│   │   │   ├── HotelsList.tsx
│   │   │   ├── PaginationResultsSummary.tsx
│   │   │   └── ViewPlaceButton.tsx
│   │   ├── layout/
│   │   │   ├── Container.tsx
│   │   │   ├── Footer/
│   │   │   ├── Header/
│   │   │   ├── Herosection.tsx
│   │   │   └── Logo.tsx
│   │   ├── payment/
│   │   │   ├── AddCardDialog.tsx
│   │   │   ├── AddCardElementsProvider.tsx
│   │   │   ├── AddCardForm.tsx
│   │   │   ├── AddCardRowButton.tsx
│   │   │   ├── AddCardSquareButton.tsx
│   │   │   ├── Checkout.tsx
│   │   │   ├── DeletePaymentMethod.tsx
│   │   │   ├── OtherPaymentMethodFields.tsx
│   │   │   ├── OtherPaymentMethods.tsx
│   │   │   ├── PaymentCards.tsx
│   │   │   ├── SelectPaymentCard.tsx
│   │   │   ├── SelectPaymentMethods.tsx
│   │   │   ├── UserPaymentMethod.tsx
│   │   │   ├── UserPaymentMethodsList.tsx
│   │   │   └── context/
│   │   ├── profile/
│   │   │   ├── EditableDateOfBirth.tsx
│   │   │   ├── EditableProfileField.tsx
│   │   │   ├── ProfileFieldSkeleton.tsx
│   │   │   ├── ProfileHeader.tsx
│   │   │   ├── ProfileHeaderSkeleton.tsx
│   │   │   ├── avatar-management/
│   │   │   ├── banner-management/
│   │   │   ├── email-management/
│   │   │   ├── password-management/
│   │   │   └── profileNavigation.tsx
│   │   ├── skeleton/
│   │   │   ├── BookingSummaryCardSkeleton.tsx
│   │   │   ├── BookingSummaryCardsSkeleton.tsx
│   │   │   ├── HotelsListSkeleton.tsx
│   │   │   ├── HotelsPageSkeleton.tsx
│   │   │   ├── PaymentCardsSkeleton.tsx
│   │   │   ├── PaymentElementSkeleton.tsx
│   │   │   ├── ReviewCardSkeleton.tsx
│   │   │   ├── ReviewsListSkeleton.tsx
│   │   │   ├── TypeFilterSkeleton.tsx
│   │   │   ├── UserPaymentMethodSkeleton.tsx
│   │   │   └── UserPaymentMethodsListSkeleton.tsx
│   │   └── ui/                      # 24 shadcn/ui components
│   ├── hooks/
│   │   ├── use-supabase-upload.ts
│   │   ├── useBookingDates.ts
│   │   ├── useCards.ts
│   │   ├── useFavouriteHotels.ts
│   │   └── useSyncDatesToURL.ts
│   ├── lib/
│   │   ├── constants/
│   │   ├── schemas/
│   │   ├── stripe/
│   │   ├── supabase.ts
│   │   ├── types/
│   │   └── utils/
│   ├── middlewares/
│   │   └── auth.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   ├── _auth/
│   │   ├── _main/
│   │   ├── api/webhooks/
│   │   └── sso-callback/
│   ├── server/
│   │   ├── auth.ts
│   │   ├── bookings.ts
│   │   ├── favourites.ts
│   │   ├── hotels/
│   │   ├── reviews/
│   │   ├── rooms.ts
│   │   ├── stripe.ts
│   │   ├── stripe-core.ts
│   │   └── user/
│   ├── router.tsx
│   ├── routeTree.gen.ts
│   ├── start.ts
│   └── styles.css
├── .env.local
├── components.json
├── eslint.config.js
├── package.json
├── prettier.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Dependencies

### Core Dependencies

| Package                  | Purpose                                    |
| ------------------------ | ------------------------------------------ |
| `react`, `react-dom`     | UI rendering (v19)                         |
| `@tanstack/react-start`  | Full-stack framework with server functions |
| `@tanstack/react-router` | Type-safe file-based routing               |
| `@tanstack/react-query`  | Async state management and caching         |
| `nitro`                  | Server engine for deployment               |
| `vite`                   | Build tool and dev server                  |
| `typescript`             | Type checking                              |

### Authentication & Backend

| Package                                                  | Purpose                                     |
| -------------------------------------------------------- | ------------------------------------------- |
| `@clerk/tanstack-react-start`                            | Clerk auth integration for TanStack Start   |
| `@supabase/supabase-js`                                  | Supabase client for database and storage    |
| `stripe`, `@stripe/stripe-js`, `@stripe/react-stripe-js` | Stripe payment processing (server + client) |

### UI Components

| Package                            | Purpose                  |
| ---------------------------------- | ------------------------ |
| `tailwindcss`, `@tailwindcss/vite` | CSS framework            |
| `radix-ui`, `shadcn`               | Accessible UI primitives |
| `lucide-react`                     | Icon set                 |
| `sonner`                           | Toast notifications      |
| `embla-carousel-react`             | Carousel component       |
| `vaul`                             | Drawer component         |
| `class-variance-authority`         | Component variant system |
| `clsx`, `tailwind-merge`           | Class name utilities     |
| `tw-animate-css`                   | Animation utilities      |

### Form & Validation

| Package               | Purpose                   |
| --------------------- | ------------------------- |
| `react-hook-form`     | Form state management     |
| `@hookform/resolvers` | Schema validation bridges |
| `zod`                 | Runtime type validation   |
| `input-otp`           | OTP input component       |

### Media & Files

| Package               | Purpose                          |
| --------------------- | -------------------------------- |
| `react-dropzone`      | File upload drag-and-drop        |
| `react-avatar-editor` | Image cropping                   |
| `html2canvas-pro`     | HTML-to-canvas rendering for PDF |
| `jspdf`               | PDF generation                   |
| `next-barcode`        | Barcode rendering                |

### Maps & Dates

| Package                    | Purpose            |
| -------------------------- | ------------------ |
| `leaflet`, `react-leaflet` | Interactive maps   |
| `date-fns`                 | Date utilities     |
| `react-day-picker`         | Calendar component |

### Other

| Package                               | Purpose                                    |
| ------------------------------------- | ------------------------------------------ |
| `react-responsive`                    | CSS media query hooks                      |
| `react-scroll`                        | Smooth section scrolling                   |
| `react-svg-credit-card-payment-icons` | Card brand SVG icons                       |
| `@fontsource-variable/montserrat`     | Self-hosted Montserrat font                |
| `next-themes`                         | Theme management (available for dark mode) |
| `zustand`                             | Lightweight client state management        |

---

## Conclusion

**Golobe** is a production-ready, full-stack hotel booking platform that demonstrates a modern web application architecture. It integrates three major SaaS services — **Clerk** for authentication, **Supabase** for database and storage, and **Stripe** for payments — into a cohesive, type-safe application built on **TanStack Start** and **React 19**.

The application covers the complete hotel booking lifecycle: from searching and filtering hotels, viewing detailed listings with interactive maps and user reviews, through secure checkout with saved payment methods, to viewing downloadable booking tickets. A comprehensive user profile system allows managing personal information, avatars, banners, passwords, emails, and payment methods.

Every layer — from URL search params to server function inputs to database queries — is validated with **Zod schemas**, ensuring data integrity throughout the stack. The authentication middleware, Supabase RLS, and webhook signature verification provide multi-layered security. Streaming SSR with deferred promises and skeleton loading states delivers a responsive user experience while data loads.

The codebase is organized for maintainability with feature-based component grouping, clear separation between client and server code, and comprehensive TypeScript typing including auto-generated Supabase types. This architecture supports straightforward extension — the flight booking feature, promo codes, and booking cancellation flows are already scaffolded in the database schema and UI, ready for implementation.
