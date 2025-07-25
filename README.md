# ATM Machine Demo

A functional ATM machine web application built with React, TypeScript, and Next.js that simulates real banking interactions.

## Setup & Run

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Features

- **PIN Authentication** - Enter a 4-digit PIN to access your account
- **Balance Inquiry** - Check current account balance
- **Cash Withdrawal** - Withdraw funds with balance validation
- **Cash Deposit** - Deposit funds to your account
- **Persistent Data** - Balances are saved using localStorage
- **Card Type Display** - Shows correct card type after PIN entry

## Test PINs

- `1234` - Peter Parker (MasterCard) - $2,500.00
- `5678` - Mary Jane (Visa) - $1,850.50
- `9999` - Spider-Man (Star) - $10,000.00
- `1111` - Ben Parker (Pulse) - $750.25
- `2222` - May Parker (Maestro) - $3,200.00
- `3333` - Gwen Stacy (Plus) - $925.75

## Implementation Details

- **State Management** - Zustand store with comprehensive state machine architecture
- **API Layer** - Service layer simulating server requests with localStorage persistence
- **Component Architecture** - Modular design with custom React hooks for logic separation
- **User Experience** - Realistic transaction delays, loading states, and error handling
- **Navigation Flow** - Turn-based interactions with exit/back functionality throughout
- **Design Fidelity** - Closely matches provided mockups with authentic ATM styling

## Browser Compatibility

Optimized for modern browsers. Tested on Chrome.
