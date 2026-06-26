# Golobe — Hotel Booking Platform

Golobe is a full-stack hotel booking platform built with **React 19**, **TanStack Start** (SSR), **Supabase**, **Clerk**, and **Stripe**. It delivers a complete end-to-end experience — from searching and filtering hotels, through room selection and payment, to booking confirmation with downloadable PDF tickets. The application features full authentication flows, user profile management, favourites, reviews, and an interactive map for hotel locations.

---

## Screenshots

> _Screenshots can be added here._

---

## Features

| Feature | Description |
|---|---|
| **Hotel Search & Filtering** | Multi-term destination search with sidebar filters for price range, star rating, amenities, freebies, and room/guest capacity. |
| **Hotel Types** | Browse by type — Hotels, Motels, and Resorts — with per-type counts. |
| **Sorting** | Sort results by rating or price (ascending/descending). |
| **Pagination** | Server-side paginated hotel listings with a windowed page-button strategy. |
| **Hotel Detail Page** | Full hotel profile with image gallery, overview/tags, available rooms (filtered by date availability and guest capacity), interactive Leaflet map, amenities list, and reviews section. |
| **Room Availability** | Rooms are date-aware — booked date ranges are excluded from availability. |
| **Booking & Checkout** | Full checkout flow: select room → choose payment mode (full or split) → select saved card or enter new payment method → pay via Stripe → redirect to booking confirmation. |
| **Payment Modes** | Pay in full or split payment (pay 50% now, remainder later). |
| **Stripe Integration** | Payment intents, setup intents, saved cards, webhook-driven booking creation. |
| **Booking Tickets** | View confirmed booking details with a styled ticket including barcode. Download the ticket as a PDF. |
| **User Authentication** | Email/password sign-up with OTP verification, sign-in, forgot/reset password, and social OAuth (Google, Facebook, Apple) via Clerk. |
| **SSO Callback** | Handles OAuth redirect with transferable sign-in support. |
| **User Profile** | Editable name, phone, address, date of birth. Manage emails (add, verify, set primary, remove). Change/set password. |
| **Avatar & Banner Management** | Upload, crop/resize (with react-avatar-editor), update, and delete profile avatars and banners. Images stored in Supabase Storage. |
| **Payment Methods** | View, add (via Stripe SetupIntent), and delete saved credit/debit cards. |
| **Booking History** | View all past bookings in the profile with summary cards and download options. |
| **Favourites** | Toggle hotels as favourites. View favourites list filtered by type (hotels/flights). |
| **Reviews** | Authenticated users who have booked can add and edit reviews with a star rating. Reviews are paginated and show verified status. |
| **Responsive Design** | Mobile-first responsive layout with a sheet-based filter sidebar and mobile navigation menu. |
| **Skeleton Loading States** | Granular skeleton placeholders for hotels list, hotel cards, reviews, payment methods, and booking cards. |
| **Toast Notifications** | User feedback via Sonner toasts for errors, success states, and validation messages. |
| **Error Boundaries** | Dedicated `RouteError` component for graceful error recovery on route-level failures. |
| **Webhook Integrations** | Clerk webhook for user sync to Supabase; Stripe webhook for automatic booking creation on successful payment. |
| **PDF Generation** | Client-side PDF generation using `html2canvas-pro` and `jsPDF` for booking ticket download. |

---

## Tech Stack

### Core

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI library |
| [TypeScript 6](https://www.typescriptlang.org/) | Type safety |
| [Vite 8](https://vite.dev/) | Build tool & dev server |
| [TanStack Start](https://tanstack.com/start) | Full-stack SSR React framework |
| [TanStack Router](https://tanstack.com/router) | Type-safe file-based routing |
| [TanStack React Query](https://tanstack.com/query) | Server state management & caching |
| [Nitro](https://nitro.build/) | Server engine (used under TanStack Start) |

### Styling

| Technology | Purpose |
|---|---|
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework |
| [shadcn/ui (Radix Nova)](https://ui.shadcn.com/) | Pre-built accessible UI components |
| [tw-animate-css](https://github.com/jrson83/tw-animate-css) | CSS animation utilities |
| [Montserrat Variable](https://fontsource.org/fonts/montserrat) | Primary font |
| Trade Gothic LT Std Extended | Heading/brand font (custom @font-face) |
| [Lucide React](https://lucide.dev/) | Icon library |
| [class-variance-authority](https://cva.style/) | Component variant management |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | Conditional class merging |

### Backend & Data

| Technology | Purpose |
|---|---|
| [Supabase](https://supabase.com/) | PostgreSQL database, Storage (avatars/banners), and auto-generated types |
| [Clerk](https://clerk.com/) | Authentication, user management, OAuth, webhooks |
| [Stripe](https://stripe.com/) | Payments — PaymentIntents, SetupIntents, customer management, webhooks |
| [Zod](https://zod.dev/) | Schema validation for forms, server functions, search params, and env vars |

### Forms & UI

| Technology | Purpose |
|---|---|
| [React Hook Form](https://react-hook-form.com/) | Form state management |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | Zod ↔ React Hook Form integration |
| [React Day Picker](https://react-day-picker.js.org/) | Date picker calendar |
| [input-otp](https://input-otp.rodz.dev/) | OTP input for email verification |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| [Vaul](https://vaul.emilkowal.dev/) | Drawer component |
| [react-responsive](https://github.com/yocontra/react-responsive) | Media query hooks |
| [react-dropzone](https://react-dropzone.js.org/) | Drag-and-drop file uploads |
| [react-avatar-editor](https://github.com/mosch/react-avatar-editor) | Image cropping (avatars and banners) |

### Maps & Visuals

| Technology | Purpose |
|---|---|
| [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) | Interactive hotel location maps |
| [html2canvas-pro](https://github.com/nicolo-ribaudo/html2canvas-pro) | DOM-to-canvas rendering for PDF export |
| [jsPDF](https://github.com/parallax/jsPDF) | PDF generation |
| [next-barcode](https://github.com/nicolo-ribaudo/next-barcode) | Barcode rendering on booking tickets |
| [react-svg-credit-card-payment-icons](https://www.npmjs.com/package/react-svg-credit-card-payment-icons) | Card brand icons (Visa, Mastercard, etc.) |

### Dev Tools

| Technology | Purpose |
|---|---|
| [TanStack Devtools](https://tanstack.com/devtools) | Router & Query debugging |
| [Vitest](https://vitest.dev/) | Unit testing framework |
| [Testing Library](https://testing-library.com/) | DOM testing utilities |
| [Prettier](https://prettier.io/) + [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) | Code formatting |
| [ESLint](https://eslint.org/) | Linting |

---

## Project Architecture

```
src/
├── components/        # React components organized by feature domain
│   ├── auth/          # Authentication forms (SignIn, SignUp, ForgotPassword, etc.)
│   ├── booking/       # Booking-related (ticket, checkout sidebar, summary cards)
│   ├── common/        # Shared components (InputField, DateField, RouteError, TabFilter, etc.)
│   ├── favourites/    # Favourite toggle and list
│   ├── hotels/        # Hotel listing, cards, detail views, filters, reviews
│   ├── layout/        # App shell (Header, Footer, Container, Logo, Herosection)
│   ├── payment/       # Stripe payment forms, saved cards, checkout logic
│   ├── profile/       # Profile page sections (avatar, banner, email, password management)
│   ├── skeleton/      # Loading skeleton placeholders per feature
│   └── ui/            # shadcn/ui primitives (Button, Dialog, Select, Calendar, etc.)
├── hooks/             # Custom React hooks
├── lib/               # Shared utilities, types, schemas, constants, and Stripe config
│   ├── constants/     # App-wide constants and icon mappings
│   ├── schemas/       # Zod schemas (auth, search, stripe, user, review, env)
│   ├── stripe/        # Stripe client and server initialization
│   ├── types/         # TypeScript types and Supabase generated types
│   └── utils/         # Utility functions (pricing, formatting, filtering, sorting)
├── middlewares/       # TanStack Start server middlewares (auth protection)
├── routes/            # File-based TanStack Router routes
│   ├── __root.tsx     # Root layout with ClerkProvider, QueryClient, Toaster
│   ├── _auth/         # Auth layout (sign-in, sign-up, forgot-password)
│   ├── _main/         # Main app layout (Header + Footer wrapper)
│   │   ├── hotels/    # Hotel listing and detail with nested checkout
│   │   ├── bookings/  # Booking detail page
│   │   ├── favourites/# Favourites page
│   │   ├── payment/   # Payment pending/confirmation
│   │   └── profile/   # Profile with nested account, payment-methods, tickets
│   ├── api/           # API routes for webhooks (Clerk, Stripe)
│   └── sso-callback/  # OAuth redirect handler
├── server/            # TanStack Start server functions (RPC-style)
│   ├── auth.ts        # Auth check function
│   ├── hotels.ts      # Hotel CRUD and search
│   ├── rooms.ts       # Room data fetching
│   ├── bookings.ts    # Booking CRUD
│   ├── favourites.ts  # Favourites toggle/list
│   ├── reviews/       # Review CRUD (Get.ts, index.ts)
│   ├── stripe.ts      # Stripe operations (PaymentIntent, SetupIntent, cards)
│   ├── stripe-core.ts # Stripe customer creation (server-only)
│   └── user.ts        # User CRUD, avatar/banner management, password updates
├── router.tsx         # Router creation and configuration
├── start.ts           # TanStack Start entry with Clerk middleware
├── routeTree.gen.ts   # Auto-generated route tree
└── styles.css         # Global styles, CSS variables, design tokens
```

### Why This Structure?

- **Feature-based components**: Components are grouped by domain (hotels, booking, payment, profile) rather than by type, keeping related code close together.
- **Co-located server functions**: Server-side logic lives in `src/server/` with clear module boundaries, using TanStack Start's `createServerFn` for type-safe RPC.
- **Schemas next to types**: Zod schemas and TypeScript types live side-by-side in `src/lib/`, ensuring validation and type safety share a single source of truth.
- **Route-level data loading**: Each route file defines its own `loader`, `validateSearch`, and `beforeLoad` — keeping data requirements co-located with the page that uses them.

---

## Application Flow

### Authentication Flow

1. User navigates to `/sign-in` or `/sign-up` (protected from authenticated users — redirects to `/` if already signed in).
2. **Sign Up**: Fills form (first name, last name, email, phone, password, confirm password, terms checkbox) → Clerk creates the user → Email OTP verification step → On success, Clerk webhook fires → `user.created` event inserts user into Supabase `users` table and creates a Stripe customer.
3. **Sign In**: Email + password → Clerk authenticates → Redirects to home or original URL.
4. **Social OAuth**: Click Google/Facebook/Apple → Redirect to `/sso-callback` → Handles transferable sign-up edge case → Redirects to home.
5. **Forgot Password**: Enter email → Receive OTP code → Verify code → Set new password → Redirected to sign-in.

### Hotel Search Flow

1. User enters destination, check-in/check-out dates, rooms, and guests in the search widget on the homepage.
2. Form submission navigates to `/hotels` with search params in the URL.
3. The route loader calls `getHotels()` server function which queries Supabase with multi-term text search across `city`, `country`, `address`, and `name` fields.
4. Results are filtered server-side by amenities, freebies, date availability (excluding rooms with overlapping bookings), and room/guest capacity.
5. Hotels are sorted by the selected criterion (rating or price) and paginated (4 per page).
6. Sidebar filter options (amenities, freebies, max price) are loaded via `getFilterOptions()` from a Supabase view.

### Hotel Detail Flow

1. Clicking a hotel navigates to `/hotels/$hotelId`.
2. The loader fetches the hotel with all rooms (and their bookings), amenities, images, tags, and reviews in parallel.
3. The page displays: breadcrumb → header (name, rating, location, favourite toggle, share) → image gallery → overview/tags → available rooms (filtered by selected dates and guest capacity) → interactive Leaflet map → amenities → paginated reviews section.
4. Users can "Book now" on any available room to proceed to checkout.

### Booking & Payment Flow

1. Clicking "Book now" navigates to `/hotels/$hotelId/checkout/$roomId` with search params preserved.
2. The room data is loaded. Booking price is calculated client-side (`calculateBookingPrice`) based on nights, price per night, tax rate, service fee, and payment mode.
3. User selects payment mode (full or split — paying 50% now).
4. Authenticated users see saved cards and an option to add a new card or use another payment method. Unauthenticated users see a login prompt.
5. On "Checkout" click, a Stripe PaymentIntent is created server-side with booking metadata. The client confirms payment.
6. On successful payment, the user is redirected to `/payment/pending?payment_intent=...`.
7. The pending page polls `checkBookingExist()` every second (up to 15 attempts). Meanwhile, the Stripe `payment_intent.succeeded` webhook fires and inserts the booking into Supabase.
8. Once the booking exists, the user is redirected to `/bookings/$bookingId` showing the booking confirmation ticket.

### Reviews Flow

1. On the hotel detail page, the reviews section shows the average rating, verified review count, and paginated review cards.
2. Authenticated users who have a booking for this hotel can add a review (rating + text, min 20 / max 500 characters).
3. If the user has already submitted a review, they see an "Edit" button instead of "Add".
4. Reviews linked to a booking are marked as verified (`is_verified: true`).

### User Profile Flow

1. `/profile` redirects to `/profile/account`.
2. **Account tab**: Edit name, phone, address, date of birth (inline editable fields with Zod validation). Manage emails (add, verify with OTP, set primary, remove). Change/set password (with current password verification if one exists).
3. **Payment Methods tab**: Lists saved Stripe cards with brand icons. Add new card via Stripe SetupIntent modal. Delete cards.
4. **Tickets/Bookings tab**: Lists all user bookings with summary cards. Download individual booking tickets as PDF.

### Favourites Flow

1. On any hotel card or hotel detail page, authenticated users can click the heart icon to toggle favourites.
2. The toggle calls `toggleUserFavourites()` which checks existence and either inserts or deletes.
3. `/favourites` page shows all saved favourites filtered by type (Hotels / Flights — flights tab is disabled).

---

## Feature Breakdown

### Hotel Search & Filtering

- **Purpose**: Allow users to find hotels by destination, dates, and preferences.
- **Key files**: `server/hotels.ts`, `routes/_main/hotels/index.tsx`, `components/hotels/Filters/*`, `lib/schemas/search.ts`, `lib/utils/filters/*`
- **Database**: `hotels`, `rooms`, `bookings`, `hotel_amenity_map`, `amenities`, `hotel_images`, `hotel_filter_options` (view)
- **Server functions**: `getHotels()`, `getFilterOptions()`, `getSearchDestinations()`
- **Validation**: `filterSearchParamsSchema` validates all search/filter URL params with Zod (coercion, defaults, constraints).
- **Edge cases**: Empty destination redirects to home. Safe pagination clamping. Multi-term search with OR logic. Price sorting handled client-side (post-fetch) because it operates on computed values.

### Stripe Payments

- **Purpose**: Handle secure payment collection and booking creation.
- **Key files**: `server/stripe.ts`, `server/stripe-core.ts`, `lib/stripe/*`, `components/payment/*`, `routes/api/webhooks/stripe/$.ts`
- **Database**: `bookings` (created by webhook)
- **Server functions**: `createPaymentIntent()`, `createSetupIntent()`, `getCards()`, `deletePaymentMethod()`, `getOrCreateStripeCustomer()`
- **Flow**: Client requests PaymentIntent → server creates it with booking metadata → client confirms → Stripe webhook inserts booking into Supabase.
- **Edge cases**: Stripe customer is lazily created (check Clerk privateMetadata first). Split payment mode stores `remaining_amount`. Payment pending page has a 15-second timeout with error redirect.

### Reviews System

- **Purpose**: Let guests rate and review hotels.
- **Key files**: `server/reviews/Get.ts`, `server/reviews/index.ts`, `components/hotels/Reviews/*`, `lib/schemas/review.ts`
- **Database**: `reviews` (with FK to `hotels`, `bookings`, `users`/`user_profiles`)
- **Server functions**: `getReviews()`, `getReviewStats()`, `getMyAddedReviewsServer()`, `createReview()`, `updateReview()`
- **Validation**: Rating (number), body (min 20, max 500 chars, trimmed). Reviews linked to a booking are marked verified.
- **Edge cases**: One review per user per hotel. Edit replaces existing review. Reviews are paginated (10 per page).

### User Management

- **Purpose**: Sync user data between Clerk and Supabase; manage profile.
- **Key files**: `server/user.ts`, `routes/api/webhooks/clerk/index.ts`, `components/profile/*`, `lib/utils/user.ts`
- **Database**: `users` table in Supabase, Supabase Storage buckets (`avatars`, `banners`)
- **Webhook events**: `user.created` (insert to Supabase + create Stripe customer), `user.updated` (update Supabase), `user.deleted` (delete from Supabase)
- **Avatar/Banner flow**: Upload via drag-and-drop → crop/resize with react-avatar-editor → upload to Supabase Storage → update Clerk publicMetadata with the storage URL.

---

## Database

The database is **PostgreSQL** hosted on **Supabase**. Below are the tables, their purpose, and relationships.

### Tables

| Table | Purpose |
|---|---|
| `users` | Stores user profiles synced from Clerk (id, full_name, email, phone, avatar_url, is_active). |
| `hotels` | Core hotel data (name, city, country, address, description, star_rating, avg_rating, review_count, hotel_type, tax_rate, latitude/longitude, logo_url, slug). |
| `rooms` | Rooms belonging to a hotel (name, price_per_night, bed_type, view_type, max_guests, image_url, description, is_available). |
| `bookings` | Reservation records (user_id, hotel_id, room_id, check_in/out, guests, base_fare, taxes, service_fee, discount, paid/remaining amounts, payment_mode, payment_status, status, booking_ref, payment_intent_id, promo_code). |
| `reviews` | User reviews (hotel_id, user_id, booking_id, rating, body, is_verified). |
| `favourites` | Saved favourites (user_id, hotel_id or flight_id, item_type). |
| `amenities` | Master list of amenities (name, category, icon_key). |
| `hotel_amenity_map` | Many-to-many join between hotels and amenities (hotel_id, amenity_id). |
| `hotel_images` | Hotel gallery images (hotel_id, url, is_cover, display_order, alt_text). |
| `hotel_tags` | Descriptive tags for hotels (hotel_id, tag, icon_key). |
| `destinations` | Destination metadata for marketing (city, country, image_url, tagline, starting_price). |
| `flights` | Flight records (airline, origin/destination, price, stops, status) — present in schema but not actively used in the UI. |
| `recent_searches` | User search history (user_id, destination, city, country). |

### Views

| View | Purpose |
|---|---|
| `hotel_filter_options` | Aggregated filter data: `max_price`, `amenities[]`, `freebies[]`. Used to populate the sidebar filter. |
| `user_profiles` | Read-only view exposing `id`, `full_name`, `avatar_url` from `users` — used for review author display. |

### Key Relationships

- `rooms.hotel_id` → `hotels.id` (many rooms per hotel)
- `bookings.hotel_id` → `hotels.id`, `bookings.room_id` → `rooms.id`, `bookings.user_id` → `users.id`
- `reviews.hotel_id` → `hotels.id`, `reviews.booking_id` → `bookings.id`, `reviews.user_id` → `users.id`
- `favourites.hotel_id` → `hotels.id`, `favourites.user_id` → `users.id`
- `hotel_amenity_map.hotel_id` → `hotels.id`, `hotel_amenity_map.amenity_id` → `amenities.id`
- `hotel_images.hotel_id` → `hotels.id`
- `hotel_tags.hotel_id` → `hotels.id`

### Database Functions

| Function | Purpose |
|---|---|
| `generate_booking_ref()` | Auto-generates a unique booking reference number. |
| `search_hotels(...)` | Server-side full-text hotel search (available but not currently used; app uses client-side Supabase query filtering). |
| `toggle_favourite(...)` | Database-level favourite toggle (available but app uses application-level toggle via server functions). |
| `upsert_recent_search(...)` | Upserts recent search entries for a user. |

---

## Routing

All routes use **TanStack Router** file-based routing with type-safe search params.

### Layout Routes (pathless)

| Route | Purpose |
|---|---|
| `__root.tsx` | Root shell — wraps everything in `ClerkProvider`, `QueryClientProvider`, `Toaster`, and devtools. |
| `_auth/route.tsx` | Auth layout (Logo + sidebar image). Redirects authenticated users to `/`. |
| `_main/route.tsx` | Main app layout with `Header` and `Footer`. |
| `_main/profile/route.tsx` | Profile layout with banner, header, and navigation tabs. |

### Public Routes

| Path | File | Description |
|---|---|---|
| `/` | `_main/index.tsx` | Home page with hero section and search widget. |
| `/hotels` | `_main/hotels/index.tsx` | Hotel listing with filters, sorting, pagination. Requires `destination` param. |
| `/hotels/$hotelId` | `_main/hotels/$hotelId/index.tsx` | Hotel detail page. |
| `/hotels/$hotelId/checkout/$roomId` | `...checkout/$roomId/index.tsx` | Checkout page (shows login section for guests). |
| `/sign-in` | `_auth/sign-in/index.tsx` | Sign-in form. |
| `/sign-up` | `_auth/sign-up/index.tsx` | Sign-up form with OTP verification step. |
| `/forgot-password` | `_auth/forgot-password/index.tsx` | Multi-step forgot password flow. |
| `/sso-callback` | `sso-callback/index.tsx` | OAuth redirect handler. |

### Protected Routes

Routes under `/bookings`, `/favourites`, and `/profile` are protected by the `authMiddleware` (request-level). Unauthenticated users are redirected to `/sign-in` with the original URL preserved as `redirect_url`.

| Path | File | Description |
|---|---|---|
| `/bookings/$bookingId` | `_main/bookings/$bookingId/index.tsx` | Booking confirmation with ticket and PDF download. |
| `/favourites` | `_main/favourites/index.tsx` | Favourites list with type filter. |
| `/profile/account` | `_main/profile/account/index.tsx` | Account settings (editable fields, email/password management). |
| `/profile/payment-methods` | `_main/profile/payment-methods/index.tsx` | Saved Stripe payment methods. |
| `/profile/tickets-bookings` | `_main/profile/tickets-bookings/index.tsx` | Booking history with summary cards. |
| `/payment/pending` | `_main/payment/pending/index.tsx` | Post-payment polling page (requires `payment_intent` param). |

### API Routes (Webhooks)

| Path | Method | Description |
|---|---|---|
| `/api/webhooks/clerk` | POST | Clerk webhook — handles `user.created`, `user.updated`, `user.deleted` events. |
| `/api/webhooks/stripe/*` | POST | Stripe webhook — handles `payment_intent.succeeded` to create booking in database. |

### Redirect Routes

| Path | Redirects to |
|---|---|
| `/bookings` | `/` |
| `/payment` | `/` |
| `/profile` | `/profile/account` |
| `/hotels/$hotelId/checkout` | `/hotels/$hotelId` |

---

## State Management

### Server State (TanStack Router Loaders)

The primary state management strategy is **route-based data loading** via TanStack Router's `loader` functions. Each route fetches exactly the data it needs:

- `getHotels()`, `getFilterOptions()` — hotels listing page
- `getHotel()`, `getReviews()`, `getReviewStats()`, `getMyAddedReviews()` — hotel detail page
- `getRoom()` — checkout page
- `getBooking()`, `getUserBookings()` — booking pages
- `getCards()` — payment methods page

### URL State (Search Params)

All filtering, pagination, and sorting state lives in URL search params, validated by Zod schemas. This makes the entire search state shareable and bookmarkable.

- `filterSearchParamsSchema`: destination, checkIn/Out, rooms, guests, minPrice, maxPrice, rating, amenities, freebies, hotelType, sortBy, hotel_page
- `reviews_page`: Review pagination on hotel detail
- `favType`: Favourite type filter (hotel/flight)
- `bookingType`: Booking type filter (stays/flights)
- `payment_intent`: Payment intent ID on pending page
- `paymentMode`: Payment mode (full/split) on checkout

### Client State

- `useState` for local UI state (selected payment method, favourite toggle, form steps, editor state).
- `useRef` for payment confirmation callback (`CheckoutConfirmContext`) and polling counters.
- **React Context**: `CheckoutConfirmProvider` shares a `confirmPaymentRef` between the payment form and checkout button.

### TanStack React Query

- Used for **mutation-based operations** like `toggleUserFavourites` via `useMutation` with `useQueryClient`.
- The `QueryClientProvider` is configured in the root layout.

### Deferred Data Loading

Several routes use TanStack Router's `Await` component for **streaming/deferred data**:

- Hotel listings (`hotelsPromise`) show a skeleton while data loads.
- Reviews on the hotel detail page are deferred.
- Booking lists and payment cards use `Await` with skeleton fallbacks.

---

## Forms

### Authentication Forms

| Form | File | Schema | Validation |
|---|---|---|---|
| Sign Up | `SignUpForm.tsx` | `signUpSchema` | First/last name required, valid email, phone required, password ≥ 8 chars, confirm password match, terms checkbox. |
| Sign In | `SignInForm.tsx` | `signInSchema` | Valid email, password ≥ 8 chars, remember me checkbox. |
| Forgot Password | `ForgotPasswordForm.tsx` | `forgotPasswordSchema` | Valid email. |
| Reset Password | `ResetPasswordForm.tsx` | `resetPasswordSchema` | Password ≥ 8 chars, confirm password match. |
| OTP Verification | `VerifyForm.tsx`, `SignUpVerifyForm.tsx` | 6-digit OTP via `input-otp` | Implicit Clerk verification. |

### Search & Filter Forms

| Form | File | Schema |
|---|---|---|
| Hotel Search Widget | `HotelSearchWidget.tsx` → `HotelSearchBar.tsx` | `hotelSearchWidgetSchema` — destination (min 1 char, alphanumeric/Arabic), date range, rooms, guests. |
| Available Rooms Filter | `FilterAvailableRoomsWidget.tsx` | `filterAvailableRoomsWidgetSchema` — check-in/out dates, rooms, guests. |

### Profile Forms

| Form | File | Schema |
|---|---|---|
| Edit Name | `EditableProfileField.tsx` | `nameSchema` — 2–50 chars. |
| Edit Phone | `EditableProfileField.tsx` | `phoneSchema` — regex `^\+?[0-9]\d{7,14}$`. |
| Edit Address | `EditableProfileField.tsx` | `addressSchema` — 5–200 chars. |
| Date of Birth | `EditableDateOfBirth.tsx` | `dateOfBirthSchema` — must be ≤ today. |
| Add Email | `NewEmailForm.tsx` | `emailSchema` — valid email. |
| Change Password | `NewPasswordStep.tsx` | `confirmNewPasswordSchema` — password ≥ 8 chars, confirm match. |

### Review Forms

| Form | File | Schema |
|---|---|---|
| Add Review | `AddReviewForm.tsx` | `reviewFormSchema` — rating (number), review (20–500 chars). |
| Edit Review | `EditReviewForm.tsx` | `reviewFormSchema` — same as above. |

All forms use **React Hook Form** with **@hookform/resolvers/zod** for validation. Errors display inline below each field. Submissions call server functions or Clerk SDK methods, with error handling via `toast.error()`.

---

## Reusable Components

### Common (`components/common/`)

| Component | Purpose |
|---|---|
| `InputField` | Styled form input with label and error display. |
| `DateField` | Date picker input with calendar popover. |
| `DropZone` | Drag-and-drop file upload with preview and progress. |
| `RouteError` | Full-page error boundary with retry button. |
| `SortBy` | Generic sort dropdown. |
| `StarsRating` | Interactive star rating input for reviews. |
| `TabFilter` | Generic tab filter component (used for hotel types, favourite types, booking types). |
| `ShareButton` | Copy-to-clipboard share button. |
| `DashedBorder` | SVG dashed border decorative element. |

### Layout (`components/layout/`)

| Component | Purpose |
|---|---|
| `Header` | Main navigation with logo, nav links, auth/user menu, mobile menu. |
| `Footer` | Site footer with link sections and newsletter. |
| `Container` | Consistent page-width wrapper. |
| `Logo` | SVG logo component. |
| `Herosection` | Full-width hero banner image. |

### UI (`components/ui/`)

23 shadcn/ui components including: `Accordion`, `Badge`, `Breadcrumb`, `Button`, `Calendar`, `Checkbox`, `Collapsible`, `Dialog`, `Drawer`, `Field`, `Input`, `Label`, `Pagination`, `Popover`, `RadioGroup`, `Select`, `Separator`, `Sheet`, `Skeleton`, `Slider`, `Sonner (Toaster)`, `Tabs`, `Textarea`.

### Skeleton Components (`components/skeleton/`)

11 skeleton components providing loading placeholders for: hotel cards, hotel list, hotels page, booking summary cards, review cards, reviews list, payment cards, user payment methods, and type filters.

---

## Custom Hooks

### `useSupabaseUpload`

- **File**: `hooks/use-supabase-upload.ts`
- **Purpose**: Manages file upload to Supabase Storage with drag-and-drop support.
- **Returns**: `files`, `setFiles`, `loading`, `errors`, `successes`, `isSuccess`, `onUpload`, plus all `useDropzone` props.
- **Options**: `bucketName`, `path`, `allowedMimeTypes`, `maxFileSize`, `maxFiles`, `cacheControl`, `upsert`, `fixedFileName`, `onUploadSuccess` callback.
- **Used by**: Avatar and banner upload flows.

### `useBookingDates`

- **File**: `hooks/useBookingDates.ts`
- **Purpose**: Enforces check-in/check-out date constraints in forms. Automatically adjusts check-out if it's before check-in.
- **Returns**: `checkInDate`, `checkOutDate`, `totalNights`.
- **Used by**: Hotel search bar and available rooms filter.

### `useCards`

- **File**: `hooks/useCards.ts`
- **Purpose**: Fetches the user's saved Stripe payment cards on mount.
- **Returns**: `cards`, `loading`.
- **Used by**: Payment method selection on checkout page.

### `useSyncDatesToURL`

- **File**: `hooks/useSyncDatesToURL.ts`
- **Purpose**: Syncs check-in/check-out dates from form state back to URL search params on the checkout page.
- **Used by**: Checkout room page to keep URL in sync with selected dates.

---

## Utilities

### Core (`lib/utils/index.ts`)

| Function | Purpose |
|---|---|
| `cn()` | Merges class names using clsx + tailwind-merge. |
| `getRatingLabel()` | Converts numeric rating to label (Exceptional, Excellent, etc.). |
| `getPaginationRange()` | Calculates pagination `from`/`to` indices and `totalPages`. |
| `generatePageButtons()` | Produces page button array with ellipsis for pagination UI. |
| `formatDate()` | Formats ISO date string to "Wednesday, Jun 25" format. |
| `getCoverImageUrl()` | Extracts cover image URL from hotel images array (fallback to first image or placeholder). |
| `getMinRoomPrice()` | Finds minimum room price across a hotel's rooms. |
| `getTypePlacesCount()` | Counts hotels by type (hotel/motel/resort). |
| `sanitizeString()` | Strips special characters from search input. |
| `mapSearchParamsToHotelWidget()` | Converts URL search params to form-compatible widget values. |
| `mapHotelWidgetToSearchParams()` | Converts form values to URL search params. |
| `isBookedDay()` | Checks if a specific day falls within any existing booking range. |
| `hasBookedDayInRange()` | Checks if any day in a date range overlaps with existing bookings. |
| `calculateBookingPrice()` | Computes base fare, taxes, service fee, total, and split amounts. |
| `formatBookingData()` | Transforms Stripe webhook metadata into a `BookingToInsert` object. |
| `formatFileName()` | Sanitizes file names for storage upload. |

### Filters (`lib/utils/filters/`)

| Function | Purpose |
|---|---|
| `filterByAmenities()` | Filters hotels that have all selected amenities. |
| `filterByFreebies()` | Filters hotels that have all selected freebies. |
| `filterByAvailableRooms()` | Excludes hotels where all rooms are booked for the selected date range. |
| `filterByRoomsGuests()` | Filters hotels that have enough rooms and guest capacity. |
| `getAvailableRooms()` | Returns rooms with no booking conflicts for the selected dates. |

### Sort (`lib/utils/sortHotels.ts`)

| Function | Purpose |
|---|---|
| `sortByPrice()` | Sorts hotels by minimum room price (ascending or descending). |

### User (`lib/utils/user.ts`)

| Function | Purpose |
|---|---|
| `getFullName()` | Resolves display name from Clerk user metadata. |
| `formatUserName()` | Formats "FirstName L." style display name. |
| `getFormattedUser()` | Extracts all user display fields (name, email, avatar, banner, phone, address, birthDate) from Clerk user object. |
| `getFormattedUserJson()` | Same as above but for Clerk webhook JSON payload format. |

---

## Performance Optimizations

| Optimization | Implementation |
|---|---|
| **Deferred Data Loading** | `Await` component with skeleton fallbacks for hotel lists, reviews, bookings, and payment cards — keeps the page interactive while data streams in. |
| **Route Preloading** | `defaultPreload: "intent"` in router config preloads routes on hover/focus. |
| **Scroll Restoration** | `scrollRestoration: true` preserves scroll position across navigations. |
| **Parallel Data Fetching** | Hotel detail loader uses `Promise.all()` to fetch hotel, review stats, and user review concurrently. |
| **Skeleton Components** | 11 purpose-built skeleton components prevent layout shift during loading. |
| **Deferred Promises in Loaders** | Hotel listing and reviews use deferred promises (`hotelsPromise`, `reviewsPromise`) to allow non-blocking rendering. |
| **URL-Based State** | All search/filter/pagination state lives in the URL — no redundant client state, and browser back/forward works natively. |
| **Image Optimization** | Cover images are resolved from a prioritized list (cover flag → first image → fallback placeholder). Cache control headers on Supabase Storage uploads. |
| **Font Loading** | `font-display: swap` on custom fonts prevents FOIT. Variable font (Montserrat) reduces HTTP requests. |
| **Lazy PDF Rendering** | Booking ticket PDF rendering is deferred — the hidden DOM element is only mounted when the download button is clicked. |
| **Thin Scrollbars** | Custom scrollbar CSS (`scrollbar-width: thin`, 6px webkit) for cleaner visual density. |

---

## Security

### Authentication

- **Clerk** handles all authentication with battle-tested security (password hashing, session management, CSRF protection).
- `clerkMiddleware` is registered as request middleware in `start.ts`, processing every incoming request.

### Route-Level Authorization

- **Request middleware** (`authMiddleware`): Protects `/bookings`, `/favourites`, and `/profile` routes. Unauthenticated users are redirected to `/sign-in`.
- **Function middleware** (`authFnMiddleware`): Applied to sensitive server functions (booking creation, favourites, reviews, Stripe operations, user data). Throws `"Unauthorized"` error if no `userId` is present.

### Server Function Protection

Every server function that mutates data or accesses user-specific resources uses `.middleware([authFnMiddleware])`, ensuring the `userId` is extracted from the Clerk session server-side.

### Input Validation

- All server functions use `.inputValidator()` with Zod schemas.
- Search params are validated at the route level via `validateSearch`.
- Environment variables are validated at startup via `envSchema`.

### Webhook Verification

- **Clerk webhooks** use `verifyWebhook()` from `@clerk/tanstack-react-start/webhooks` to cryptographically verify event authenticity.
- **Stripe webhooks** use `stripe.webhooks.constructEvent()` with the webhook signing secret for signature verification.

### Input Sanitization

- `sanitizeString()` strips special characters from search input before database queries.
- Supabase parameterized queries prevent SQL injection (via the PostgREST API).

### Sensitive Data Handling

- Stripe secret key and webhook secret are server-only (`process.env`).
- Supabase credentials use Vite env vars (`import.meta.env.VITE_*`).
- Stripe customer IDs are stored in Clerk `privateMetadata` (never exposed to the client).
- `stripe-core.ts` uses the `"use server"` directive to ensure it never leaks to the client bundle.

---

## Error Handling

| Layer | Strategy |
|---|---|
| **Route errors** | `errorComponent` on route definitions renders a `RouteError` component with error message and retry button. |
| **Server function errors** | Supabase/Stripe errors are caught and re-thrown as `new Error(message)` for consistent error propagation. |
| **Form validation** | Zod schemas produce field-level error messages displayed inline via React Hook Form's `formState.errors`. |
| **Toast notifications** | `toast.error()` from Sonner is used throughout for user-facing error messages (payment failures, validation errors, auth errors). |
| **Auth redirects** | `isRedirect()` checks in middleware prevent redirect errors from being swallowed. |
| **Payment pending timeout** | After 15 polling attempts (15 seconds), the user is shown an error toast and redirected to home. |
| **Stripe error handling** | Payment and setup intent creation wrap operations in try/catch, returning `{ error: message }` objects. |
| **Webhook errors** | Both Clerk and Stripe webhook handlers return appropriate HTTP status codes (200 for success, 400 for verification failure). |
| **Image fallbacks** | `FALLBACK_IMAGE` constant provides a placeholder when hotel images are missing. |
| **Avatar/Banner deletion** | Gracefully handles "Object not found" errors when deleting images that may not exist. |

---

## Future Improvements

Based on the current architecture, these are realistic improvements:

1. **Flight Booking**: The database schema already has `flights` and `destinations` tables, and the favourites system supports `flight_id`. The UI has disabled "Flights" tabs. Implementing flight search and booking would extend the existing patterns.
2. **Optimistic Updates for Favourites**: The `ToggleFavorite` component currently uses local state + mutation. Adding `onMutate`/`onError` rollback with React Query would improve perceived performance.
3. **Search Debouncing**: The destination search autocomplete could benefit from debounced input to reduce server calls.
4. **Promo Code Support**: The `bookings` table has a `promo_code` column and the pricing utility accounts for `discount`, but no promo code input exists in the checkout UI.
5. **Recent Searches**: The `recent_searches` table and `upsert_recent_search` database function exist but aren't wired into the UI.
6. **Review Deletion**: Users can create and edit reviews but cannot delete them.
7. **Booking Cancellation**: The `bookings.status` field supports `"cancelled"` but no cancellation flow exists in the UI.
8. **Refund Handling**: The `payment_status` supports `"refunded"` but no refund logic is implemented.
9. **Dark Mode Toggle**: Full dark mode CSS variables are defined in `styles.css` but no theme toggle is exposed in the UI.
10. **Image Lazy Loading**: Hotel gallery and listing images could use `loading="lazy"` or Intersection Observer for better performance.
11. **E2E Testing**: The project uses Vitest for unit tests but could benefit from Playwright/Cypress e2e tests covering critical flows.
12. **Rate Limiting**: Server functions could benefit from rate limiting to prevent abuse.

---

## Development Setup

### Prerequisites

- Node.js ≥ 18
- npm (or pnpm)
- A [Supabase](https://supabase.com/) project
- A [Clerk](https://clerk.com/) application
- A [Stripe](https://stripe.com/) account

### Installation

```bash
git clone <repository-url>
cd golobe
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-anon-key

# Clerk
CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SIGNING_SECRET=whsec_...

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### Running Locally

```bash
# Start the dev server on port 3000
npm run dev

# In a separate terminal, forward Stripe webhooks
stripe listen --forward-to http://localhost:3000/api/webhooks/stripe
```

### Other Commands

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Lint
npm run lint

# Format
npm run format

# Fix lint + format
npm run check
```

---

## Folder Tree

```
golobe/
├── public/                          # Static assets (images, fonts, favicon, manifest)
│   ├── fonts/                       # Trade Gothic LT Std Extended (.otf)
│   ├── herosection-bg.png           # Hero section background
│   ├── auth-slider-1.png            # Auth page sidebar image
│   ├── dummy-hotel-img.png          # Fallback hotel image
│   ├── profile.png                  # Default profile picture
│   ├── user-banner.png              # Default banner
│   ├── logo-green-o.svg             # Logo variants
│   ├── logo-white-o.svg
│   └── ...                          # Social icons, ticket graphics, manifest, robots.txt
├── src/
│   ├── components/
│   │   ├── auth/                    # SignInForm, SignUpForm, ForgotPasswordForm, etc.
│   │   ├── booking/                 # BookingTicket/, CheckoutSummarySidebar, PaymentMode, etc.
│   │   ├── common/                  # InputField, DateField, DropZone, RouteError, TabFilter, etc.
│   │   ├── favourites/              # ToggleFavorite, FavouriteList, FavouriteTypeFilter
│   │   ├── hotels/
│   │   │   ├── Filters/             # HotelSearchBar, PriceFilter, RateFilter, AmenitiesFilter, etc.
│   │   │   ├── Reviews/             # ReviewsSection, AddReview, EditReview, ReviewCard, etc.
│   │   │   ├── card/                # HotelCard, HotelCoverImage, HotelPrice, HotelCardDetails
│   │   │   └── detail/              # HotelHeader, HotelImages, AvailableRooms, LeafletMap, etc.
│   │   ├── layout/                  # Header/, Footer/, Container, Logo, Herosection
│   │   ├── payment/                 # Checkout, SelectPaymentMethods, AddCard*, OtherPaymentMethods, etc.
│   │   │   └── context/             # CheckoutConfirmContext
│   │   ├── profile/                 # EditableProfileField, ProfileBanner, ProfileHeader
│   │   │   ├── avatar-management/   # ManageAvatar, UploadAvatar, UpdateAvatar, DeleteAvatar
│   │   │   ├── banner-management/   # ManageBanner, UploadBanner, UpdateBanner, DeleteBanner
│   │   │   ├── email-management/    # EmailManagement, AddEmailDialog, EmailRow, VerifyCodeForm
│   │   │   └── password-management/ # PasswordManagement, VerifyPasswordStep, NewPasswordStep
│   │   ├── skeleton/                # 11 skeleton components
│   │   └── ui/                      # 23 shadcn/ui primitives
│   ├── hooks/                       # useSupabaseUpload, useBookingDates, useCards, useSyncDatesToURL
│   ├── lib/
│   │   ├── constants/               # App constants, amenity icons, card brand icons, footer links
│   │   ├── schemas/                 # Zod schemas (auth, search, stripe, user, review, env)
│   │   ├── stripe/                  # stripe-client.ts, stripe-server.ts
│   │   ├── types/                   # TypeScript types, Supabase generated types
│   │   ├── utils/                   # Core utils, filters/, sortHotels, user utils
│   │   └── supabase.ts              # Supabase client initialization
│   ├── middlewares/                  # auth.ts (authMiddleware, authFnMiddleware)
│   ├── routes/
│   │   ├── __root.tsx               # Root layout
│   │   ├── _auth/                   # Auth routes (sign-in, sign-up, forgot-password)
│   │   ├── _main/                   # Main app routes (hotels, bookings, favourites, profile, payment)
│   │   ├── api/webhooks/            # Clerk & Stripe webhook handlers
│   │   └── sso-callback/            # OAuth redirect handler
│   ├── server/                      # Server functions (auth, hotels, rooms, bookings, reviews, stripe, user)
│   ├── router.tsx                   # Router creation
│   ├── start.ts                     # TanStack Start entry point
│   ├── routeTree.gen.ts             # Auto-generated route tree
│   └── styles.css                   # Global styles & design tokens
├── components.json                  # shadcn/ui configuration
├── eslint.config.js                 # ESLint configuration
├── prettier.config.js               # Prettier configuration
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
└── package.json                     # Dependencies and scripts
```

---

## Dependencies

### Production Dependencies

| Package | Purpose |
|---|---|
| `@clerk/tanstack-react-start` | Clerk authentication integration for TanStack Start |
| `@supabase/supabase-js` | Supabase JavaScript client for database and storage |
| `@tanstack/react-start` | Full-stack SSR React framework |
| `@tanstack/react-router` | Type-safe file-based routing |
| `@tanstack/react-query` | Async state management, mutations, caching |
| `@stripe/stripe-js` + `@stripe/react-stripe-js` | Stripe.js client SDK and React elements |
| `stripe` | Stripe Node.js SDK (server-side) |
| `react-hook-form` + `@hookform/resolvers` | Form state management with Zod integration |
| `zod` | Runtime schema validation |
| `zustand` | Lightweight client state management (installed but primarily using React state/context) |
| `tailwindcss` + `@tailwindcss/vite` | Utility-first CSS framework |
| `radix-ui` | Accessible UI primitives (via shadcn/ui) |
| `shadcn` | UI component toolkit |
| `sonner` | Toast notification library |
| `vaul` | Drawer component |
| `lucide-react` | Icon library |
| `date-fns` | Date utility library |
| `leaflet` + `react-leaflet` | Interactive maps |
| `html2canvas-pro` + `jspdf` | PDF generation from DOM |
| `next-barcode` | Barcode rendering |
| `react-dropzone` | Drag-and-drop file upload |
| `react-avatar-editor` | Image cropping/editing |
| `react-day-picker` | Date picker calendar |
| `react-responsive` | Responsive media queries |
| `react-svg-credit-card-payment-icons` | Card brand SVG icons |
| `input-otp` | OTP input component |
| `next-themes` | Theme management (dark mode support) |
| `class-variance-authority` + `clsx` + `tailwind-merge` | Class name utilities |
| `@fontsource-variable/montserrat` | Montserrat variable font |
| `tw-animate-css` | Animation utilities |
| `nitro` | Server engine |

### Dev Dependencies

| Package | Purpose |
|---|---|
| `typescript` | TypeScript compiler |
| `vite` + `@vitejs/plugin-react` | Build tool and React plugin |
| `vitest` | Test runner |
| `@testing-library/react` + `@testing-library/dom` | Testing utilities |
| `prettier` + `prettier-plugin-tailwindcss` | Code formatter with Tailwind class sorting |
| `@tanstack/eslint-config` | ESLint configuration |
| `@tanstack/devtools-vite` | TanStack Devtools Vite plugin |
| `@types/*` | TypeScript type definitions |

---

## Conclusion

Golobe is a **production-grade hotel booking platform** that demonstrates modern full-stack React development patterns. It combines:

- **TanStack Start** for type-safe SSR with file-based routing and co-located server functions
- **Clerk** for complete authentication (email/password, OAuth, OTP, password reset)
- **Supabase** for PostgreSQL data storage and file storage
- **Stripe** for secure payment processing with webhook-driven booking confirmation
- **Zod** for end-to-end validation from URL params through server functions to database inserts

The application covers the entire user journey — from browsing and searching hotels, through detailed room comparison and availability checking, to payment and booking confirmation with downloadable PDF tickets. It includes full user profile management, favourites, reviews, and payment method storage, all wrapped in a responsive design with thoughtful loading states and error handling.
