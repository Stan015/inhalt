import { describe, it, expect, vi } from "vitest";

describe("test login authentication", () => {
  const email = "exampleinhalt@gmail.com";
  const password = "test12345";

  it("logs in a user", async () => {
    const mockResponse = {
      user: {
        email: "exampleinhalt@gmail.com",
      },
    };

    const $fetch = vi.fn().mockResolvedValue(mockResponse);

    const response = await $fetch(
      `/api/auth/login-with-pw?email=${email}&password=${password}`
    );

    expect(response.user?.email).toBe("exampleinhalt@gmail.com");
  });
});

describe("test sign up authentication", () => {
  it("signs up a user", async () => {
    const formData = {
      email: "exampleinhalt@gmail.com",
      password: "test12345",
      username: "exampleinhalt",
      firstName: "Example",
      lastName: "Inhalt",
    };

    const $fetch = vi.fn().mockResolvedValue({
      status: 200,
      user: {
        email: "exampleinhalt@gmail.com",
      },
    });

    const response = await $fetch(
      `/api/auth/sign-up-with-pw?email=${formData.email}&password=${formData.password}&username=${formData.username}&firstName=${formData.firstName}&lastName=${formData.lastName}`
    );

    expect(response.status).toBe(200);
  });
});
