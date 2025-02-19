import { giftsRouter } from "./routers/gifts";
import { guestRouter } from "./routers/guest";
import { router } from "./trpc";

export const appRouter = router({
  guestRouter,
  giftsRouter,
});

export type AppRouter = typeof appRouter;
