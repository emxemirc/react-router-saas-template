import { describe, expect, test } from "vitest";

import { AccountSettings } from "./account-settings";
import { createPopulatedUserAccount } from "~/features/user-accounts/user-accounts-factories.server";
import { createRoutesStub, render, screen } from "~/test/react-test-utils";
import type { Factory } from "~/utils/types";

const createUser: Factory<{
  email: string;
  imageUrl: string;
  name: string;
}> = ({
  email = createPopulatedUserAccount().email,
  imageUrl = createPopulatedUserAccount().imageUrl,
  name = createPopulatedUserAccount().name,
} = {}) => ({ email, imageUrl, name });

describe("AccountSettings Component", () => {
  describe("Image Optimization", () => {
    test("given: user with empty avatar, should: render form without errors", () => {
      const user = createUser({ imageUrl: "" });
      const path = "/test";
      const RouterStub = createRoutesStub([
        {
          Component: () => <AccountSettings user={user} />,
          path,
        },
      ]);

      render(<RouterStub initialEntries={[path]} />);

      expect(screen.getByRole("button", { name: /save/i })).toBeInTheDocument();
    });
  });
});
