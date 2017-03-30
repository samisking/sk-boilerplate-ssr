import AsyncRoute from '../components/AsyncRoute';

// Export all the route components wrapped in the AsyncRoute component for production client
export const Home = AsyncRoute(() => System.import('../screens/Home'));
export const Counter = AsyncRoute(() => System.import('../screens/Counter'));
export const Topics = AsyncRoute(() => System.import('../screens/Topics'));
export const NotFound = AsyncRoute(() => System.import('../screens/NotFound'));
