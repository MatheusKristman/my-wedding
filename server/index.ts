import { guestRouter } from "./routers/guest";
import { router } from "./trpc";

export const appRouter = router({
  guestRouter,
});

export type AppRouter = typeof appRouter;
