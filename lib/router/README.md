# Protocol Router

A router built specifically for navigating into views for each protocol for Atlantis World. All protocols are attached into a modal that is prompted by an NPC and the router shouldn't behave the same way as it behaves for [React-Router](https://reactrouter.com/) where the URL changes path and adds query params, etc.

## Setup

To setup the protocol-router, must always define a state that passes a generic type argument of type [`ProtocolRouterState`](/src/lib/protocol-router/types.ts).

The entire protocol integration root component should always have the `<ProtocolRouter state={state} />`. Example is taken from [Snapshot protocol integration](/src/ui/protocols/snapshot-xyz/index.tsx), though for simpler example see below.

```tsx
// Import the protocol-router from the `lib` directory
import { ProtocolRouter, ProtocolRouterState } from 'lib/protocol-router'

// views
import HomeView from './views/HomeView'
import ProposalView from './views/ProposalView'
import CreateProposalView from './views/CreateProposalView'
import SetupView from './views/SetupView'
import SpaceView from './views/SpaceView'
import TimelineView from './views/TimelineView'

// Always have to define a state specifically for that protocol integration
// when defining the ridge state, should always pass a generic argument of
// type `ProtocolRouterState` imported from the `protocol-router`.
export const state = newRidgeState<ProtocolRouterState>({
  current: { path: 'home-view' },
  history: [],
  // The key should be the route path and its corresponding value
  // is simply just a React component.
  routes: {
    ['home-view']: <HomeView />,
    ['proposal-view']: <ProposalView />,
    ['create-proposal-view']: <CreateProposalView />,
    ['setup-view']: <SetupView />,
    ['space-view']: <SpaceView />,
    ['timeline-view']: <TimelineView />,
  }, // ! Required, must always define the routes
})

export default function ProtocolIntegrationXyz() {
  return <ProtocolRouter state={state} />
}
```

## Hooks

For navigation using the router, should use the `useProtocolRouter` hook. The first argument will always be the same state that is used when initializing the router at the root component of the protocol integration.

To use the hook just simply import it.

```tsx
import { useProtocolRouter } from 'lib/protocol-router'

export default function ExampleView() {
  // where `state` is of type `ProtocolRouterState` that is defined
  const [{ active, params }, { navigate, back }] = useProtocolRouter(state)

  active // the current active route
  params // the current params in the active route
  navigate({ path: 'example-view-2' }) // navigate to path 'example-view-2'
  navigate({ path: 'navigate-with-params', params: { network: 'polygon' } }) // navigate with parameters
  back() // go back to previous route

  return <>...</>
}
```

### `navigate`

```tsx
import { Box, Button, Text } from '@chakra-ui/react'
import { SnapshotXyzRootState } from '../state'
import { useProtocolRouter } from 'lib/protocol-router'

export default function TimelineView() {
  const [, { navigate }] = useProtocolRouter(SnapshotXyzRootState)

  return (
    <>
      <Box>
        <Text fontSize="4xl">{TimelineView.name}</Text>

        <Button onClick={() => navigate({ path: 'home-view' })}>
          To Home View
        </Button>
      </Box>
    </>
  )
}
```

### `navigate` with params

From a view that calls `navigate` with params.

```tsx
import { Box, Button, Text } from '@chakra-ui/react'
import { SnapshotXyzRootState } from '../state'
import { useProtocolRouter } from 'lib/protocol-router'

export default function TimelineView() {
  const [, { navigate }] = useProtocolRouter(SnapshotXyzRootState)

  return (
    <>
      <Box>
        <Text fontSize="4xl">{TimelineView.name}</Text>

        <Button
          onClick={() =>
            navigate({ path: 'home-view', params: { id: 'uuid-123' } })
          }
        >
          To Home View
        </Button>
      </Box>
    </>
  )
}
```

And here's the view that will be navigated into.

```tsx
import { Box, Text } from '@chakra-ui/react'
import { SnapshotXyzRootState } from '../state'
import { useProtocolRouter } from 'lib/protocol-router'

export default function HomeView() {
  const [{ params }] = useProtocolRouter(SnapshotXyzRootState)

  return (
    <>
      <Box>
        <Text fontSize="4xl">{HomeView.name}</Text>

        <pre>{JSON.stringify(params, null, 2)}</pre>
      </Box>
    </>
  )
}
```

### `back`

```tsx
import { Box, Button, Text } from '@chakra-ui/react'
import { SnapshotXyzRootState } from '../state'
import { useProtocolRouter } from 'lib/protocol-router'

export default function TimelineView() {
  const [, { back }] = useProtocolRouter(SnapshotXyzRootState)

  return (
    <>
      <Box>
        <Text fontSize="4xl">{TimelineView.name}</Text>

        <Button onClick={() => back()}>Back</Button>
      </Box>
    </>
  )
}
```
